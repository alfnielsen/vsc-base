import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TsIsVariableListAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'tsIsVariableList'}
         title={'tsIsVariableList'}
         open={open}
         annotation={
            <>
               <p>
                  
Test is a node is a variable declaration (node: ts.VariableDeclarationList) 
               </p>
               <p>
               Uses <a href='http://vsc-base.org/#tsMatchVariableList'>tsMatchVariableList</a>
               </p>
            </>
         }
         
         codeOneLineEx={`const isVariableNode = vsc.tsIsVariableList(node, options)`}
         codeEx={`
const isVariableNode = vsc.tsIsVariableList(
  node, \{
    hasVariable: variable => 
      variable.name.getText() === variableName
      && ts.isObjectLiteralExpression(variable.initializer)
  }
)`}
         code={`/**
 * @vscType ts
 * @returns boolean
 */
export const tsIsVariableList: (node: ts.Node | undefined, options?: \{
   isConst?: boolean
   isLet?: boolean
   isVar?: boolean,
   hasVariable?: (parent: ts.VariableDeclaration) => boolean
   hasVariables?: ((parent: ts.VariableDeclaration) => boolean)[]
   hasParent?: (parent: ts.Node) => boolean
   hasAncestor?: (parent: ts.Node, depth: number) => boolean
   hasGrandChild?: (child: ts.Node, depth: number) => boolean
   hasAncestors?: ((parent: ts.Node, depth: number) => boolean)[]
   hasGrandChildren?: ((child: ts.Node, depth: number) => boolean)[]
}) => boolean = (node, options) => \{
   return !!vsc.tsMatchVariableList(node, options)
}`}
      />
   )
}

export default TsIsVariableListAnnotatedCode

