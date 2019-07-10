import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TsHasGrandChildAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'tsHasGrandChild'}
         title={'tsHasGrandChild'}
         open={open}
         annotation={
            <>
               <p>
                  
Test if it has  a child or grandChild (child's child) that matches conditions in a callback 
               </p>
               <p>
               Using <a href='http://vsc-base.org/#tsFindGrandchild'>tsFindGrandchild</a>
               </p>
            </>
         }
         
         codeOneLineEx={`const found = vsc.tsFindGrandChild(node, childNodeTestCallback)`}
         codeEx={`
// find a variable any where within the parent node, that is a const and has a staring name of: varName
const found = vsc.tsHasGrandChild(node, (childNode) => vsc.tsIsVariable(childNode, \{
   name:/^varName/, 
   isConst: true 
}))`}
         code={`/**
 * @vscType ts
 * @returns boolean
 */
export const tsHasGrandChild = (node: ts.Node, callback: (child: ts.Node, depth: number) => boolean): boolean => \{
   return !!vsc.tsFindGrandChild(node, callback);
}`}
      />
   )
}

export default TsHasGrandChildAnnotatedCode

