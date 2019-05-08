import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TsIsVariableAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'tsIsVariable'}
         title={'tsIsVariable'}
         open={open}
         annotation={
            <>
               <p>
                  
 Test is a node is a variable declaration (node: ts.VariableDeclaration) 
               </p>
               <p>
                Uses <a href='http://vsc-base.org/#tsMatchVariable'>tsMatchVariable</a>
               </p>
            </>
         }
         
         codeOneLineEx={`const isVariableNode = vsc.tsIsVariable(node, options)`}
         codeEx={`
const isVariableNode = vsc.tsIsVariable(node, \{ name: /^myCaller\$/ })`}
         code={`/**
 * @vscType ts
 * @returns boolean
 */
export const tsIsVariable: (node: ts.Node | undefined, options?: \{
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
   return !!vsc.tsMatchVariable(node, options)
}

`}
      />
   )
}

export default TsIsVariableAnnotatedCode

