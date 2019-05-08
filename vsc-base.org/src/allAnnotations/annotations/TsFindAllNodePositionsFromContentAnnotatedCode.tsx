import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TsFindAllNodePositionsFromContentAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'tsFindAllNodePositionsFromContent'}
         title={'tsFindAllNodePositionsFromContent'}
         open={open}
         annotation={
            <>
               <p>
                  
 Create a Ts Visitor Transformer for finding a nodes and their position.
               </p>
            </>
         }
         
         codeOneLineEx={`const nodePositionArray = vsc.tsFindAllNodePositionsFromContent(source, findNodePositionCallback)`}
         codeEx={`
 const source = \`
   const method2 = () => \{
      const moduleNumber1Path = '/module/area/file1' // <-- Find this
      return moduleNumber1Path // <-- Find this
   }
   function method1(doit)\{
      if(doit)\{
         const moduleNumber1Path = '/module/area/file1' // <-- Find this
         return moduleNumber1Path // <-- Find this
      }
   }
\`
// Find a constant with name starting with 'module' witin a function but not in an if statement
const nodePositionArray = vsc.tsFindAllNodePositionsFromContent(source, node =>
 vsc.tsIsVariable(node, \{ 
      // test name of variable
      name: /^module/,
      // test if is in function
      hasAncestors: [
         ancestor => vsc.tsIsFunction(ancestor, \{ name: /^method/ }),
         ancestor => ts.isIfStatement(ancestor)
      ]
   })
)
nodePositionArray.forEach([node, position] => \{
   vsc.addSelection(position.start, position.end)
})`}
         code={`/**
 * @vscType ts
 * @returns [ts.Node, vsc.VscodePosition][]
 */
export const tsFindAllNodePositionsFromContent = (source: string, callback: (node: ts.Node, typeChecker?: ts.TypeChecker, program?: ts.Program) => boolean, program?: ts.Program, fromPosition = 0, trimSpaces = true): [ts.Node, vsc.VscodePosition][] => \{
   let positions: [ts.Node, vsc.VscodePosition][] = [];
   let position: vsc.VscodePosition
   let foundNode: ts.Node
   let typeChecker: ts.TypeChecker | undefined
   if (program) \{
      typeChecker = program.getTypeChecker()
   }
   const visitor: ts.TransformerFactory<ts.SourceFile> = (context) => \{
      const visit: ts.Visitor = (node) => \{
         if (node.pos < fromPosition) \{
            return ts.visitEachChild(node, (child) => visit(child), context);
         }
         const found = callback(node, typeChecker, program);
         if (!found) \{
            return ts.visitEachChild(node, (child) => visit(child), context);
         }
         if (node === undefined) \{
            throw new Error('Node is undefined!!!')
         }
         position = vsc.createVscodeRangeAndPosition(source, node.pos, node.end, trimSpaces);
         foundNode = node;
         positions.push([foundNode, position])
         return ts.visitEachChild(node, (child) => visit(child), context);
      }
      return (node) => ts.visitNode(node, visit);
   };
   vsc.tsVisitWithTransformers(source, [visitor]);
   return positions
}

`}
      />
   )
}

export default TsFindAllNodePositionsFromContentAnnotatedCode

