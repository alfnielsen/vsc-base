import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TsCreateTransformerAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'tsCreateTransformer'}
         title={'tsCreateTransformer'}
         open={open}
         annotation={
            <>
               <p>
                  
 Create a Ts Transformer factory 
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
         
         codeOneLineEx={`const transformer = vsc.tsCreateTransformer(transformerCallback)`}
         codeEx={`// transforms arrowFunction with one return statement to lambda function
const transformer = vsc.tsCreateTransformer((node) => \{
   if (!ts.isArrowFunction(node)) \{ // is not an arrow function
      return
   }
   const children = vsc.tsGetParsedChildren(node.body)
   if (children.length !== 1) \{ // don't have one statement
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
export const tsCreateTransformer = <T extends ts.Node = ts.SourceFile>(callback: (node: ts.Node, typeChecker?: ts.TypeChecker, program?: ts.Program) => ts.Node | undefined, program?: ts.Program): ts.TransformerFactory<T> => \{
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

`}
      />
   )
}

export default TsCreateTransformerAnnotatedCode

