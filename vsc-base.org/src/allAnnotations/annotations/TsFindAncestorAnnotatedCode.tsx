import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TsFindAncestorAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'tsFindAncestor'}
         title={'tsFindAncestor'}
         open={open}
         annotation={
            <>
               <p>
                  
Find a parent or ancestor (parent's parent) that matches conditions in a callback
               </p>
            </>
         }
         
         codeOneLineEx={`const ancestor = vsc.tsFindAncestor(node, ancestorNodeTestCallback)`}
         codeEx={`
// find a function with name 'someCaller'
const ancestor = vsc.tsFindAncestor(node, (childNode) => vsc.tsIsFunction(childNode, \{
   name:/^someCaller\$/
}))`}
         code={`/**
 * @vscType ts
 * @returns ts.Node | undefined
 */
export const tsFindAncestor = (node: ts.Node, callback: (ancestor: ts.Node, depth: number) => boolean): ts.Node | undefined => \{
   let ancestor = node.parent, depth = 0
   while (ancestor) \{
      depth += 1;
      const found = callback(ancestor, depth)
      if (found) \{
         return ancestor
      }
      ancestor = ancestor.parent
   }
   return undefined
}`}
      />
   )
}

export default TsFindAncestorAnnotatedCode

