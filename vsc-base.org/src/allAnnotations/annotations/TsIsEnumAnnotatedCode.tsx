import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TsIsEnumAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'tsIsEnum'}
         title={'tsIsEnum'}
         open={open}
         annotation={
            <>
               <p>
                  
Test is a node is an enum  declaration (node: ts.EnumDeclaration) 
               </p>
               <p>
               Uses <a href='http://vsc-base.org/#tsMatchEnum'>tsMatchEnum</a>
               </p>
            </>
         }
         
         codeOneLineEx={`const isEnumNode = vsc.tsIsEnum(node, options)`}
         codeEx={`
const isEnumNode = vsc.tsIsEnum(node, \{ name: /^myCaller\$/ })`}
         code={`/**
 * @vscType ts
 * @returns boolean
 */
export const tsIsEnum: (node: ts.Node | undefined, options?: \{
   name?: RegExp | string
   hasParent?: (parent: ts.Node) => boolean
   hasAncestor?: (parent: ts.Node, depth: number) => boolean
   hasGrandChild?: (child: ts.Node, depth: number) => boolean
   hasAncestors?: ((parent: ts.Node, depth: number) => boolean)[]
   hasGrandChildren?: ((child: ts.Node, depth: number) => boolean)[]
}) => boolean = (node, options) => \{
   return !!vsc.tsMatchEnum(node, options)
}`}
      />
   )
}

export default TsIsEnumAnnotatedCode

