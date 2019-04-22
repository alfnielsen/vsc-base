import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TsMatchVariableAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'tsMatchVariable'}
         title={'tsMatchVariable'}
         open={open}
         annotation={
            <>
               <p>
                  
 Test is a node is a variable declaration (node: ts.VariableDeclaration) 
               </p>
               <p>
                and optional test for its name, 
               </p>
               <p>
                and is its a const, let or var.
               </p>
            </>
         }
         
         codeOneLineEx={`const found = vsc.tsMatchFunction(node, options)`}
         codeEx={`
const found = vsc.tsMatchFunction(node, \{ matchName: /^myCaller\$/ })`}
         code={`/**
 * @vscType ts
 * @returns boolean
 */
export const tsMatchVariable: TsMatchVariable = (node, options) => \{
   if (!ts.isVariableDeclaration(node)) \{ return false }
   if (options) \{
      const \{ matchName, isConst, isLet, isVar } = options
      if (matchName !== undefined && !matchName.test(node.name.getText())) \{ return false }
      if (isConst !== undefined && (!node.parent || node.parent.flags !== 2)) \{ return false }
      if (isLet !== undefined && (!node.parent || node.parent.flags !== 1)) \{ return false }
      if (isVar !== undefined && (!node.parent || node.parent.flags !== 0)) \{ return false }
   }
   return true
}
type TsMatchVariable = (node: ts.Node, options?: \{
   matchName?: RegExp
   isConst?: boolean
   isLet?: boolean
   isVar?: boolean
}) => boolean

`}
      />
   )
}

export default TsMatchVariableAnnotatedCode

