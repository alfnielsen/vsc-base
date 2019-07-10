import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TsIsInterfaceAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'tsIsInterface'}
         title={'tsIsInterface'}
         open={open}
         annotation={
            <>
               <p>
                  
Test is a node is an interface (node: ts.InterfaceDeclaration) 
               </p>
               <p>
               Uses <a href='http://vsc-base.org/#tsMatchInterface'>tsMatchInterface</a>
               </p>
            </>
         }
         
         codeOneLineEx={`const isInterfaceNode = vsc.tsIsInterface(node, options)`}
         codeEx={`
const isInterfaceNode = vsc.tsIsInterface(node, \{ name: /^myCaller\$/ })`}
         code={`/**
 * @vscType ts
 * @returns boolean
 */
export const tsIsInterface: (node: ts.Node | undefined, options?: \{
   name?: RegExp | string
   hasParent?: (parent: ts.Node) => boolean
   hasAncestor?: (parent: ts.Node, depth: number) => boolean
   hasGrandChild?: (child: ts.Node, depth: number) => boolean
   hasAncestors?: ((parent: ts.Node, depth: number) => boolean)[]
   hasGrandChildren?: ((child: ts.Node, depth: number) => boolean)[]
}) => boolean = (node, options) => \{
   return !!vsc.tsMatchInterface(node, options)
}`}
      />
   )
}

export default TsIsInterfaceAnnotatedCode

