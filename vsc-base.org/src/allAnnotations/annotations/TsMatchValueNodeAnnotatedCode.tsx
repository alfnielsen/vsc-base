import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TsMatchValueNodeAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'tsMatchValueNode'}
         title={'tsMatchValueNode'}
         open={open}
         annotation={
            <>
               <p>
                  
 Test if node is an value: string expression, number expression or boolean (true or false) 
               </p>
               <p>
                and match the value: true, false, a number, a string, 
               </p>
               <p>
                A RegExp can be applied for string/number search. 
               </p>
               <p>
                Optional test hasAncestor. 
               </p>
               <p>
                See <a href='http://vsc-base.org/#tsHasAncestor'>tsHasAncestor</a> and <a href='http://vsc-base.org/#tsHasAncestors'>tsHasAncestors</a>
               </p>
            </>
         }
         
         codeOneLineEx={`const foundNode = vsc.tsMatchValueNode(node, value)`}
         codeEx={`
// Found a NumberExpression with value 12
const foundNode = vsc.tsMatchValueNode(node, 12)
// Found a NumberExpression with value 12, with a parent EnumValue
const foundNode = vsc.tsMatchValueNode(node, 12, \{
   hasParent: parent => vsc.matchEnum(parent)
})`}
         code={`/**
 * @vscType ts
 * @returns s.Node | undefined
 */
export const tsMatchValueNode: (
   node: ts.Node | undefined,
   value: (RegExp | string | number | boolean | null),
   options?: \{
      hasParent?: (parent: ts.Node) => boolean
      hasAncestor?: (parent: ts.Node, depth: number) => boolean
      hasAncestors?: ((parent: ts.Node, depth: number) => boolean)[]
   }
) => ts.Node | undefined = (node, matchValue, options) => \{
   if (vsc.tsIsValue(node, matchValue, options)) \{
      return node
   }
}
`}
      />
   )
}

export default TsMatchValueNodeAnnotatedCode

