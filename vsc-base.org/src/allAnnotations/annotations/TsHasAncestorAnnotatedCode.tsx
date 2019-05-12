import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TsHasAncestorAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'tsHasAncestor'}
         title={'tsHasAncestor'}
         open={open}
         annotation={
            <>
               <p>
                  
 Test if it has a parent or ancestor (parent's parent) that matches conditions in a callback 
               </p>
               <p>
                Using <a href='http://vsc-base.org/#tsFindAncestor'>tsFindAncestor</a>
               </p>
            </>
         }
         
         codeOneLineEx={`const hasAncestor = vsc.tsHasAncestor(node, ancestorNodeTestCallback)`}
         codeEx={`
// find a function with name 'someCaller'
const hasAncestor = vsc.tsHasAncestor(node, (childNode) => vsc.tsIsFunction(childNode, \{
   name:/^someCaller\$/
}))`}
         code={`/**
 * @vscType ts
 * @returns boolean
 */
export const tsHasAncestor = (node: ts.Node, callback: (ancestor: ts.Node, depth: number) => boolean): boolean => \{
   return !!vsc.tsFindAncestor(node, callback)
}
`}
      />
   )
}

export default TsHasAncestorAnnotatedCode

