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
                See <a href='http://vsc-base.org/#tsHasAncestor'>tsHasAncestor</a>, <a href='http://vsc-base.org/#tsHasAncestors'>tsHasAncestors</a>, <a href='http://vsc-base.org/#hasGrandChild'>hasGrandChild</a> and <a href='http://vsc-base.org/#hasGrandChildren'>hasGrandChildren</a> \
               </p>
            </>
         }
         
         codeOneLineEx={`const found = vsc.tsMatchEnum(node, options)`}
         codeEx={`
const found = vsc.tsMatchEnum(node, \{ matchName: /^myCaller\$/ })`}
         code={`/**
 * @vscType ts
 * @returns boolean
 */
export const tsMatchEnum: (node: ts.Node | undefined, options?: \{
   name?: RegExp | string
   hasAncestor?: (parent: ts.Node, depth: number) => boolean
   hasGrandChild?: (child: ts.Node, depth: number) => boolean
   hasAncestors?: [(parent: ts.Node, depth: number) => boolean]
   hasGrandChildren?: [(child: ts.Node, depth: number) => boolean]
}) => boolean = (node, options) => \{
   if (!node || !ts.isEnumDeclaration(node)) \{ return false }
   if (!options) \{
      return true
   }
   const \{
      name,
      hasAncestor,
      hasGrandChild,
      hasAncestors,
      hasGrandChildren,
   } = options
   if (name !== undefined) \{
      if (name instanceof RegExp && !name.test(node.name.getText())) \{ return false }
      if (typeof name === 'string' && name !== node.name.getText()) \{ return false }
   }
   if (hasAncestor && !vsc.tsHasAncestor(node, hasAncestor)) \{
      return false
   }
   if (hasGrandChild && !vsc.tsHasGrandChild(node, hasGrandChild)) \{
      return false
   }
   if (hasAncestors && !vsc.tsHasAncestors(node, hasAncestors)) \{
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

export default TsMatchEnumAnnotatedCode

