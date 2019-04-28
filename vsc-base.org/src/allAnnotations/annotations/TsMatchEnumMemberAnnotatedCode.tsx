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
                See <a href='http://vsc-base.org/#tsHasAncestor'>tsHasAncestor</a>, <a href='http://vsc-base.org/#tsHasAncestors'>tsHasAncestors</a>, <a href='http://vsc-base.org/#hasGrandChild'>hasGrandChild</a> and <a href='http://vsc-base.org/#hasGrandChildren'>hasGrandChildren</a> 
               </p>
               <p>
                Value can be tested against a string, a number (with a string, number or regexp). 
               </p>
               <p>
                See <a href='http://vsc-base.org/#tsMacthValue'>tsMacthValue</a>
               </p>
            </>
         }
         
         codeOneLineEx={`const found = vsc.tsMatchEnumMember(node, options)`}
         codeEx={`
const found = vsc.tsMatchFunction(node, \{ matchName: /^myCaller\$/ })`}
         code={`/**
 * @vscType ts
 * @returns boolean
 */
export const tsMatchEnumMember: (node: ts.Node | undefined, options?: \{
   name?: RegExp | string
   value?: (RegExp | string | number | boolean | null)
   enumName?: RegExp | string,
   hasAncestor?: (parent: ts.Node, depth: number) => boolean
   hasAncestors?: [(parent: ts.Node, depth: number) => boolean]
   hasGrandChild?: (child: ts.Node, depth: number) => boolean
   hasGrandChildren?: [(child: ts.Node, depth: number) => boolean]
}) => boolean = (node, options) => \{
   if (!node || !ts.isEnumMember(node)) \{
      return false
   }
   if (!options) \{
      return true
   }
   const \{
      name,
      value,
      enumName,
      hasAncestor,
      hasGrandChild,
      hasAncestors,
      hasGrandChildren: hasGrandChildren,
   } = options
   if (name) \{
      if (name instanceof RegExp && !name.test(node.name.getText())) \{ return false }
      if (typeof name === 'string' && name !== node.name.getText()) \{ return false }
   }
   if (value !== undefined && !vsc.tsMatchValue(node.initializer, value)) \{
      return false
   }
   if (enumName) \{
      const parentEnumName = node.parent.name
      if (enumName instanceof RegExp && !enumName.test(parentEnumName.getText())) \{ return false }
      if (typeof enumName === 'string' && enumName !== parentEnumName.getText()) \{ return false }
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

export default TsMatchEnumMemberAnnotatedCode

