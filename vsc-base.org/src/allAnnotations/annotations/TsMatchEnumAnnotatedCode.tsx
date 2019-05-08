import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TsMatchEnumAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'tsMatchEnum'}
         title={'tsMatchEnum'}
         open={open}
         annotation={
            <>
               <p>
                  
 Test is a node is an enum  declaration (node: ts.EnumDeclaration) 
               </p>
               <p>
                and optional test for its name with a string or regexp. 
               </p>
               <p>
                Optional test for hasAncestor and hasGrandhild. 
               </p>
               <p>
                See <a href='http://vsc-base.org/#tsMacthNode'>tsMacthNode</a> \
               </p>
            </>
         }
         
         codeOneLineEx={`const enumNode = vsc.tsMatchEnum(node, options)`}
         codeEx={`
const enumNode = vsc.tsMatchEnum(node, \{ name: /^myCaller\$/ })`}
         code={`/**
 * @vscType ts
 * @returns ts.EnumDeclaration | undefined
 */
export const tsMatchEnum: (node: ts.Node | undefined, options?: \{
   name?: RegExp | string
   hasAncestor?: (parent: ts.Node, depth: number) => boolean
   hasGrandChild?: (child: ts.Node, depth: number) => boolean
   hasAncestors?: ((parent: ts.Node, depth: number) => boolean)[]
   hasGrandChildren?: ((child: ts.Node, depth: number) => boolean)[]
}) => ts.EnumDeclaration | undefined = (node, options) => \{
   if (!node || !ts.isEnumDeclaration(node)) \{ return }
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

export default TsMatchEnumAnnotatedCode

