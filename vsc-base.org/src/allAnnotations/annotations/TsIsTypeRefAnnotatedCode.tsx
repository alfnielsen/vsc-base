import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TsIsTypeRefAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'tsIsTypeRef'}
         title={'tsIsTypeRef'}
         open={open}
         annotation={
            <>
               <p>
                  
 Test is a node is an type reference (node: ts.TypeReferenceNode) 
               </p>
               <p>
                Uses <a href='http://vsc-base.org/#tsMatchTypeRef'>tsMatchTypeRef</a>
               </p>
            </>
         }
         
         codeOneLineEx={`const isTypeRefNode = vsc.tsIsTypeRef(node, options)`}
         codeEx={`
const isTypeRefNode = vsc.tsIsTypeRef(node, \{ name: /^myCaller\$/ })`}
         code={`/**
 * @vscType ts
 * @returns boolean
 */
export const tsIsTypeRef: (node: ts.Node | undefined, options?: \{
   name?: RegExp | string
   hasAncestor?: (parent: ts.Node, depth: number) => boolean
   hasGrandChild?: (child: ts.Node, depth: number) => boolean
   hasAncestors?: ((parent: ts.Node, depth: number) => boolean)[]
   hasGrandChildren?: ((child: ts.Node, depth: number) => boolean)[]
}) => boolean = (node, options) => \{
   return !!vsc.tsMatchTypeRef(node, options)
}
`}
      />
   )
}

export default TsIsTypeRefAnnotatedCode

