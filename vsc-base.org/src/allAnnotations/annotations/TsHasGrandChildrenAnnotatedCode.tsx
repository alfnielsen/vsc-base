import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TsHasGrandChildrenAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'tsHasGrandChildren'}
         title={'tsHasGrandChildren'}
         open={open}
         annotation={
            <>
               <p>
                  
 Test if it has all Children or grandChildren (child's child) that matches conditions in a callback 
               </p>
               <p>
                Using <a href='http://vsc-base.org/#tsFindGrandchild'>tsFindGrandchild</a>
               </p>
            </>
         }
         
         codeOneLineEx={`const found = vsc.tsHasGrandChildren(node, [childNodeTestCallback1, childNodeTestCallback2])`}
         codeEx={`
// find a variable any where within the parent node, that is a const and has a staring name of: varName
const found = vsc.tsHasGrandChildren(node, [
   childNode => return vsc.tsIsVariable(childNode, \{ name:/^varName1/ }),
   childNode => return vsc.tsIsVariable(childNode, \{ name:/^varName2/ }) 
})`}
         code={`/**
 * @vscType ts
 * @returns boolean
 */
export const tsHasGrandChildren = (node: ts.Node, callbacks: ((child: ts.Node, depth: number) => boolean)[]): boolean => \{
   for (let index = 0; index < callbacks.length; index++) \{
      const callback = callbacks[index];
      if (!vsc.tsHasGrandChild(node, callback)) \{
         return false
      }
   }
   return true
}
`}
      />
   )
}

export default TsHasGrandChildrenAnnotatedCode

