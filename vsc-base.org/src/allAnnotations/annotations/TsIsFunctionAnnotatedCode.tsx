import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TsIsFunctionAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'tsIsFunction'}
         title={'tsIsFunction'}
         open={open}
         annotation={
            <>
               <p>
                  
Test if a node is a function 
               </p>
               <p>
               (node: ts.isArrowFunction, ts.isFunctionExpression or ts.isFunctionDeclaration) 
               </p>
               <p>
               Uses <a href='http://vsc-base.org/#tsMatchFunction'>tsMatchFunction</a>
               </p>
            </>
         }
         
         codeOneLineEx={`const isFunctionNone = vsc.tsIsFunction(node, options)`}
         codeEx={`
const isFunctionNone = vsc.tsIsFunction(
  node,
  \{
    name: /^myCaller\$/
  }
)`}
         code={`/**
 * @vscType ts
 * @returns boolean
 */
export const tsIsFunction: (node: ts.Node | undefined, options?: \{
   name?: RegExp | string,
   hasParent?: (parent: ts.Node) => boolean
   hasAncestor?: (parent: ts.Node, depth: number) => boolean
   hasAncestors?: ((parent: ts.Node, depth: number) => boolean)[]
   hasGrandChild?: (child: ts.Node, depth: number) => boolean
   hasGrandChildren?: ((child: ts.Node, depth: number) => boolean)[]
}) => boolean = (node, options) => \{
   return !!tsMatchFunction(node, options)
}`}
      />
   )
}

export default TsIsFunctionAnnotatedCode

