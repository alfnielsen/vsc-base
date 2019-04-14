import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TsCreateRemoveNodesTransformerAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'tsCreateRemoveNodesTransformer'}
         title={'tsCreateRemoveNodesTransformer'}
         annotation={
            <>
               <p>
                  
 Create a Ts Transformer for removing nodes 
               </p>
               <p>
                Normally used in vsc.tsTransform
 You can use: 
               </p>
               <p>
                <a href='https://ts-ast-viewer.com/'>https://ts-ast-viewer.com/</a> 
               </p>
               <p>
                or 
               </p>
               <p>
                <a href='https://astexplorer.net/'>https://astexplorer.net/</a> 
               </p>
               <p>
                to generate the new ts nodes or node type.
               </p>
            </>
         }
         
         codeOneLineEx={`const transformer = vsc.tsCreateRemoveNodesTransformer(transformerCallback)`}
         codeEx={`
// Remove all 'debugger' statements
const removeDebuggerTransformner = vsc.tsCreateRemoveNodesTransformer((node) => \{
   if (ts.isDebuggerStatement(node)) \{
      return true
   }
   return false
});`}
         code={`/**
 * @vscType ts
 * @returns ts.TransformerFactory<T>
 */
export const tsCreateRemoveNodesTransformer = <T extends ts.Node = ts.SourceFile>(callback: vsc.TsRemoveTransformerCallback, program?: ts.Program): ts.TransformerFactory<T> => \{
   let typeChecker: ts.TypeChecker | undefined
   if (program) \{
      typeChecker = program.getTypeChecker()
   }
   return (context) => \{
      const visit: ts.Visitor = (node) => \{
         const shouldRemove = callback(node, typeChecker, program);
         if (!shouldRemove) \{
            return ts.visitEachChild(node, (child) => visit(child), context);
         }
         return undefined; // This will remove the node
      }
      return (node) => ts.visitNode(node, visit);
   };
}
export type TsRemoveTransformerCallback = (node: ts.Node, typeChecker?: ts.TypeChecker, program?: ts.Program) => boolean;

`}
      />
   )
}

export default TsCreateRemoveNodesTransformerAnnotatedCode

