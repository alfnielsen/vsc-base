import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TsHasChildAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'tsHasChild'}
         title={'tsHasChild'}
         open={open}
         annotation={
            <>
               <p>
                  
Test if direct parsedChild that matches conditions in a callback 
               </p>
               <p>
               Using <a href='http://vsc-base.org/#tsFind'>tsFind</a> 
               </p>
               <p>
               See also <a href='http://vsc-base.org/#tsHasGrandChild'>tsHasGrandChild</a>
               </p>
            </>
         }
         
         codeOneLineEx={`const child = vsc.tsHasChild(node, childNodeTestCallback })`}
         codeEx={`
const hasChild = vsc.tsHasChild(node, (childNode) => vsc.tsIsVariable(childNode, \{
   name:/^varName\$/, 
   isConst: true 
}))`}
         code={`/**
 * @vscType ts
 * @returns boolean
 */
export const tsHasChild = (node: ts.Node, callback: (child: ts.Node) => boolean): boolean => \{
   return !!vsc.tsFindChild(node, callback);
}`}
      />
   )
}

export default TsHasChildAnnotatedCode

