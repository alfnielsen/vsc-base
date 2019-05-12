import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TsIsEnumMemberAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'tsIsEnumMember'}
         title={'tsIsEnumMember'}
         open={open}
         annotation={
            <>
               <p>
                  
 Test is a node is a enum member (node: ts.EnumMember) 
               </p>
               <p>
                Uses <a href='http://vsc-base.org/#tsMatchEnumMember'>tsMatchEnumMember</a>
               </p>
            </>
         }
         
         codeOneLineEx={`const isEnumMember = vsc.tsIsEnumMember(node, options)`}
         codeEx={`
const isEnumMember = vsc.tsIsEnumMember(node, \{ name: /^myCaller\$/ })`}
         code={`/**
 * @vscType ts
 * @returns boolean
 */
export const tsIsEnumMember: (node: ts.Node | undefined, options?: \{
   name?: RegExp | string
   value?: (RegExp | string | number | boolean | null)
   enumName?: RegExp | string,
   hasParent?: (parent: ts.Node) => boolean
   hasAncestor?: (parent: ts.Node, depth: number) => boolean
   hasAncestors?: ((parent: ts.Node, depth: number) => boolean)[]
   hasGrandChild?: (child: ts.Node, depth: number) => boolean
   hasGrandChildren?: ((child: ts.Node, depth: number) => boolean)[]
}) => boolean = (node, options) => \{
   return !!vsc.tsMatchEnumMember(node, options)
}
`}
      />
   )
}

export default TsIsEnumMemberAnnotatedCode

