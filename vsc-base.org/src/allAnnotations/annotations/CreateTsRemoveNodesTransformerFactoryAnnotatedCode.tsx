import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const CreateTsRemoveNodesTransformerFactoryAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'createTsRemoveNodesTransformerFactory'}
         title={'createTsRemoveNodesTransformerFactory'}
         annotation={
            <>
               <p>
                  
               </p>
               <p>
                Create Basic Ts Transformer for removing nodes \
 You can use https://ts-ast-viewer.com/ to generate the new node or node type.
               </p>
            </>
         }
         
         codeOneLineEx={`const transformer = vsc.createTranformer(transformerCallback)`}
         codeEx={`
// Remove all 'debugger' statements
const removeDebuggerTransformner = createTsRemoveNodesTransformerFactory((node) => \{
   if (ts.isDebuggerStatement(node)) \{
      return true
   }
   return false
});`}
         code={`/**
 * @description
 * Create Basic Ts Transformer for removing nodes \\
 * You can use https://ts-ast-viewer.com/ to generate the new node or node type.
 * @see http://vsc-base.org/#createTsRemoveNodesTransformerFactory
 * @vscType ts
 * @oneLineEx const transformer = vsc.createTranformer(transformerCallback)
 * @ex 
// Remove all 'debugger' statements
const removeDebuggerTransformner = createTsRemoveNodesTransformerFactory((node) => \{
   if (ts.isDebuggerStatement(node)) \{
      return true
   }
   return false
});

 * @returns ts.TransformerFactory<T>
 */
export const createTsRemoveNodesTransformerFactory = <T extends ts.Node = ts.SourceFile>(callback: vsc.TsRemoveTransformer, program?: ts.Program): ts.TransformerFactory<T> => \{
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
export type TsRemoveTransformer = (node: ts.Node, typeChecker?: ts.TypeChecker, program?: ts.Program) => boolean;

`}
      />
   )
}

export default CreateTsRemoveNodesTransformerFactoryAnnotatedCode

