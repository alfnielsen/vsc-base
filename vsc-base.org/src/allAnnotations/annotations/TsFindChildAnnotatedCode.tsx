import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TsFindChildAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'tsFindChild'}
         title={'tsFindChild'}
         open={open}
         annotation={
            <>
               <p>
                  
Find is a direct parsedChild that matches conditions in a callback
               </p>
               <p>
               See also <a href='http://vsc-base.org/#tsHasChild'>tsHasChild</a> 
               </p>
               <p>
               See also <a href='http://vsc-base.org/#tsFindGrandChildNode'>tsFindGrandChild</a>
               </p>
            </>
         }
         
         codeOneLineEx={`const childNode = vsc.tsFindChild(node, childNodeTestCallback })`}
         codeEx={`
const childNode = vsc.tsFindChild(node, (childNode)=> vsc.tsIdVariable(childNode, \{
   name:/^varName\$/, 
   isConst: true 
}))`}
         code={`/**
 * @vscType ts
 * @returns ts.Node | undefined
 */
export const tsFindChild = (node: ts.Node, callback: (child: ts.Node) => boolean): ts.Node | undefined => \{
   const children = vsc.tsGetParsedChildren(node);
   for (let index = 0; index < children.length; index++) \{
      const child = children[index]
      const found = callback(child)
      if (found) \{
         return child
      }
   }
   return undefined;
}`}
      />
   )
}

export default TsFindChildAnnotatedCode

