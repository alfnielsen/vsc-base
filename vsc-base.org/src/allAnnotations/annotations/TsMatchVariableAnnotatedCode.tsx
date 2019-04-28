import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TsMatchVariableAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'tsMatchVariable'}
         title={'tsMatchVariable'}
         open={open}
         annotation={
            <>
               <p>
                  
 Test is a node is a variable declaration (node: ts.VariableDeclaration) 
               </p>
               <p>
                Optional test for its name with a string or regexp, 
               </p>
               <p>
                Optional test if its a const, let or var. 
               </p>
               <p>
                Optional test for tsHasAncestor ans hasGrandChild 
               </p>
               <p>
                See <a href='http://vsc-base.org/#tsHasAncestor'>tsHasAncestor</a>, <a href='http://vsc-base.org/#tsHasAncestors'>tsHasAncestors</a>, <a href='http://vsc-base.org/#hasGrandChild'>hasGrandChild</a> and <a href='http://vsc-base.org/#hasGrandChildren'>hasGrandChildren</a> 
               </p>
               <p>
                Optional value can be tested against a string, a number (with a string, number or regexp). 
               </p>
               <p>
                See <a href='http://vsc-base.org/#tsMacthValue'>tsMacthValue</a>
               </p>
            </>
         }
         
         codeOneLineEx={`const found = vsc.tsMatchVariable(node, options)`}
         codeEx={`
const found = vsc.tsMatchVariable(node, \{ matchName: /^myCaller\$/ })`}
         code={`/**
 * @vscType ts
 * @returns boolean
 */
export const tsMatchVariable: (node: ts.Node | undefined, options?: \{
   name?: RegExp | string
   value?: (RegExp | string | number | boolean | null)
   isConst?: boolean
   isLet?: boolean
   isVar?: boolean,
   hasAncestor?: (parent: ts.Node, depth: number) => boolean
   hasGrandChild?: (child: ts.Node, depth: number) => boolean
   hasAncestors?: ((parent: ts.Node, depth: number) => boolean)[]
   hasGrandChildren?: ((child: ts.Node, depth: number) => boolean)[]
}) => boolean = (node, options) => \{
   if (!node || !ts.isVariableDeclaration(node)) \{ return false }
   if (!options) \{
      return true
   }
   const \{
      name,
      value,
      isConst,
      isLet,
      isVar,
      hasAncestor,
      hasGrandChild,
      hasAncestors,
      hasGrandChildren
   } = options
   if (name !== undefined) \{
      if (name instanceof RegExp && !name.test(node.name.getText())) \{ return false }
      if (typeof name === 'string' && name !== node.name.getText()) \{ return false }
   }
   if (value !== undefined && !vsc.tsMatchValue(node.initializer, value)) \{
      return false
   }
   if (isConst !== undefined && (!node.parent || isConst !== (node.parent.flags === 2))) \{ return false }
   if (isLet !== undefined && (!node.parent || isLet !== (node.parent.flags === 1))) \{ return false }
   if (isVar !== undefined && (!node.parent || isVar !== (node.parent.flags === 0))) \{ return false }
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

export default TsMatchVariableAnnotatedCode

