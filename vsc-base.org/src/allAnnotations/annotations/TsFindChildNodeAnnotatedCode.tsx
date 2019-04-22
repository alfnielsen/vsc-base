import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TsFindChildNodeAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'tsFindChildNode'}
         title={'tsFindChildNode'}
         open={open}
         annotation={
            <>
               <p>
                  
 Find is a direct parsedChild that matches conditions in a callback
               </p>
               <p>
                See also <a href='http://vsc-base.org/#tsFindGrandChildNode'>tsFindGrandChildNode</a> \
               </p>
            </>
         }
         
         codeOneLineEx={`const childNode = vsc.tsFindChildNode(node, childNodeTestCallback })`}
         codeEx={`
const childNode = vsc.tsFindChildNode(node, (childNode)=>\{ 
   return vsc.tsMatchVariable(childNode, \{
      matchName:/^varName\$/, 
      isConst: true 
   }) 
})`}
         code={`/**
 * @vscType ts
 * @returns ts.Node | undefined
 */
export const tsFindChildNode = (node: ts.Node, callback: (child: ts.Node) => boolean): ts.Node | undefined => \{
   const children = vsc.tsGetParsedChildren(node);
   for (let index = 0; index < children.length; index++) \{
      const child = children[index]
      const found = callback(child)
      if (found) \{
         return child
      }
   }
   return undefined;
}
`}
      />
   )
}

export default TsFindChildNodeAnnotatedCode

