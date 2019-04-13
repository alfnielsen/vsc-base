import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TsCreateTransformerAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'tsCreateTransformer'}
         title={'tsCreateTransformer'}
         annotation={
            <>
               <p>
                  
 Create a Ts Transformer factory 
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
         
         codeOneLineEx={`const transformer = vsc.tsCreateTransformer(transformerCallback)`}
         codeEx={`
// tranforms arrowFunction with one return statement to lambda function
const transformer = vsc.tsCreateTransformer((node) => \{
   if (!ts.isArrowFunction(node)) \{ // is not an arrow funcion
      return
   }
   const children = vsc.tsGetParsedChildren(node.body)
   if (children.length !== 1) \{ // dont have one statement
      return
   }
   const child = children[0]
   if (!ts.isReturnStatement(child)) \{ // statement is not a return statement
      return
   }
   const returnNode = child
   const returnExpression = returnNode.expression
   if (returnExpression === undefined) \{ // return statement is undefined
      return
   }
   node.body = returnExpression
   return [true, node]
});

const updatedCode = tsTransform(code, [transformer]);`}
         code={`/**
 * @description
 * Create a Ts Transformer factory \\
 * Normally used in vsc.tsTransform
 * You can use: \\
 * https://ts-ast-viewer.com/ \\
 * or \\
 * https://astexplorer.net/ \\
 * to generate the new ts nodes or node type.
 * @see http://vsc-base.org/#tsCreateTransformer
 * @param callback 
 * @param program 
 * @vscType ts
 * @experimental This method can easily change, because ts api is in experimental state.
 * @oneLineEx const transformer = vsc.tsCreateTransformer(transformerCallback)
 * @ex 
// tranforms arrowFunction with one return statement to lambda function
const transformer = vsc.tsCreateTransformer((node) => \{
   if (!ts.isArrowFunction(node)) \{ // is not an arrow funcion
      return
   }
   const children = vsc.tsGetParsedChildren(node.body)
   if (children.length !== 1) \{ // dont have one statement
      return
   }
   const child = children[0]
   if (!ts.isReturnStatement(child)) \{ // statement is not a return statement
      return
   }
   const returnNode = child
   const returnExpression = returnNode.expression
   if (returnExpression === undefined) \{ // return statement is undefined
      return
   }
   node.body = returnExpression
   return [true, node]
});

const updatedCode = tsTransform(code, [transformer]);

 * @returns ts.TransformerFactory<T>
 */
export const tsCreateTransformer = <T extends ts.Node = ts.SourceFile>(callback: vsc.TsTransformerCallback, program?: ts.Program): ts.TransformerFactory<T> => \{
   let typeChecker: ts.TypeChecker | undefined
   if (program) \{
      typeChecker = program.getTypeChecker()
   }
   return (context) => \{
      const visit: ts.Visitor = (node) => \{
         const replaceNode = callback(node, typeChecker, program);
         if (replaceNode === undefined) \{
            return ts.visitEachChild(node, (child) => visit(child), context);
         }
         return replaceNode;
      }
      return (node) => ts.visitNode(node, visit);
   };
}
export type TsTransformerCallback = (node: ts.Node, typeChecker?: ts.TypeChecker, program?: ts.Program) => ts.Node | undefined;

`}
      />
   )
}

export default TsCreateTransformerAnnotatedCode

