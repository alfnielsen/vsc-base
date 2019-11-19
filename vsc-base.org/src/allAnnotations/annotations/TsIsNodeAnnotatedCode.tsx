import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TsIsNodeAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'tsIsNode'}
         title={'tsIsNode'}
         open={open}
         annotation={
            <>
               <p>
                  
Base test for node properties. 
               </p>
               <p>
               Optional test for its name with a string or regexp. 
               </p>
               <p>
               (return false for node that don&#039;t have name property)
               </p>
               <p>
               Optional test for tsHasAncestor and hasGrandChild 
               </p>
               <p>
               See <a href='http://vsc-base.org/#tsHasAncestor'>tsHasAncestor</a>, <a href='http://vsc-base.org/#tsHasAncestors'>tsHasAncestors</a>, <a href='http://vsc-base.org/#hasGrandChild'>hasGrandChild</a> and <a href='http://vsc-base.org/#hasGrandChildren'>hasGrandChildren</a> 
               </p>
               <p>
               Optional value can be tested against a string, a number (with a string, number or regexp). 
               </p>
               <p>
               (return false for node that don&#039;t have initializer)
               </p>
               <p>
               See <a href='http://vsc-base.org/#tsIsValue'>tsIsValue</a> \
               </p>
            </>
         }
         
         codeOneLineEx={`const found = vsc.tsIsNode(node, options)`}
         codeEx={`
const found = vsc.tsIsNode(
  node,
  \{
    name: /^keyName\$/
  }
)`}
         code={`/**
 * @vscType ts
 * @returns boolean
 */
export const tsIsNode: (node: ts.Node | undefined, options?: \{
   name?: RegExp | string
   value?: (RegExp | string | number | boolean | null)
   hasParent?: (parent: ts.Node) => boolean
   hasAncestor?: (parent: ts.Node, depth: number) => boolean
   hasAncestors?: ((parent: ts.Node, depth: number) => boolean)[]
   hasGrandChild?: (child: ts.Node, depth: number) => boolean
   hasGrandChildren?: ((child: ts.Node, depth: number) => boolean)[]
}) => boolean = (node, options) => \{
   if (!node) \{ return false }
   if (!options) \{
      return true
   }
   const \{
      name,
      value,
      hasParent,
      hasAncestor,
      hasGrandChild,
      hasAncestors,
      hasGrandChildren
   } = options
   const nameNode = (node as any).name as ts.Node
   if (name !== undefined) \{
      if (!nameNode) \{
         return false
      }
      if (name instanceof RegExp && !name.test(nameNode.getText())) \{ return false }
      if (typeof name === 'string' && name !== nameNode.getText()) \{ return false }
   }
   const initializerNode = (node as any).initializer as ts.Node
   if (value !== undefined && (!initializerNode || !vsc.tsIsValue(initializerNode, value))) \{
      return false
   }
   if (hasParent && !hasParent(node.parent)) \{
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
}`}
      />
   )
}

export default TsIsNodeAnnotatedCode

