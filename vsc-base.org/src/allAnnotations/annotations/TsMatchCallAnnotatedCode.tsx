import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TsMatchCallAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'tsMatchCall'}
         title={'tsMatchCall'}
         open={open}
         annotation={
            <>
               <p>
                  
Test is a node is a call expression (node: ts.CallExpression) 
               </p>
               <p>
               and optional test for its name, and arguments.
               </p>
               <p>
               it's value, hasAncestor and hasGrandchild 
               </p>
               <p>
               See <a href='http://vsc-base.org/#tsIsNode'>tsIsNode</a> \
               </p>
            </>
         }
         
         codeOneLineEx={`const callNode = vsc.tsMatchCall(node, options)`}
         codeEx={`
const callNode = vsc.tsMatchCall(node, \{ name: /^myCaller\$/ })`}
         code={`/**
 * @vscType ts
 * @returns ts.CallExpression | undefined
 */
export const tsMatchCall: (node: ts.Node | undefined, options?: \{
   name?: RegExp | string
   hasArgument?: (parent: ts.Node) => boolean
   hasArguments?: ((parent: ts.Node) => boolean)[]
   hasParent?: (parent: ts.Node) => boolean
   hasAncestor?: (parent: ts.Node, depth: number) => boolean
   hasAncestors?: ((parent: ts.Node, depth: number) => boolean)[]
   hasGrandChild?: (child: ts.Node, depth: number) => boolean
   hasGrandChildren?: ((child: ts.Node, depth: number) => boolean)[]
}) => ts.CallExpression | undefined = (node, options) => \{
   if (!node || !ts.isCallExpression(node)) \{
      return
   }
   if (!options) \{
      return node
   }
   const \{ name, hasArgument, hasArguments } = options
   delete options.name //leave name
   if (!vsc.tsIsNode(node, options)) \{
      return
   }
   if (name) \{
      const callName = node.expression.getText()
      if (name instanceof RegExp && !name.test(callName)) \{ return }
      if (typeof name === 'string' && name !== callName) \{ return }
   }
   if (hasArgument && !node.arguments.some(arg => hasArgument(arg))) \{
      return
   }
   if (hasArguments && !hasArguments.every(_hasArgument => \{
      return node.arguments.some(arg => _hasArgument(arg));
   })) \{
      return
   }
   return node
}`}
      />
   )
}

export default TsMatchCallAnnotatedCode

