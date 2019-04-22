import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TsCreateNodeVisitorAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'tsCreateNodeVisitor'}
         title={'tsCreateNodeVisitor'}
         open={open}
         annotation={
            <>
               <p>
                  
 Create a Ts Visitor Transformer for collecting data (Will not remove or reaplce any nodes) 
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
         
         codeOneLineEx={`const transformer = vsc.tsCreateNodeVisitor(transformerCallback)`}
         codeEx={`
// The vsc-method to collect dependencies from:
const vscMethod = \`
export const getRelativePath = (fromPath: string, toPath: string): string => \{
   const _sharedPath = vsc.sharedPath(fromPath, toPath)
   const [fromDir] = vsc.splitPath(fromPath)
   const [toDir] = vsc.splitPath(toPath)
   const fromPathDownToShared = vsc.subtractPath(fromDir, _sharedPath)
   let toPathDownToShared = vsc.subtractPath(toDir, _sharedPath)
   const backPath = fromPathDownToShared
      .split(/\\//)
      .map(_ => '../')
      .join('')
   const relativePath = backPath + toPathDownToShared
   return relativePath
}
   \`
// The data we want to collect:
const dependencyList = \{
   vsc: new Set<string>(),
   ts: new Set<string>(),
   fs: new Set<string>(),
   vscode: new Set<string>(),
}
// Find all Call Expressions, test if they use any of: vsc, ts, fs or vscode
const collectDefs = vsc.tsCreateNodeVisitor((node) => \{
   if (!ts.isCallExpression(node)) \{ // is call expression
      return
   }
   const expression = node.expression;
   const content = expression.getText();
   for (const [key, list] of Object.entries(dependencyList)) \{
      const matcher = \`\$\{key}.\`;
      if (content.indexOf(matcher) === 0) \{ // <-- Collect data if it match 
         const val = content.substr(matcher.length)
         list.add(val) // <-- Use Set to avoid duplicates
      }
   }
});
//Run transformer:
vsc.tsTransform(vscMethod, [collectDefs]);

// -- dependencyList --
// \{
//   vsc: [
//     "sharedPath",
//     "splitPath",
//     "subtractPath"
//   ],
//   ts: [],
//   fs: [],
//   vscode: []
// }`}
         code={`/**
 * @vscType ts
 * @returns ts.TransformerFactory<T>
 */
export const tsCreateNodeVisitor = <T extends ts.Node = ts.SourceFile>(callback: vsc.TsNodeVisitorCallback, program?: ts.Program): ts.TransformerFactory<T> => \{
   let typeChecker: ts.TypeChecker | undefined
   if (program) \{
      typeChecker = program.getTypeChecker()
   }
   return (context) => \{
      const visit: ts.Visitor = (node) => \{
         callback(node, typeChecker, program);
         return ts.visitEachChild(node, (child) => visit(child), context);
      }
      return (node) => ts.visitNode(node, visit);
   };
}
export type TsNodeVisitorCallback = (node: ts.Node, typeChecker?: ts.TypeChecker, program?: ts.Program) => void;

/**
 * 
 */
export const tsFindNodeVscodeRange = (source: string, callback: TsFindNodePositionCallback, program?: ts.Program): TsNodePosition | undefined => \{
   let position: TsNodePosition | undefined
   let typeChecker: ts.TypeChecker | undefined
   if (program) \{
      typeChecker = program.getTypeChecker()
   }
   const visitor: ts.TransformerFactory<ts.SourceFile> = (context) => \{
      const visit: ts.Visitor = (node) => \{
         const found = callback(node, typeChecker, program);
         if (!found) \{
            return ts.visitEachChild(node, (child) => visit(child), context);
         }
         const start = node.pos;
         const end = node.end;
         const startLines = source.substr(start).split("\\n");
         const startRangePosition = new vscode.Position(startLines.length, startLines[startLines.length].length);
         const endLines = source.substr(end).split("\\n");
         const endRangePosition = new vscode.Position(endLines.length, endLines[endLines.length].length);
         const range = new vscode.Range(startRangePosition, endRangePosition);
         position = \{
            start,
            end,
            range
         }
      }
      return (node) => ts.visitNode(node, visit);
   };
   vsc.tsTransform(source, [visitor]);
   return position;
}
export type TsFindNodePositionCallback = (node: ts.Node, typeChecker?: ts.TypeChecker, program?: ts.Program) => boolean;
export interface TsNodePosition \{ range: vscode.Range, start: number, end: number }
`}
      />
   )
}

export default TsCreateNodeVisitorAnnotatedCode

