import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TsHasAncestorsAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'tsHasAncestors'}
         title={'tsHasAncestors'}
         open={open}
         annotation={
            <>
               <p>
                  
 Test is it has all ancestors (parent's parent) that matches conditions in a callback 
               </p>
               <p>
                Using <a href='http://vsc-base.org/#tsFindAncestor'>tsFindAncestor</a>
               </p>
            </>
         }
         
         codeOneLineEx={`const hasAncestor = vsc.tsHasAncestor(node, ancestorNodeTestCallback)`}
         codeEx={`
// find a function with name 'someCaller'
const hasAncestor = vsc.tsHasAncestor(node, (childNode)=>\{ 
   return vsc.tsMatchFunction(childNode, \{
      matchName:/^someCaller\$/
   }) 
})`}
         code={`/**
 * @vscType ts
 * @returns boolean
 */
export const tsHasAncestors = (node: ts.Node, callbacks: ((ansector: ts.Node, depth: number) => boolean)[]): boolean => \{
   for (let index = 0; index < callbacks.length; index++) \{
      const callback = callbacks[index];
      if (!vsc.tsHasAncestor(node, callback)) \{
         return false
      }
   }
   return true
}


`}
      />
   )
}

export default TsHasAncestorsAnnotatedCode

