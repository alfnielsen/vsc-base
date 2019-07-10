import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TsCreateRemoveNodesTransformerAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'tsCreateRemoveNodesTransformer'}
         title={'tsCreateRemoveNodesTransformer'}
         open={open}
         annotation={
            <>
               <p>
                  
Create a Ts Transformer for removing nodes 
               </p>
               <p>
               Normally used in vsc.tsTransform 
               </p>
               <p>
               You can use https://ts-ast-viewer.com/ or https://astexplorer.net/ 
               </p>
               <p>
               to generate the new ts nodes or node type.
               </p>
            </>
         }
         
         codeOneLineEx={`const transformer = vsc.tsCreateRemoveNodesTransformer(transformerCallback)`}
         codeEx={`
// Remove all 'debugger' statements
const removeDebuggerTransformer = vsc.tsCreateRemoveNodesTransformer((node) => \{
   if (ts.isDebuggerStatement(node)) \{
      return true
   }
   return false
});   
//Run transformer:
const updatedCode = vsc.tsTransform(code, [removeDebuggerTransformer]);`}
         code={`/**
 * @vscType ts
 * @returns ts.TransformerFactory<T>
 */
export const tsCreateRemoveNodesTransformer = <T extends ts.Node = ts.SourceFile>(callback: (node: ts.Node, typeChecker?: ts.TypeChecker, program?: ts.Program) => boolean, program?: ts.Program): ts.TransformerFactory<T> => \{
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
}`}
      />
   )
}

export default TsCreateRemoveNodesTransformerAnnotatedCode

