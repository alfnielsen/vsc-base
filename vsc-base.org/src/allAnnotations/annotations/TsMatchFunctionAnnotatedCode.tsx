import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TsMatchFunctionAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'tsMatchFunction'}
         title={'tsMatchFunction'}
         open={open}
         annotation={
            <>
               <p>
                  
 Test is a node is a function 
               </p>
               <p>
                (node: ts.SignatureDeclaration, Like FunctionDeclaration, FunctionExpression and ArrowFunction ect.. ) 
               </p>
               <p>
                Optional test for its name with a string or regxep. 
               </p>
               <p>
                (For ArrowFunction's and FunctionExpression's it will test for a variable declaration that points to the function) 
               </p>
               <p>
                Optional test for tsHasAncestor ans hasGrandChild 
               </p>
               <p>
                See <a href='http://vsc-base.org/#tsHasAncestor'>tsHasAncestor</a>, <a href='http://vsc-base.org/#tsHasAncestors'>tsHasAncestors</a>, <a href='http://vsc-base.org/#hasGrandChild'>hasGrandChild</a> and <a href='http://vsc-base.org/#hasGrandChildren'>hasGrandChildren</a> \
               </p>
            </>
         }
         
         codeOneLineEx={`const found = vsc.tsMatchFunction(node, options)`}
         codeEx={`
const found = vsc.tsMatchFunction(node, \{ matchName: /^myCaller\$/ })`}
         code={`/**
 * @vscType ts
 * @returns boolean
 */
export const tsMatchFunction: (node: ts.Node | undefined, options?: \{
   name?: RegExp | string,
   hasAncestor?: (parent: ts.Node, depth: number) => boolean
   hasAncestors?: ((parent: ts.Node, depth: number) => boolean)[]
   hasGrandChild?: (child: ts.Node, depth: number) => boolean
   hasGrandChildren?: ((child: ts.Node, depth: number) => boolean)[]
}) => boolean = (node, options) => \{
   if (!node || !ts.isFunctionLike(node)) \{ return false }
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
      let funcName: string | undefined
      if ((ts.isArrowFunction(node) || ts.isFunctionExpression(node)) && ts.isVariableDeclaration(node.parent)) \{
         funcName = node.parent.name.getText()
      }
      if (ts.isFunctionDeclaration(node) && node.name) \{
         funcName = node.name.getText()
      }
      if (!funcName) \{
         return false
      }
      if (name instanceof RegExp && !name.test(funcName)) \{ return false }
      if (typeof name === 'string' && name !== funcName) \{ return false }
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

export default TsMatchFunctionAnnotatedCode

