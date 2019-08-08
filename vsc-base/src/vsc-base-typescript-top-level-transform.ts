import * as ts from 'typescript'

import * as vsc from './vsc-base'

/** vsc-base method
 * @description
 * Insert an import if its not already imported. \
 * It will add it to an existing import that has the same path or add a new import after the last import.
 * @see [tsInsertImport](http://vsc-base.org/#tsInsertImport)
 * @vscType ts
 * @example
 * source = vsc.tsInsertImport(source, 'useCallback', 'react')
 * @returns string
 */
export const tsInsertImport: (
   source: string,
   importName: string,
   importPath: string,
   options?: {
      isDefault?: boolean,
      useDoubleQuotation?: boolean,
      addSemicolon?: boolean
   }
) => string = (source, importName, importPath, options) => {
   const {
      isDefault = false,
      useDoubleQuotation = false,
      addSemicolon = false
   } = options || {}
   const [matchImport] = vsc.tsFindNodePositionFromContent(source, node =>
      vsc.tsMatchImport(node, {
         nameSpace: importName
      })
      ||
      vsc.tsMatchImport(node, {
         defaultName: importName
      })
      ||
      vsc.tsMatchImport(node, {
         hasSpecifiersName: importName
      })
   )
   if (matchImport) {
      return source
   }
   const [matchImportPath, matchImportPathPos] = vsc.tsFindNodePositionFromContent(source, node =>
      vsc.tsMatchImport(node, {
         path: importPath
      })
   )
   if (matchImportPath && matchImportPathPos) {
      let importContent = matchImportPath.getText()
      importContent = isDefault
         ? importContent.replace('import ', `import ${importName}, `)
         : importContent.replace('import {', `import { ${importName},`)
      source = source.substring(0, matchImportPathPos.start) + importContent + source.substring(matchImportPathPos.end);
      return source
   }

   const allImports = vsc.tsFindAllNodePositionsFromContent(source, node =>
      vsc.tsMatchImport(node)
   ).map(([imp, pos]) => imp)
   let importPos = 0
   if (allImports.length > 0) {
      allImports.sort((a, b) => a.end - b.end);
      const lastImport = allImports[allImports.length - 1]
      importPos = lastImport.end + 1;
   }
   if (importPos === 0) {
      const useStrictMatch = source.match(/^[\n\s]*['"']use strict['"'];?[^\S\r\n]*\n/)
      if (useStrictMatch) {
         importPos = useStrictMatch[0].length
      }
   }
   const quotation = useDoubleQuotation ? '"' : "'";
   const semiColon = addSemicolon ? ';' : '';
   const importContent = isDefault
      ? `import ${importName} from ${quotation}${importPath}${quotation}${semiColon}\n`
      : `import { ${importName} } from ${quotation}${importPath}${quotation}${semiColon}\n`
   source = source.substring(0, importPos) + importContent + source.substring(importPos);

   return source
}


/** vsc-base method
 * @description
 * Insert/add a member in an enum. \
 * 'value' is optional. \
 * For complex (calculated values) or number values, \
 * set 'addQuotes' to false.
 * Intention will follow the members already defined. \
 * If no members are defined it will use the 'newIntention'
 * LeadingComma will follow the members already defined. \
 * If no members are defined it will use the 'addNewLeadingComma' (default false)
 * @see [tsInsertEnumMember](http://vsc-base.org/#tsInsertEnumMember)
 * @vscType ts
 * @example
 * source = vsc.tsInsertEnumMember(source, enumName, memberName, value)
 * @example
 * source = vsc.tsInsertEnumMember(source, 'foodOptions', 'meat', 'MEAT')
 * // Add number as value
 * source = vsc.tsInsertEnumMember(source, 'numberOptions', 'One', '1', { addQuotes: false })
 * // Add calculated number as value
 * source = vsc.tsInsertEnumMember(source, 'numberOptions', 'Tree', 'One * 3', { addQuotes: false })
 * @returns string
 */
export const tsInsertEnumMember: (
   source: string,
   enumName: string,
   memberName: string,
   value?: string,
   options?: {
      newIntention?: number,
      addNewLeadingComma?: boolean,
      addQuotes?: boolean,
      useDoubleQuotation?: boolean
   }
) => string = (source, enumName, memberName, value, options) => {
   const {
      newIntention = 3,
      addNewLeadingComma = false,
      addQuotes = true,
      useDoubleQuotation = false
   } = options || {}
   // Find variable list 
   const [_enum] = vsc.tsFindNodePositionFromContent(source, node =>
      vsc.tsMatchEnum(node, {
         name: enumName
      })
   )
   if (!_enum) {
      return source
   }
   // check that the property don't exist
   const hasMember = _enum.members.find(m => m.name.getText() === memberName)
   if (hasMember) {
      return source
   }
   // Find insert position and intentions
   const sourceLines = source.split(/\n/);
   const insertPoint = _enum.end - 1;
   const singleLine = /{[^\n]*}$/.test(_enum.getText())
   const hasMembers = _enum.members.length > 0
   const leadingComma = _enum.members.hasTrailingComma
   // declare last prop end for optional comma insertion
   let lastMemberEnd = 0
   const newIntentionString = new Array(newIntention).fill(' ').join('')
   let propertyIntention = newIntentionString
   if (hasMembers) {
      const lastMember = _enum.members.reduce((p, c) => (p.end > c.end) ? p : c)
      lastMemberEnd = lastMember.end
      const lastMemberPos = vsc.createVscodeRangeAndPosition(source, lastMember.pos, lastMember.end)
      const lastMemberIntention = sourceLines[lastMemberPos.startLineNumber].match(/^\s*/);
      if (lastMemberIntention && lastMemberIntention[0] !== '') {
         propertyIntention = lastMemberIntention[0]
      }
   }
   let contentBeforeNewMember = ''
   // If single line add newline
   if (singleLine) {
      contentBeforeNewMember = '\n'
   }
   if (hasMembers) {
      contentBeforeNewMember += propertyIntention
   } else {
      contentBeforeNewMember += newIntentionString
   }
   let contentAfterNewProp = '\n';
   if (leadingComma || addNewLeadingComma) {
      contentAfterNewProp = ',' + contentAfterNewProp
   }
   let newContent: string
   if (value) {
      let val = value
      if (addQuotes) {
         val = useDoubleQuotation ? `"${val}"` : `'${val}'`
      }
      newContent = `${contentBeforeNewMember}${memberName} = ${val}${contentAfterNewProp}`
   } else {
      newContent = `${contentBeforeNewMember}${memberName}${contentAfterNewProp}`
   }
   // Add property
   source =
      source.substring(0, insertPoint) +
      newContent +
      source.substring(insertPoint)
   // Add comma after prev property
   if (hasMembers && !leadingComma) {
      source =
         source.substring(0, lastMemberEnd) +
         `,` +
         source.substring(lastMemberEnd)
   }
   // return 
   return source
}

/** vsc-base method
 * @description
 * Insert/add a member in an interface. \
 * Intention will follow the members already defined. \
 * If no members are defined it will use the 'newIntention'
 * Use of semiColon will follow the members already defined. \
 * If no members are defined it will use the 'addNewLeadingSemiColon' (default false)
 * @see [tsAddInterfaceMember](http://vsc-base.org/#tsAddInterfaceMember)
 * @vscType ts
 * @example
 * source = vsc.tsAddInterfaceMember(source, interfaceName, memberName, type)
 * @example
 * // Set type to an string
 * source = vsc.tsAddInterfaceMember(source, 'IFood', 'name', 'string')
 * // Set type to an number list
 * source = vsc.tsAddInterfaceMember(source, 'IFood', 'countTypes', 'number[]')
 * // Set type to an enum
 * source = vsc.tsAddInterfaceMember(source, 'IFood', 'type', 'FooType')
 * @returns string
 */
export const tsInsertInterfaceMember: (
   source: string,
   interfaceName: string,
   memberName: string,
   type: string,
   options?: {
      newIntention?: number,
      addNewLeadingSemiColon?: boolean
   }
) => string = (source, interfaceName, memberName, type, options) => {
   const { newIntention = 3, addNewLeadingSemiColon = false } = options || {}
   // Find variable list 
   const [_interface] = vsc.tsFindNodePositionFromContent(source, node =>
      vsc.tsMatchInterface(node, {
         name: interfaceName
      })
   )
   if (!_interface) {
      return source
   }
   // check that the property don't exist
   const hasMember = _interface.members.find(m => !!m.name && m.name.getText() === memberName)
   if (hasMember) {
      return source
   }
   // Find insert position and intentions
   const sourceLines = source.split(/\n/);
   const insertPoint = _interface.end - 1;
   const singleLine = /{[^\n]*}$/.test(_interface.getText())
   const hasMembers = _interface.members.length > 0
   let addSemiColon = addNewLeadingSemiColon
   const newIntentionString = new Array(newIntention).fill(' ').join('')
   let propertyIntention = newIntentionString
   if (hasMembers) {
      const lastMember = _interface.members.reduce((p, c) => (p.end > c.end) ? p : c)
      if (/;$/.test(lastMember.getText())) {
         addSemiColon = true
      }
      const lastMemberPos = vsc.createVscodeRangeAndPosition(source, lastMember.pos, lastMember.end)
      const lastMemberIntention = sourceLines[lastMemberPos.startLineNumber].match(/^\s*/)
      if (lastMemberIntention && lastMemberIntention[0] !== '') {
         propertyIntention = lastMemberIntention[0]
      }
   }
   let contentBeforeNewMember = ''
   // If single line add newline
   if (singleLine) {
      contentBeforeNewMember = '\n'
   }
   if (hasMembers) {
      contentBeforeNewMember += propertyIntention
   } else {
      contentBeforeNewMember += newIntentionString
   }
   let contentAfterNewProp = '\n';
   if (addSemiColon) {
      contentAfterNewProp = ';' + contentAfterNewProp;
   }
   // Add property
   source =
      source.substring(0, insertPoint) +
      `${contentBeforeNewMember}${memberName}: ${type}${contentAfterNewProp}` +
      source.substring(insertPoint)
   // return 
   return source
}


/** vsc-base method
 * @description
 * Insert/add a key-value pair in an variable object. \
 * Intention will follow the members already defined. \
 * If no members are defined it will use the 'newIntention'
 * Use of trailingComma will follow the members already defined. \
 * If no members are defined it will use the 'addNewTrailingComma' (default false)
 * @see [tsAddVariableObjectProperty](http://vsc-base.org/#tsAddVariableObjectProperty)
 * @vscType ts
 * @example
 * source = vsc.tsAddVariableObjectProperty(source, variableName, key, value)
 * @example
 * // Set type to an string
 * source = vsc.tsAddVariableObjectProperty(source, 'IFood', 'name', 'string')
 * // Set type to an number list
 * source = vsc.tsAddVariableObjectProperty(source, 'IFood', 'countTypes', 'number[]')
 * // Set type to an enum
 * source = vsc.tsAddVariableObjectProperty(source, 'IFood', 'type', 'FooType')
 * @returns string
 */
export const tsInsertVariableObjectProperty: (
   source: string,
   variableName: string,
   key: string,
   value?: string,
   options?: {
      newIntention?: number,
      addNewTrailingComma?: boolean
   }
) => string = (source, variableName, key, value, options) => {
   const { newIntention = 3, addNewTrailingComma = false } = options || {}
   // Find variable list 
   const [variableList, variableListPos] = vsc.tsFindNodePositionFromContent(source, node =>
      vsc.tsMatchVariableList(node, {
         hasVariable: variable =>
            variable.name.getText() === variableName
            && variable.initializer !== undefined
            && ts.isObjectLiteralExpression(variable.initializer)
      })
   )
   if (!variableList || !variableListPos) {
      return source
   }
   // Find variable (in list, normally the only one)
   const variable = variableList.declarations.find(v => v.name.getText() === variableName);
   if (!variable) {
      return source
   }
   // check that its object
   const obj = variable.initializer
   if (!obj || variable.initializer === undefined || !ts.isObjectLiteralExpression(obj)) {
      return source
   }
   // check that the property don't exist
   const hasValue = obj.properties.find(p => !!p.name && p.name.getText() === key)
   if (hasValue) {
      return source
   }
   // Find insert position and intentions
   const sourceLines = source.split(/\n/);
   const insertPoint = variable.end - 1;
   const singleLine = /^{[^\n]*}$/.test(obj.getText())
   const hasProps = obj.properties.length > 0
   const leadingComma = obj.properties.hasTrailingComma
   let contentAfterNewProp = '\n';
   // Add same intention as variableList
   let variableListIntention = ''
   const variableListIntentionMatch = sourceLines[variableListPos.startLineNumber].match(/^\s*/);
   if (variableListIntentionMatch) {
      variableListIntention = variableListIntentionMatch[0]
      contentAfterNewProp += variableListIntention;
   }
   // Add leading comma if the current one has it
   if (leadingComma || addNewTrailingComma) {
      contentAfterNewProp = ',' + contentAfterNewProp
   }
   // declare last prop end for optional comma insertion
   let lastPropEnd = 0
   // find property intention
   const newIntentionString = new Array(newIntention).fill(' ').join('')
   let propertyIntention = newIntentionString
   if (hasProps) {
      const lastProp = obj.properties.reduce((p, c) => (p.end > c.end) ? p : c)
      lastPropEnd = lastProp.end
      const lastPropPos = vsc.createVscodeRangeAndPosition(source, lastProp.pos, lastProp.end)
      if (lastPropPos) {
         const lastPropIntention = sourceLines[lastPropPos.startLineNumber].match(/^\s*/);
         if (lastPropIntention && lastPropIntention[0] !== '') {
            propertyIntention = lastPropIntention[0]
         }
      }
   }
   let contentBeforeNewProp = ''
   // If single line add newline
   if (singleLine) {
      contentBeforeNewProp = '\n' + contentBeforeNewProp + variableListIntention
   }
   if (hasProps && variableListIntention) {
      contentBeforeNewProp = propertyIntention.substr(0, propertyIntention.length - variableListIntention.length)
   } else {
      contentBeforeNewProp = contentBeforeNewProp + newIntentionString
   }

   let newContent: string
   if (value) {
      newContent = `${contentBeforeNewProp}${key}: ${value}${contentAfterNewProp}`
   } else {
      newContent = `${contentBeforeNewProp}${key}${contentAfterNewProp}`
   }

   // Add property
   source =
      source.substring(0, insertPoint) +
      newContent +
      source.substring(insertPoint)
   // Add comma after prev property
   if (hasProps && !leadingComma) {
      source =
         source.substring(0, lastPropEnd) +
         `,` +
         source.substring(lastPropEnd)
   }
   // return 
   return source

}
