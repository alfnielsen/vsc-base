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
                  
Test if a node is a function 
               </p>
               <p>
               (node: ts.isArrowFunction, ts.isFunctionExpression or ts.isFunctionDeclaration) 
               </p>
               <p>
               Optional test for its name with a string or regexp. 
               </p>
               <p>
               (For ArrowFunction&#039;s and FunctionExpression&#039;s it will test for a variable declaration that points to the function) 
               </p>
               <p>
               Optional test for tsHasAncestor and hasGrandChild 
               </p>
               <p>
               See <a href='http://vsc-base.org/#tsIsNode'>tsIsNode</a> \
               </p>
            </>
         }
         
         codeOneLineEx={`const funcNone = vsc.tsMatchFunction(node, options)`}
         codeEx={`
const funcNone = vsc.tsMatchFunction(
  node,
  \{
    name: /^myCaller\$/
  }
)`}
         code={`/**
 * @vscType ts
 * @returns ts.ArrowFunction | ts.FunctionExpression | ts.FunctionDeclaration | undefined
 */
export const tsMatchFunction: (node: ts.Node | undefined, options?: \{
   name?: RegExp | string,
   hasParent?: (parent: ts.Node) => boolean
   hasAncestor?: (parent: ts.Node, depth: number) => boolean
   hasAncestors?: ((parent: ts.Node, depth: number) => boolean)[]
   hasGrandChild?: (child: ts.Node, depth: number) => boolean
   hasGrandChildren?: ((child: ts.Node, depth: number) => boolean)[]
}) => ts.ArrowFunction | ts.FunctionExpression | ts.FunctionDeclaration | undefined = (node, options) => \{
   if (!node || !(ts.isArrowFunction(node) || ts.isFunctionExpression(node) || ts.isFunctionDeclaration(node))) \{
      return
   }
   if (!options) \{
      return node
   }
   const \{ name } = options
   delete options.name //leave name
   if (!vsc.tsIsNode(node, options)) \{
      return
   }
   if (name !== undefined) \{
      let funcName: string | undefined
      if ((ts.isArrowFunction(node) || ts.isFunctionExpression(node)) && ts.isVariableDeclaration(node.parent)) \{
         funcName = node.parent.name.getText()
      }
      if (ts.isFunctionDeclaration(node) && node.name) \{
         funcName = node.name.getText()
      }
      if (!funcName) \{
         return
      }
      if (name instanceof RegExp && !name.test(funcName)) \{ return }
      if (typeof name === 'string' && name !== funcName) \{ return }
   }

   return node
}`}
      />
   )
}

export default TsMatchFunctionAnnotatedCode

