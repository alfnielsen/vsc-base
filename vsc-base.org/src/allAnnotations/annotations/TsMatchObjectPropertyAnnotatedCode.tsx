import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TsMatchObjectPropertyAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'tsMatchObjectProperty'}
         title={'tsMatchObjectProperty'}
         open={open}
         annotation={
            <>
               <p>
                  
 Test is a node is a object property (node: ts.PropertyAssignment) 
               </p>
               <p>
                Optional test for its name with a string or regexp. 
               </p>
               <p>
                Optional test for tsHasAncestor and hasGrandChild 
               </p>
               <p>
                See <a href='http://vsc-base.org/#tsMacthNode'>tsMacthNode</a> 
               </p>
               <p>
                Optional value can be tested against a string, a number (with a string, number or regexp). 
               </p>
               <p>
                See <a href='http://vsc-base.org/#tsMacthValue'>tsMacthValue</a>
               </p>
            </>
         }
         
         codeOneLineEx={`const objNode = vsc.tsMatchObjectProperty(node, options)`}
         codeEx={`
const objNode = vsc.tsMatchObjectProperty(node, \{ name: /^keyName\$/ })`}
         code={`/**
 * @vscType ts
 * @returns ts.PropertyAssignment | undefined
 */
export const tsMatchObjectProperty: (node: ts.Node | undefined, options?: \{
   name?: RegExp | string
   value?: (RegExp | string | number | boolean | null)
   variableName?: RegExp | string
   parentObjectPropertyName?: RegExp | string
   hasAncestor?: (parent: ts.Node, depth: number) => boolean
   hasAncestors?: ((parent: ts.Node, depth: number) => boolean)[]
   hasGrandChild?: (child: ts.Node, depth: number) => boolean
   hasGrandChildren?: ((child: ts.Node, depth: number) => boolean)[]
}) => ts.PropertyAssignment | undefined = (node, options) => \{
   if (!node || !ts.isPropertyAssignment(node)) \{ return }
   if (!options) \{
      return node
   }
   const \{
      variableName,
      parentObjectPropertyName,
   } = options
   if (!vsc.tsMatchNode(node, options)) \{
      return
   }
   if (variableName !== undefined) \{
      const variable = node.parent.parent;
      if (!vsc.tsMatchVariable(variable, \{ name: variableName })) \{
         return
      }
   }
   if (parentObjectPropertyName !== undefined) \{
      const parentObjectProperty = node.parent.parent;
      if (!vsc.tsMatchObjectProperty(parentObjectProperty, \{ name: variableName })) \{
         return
      }
   }
   return node
}
`}
      />
   )
}

export default TsMatchObjectPropertyAnnotatedCode

