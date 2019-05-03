import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TsMatchEnumMemberAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'tsMatchEnumMember'}
         title={'tsMatchEnumMember'}
         open={open}
         annotation={
            <>
               <p>
                  
 Test is a node is a enum member (node: ts.EnumMember) 
               </p>
               <p>
                and optional test for its name, the enum's name (it parant) 
               </p>
               <p>
                it value, hasAncestor and hasGrandchild 
               </p>
               <p>
                See <a href='http://vsc-base.org/#tsMacthNode'>tsMacthNode</a> 
               </p>
               <p>
                Value can be tested against a string, a number (with a string, number or regexp). 
               </p>
               <p>
                See <a href='http://vsc-base.org/#tsMacthValue'>tsMacthValue</a>
               </p>
            </>
         }
         
         codeOneLineEx={`const enumMemberNode = vsc.tsMatchEnumMember(node, options)`}
         codeEx={`
const enumMemberNode = vsc.tsMatchEnumMember(node, \{ name: /^myCaller\$/ })`}
         code={`/**
 * @vscType ts
 * @returns ts.EnumMember | undefined
 */
export const tsMatchEnumMember: (node: ts.Node | undefined, options?: \{
   name?: RegExp | string
   value?: (RegExp | string | number | boolean | null)
   enumName?: RegExp | string,
   hasAncestor?: (parent: ts.Node, depth: number) => boolean
   hasAncestors?: ((parent: ts.Node, depth: number) => boolean)[]
   hasGrandChild?: (child: ts.Node, depth: number) => boolean
   hasGrandChildren?: ((child: ts.Node, depth: number) => boolean)[]
}) => ts.EnumMember | undefined = (node, options) => \{
   if (!node || !ts.isEnumMember(node)) \{
      return
   }
   if (!options) \{
      return node
   }
   const \{ enumName } = options
   if (!vsc.tsMatchNode(node, options)) \{
      return
   }
   if (enumName) \{
      const parentEnumName = node.parent.name
      if (enumName instanceof RegExp && !enumName.test(parentEnumName.getText())) \{ return }
      if (typeof enumName === 'string' && enumName !== parentEnumName.getText()) \{ return }
   }
   return node
}





`}
      />
   )
}

export default TsMatchEnumMemberAnnotatedCode

