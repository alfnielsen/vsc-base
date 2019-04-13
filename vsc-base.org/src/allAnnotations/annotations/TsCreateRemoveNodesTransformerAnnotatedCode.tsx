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
                https://ts-ast-viewer.com/ 
               </p>
               <p>
                or 
               </p>
               <p>
                https://astexplorer.net/ 
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
 * @description
 * Create a Ts Transformer for removing nodes \\
 * Normally used in vsc.tsTransform
 * You can use: \\
 * https://ts-ast-viewer.com/ \\
 * or \\
 * https://astexplorer.net/ \\
 * to generate the new ts nodes or node type.
 * @see http://vsc-base.org/#tsCreateRemoveNodesTransformer
 * @vscType ts
 * @oneLineEx const transformer = vsc.tsCreateRemoveNodesTransformer(transformerCallback)
 * @ex 
// Remove all 'debugger' statements
const removeDebuggerTransformner = vsc.tsCreateRemoveNodesTransformer((node) => \{
   if (ts.isDebuggerStatement(node)) \{
      return true
   }
   return false
});   

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

