import * as vsc from 'vsc-base'
import * as ts from 'typescript'

/**
 * This test script try to use tranformers to strongly type collect dependencies and other part of vsc methods.
 */

let log = '';
type TsNodeVisitorCallback = (node: ts.Node, typeChecker?: ts.TypeChecker, program?: ts.Program) => void;
const tsNodeVisitor = <T extends ts.Node = ts.SourceFile>(callback: TsNodeVisitorCallback, program?: ts.Program): ts.TransformerFactory<T> => {
   let typeChecker: ts.TypeChecker | undefined
   if (program) {
      typeChecker = program.getTypeChecker()
   }
   return (context) => {
      const visit: ts.Visitor = (node) => {
         callback(node, typeChecker, program);
         return ts.visitEachChild(node, (child) => visit(child), context);
      }
      return (node) => ts.visitNode(node, visit);
   };
}

export async function run(_path: string) {
   vsc.showMessage('Start transformer test')
   // Source file content
   const vscMethod = `
/**
 * @description 
 * Generate relative path between two paths.
 * @see http://vsc-base.org/#getRelativePath
 * @param fromPath
 * @param toPath
 * @vscType Raw
 * @oneLineEx const relativePath = vsc.getRelativePath(fromPath, toPath)
 * @testPrinterArgument
 { 
 fromPath: 'c:/somefolder/sub1/sub2/someFile.js',
   toPath: 'c:/somefolder/other/someFile.js'
}
* @testPrinter (args, printResult) => {
const relativePath = vsc.getRelativePath(args.fromPath, args.toPath)
printResult(relativePath)
}
* @dependencyInternal sharedPath, splitPath, subtractPath
* @returns string
*/
export const getRelativePath = (fromPath: string, toPath: string): string => {
const _sharedPath = vsc.sharedPath(fromPath, toPath)
const [fromDir] = vsc.splitPath(fromPath)
const [toDir] = vsc.splitPath(toPath)
const fromPathDownToShared = vsc.subtractPath(fromDir, _sharedPath)
let toPathDownToShared = vsc.subtractPath(toDir, _sharedPath)
const backPath = fromPathDownToShared
   .split(/\//)
   .map(_ => '../')
   .join('')
const relativePath = backPath + toPathDownToShared
return relativePath
}

`

   // The data we want to collect:
   const dependencyList = {
      vsc: new Set<string>(),
      ts: new Set<string>(),
      fs: new Set<string>(),
      vscode: new Set<string>(),
   }
   // Find all Call Expressions, test if they use any of: vsc, ts, fs or vscode
   const collectDefs = vsc.tsCreateRemoveNodesTransformer((node): undefined => {
      if (!ts.isCallExpression(node)) { // is call expression
         return
      }
      const expression = node.expression;
      const content = expression.getText();
      for (const [key, list] of Object.entries(dependencyList)) {
         const matcher = `${key}.`;
         if (content.indexOf(matcher) === 0) { // <-- Collect data is it match 
            const val = content.substr(matcher.length)
            list.add(val) // <-- Use Set to avoid duplicates
         }
      }
   });


   const collectMethods = tsNodeVisitor((node): undefined => {
      if (!ts.isVariableStatement(node)) { // is variable statement
         return
      }
      if (!node.modifiers || node.modifiers.length === 0) { // Has modifiers
         return
      }
      const hasExport = node.modifiers.find(m => m.kind === ts.SyntaxKind.ExportKeyword);
      if (!hasExport) { // is export
         return
      }
      const declarationList = node.declarationList;
      if (declarationList.flags !== ts.NodeFlags.Const) { // is const
         return
      }
      if (declarationList.declarations.length !== 1) { // precise one variable
         return
      }
      const declaration = declarationList.declarations[0];
      const initializer = declaration.initializer
      if (!ts.isArrowFunction(initializer)) { // value is an arrow function
         return
      }
      const methodName = declaration.name.getText()
      // next: extract dep from this arrow function:
   });
   const getDepFromMethod = tsNodeVisitor((node) => {
      const methodDependencyList = {
         vsc: new Set<string>(),
         ts: new Set<string>(),
         fs: new Set<string>(),
         vscode: new Set<string>(),
      }
      const collectDefs = vsc.tsCreateTransformer((node): undefined => {
         if (!ts.isCallExpression(node)) { // is not an arrow funcion
            return
         }
         const expression = node.expression;
         const content = expression.getText();
         for (const [key, list] of Object.entries(methodDependencyList)) {
            const matcher = `${key}.`;
            if (content.indexOf(matcher) === 0) {
               const val = content.substr(matcher.length)
               list.add(val)
            }
         }
      });
      vsc.tsTransformSourceFile(node, [collectDefs]);
      //      log += `${key}: (${arr.size})  ${vsc.toJSONString([...arr.values()])}\n`
   })




   //Run transformer:
   vsc.tsTransform(vscMethod, [collectMethods, collectDefs]);

   log += '// Dependencies:\n'
   // Print result:
   for (const [key, arrSet] of Object.entries(dependencyList)) {
      const arr = [...arrSet] // convert to array (from set)
      log += `${key}: (${arr.length})  ${vsc.toJSONString(arr)}\n`
   }

   // Add result to log
   log = ` 
/* 
${log}
*/

`
   // Add log to end of open document
   vsc.appendLineToActiveDocument(log);
   // tranforms arrowFunction with one return statement to lambda function
}


