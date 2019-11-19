import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TsMatchVariableListAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'tsMatchVariableList'}
         title={'tsMatchVariableList'}
         open={open}
         annotation={
            <>
               <p>
                  
Test is a node is a variable declaration (node: ts.VariableDeclarationList) 
               </p>
               <p>
               This one includes the &#039;const&#039;,&#039;let&#039;,&#039;var&#039; and a list of variables.
See also <a href='http://vsc-base.org/#tsMatchVariable'>tsMatchVariable</a> 
               </p>
               <p>
               Optional test if its a const, let or var. 
               </p>
               <p>
               Optional test for tsHasAncestor and hasGrandChild 
               </p>
               <p>
               See <a href='http://vsc-base.org/#tsIsNode'>tsIsNode</a> \
               </p>
            </>
         }
         
         codeOneLineEx={`const varNode = vsc.tsMatchVariableList(node, options)`}
         codeEx={`
// Find variable list with a variable declaration of an object
const [variableList, variableListPos] = vsc.tsFindNodePositionFromContent(
  source, 
  node =>
    vsc.tsMatchVariableList(
      node, \{
      hasVariable: variable => 
        variable.name.getText() === variableName
        && ts.isObjectLiteralExpression(variable.initializer)
    })
)`}
         code={`/**
 * @vscType ts
 * @returns ts.VariableDeclarationList | undefined
 */
export const tsMatchVariableList: (node: ts.Node | undefined, options?: \{
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
}) => ts.VariableDeclarationList | undefined = (node, options) => \{
   if (!node || !ts.isVariableDeclarationList(node)) \{ return }
   if (!options) \{
      return node
   }
   const \{
      isConst,
      isLet,
      isVar,
      hasVariable,
      hasVariables,
   } = options
   if (!vsc.tsIsNode(node, options)) \{
      return
   }
   if (isConst !== undefined && (isConst !== (node.flags === 2))) \{ return }
   if (isLet !== undefined && (isLet !== (node.flags === 1))) \{ return }
   if (isVar !== undefined && (isVar !== (node.flags === 0))) \{ return }
   const variables = node.declarations
   if (hasVariable !== undefined) \{
      const found = variables.some(variable => hasVariable(variable))
      if (!found) \{ return }
   }
   if (hasVariables !== undefined) \{
      const found = hasVariables.every(hasVariable => variables.some(variable => hasVariable(variable)))
      if (!found) \{ return }
   }
   return node
}`}
      />
   )
}

export default TsMatchVariableListAnnotatedCode

