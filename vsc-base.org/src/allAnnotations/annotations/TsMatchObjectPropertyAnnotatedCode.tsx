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
                Optional test for tsHasAncestor ans hasGrandChild 
               </p>
               <p>
                See <a href='http://vsc-base.org/#tsHasAncestor'>tsHasAncestor</a>, <a href='http://vsc-base.org/#tsHasAncestors'>tsHasAncestors</a>, <a href='http://vsc-base.org/#hasGrandChild'>hasGrandChild</a> and <a href='http://vsc-base.org/#hasGrandChildren'>hasGrandChildren</a> 
               </p>
               <p>
                Optional value can be tested against a string, a number (with a string, number or regexp). 
               </p>
               <p>
                See <a href='http://vsc-base.org/#tsMacthValue'>tsMacthValue</a>
               </p>
            </>
         }
         
         codeOneLineEx={`const found = vsc.tsMatchObjectProperty(node, options)`}
         codeEx={`
const found = vsc.tsMatchObjectProperty(node, \{ matchName: /^keyName\$/ })`}
         code={`/**
 * @vscType ts
 * @returns boolean
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
}) => boolean = (node, options) => \{
   if (!node || !ts.isPropertyAssignment(node)) \{ return false }
   if (!options) \{
      return true
   }
   const \{
      name,
      value,
      variableName,
      parentObjectPropertyName,
      hasAncestor,
      hasGrandChild,
      hasAncestors,
      hasGrandChildren
   } = options
   if (name !== undefined) \{
      if (name instanceof RegExp && !name.test(node.name.getText())) \{ return false }
      if (typeof name === 'string' && name !== node.name.getText()) \{ return false }
   }
   if (variableName !== undefined) \{
      const variable = node.parent.parent;
      if (!vsc.tsMatchVariable(variable, \{ name: variableName })) \{
         return false
      }
   }
   if (parentObjectPropertyName !== undefined) \{
      const parentObjectProperty = node.parent.parent;
      if (!vsc.tsMatchObjectProperty(parentObjectProperty, \{ name: variableName })) \{
         return false
      }
   }

   if (value !== undefined && !vsc.tsMatchValue(node.initializer, value)) \{
      return false
   }
   if (hasAncestor && !vsc.tsHasAncestor(node, hasAncestor)) \{
      return false
   }
   if (hasAncestors && !vsc.tsHasAncestors(node, hasAncestors)) \{
      return false
   }
   if (hasGrandChild && !vsc.tsHasGrandChild(node, hasGrandChild)) \{
      return false
   }
   if (hasGrandChildren && !vsc.tsHasGrandChildren(node, hasGrandChildren)) \{
      return false
   }
   return true
}
`}
      />
   )
}

export default TsMatchObjectPropertyAnnotatedCode

