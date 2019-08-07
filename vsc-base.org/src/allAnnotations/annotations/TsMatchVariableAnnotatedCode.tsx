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
               Optional test for tsHasAncestor and hasGrandChild 
               </p>
               <p>
               See also <a href='http://vsc-base.org/#tsMatchVariableDeclaration'>tsMatchVariableDeclaration</a> 
               </p>
               <p>
               See <a href='http://vsc-base.org/#tsIsNode'>tsIsNode</a> 
               </p>
               <p>
               Optional value can be tested against a string, a number (with a string, number or regexp). 
               </p>
               <p>
               See <a href='http://vsc-base.org/#tsIsValue'>tsIsValue</a>
               </p>
            </>
         }
         
         codeOneLineEx={`const varNode = vsc.tsMatchVariable(node, options)`}
         codeEx={`
const varNode = vsc.tsMatchVariable(
  node,
  \{
    name: /^myCaller\$/
  }
)`}
         code={`/**
 * @vscType ts
 * @returns ts.VariableDeclaration | undefined
 */
export const tsMatchVariable: (node: ts.Node | undefined, options?: \{
   name?: RegExp | string
   value?: (RegExp | string | number | boolean | null)
   isConst?: boolean
   isLet?: boolean
   isVar?: boolean,
   hasParent?: (parent: ts.Node) => boolean
   hasAncestor?: (parent: ts.Node, depth: number) => boolean
   hasGrandChild?: (child: ts.Node, depth: number) => boolean
   hasAncestors?: ((parent: ts.Node, depth: number) => boolean)[]
   hasGrandChildren?: ((child: ts.Node, depth: number) => boolean)[]
}) => ts.VariableDeclaration | undefined = (node, options) => \{
   if (!node || !ts.isVariableDeclaration(node)) \{ return }
   if (!options) \{
      return node
   }
   const \{
      isConst,
      isLet,
      isVar,
   } = options
   if (!vsc.tsIsNode(node, options)) \{
      return
   }
   if (isConst !== undefined && (!node.parent || isConst !== (node.parent.flags === 2))) \{ return }
   if (isLet !== undefined && (!node.parent || isLet !== (node.parent.flags === 1))) \{ return }
   if (isVar !== undefined && (!node.parent || isVar !== (node.parent.flags === 0))) \{ return }
   return node
}`}
      />
   )
}

export default TsMatchVariableAnnotatedCode

