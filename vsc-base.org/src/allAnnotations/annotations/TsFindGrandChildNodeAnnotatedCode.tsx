import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TsFindGrandChildNodeAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'tsFindGrandChildNode'}
         title={'tsFindGrandChildNode'}
         open={open}
         annotation={
            <>
               <p>
                  
 Find a child or grandChild (child's child) that matches conditions in a callback\
               </p>
            </>
         }
         
         codeOneLineEx={`const childNode = vsc.tsFindGrandChildNode(node, childNodeTestCallback)`}
         codeEx={`
// find a variable any where within the parent node, that is a const and has a staring name of: varName
const childNode = vsc.tsFindGrandChildNode(node, (childNode)=>\{ 
   return vsc.tsMatchVariable(childNode, \{
      matchName:/^varName/, 
      isConst: true 
   }) 
})`}
         code={`/**
 * @vscType ts
 * @returns ts.Node | undefined
 */
export const tsFindGrandChildNode = (node: ts.Node, callback: (child: ts.Node, depth: number) => boolean): ts.Node | undefined => \{
   let found: ts.Node | undefined
   const mathChild = (node: ts.Node, depth: number) => \{
      if (found) \{
         return;
      }
      const children = vsc.tsGetParsedChildren(node);
      for (let index = 0; index < children.length; index++) \{
         const child = children[index]
         const result = callback(child, depth)
         if (result) \{
            found = child
         } else \{
            mathChild(child, depth + 1)
         }
      }
   }
   mathChild(node, 0)
   return found
}
`}
      />
   )
}

export default TsFindGrandChildNodeAnnotatedCode

