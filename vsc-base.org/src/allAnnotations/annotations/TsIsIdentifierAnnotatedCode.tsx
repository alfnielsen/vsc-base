import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TsIsIdentifierAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'tsIsIdentifier'}
         title={'tsIsIdentifier'}
         open={open}
         annotation={
            <>
               <p>
                  
 Test is a node is a variable declaration (node: ts.VariableDeclaration) 
               </p>
               <p>
                Uses <a href='http://vsc-base.org/#tsMatchIdentifier'>tsMatchIdentifier</a>
               </p>
            </>
         }
         
         codeOneLineEx={`const isIdentifierNode = vsc.tsIsIdentifier(node, options)`}
         codeEx={`
const isIdentifierNode = vsc.tsIsIdentifier(node, \{ name: /^myCaller\$/ })`}
         code={`/**
 * @vscType ts
 * @returns boolean
 */
export const tsIsIdentifier: (node: ts.Node | undefined, options?: \{
   name?: RegExp | string
   hasParent?: (parent: ts.Node) => boolean
   hasAncestor?: (parent: ts.Node, depth: number) => boolean
   hasAncestors?: ((parent: ts.Node, depth: number) => boolean)[]
}) => boolean = (node, options) => \{
   return !!vsc.tsMatchIdentifier(node, options)
}
`}
      />
   )
}

export default TsIsIdentifierAnnotatedCode

