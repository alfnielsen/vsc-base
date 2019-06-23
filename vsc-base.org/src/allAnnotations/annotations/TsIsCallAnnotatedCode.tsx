import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TsIsCallAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'tsIsCall'}
         title={'tsIsCall'}
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
         
         codeOneLineEx={`const isCall = vsc.tsIsCall(node, options)`}
         codeEx={`
const isCall = vsc.tsMatchCall(node, \{ name: /^myCaller\$/ })`}
         code={`/**
 * @vscType ts
 * @returns boolean
 */
export const tsIsCall: (node: ts.Node | undefined, options?: \{
   name?: RegExp | string
   hasArgument?: (parent: ts.Node) => boolean
   hasArguments?: ((parent: ts.Node) => boolean)[]
   hasParent?: (parent: ts.Node) => boolean
   hasAncestor?: (parent: ts.Node, depth: number) => boolean
   hasAncestors?: ((parent: ts.Node, depth: number) => boolean)[]
   hasGrandChild?: (child: ts.Node, depth: number) => boolean
   hasGrandChildren?: ((child: ts.Node, depth: number) => boolean)[]
}) => boolean = (node, options) => \{
   return !!vsc.tsMatchCall(node, options)
}

`}
      />
   )
}

export default TsIsCallAnnotatedCode

