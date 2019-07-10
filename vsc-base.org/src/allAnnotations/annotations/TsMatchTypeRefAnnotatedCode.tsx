import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TsMatchTypeRefAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'tsMatchTypeRef'}
         title={'tsMatchTypeRef'}
         open={open}
         annotation={
            <>
               <p>
                  
Test is a node is an type reference (node: ts.TypeReferenceNode) 
               </p>
               <p>
               and optional test for its name with a string or regexp. 
               </p>
               <p>
               Optional test for hasAncestor and hasGrandchild. 
               </p>
               <p>
               See <a href='http://vsc-base.org/#tsIsNode'>tsIsNode</a> \
               </p>
            </>
         }
         
         codeOneLineEx={`const typeRefNode = vsc.tsMatchTypeRef(node, options)`}
         codeEx={`
const typeRefNode = vsc.tsMatchTypeRef(node, \{ name: /^myCaller\$/ })`}
         code={`/**
 * @vscType ts
 * @returns ts.TypeReferenceNode | undefined
 */
export const tsMatchTypeRef: (node: ts.Node | undefined, options?: \{
   name?: RegExp | string
   hasParent?: (parent: ts.Node) => boolean
   hasAncestor?: (parent: ts.Node, depth: number) => boolean
   hasGrandChild?: (child: ts.Node, depth: number) => boolean
   hasAncestors?: ((parent: ts.Node, depth: number) => boolean)[]
   hasGrandChildren?: ((child: ts.Node, depth: number) => boolean)[]
}) => ts.TypeReferenceNode | undefined = (node, options) => \{
   if (!node || !ts.isTypeReferenceNode(node)) \{ return }
   if (!options) \{
      return node
   }
   const \{ name } = options
   if (name instanceof RegExp && !name.test(node.typeName.getText())) \{ return }
   if (typeof name === 'string' && name !== node.typeName.getText()) \{ return }
   delete options.name //leave name
   if (!vsc.tsIsNode(node, options)) \{
      return
   }
   return node
}`}
      />
   )
}

export default TsMatchTypeRefAnnotatedCode

