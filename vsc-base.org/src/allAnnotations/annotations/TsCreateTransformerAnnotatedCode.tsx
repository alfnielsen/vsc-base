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
               </p>
               <p>
                You can use  <a href='https://ts-ast-viewer.com/'>https://ts-ast-viewer.com/</a>  or  <a href='https://astexplorer.net/'>https://astexplorer.net/</a> 
               </p>
               <p>
                to generate the new ts nodes or node type.
               </p>
            </>
         }
         
         codeOneLineEx={`const transformer = vsc.tsCreateTransformer(transformerCallback)`}
         codeEx={`// tranforms arrowFunction with one return statement to lambda function
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
   //Replace body-node with return-node
   node.body = returnExpression
   return node
});
//Run transformer:
const updatedCode = vsc.tsTransform(code, [transformer]);`}
         code={`/**
 * @param callback, program
 * @vscType ts
 * @experimental This method can easily change, because ts api is in experimental state.
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

