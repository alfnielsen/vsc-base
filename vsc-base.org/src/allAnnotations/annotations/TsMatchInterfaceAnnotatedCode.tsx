import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TsMatchInterfaceAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'tsMatchInterface'}
         title={'tsMatchInterface'}
         open={open}
         annotation={
            <>
               <p>
                  
 Test is a node is an interface (node: ts.InterfaceDeclaration) 
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
         
         codeOneLineEx={`const interfaceNode = vsc.tsMatchInterface(node, options)`}
         codeEx={`
const interfaceNode = vsc.tsMatchInterface(node, \{ name: /^myCaller\$/ })`}
         code={`/**
 * @vscType ts
 * @returns ts.EnumDeclaration | undefined
 */
export const tsMatchInterface: (node: ts.Node | undefined, options?: \{
   name?: RegExp | string
   hasAncestor?: (parent: ts.Node, depth: number) => boolean
   hasGrandChild?: (child: ts.Node, depth: number) => boolean
   hasAncestors?: ((parent: ts.Node, depth: number) => boolean)[]
   hasGrandChildren?: ((child: ts.Node, depth: number) => boolean)[]
}) => ts.InterfaceDeclaration | undefined = (node, options) => \{
   if (!node || !ts.isInterfaceDeclaration(node)) \{ return }
   if (!options) \{
      return node
   }
   if (!vsc.tsIsNode(node, options)) \{
      return
   }
   return node
}
`}
      />
   )
}

export default TsMatchInterfaceAnnotatedCode

