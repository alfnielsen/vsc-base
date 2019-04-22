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
                  
 Find a parent or ancestor (parent's parent) that matches conditions in a callback\
               </p>
            </>
         }
         
         codeOneLineEx={`const ancestor = vsc.tsFindAncestor(node, ancestorNodeTestCallback)`}
         codeEx={`
// find a function with name 'someCaller'
const ancestor = vsc.tsFindAncestor(node, (childNode)=>\{ 
   return vsc.tsMatchFunction(childNode, \{
      matchName:/^someCaller\$/
   }) 
})`}
         code={`/**
 * @vscType ts
 * @returns ts.Node | undefined
 */
export const tsFindAncestor = (node: ts.Node, callback: (ansector: ts.Node, depth: number) => boolean): ts.Node | undefined => \{
   let ansector = node.parent, depth = 0
   while (ansector) \{
      depth += 1;
      const found = callback(ansector, depth)
      if (found) \{
         return ansector
      }
      ansector = ansector.parent
   }
   return undefined
}
`}
      />
   )
}

export default TsFindAncestorAnnotatedCode

