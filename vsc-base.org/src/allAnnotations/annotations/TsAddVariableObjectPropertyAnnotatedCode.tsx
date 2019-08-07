import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TsAddVariableObjectPropertyAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'tsAddVariableObjectProperty'}
         title={'tsAddVariableObjectProperty'}
         open={open}
         annotation={
            <>
               <p>
                  
Insert/add a key-value pair in an variable object. 
               </p>
               <p>
               Intention will follow the members already defined. 
               </p>
               <p>
               If no members are defined it will use the 'newIntention'
Use of trailingComma will follow the members already defined. 
               </p>
               <p>
               If no members are defined it will use the 'addNewTrailingComma' (default false)
               </p>
            </>
         }
         
         codeOneLineEx={`source = vsc.tsAddVariableObjectProperty(source, variableName, key, value)`}
         codeEx={`
// Set type to an string
source = vsc.tsAddVariableObjectProperty(source, 'IFood', 'name', 'string')
// Set type to an number list
source = vsc.tsAddVariableObjectProperty(source, 'IFood', 'countTypes', 'number[]')
// Set type to an enum
source = vsc.tsAddVariableObjectProperty(source, 'IFood', 'type', 'FooType')`}
         code={`/**
 * @vscType ts
 * @returns string
 */
export const tsAddVariableObjectProperty = (source: string, variableName: string, key: string, value: string, newIntention = 3, addNewTrailingComma = false): string => \{
   // Find variable list 
   const [variableList, variableListPos] = vsc.tsFindNodePositionFromContent(source, node =>
      vsc.tsMatchVariableList(node, \{
         hasVariable: variable =>
            variable.name.getText() === variableName
            && variable.initializer !== undefined
            && ts.isObjectLiteralExpression(variable.initializer)
      })
   )
   if (!variableList || !variableListPos) \{
      return source
   }
   // Find variable (in list, normally the only one)
   const variable = variableList.declarations.find(v => v.name.getText() === variableName);
   if (!variable) \{
      return source
   }
   // check that its object
   const obj = variable.initializer
   if (!obj || variable.initializer === undefined || !ts.isObjectLiteralExpression(obj)) \{
      return source
   }
   // check that the property don't exist
   const hasValue = obj.properties.find(p => p.name && p.name.getText() === key)
   if (hasValue) \{
      return source
   }
   // Find insert position and intentions
   const sourceLines = source.split(/\\n/);
   const insertPoint = variable.end - 1;
   const singleLine = /^\{[^\\n]*}\$/.test(obj.getText())
   const hasProps = obj.properties.length > 0
   const leadingComma = obj.properties.hasTrailingComma
   let contentAfterNewProp = '\\n';
   // Add same intention as variableList
   const variableListIntention = sourceLines[variableListPos.startLineNumber].match(/^\\s*/);
   if (variableListIntention) \{
      contentAfterNewProp += variableListIntention[0];
   }
   // Add leading comma if the current one has it
   if (leadingComma || addNewTrailingComma) \{
      contentAfterNewProp = ',' + contentAfterNewProp
   }
   // declare last prop end for optional comma insertion
   let lastPropEnd = 0
   // find property intention
   const newIntentionString = new Array(newIntention).fill(' ').join('')
   let propertyIntention = newIntentionString
   if (hasProps) \{
      const lastProp = obj.properties.reduce((p, c) => (p.end > c.end) ? p : c)
      lastPropEnd = lastProp.end
      const lastPropPos = vsc.createVscodeRangeAndPosition(source, lastProp.pos, lastProp.end)
      if (lastPropPos) \{
         const lastPropIntention = sourceLines[lastPropPos.startLineNumber].match(/^\\s*/);
         if (lastPropIntention && lastPropIntention[0] !== '') \{
            propertyIntention = lastPropIntention[0]
         }
      }
   }
   let contentBeforeNewProp = ''
   // If single line add newline
   if (singleLine) \{
      contentBeforeNewProp = '\\n' + contentBeforeNewProp + variableListIntention
   }
   if (hasProps && variableListIntention) \{
      contentBeforeNewProp = propertyIntention.substr(0, propertyIntention.length - variableListIntention.length)
   } else \{
      contentBeforeNewProp = contentBeforeNewProp + newIntentionString
   }

   // Add property
   source =
      source.substring(0, insertPoint) +
      \`\$\{contentBeforeNewProp}\$\{key}: \$\{value}\$\{contentAfterNewProp}\` +
      source.substring(insertPoint)
   // Add comma after prev property
   if (hasProps && !leadingComma) \{
      source =
         source.substring(0, lastPropEnd) +
         \`,\` +
         source.substring(lastPropEnd)
   }
   // return 
   return source

}`}
      />
   )
}

export default TsAddVariableObjectPropertyAnnotatedCode

