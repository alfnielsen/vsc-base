import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TsMatchNodeAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'tsMatchNode'}
         title={'tsMatchNode'}
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
               (return false for node that don't have name property)
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
               (return false for node that don't have initializer)
               </p>
               <p>
               See <a href='http://vsc-base.org/#tsIsValue'>tsIsValue</a> \
               </p>
            </>
         }
         
         codeOneLineEx={`const foundNode = vsc.tsMatchNode(node, options)`}
         codeEx={`
const foundNode = vsc.tsMatchNode(node, \{ name: /^keyName\$/ })`}
         code={`/**
 * @vscType ts
 * @returns s.Node | undefined
 */
export const tsMatchNode: (node: ts.Node | undefined, options?: \{
   name?: RegExp | string
   value?: (RegExp | string | number | boolean | null)
   hasParent?: (parent: ts.Node) => boolean
   hasAncestor?: (parent: ts.Node, depth: number) => boolean
   hasAncestors?: ((parent: ts.Node, depth: number) => boolean)[]
   hasGrandChild?: (child: ts.Node, depth: number) => boolean
   hasGrandChildren?: ((child: ts.Node, depth: number) => boolean)[]
}) => ts.Node | undefined = (node, options) => \{
   if (vsc.tsIsNode(node, options)) \{
      return node
   }
   return undefined
}`}
      />
   )
}

export default TsMatchNodeAnnotatedCode

