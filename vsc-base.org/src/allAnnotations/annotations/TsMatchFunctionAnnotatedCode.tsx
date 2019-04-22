import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TsMatchFunctionAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'tsMatchFunction'}
         title={'tsMatchFunction'}
         open={open}
         annotation={
            <>
               <p>
                  
 Test is a node is a function 
               </p>
               <p>
                (node: ts.SignatureDeclaration, Like FunctionDeclaration, FunctionExpression and ArrowFunction ect.. ) 
               </p>
               <p>
                and optional test for its name. 
               </p>
               <p>
                (For ArrowFunction's and FunctionExpression's it will test for a variable declaration that points to the function)
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
export const tsMatchFunction: TsMatchFunction = (node, options) => \{
   if (!ts.isFunctionLike(node)) \{ return false }
   if (options) \{
      const \{ matchName } = options
      if (matchName !== undefined) \{
         let name: string | undefined
         if ((ts.isArrowFunction(node) || ts.isFunctionExpression(node)) && ts.isVariableDeclaration(node.parent)) \{
            name = node.parent.name.getText()
         }
         if (ts.isFunctionDeclaration(node) && node.name) \{
            name = node.name.getText()
         }
         if (!name || !matchName.test(name)) \{
            return false
         }
      }
   }
   return true
}
type TsMatchFunction = (node: ts.Node, options?: \{ matchName?: RegExp }) => boolean


`}
      />
   )
}

export default TsMatchFunctionAnnotatedCode

