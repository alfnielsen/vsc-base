import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TsMatchIdentifierAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'tsMatchIdentifier'}
         title={'tsMatchIdentifier'}
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
                See <a href='http://vsc-base.org/#tsMacthNode'>tsMacthNode</a> 
               </p>
               <p>
                Optional value can be tested against a string, a number (with a string, number or regexp). \
               </p>
            </>
         }
         
         codeOneLineEx={`const identifierNode = vsc.tsMatchIdentifier(node, options)`}
         codeEx={`
const identifierNode = vsc.tsMatchIdentifier(node, \{ name: /^myCaller\$/ })`}
         code={`/**
 * @vscType ts
 * @returns ts.Identifier | undefined
 */
export const tsMatchIdentifier: (node: ts.Node | undefined, options?: \{
   name?: RegExp | string
   hasAncestor?: (parent: ts.Node, depth: number) => boolean
   hasAncestors?: ((parent: ts.Node, depth: number) => boolean)[]
}) => ts.Identifier | undefined = (node, options) => \{
   if (!node || !ts.isIdentifier(node)) \{ return }
   if (!options) \{
      return node
   }
   const \{ name } = options
   if (name) \{
      if (name instanceof RegExp && !name.test(node.getText())) \{ return }
      if (typeof name === 'string' && name !== node.getText()) \{ return }

   }
   delete options.name // leave name
   if (!vsc.tsMatchNode(node, options)) \{
      return
   }
   return node
}
`}
      />
   )
}

export default TsMatchIdentifierAnnotatedCode

