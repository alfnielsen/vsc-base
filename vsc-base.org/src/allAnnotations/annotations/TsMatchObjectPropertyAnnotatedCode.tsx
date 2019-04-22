import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TsMatchObjectPropertyAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'tsMatchObjectProperty'}
         title={'tsMatchObjectProperty'}
         open={open}
         annotation={
            <>
               <p>
                  
 Test is a node is a object property (node: ts.PropertyAssignment) 
               </p>
               <p>
                and optional test for its name
               </p>
            </>
         }
         
         codeOneLineEx={`const found = vsc.tsMatchObjectProperty(node, options)`}
         codeEx={`
const found = vsc.tsMatchObjectProperty(node, \{ matchName: /^keyName\$/ })`}
         code={`/**
 * @vscType ts
 * @returns boolean
 */
export const tsMatchObjectProperty: TsMatchObjectProperty = (node, options) => \{
   if (!ts.isPropertyAssignment(node)) \{ return false }
   if (options) \{
      const \{ matchName } = options
      if (matchName !== undefined && !matchName.test(node.name.getText())) \{ return false }
   }
   return true
}
type TsMatchObjectProperty = (node: ts.Node, options?: \{ matchName?: RegExp }) => boolean
`}
      />
   )
}

export default TsMatchObjectPropertyAnnotatedCode

