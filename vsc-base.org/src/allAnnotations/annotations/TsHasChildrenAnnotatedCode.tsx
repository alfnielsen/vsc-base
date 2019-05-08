import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TsHasChildrenAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'tsHasChildren'}
         title={'tsHasChildren'}
         open={open}
         annotation={
            <>
               <p>
                  
 Test if it has all children or grandChildren (child's child) that matches conditions in a callback 
               </p>
               <p>
                Using <a href='http://vsc-base.org/#tsHasChild'>tsHasChild</a>
               </p>
            </>
         }
         
         codeOneLineEx={`const childNode = vsc.tsHasChildren(node, [childNodeTestCallback1, childNodeTestCallback2])`}
         codeEx={`
// find a variable any where within the parent node, that is a const and has a staring name of: varName
const hasGrandChilddNode = vsc.tsHasChildren(node, [
   childNode => vsc.tsIsVariable(childNode, \{ name:/^varName1/ }),
   childNode => vsc.tsIsVariable(childNode, \{ name:/^varName2/ }) 
})`}
         code={`/**
 * @vscType ts
 * @returns ts.Node | undefined
 */
export const tsHasChildren = (node: ts.Node, callbacks: ((child: ts.Node, depth: number) => boolean)[]): boolean => \{
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

export default TsHasChildrenAnnotatedCode

