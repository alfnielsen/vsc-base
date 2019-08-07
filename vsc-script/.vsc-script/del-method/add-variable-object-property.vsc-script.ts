import * as ts from 'typescript'
import * as vsc from 'vsc-base'

export async function run(_path: string) {
   let source = await vsc.getDocumentContent()
   vsc.showMessage("Start")

   // - Enum Member
   // source = tsAddEnumMember(source, 'enumList', 'yes', 'YES')
   // source = tsAddEnumMember(source, 'enumList0', 'yes2', '1', 3, true, false)
   // source = tsAddEnumMember(source, 'enumList1', 'yes2')
   // source = tsAddEnumMember(source, 'enumList2', 'yes', 'YES')
   // source = tsAddEnumMember(source, 'enumList3', 'yes2')
   // source = tsAddEnumMember(source, 'enumList4', 'yes2')
   // source = tsAddEnumMember(source, 'enumList5', 'yes', 'YES')

   // - Interface Member
   // source = tsAddInterfaceMember(source, 'IProp', 'yes', 'number')
   // source = tsAddInterfaceMember(source, 'IProp1', 'yes', 'number')
   // source = tsAddInterfaceMember(source, 'IProp2', 'yes', 'number')
   // source = tsAddInterfaceMember(source, 'IProp3', 'yes', 'number')

   // - Object Variable property
   // source = tsAddVariableObjectProperty(source, 'foo1', 'yes', '1')
   // source = tsAddVariableObjectProperty(source, 'foo2', 'yes', '1')
   // source = tsAddVariableObjectProperty(source, 'foo3', 'yes', '1')
   // source = tsAddVariableObjectProperty(source, 'foo4', 'yes', '1')
   // source = tsAddVariableObjectProperty(source, 'foo5', 'yes', '1')
   // source = tsAddVariableObjectProperty(source, 'foo6', 'yes', '1')
   // source = tsAddVariableObjectProperty(source, 'foo7', 'yes', '1')
   // source = tsAddVariableObjectProperty(source, 'foo8', 'yes', '1')
   // source = tsAddVariableObjectProperty(source, 'foo9', 'yes', '1')
   // source = tsAddVariableObjectProperty(source, 'foo92', 'yes', '1')
   // source = tsAddVariableObjectProperty(source, 'foo93', 'yes', '1')
   // source = tsAddVariableObjectProperty(source, 'foo94', 'yes', '1')
   // source = tsAddVariableObjectProperty(source, 'foo95', 'yes', '1')
   // source = tsAddVariableObjectProperty(source, 'foo10', 'yes', '1')
   vsc.setDocumentContent(source)
}

const enum enumList {
   fo = "fer",
   fo2 = "fer",
}
const enum enumList0 {
   fo = "fer",
   fo2 = "fer",
   fo3 = 4
}
const enum enumList1 {
   fo,
   fo2
}
const enum enumList2 {
   fo = "fer",
   yes = "fer"
}
const enum enumList3 {
   fo,
   yes
}
const enum enumList4 { }
const enum enumList5 {
}

interface IProp {
   as: number
   as2: number
}
interface IProp1 {
   as: number;
   as2: number;
}
interface IProp2 {
}
interface IProp3 { }
interface IProp4 {
   yes: number
}


const foo1 = {}

const foo2 = {
}
const foo3 = {
   yes: 1
}
const foo4 = {
   f: 1, f2: 3
}
const foo5 = {
   f: 1, f2: 3,
}
const foo6 = {
   f: 1,
   f2: 3,
}
const foo7: { [key: string]: number } =
{
   f: 1,
   f2: 3
}
const foo8 = {
   f: 1,
   //test
   f2: () => {
      //
   },
   yes: 1
}
const fooo = () => {
   const foo9 = {
      f: 1,
      yes: 1
   }
   if (true) {
      const foo92 = {}
   }
   if (true) {
      const foo93 = {
         /*some*/
         val: 1,
         /*some*/
         val2: () => {
            //spmw
         },
         /*some*/
      }
   }
   if (true) {
      const foo94 = {/**/ }
   }
   if (true) {
      const foo95 = {
         /**/
         text: 1
      }
   }
}
const fooo2 = () => {
   // HEJ
   const ddd = 0
   //some comment!
   const foo10 = {
   }
}

//vsc-script-name: Method Development > tsAddVariableObjectProperty (Run while open)

const tsAddEnumMember = (source: string, enumName: string, memberName: string, value?: string, newIntention = 3, addNewLeadingComma = false, addValueQuotes = true, singleQuotes = true): string => {
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
      const lastMemberIntention = sourceLines[lastMemberPos.startLineNumber].match(/^\s*/)[0];
      if (lastMemberIntention !== '') {
         propertyIntention = lastMemberIntention
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
      if (addValueQuotes) {
         val = singleQuotes ? `'${val}'` : `"${val}"`
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

const tsAddInterfaceMember = (source: string, interfaceName: string, memberName: string, type: string, newIntention = 3, addNewLeadingSemiColon = false): string => {
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
   const hasMember = _interface.members.find(m => m.name.getText() === memberName)
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
      const lastMemberIntention = sourceLines[lastMemberPos.startLineNumber].match(/^\s*/)[0];
      if (lastMemberIntention !== '') {
         propertyIntention = lastMemberIntention
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

const tsAddVariableObjectProperty = (source: string, variableName: string, key: string, value: string, newIntention = 3, addNewTrailingComma = false): string => {
   // Find variable list 
   const [variableList, variableListPos] = vsc.tsFindNodePositionFromContent(source, node =>
      vsc.tsMatchVariableList(node, {
         hasVariable: variable => variable.name.getText() === variableName
            && ts.isObjectLiteralExpression(variable.initializer)
      })
   )
   if (!variableList) {
      return source
   }
   // Find variable (in list, normally the only one)
   const variable = variableList.declarations.find(v => v.name.getText() === variableName);
   if (!variable) {
      return source
   }
   // check that its object
   const obj = variable.initializer
   if (!ts.isObjectLiteralExpression(obj)) {
      return source
   }
   // check that the property don't exist
   const hasValue = obj.properties.find(p => p.name.getText() === key)
   if (hasValue) {
      return source
   }
   // Find insert position and intentions
   const sourceLines = source.split(/\n/);
   const insertPoint = variable.end - 1;
   const variableListIntention = sourceLines[variableListPos.startLineNumber].match(/^\s*/)[0];
   const singleLine = /^{[^\n]*}$/.test(obj.getText())
   const hasProps = obj.properties.length > 0
   const leadingComma = obj.properties.hasTrailingComma
   // Add same intention as variableList
   let contentAfterNewProp = '\n' + variableListIntention;
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
      const lastPropIntention = sourceLines[lastPropPos.startLineNumber].match(/^\s*/)[0];
      if (lastPropIntention !== '') {
         propertyIntention = lastPropIntention
      }
   }
   let contentBeforeNewProp = ''
   // If single line add newline
   if (singleLine) {
      contentBeforeNewProp = '\n' + contentBeforeNewProp + variableListIntention
   }
   if (hasProps) {
      contentBeforeNewProp = propertyIntention.substr(0, propertyIntention.length - variableListIntention.length)
   } else {
      contentBeforeNewProp = contentBeforeNewProp + newIntentionString
   }

   // Add property
   source =
      source.substring(0, insertPoint) +
      `${contentBeforeNewProp}${key}: ${value}${contentAfterNewProp}` +
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




const tsMatchVariableList: (node: ts.Node | undefined, options?: {
   isConst?: boolean
   isLet?: boolean
   isVar?: boolean,
   hasVariable?: (parent: ts.VariableDeclaration) => boolean
   hasVariables?: ((parent: ts.VariableDeclaration) => boolean)[]
   hasParent?: (parent: ts.Node) => boolean
   hasAncestor?: (parent: ts.Node, depth: number) => boolean
   hasGrandChild?: (child: ts.Node, depth: number) => boolean
   hasAncestors?: ((parent: ts.Node, depth: number) => boolean)[]
   hasGrandChildren?: ((child: ts.Node, depth: number) => boolean)[]
}) => ts.VariableDeclarationList | undefined = (node, options) => {
   if (!node || !ts.isVariableDeclarationList(node)) { return }
   if (!options) {
      return node
   }
   const {
      isConst,
      isLet,
      isVar,
      hasVariable,
      hasVariables,
   } = options
   if (!vsc.tsIsNode(node, options)) {
      return
   }
   if (isConst !== undefined && (isConst !== (node.flags === 2))) { return }
   if (isLet !== undefined && (isLet !== (node.flags === 1))) { return }
   if (isVar !== undefined && (isVar !== (node.flags === 0))) { return }
   const variables = node.declarations
   if (hasVariable !== undefined) {
      const found = variables.some(variable => hasVariable(variable))
      if (!found) { return }
   }
   if (hasVariables !== undefined) {
      const found = hasVariables.every(hasVariable => variables.some(variable => hasVariable(variable)))
      if (!found) { return }
   }
   return node
}