import * as ts from 'typescript';
import * as vsc from './vsc-base';
/** vsc-base method
 * @description
 * Transpile ts source to js
 * @see [tsTranspile](http://vsc-base.org/#tsTranspile)
 * @param sourceTs
 * @param compilerOptions
 * @vscType System
 * @oneLineEx const sourceJs = vsc.tsTranspile(sourceTs)
 * @returns string
 */
export declare const tsTranspile: (sourceTs: string, compilerOptions?: ts.CompilerOptions) => string;
/** vsc-base method
 * @description
 * Pre method for tsLoadModule. \
 * (This methods load the ts source, transpile it to js and replace all 'require' instance)
 * @see [tsLoadModuleSourceCode](http://vsc-base.org/#tsLoadModuleSourceCode)
 * @param path
 * @param compilerOptions
 * @param moduleMap default = vsc.getVscDefaultModuleMap()
 * @vscType System
 * @oneLineEx const sourceJs = await vsc.tsLoadModuleSourceCode(path)
 * @returns Promise<string>
 */
export declare const tsLoadModuleSourceCode: (path: string, compilerOptions?: ts.CompilerOptions) => Promise<string>;
/** vsc-base method
 * @description
 * Return the default module map of vsc-base \
 * (Used for ts compiling, module load ect)
 * @see [getVscDefaultModuleMap](http://vsc-base.org/#getVscDefaultModuleMap)
 * @internal this method is primary used by vsc.loadTsModule
 * @vscType System
 * @oneLineEx const moduleMap = vsc.getVscDefaultModuleMap()
 * @returns \{ [key: string]: \{ name: string, module: any \} \}
 */
export declare const getVscDefaultModuleMap: () => {
    key: string;
    name: string;
    module: any;
}[];
/** vsc-base method
 * @description
 * Replace ts transpiled code's require for vsc, ts, fs and vscode.
 * @see [tsRewriteTranpiledCodeWithVscBaseModules](http://vsc-base.org/#tsRewriteTranpiledCodeWithVscBaseModules)
 * @internal this method is primary used by vsc.tsLoadModule
 * @notes
 * ts.transpile as follows:
 * const vsc_base_1 = require("vsc-base");
 * const fs = require("fs-extra");
 * const typescript_1 = require("typescript");
 * const vscode = require("vscode");
 * @vscType System
 * @oneLineEx const sourceJs = vsc.tsRewriteTranpiledCodeWithVscBaseModules(sourceJs)
 * @param sourceJs
 * @returns string
 */
export declare const tsRewriteTranpiledCodeWithVscBaseModules: (sourceJs: string) => string;
/** vsc-base method
 * @description
 * Load a ts file. \
 * Transpile it to js (run time) add wrap code and execute it (using eval)! \
 * Returning an plainObject with the scripts exports. \
 * export default xxx transpile to export.default \
 * IMPORTANT Don't just run code you don't now, this can cause injection! \
 * IMPORTANT Be careful when running scripts that also uses tsLoadModule, this can break down entire systems! \
 * (If you start a recursive change that don't stop..)
 * @see [tsLoadModule](http://vsc-base.org/#tsLoadModule)
 * @param path
 * @dependencyExternal ts
 * @dependencyInternal getFileContent, showErrorMessage
 * @vscType System
 * @oneLineEx const moduleObj = await vsc.tsLoadModule(path)
 * @ex
let moduleObj
try {
   moduleObj = await vsc.tsLoadModule(path)
} catch (e){
   vsc.showErrorMessage(`Loading module coursed an error: ${e}`)
   return
}
const verifiedModule = vsc.verifyModuleMethods(moduleObj, ['run'])
if (!verifiedModule) {
   vsc.showErrorMessage(`Module didn't have 'run' :: ${JSON.stringify(moduleObj)}`)
   return
}
try {
   const result = verifiedModule.run()
   await vsc.awaitResult(result)
   vsc.showMessage(`Loaded Run resulted with value: ${result}`)
} catch (e) {
   vsc.showErrorMessage('Error: ' + e)
}
 * @returns Promise<{ [key: string]: unknown; }>
 */
export declare const tsLoadModule: (path: string, compilerOptions?: ts.CompilerOptions) => Promise<{
    [key: string]: unknown;
}>;
export declare class TSLoadModuleError extends Error {
    transpiledCode: string;
    constructor(message: string, transpiledCode: string);
}
/** vsc-base method
 * @description
 * Test if a loaded module has methods (Loaded with vsc.loadTsModule) \
 * return undefined if a method didn't exist.
 * @see [verifyModuleMethods](http://vsc-base.org/#verifyModuleMethods)
 * @vscType System
 * @oneLineEx const verifyModuleMethods = vsc.verifyModuleMethods(_module, methodName)
 * @ex
const verifiedModule = vsc.verifyModuleMethods(_module, ['run', 'getId'])
const result = verifiedModule.run()
 * @returns { [key: string]: any } | undefined
 */
export declare const verifyModuleMethods: (_module: {
    [key: string]: unknown;
}, methods: string[]) => {
    [key: string]: any;
} | undefined;
/** vsc-base method
 * @description
 * Ensure that a method result that optional can be a promise is awaited. \
 * (Responses from methods loaded with vsc.tsLoadModule can be optional async!)
 * @see [awaitResult](http://vsc-base.org/#awaitResult)
 * @vscType ts
 * @oneLineEx await vsc.awaitResult(result)
 * @ex
 const verifiedModule = vsc.verifyModuleMethods(_module, ['run'])
 let result = verifiedModule.run()
 result = await vsc.awaitResult(result)
 * @returns Promise<any>
 */
export declare const awaitResult: <T = any>(result: any) => Promise<T>;
/** vsc-base method
 * @description
 * Transform source code using custom transformers \
 * See [tsCreateTransformer](http://vsc-base.org/#tsCreateTransformer)
 * and [tsCreateRemoveNodesTransformer](http://vsc-base.org/#tsCreateRemoveNodesTransformer)
 * for creating transformer
 * @see [tsTransform](http://vsc-base.org/#tsTransform)
 * @param source
 * @param transformers
 * @param compilerOptions
 * @param printer
 * @internal
 * @experimental This method can easily change, because ts api is in experimental state.
 * @vscType ts
 * @oneLineEx const updatedCode = vsc.tsTransform(code, [transformer1, transformer2])
 */
export declare const tsTransform: (source: string, transformers: ts.TransformerFactory<ts.SourceFile>[], compilerOptions?: ts.CompilerOptions, printer?: ts.Printer) => string;
/** vsc-base method
 * @description
 * This is like a [tsTransform](http://vsc-base.org/#tsTransform), but it doesn't transform or print content. \
 * Used for walking a ts-ast tree. \
 * Used by [tsFindNodePositionFromContent](http://vsc-base.org/#tsFindNodePositionFromContent)
 * @see [tsVisitWithTransformers](http://vsc-base.org/#tsVisitWithTransformers)
 * @param source
 * @param transformers
 * @param compilerOptions
 * @param printer
 * @internal
 * @experimental This method can easily change, because ts api is in experimental state.
 * @vscType ts
 * @oneLineEx vsc.tsVisitWithTransformers(code, [visitor, transformer])
 */
export declare const tsVisitWithTransformers: (source: string, transformers: ts.TransformerFactory<ts.SourceFile>[], compilerOptions?: ts.CompilerOptions) => void;
/** vsc-base method
 * @description
 * Transform a ts.Node \
 * (default node-type is ts.Sourcefile)
 * @see [tsTransformNode](http://vsc-base.org/#tsTransformNode)
 * @param sourceFile
 * @param transformers
 * @param compilerOptions
 * @internal
 * @experimental This method can easily change, because ts api is in experimental state.
 * @vscType ts
 * @oneLineEx const result = vsc.tsTransformNode(sourceFile, transformers, compilerOptions)
 */
export declare const tsTransformNode: <T extends ts.Node = ts.SourceFile>(sourceFile: T, transformers: ts.TransformerFactory<T>[], compilerOptions?: ts.CompilerOptions) => ts.TransformationResult<T>;
/** vsc-base method
 * @description
 * vsc-base's internal default ts compiler options
 * @see [TsDefaultCompilerOptions](http://vsc-base.org/#TsDefaultCompilerOptions)
 * @internal
 * @experimental This method can easily change, because ts api is in experimental state.
 * @vscType ts
 * @oneLineEx const compilerOptions = vsc.TsDefaultCompilerOptions
 */
export declare const TsDefaultCompilerOptions: Readonly<ts.CompilerOptions>;
/** vsc-base method
 * @description
 * Create a ts.SourceFile
 * @see [tsCreateSourceFile](http://vsc-base.org/#tsCreateSourceFile)
 * @param content
 * @param sourceFileName
 * @experimental This method can easily change, because ts api is in experimental state.
 * @vscType ts
 * @oneLineEx const sourceFile = vsc.tsCreateSourceFile(code)
 */
export declare const tsCreateSourceFile: (content: string, sourceFileName?: string) => ts.SourceFile;
/** vsc-base method
 * @description
 * ts.Node's getChildren and getChildrenCount uses tokens not parsed nodes. \
 * So to this method uses ts' forEachChild to collect the parsed nodes. \
 * Normally used in custom transformer methods (vsc.tsCreateTransformer)
 * @see [tsGetParsedChildren](http://vsc-base.org/#tsGetParsedChildren)
 * @params node
 * @experimental This method can easily change, because ts api is in experimental state.
 * @vscType ts
 * @oneLineEx const children = vsc.tsGetParsedChildren(node)
 */
export declare const tsGetParsedChildren: (node: ts.Node) => ts.Node[];
/** vsc-base method
 * @description
 * Create a Ts Transformer factory \
 * Normally used in vsc.tsTransform \
 * You can use https://ts-ast-viewer.com/ or https://astexplorer.net/ \
 * to generate the new ts nodes or node type.
 * @see [tsCreateTransformer](http://vsc-base.org/#tsCreateTransformer)
 * @param callback
 * @param program
 * @vscType ts
 * @experimental This method can easily change, because ts api is in experimental state.
 * @oneLineEx const transformer = vsc.tsCreateTransformer(transformerCallback)
 * @ex
// transforms arrowFunction with one return statement to lambda function
const transformer = vsc.tsCreateTransformer((node) => {
   if (!ts.isArrowFunction(node)) { // is not an arrow function
      return
   }
   const children = vsc.tsGetParsedChildren(node.body)
   if (children.length !== 1) { // don't have one statement
      return
   }
   const child = children[0]
   if (!ts.isReturnStatement(child)) { // statement is not a return statement
      return
   }
   const returnNode = child
   const returnExpression = returnNode.expression
   if (returnExpression === undefined) { // return statement is undefined
      return
   }
   //Replace body-node with return-node
   node.body = returnExpression
   return node
});
//Run transformer:
const updatedCode = vsc.tsTransform(code, [transformer]);

 * @returns ts.TransformerFactory<T>
 */
export declare const tsCreateTransformer: <T extends ts.Node = ts.SourceFile>(callback: (node: ts.Node, typeChecker?: ts.TypeChecker | undefined, program?: ts.Program | undefined) => ts.Node | undefined, program?: ts.Program | undefined) => ts.TransformerFactory<T>;
/** vsc-base method
 * @description
 * Create a Ts Transformer for removing nodes \
 * Normally used in vsc.tsTransform \
 * You can use https://ts-ast-viewer.com/ or https://astexplorer.net/ \
 * to generate the new ts nodes or node type.
 * @see [tsCreateRemoveNodesTransformer](http://vsc-base.org/#tsCreateRemoveNodesTransformer)
 * @vscType ts
 * @oneLineEx const transformer = vsc.tsCreateRemoveNodesTransformer(transformerCallback)
 * @ex
// Remove all 'debugger' statements
const removeDebuggerTransformer = vsc.tsCreateRemoveNodesTransformer((node) => {
   if (ts.isDebuggerStatement(node)) {
      return true
   }
   return false
});
//Run transformer:
const updatedCode = vsc.tsTransform(code, [removeDebuggerTransformer]);

 * @returns ts.TransformerFactory<T>
 */
export declare const tsCreateRemoveNodesTransformer: <T extends ts.Node = ts.SourceFile>(callback: (node: ts.Node, typeChecker?: ts.TypeChecker | undefined, program?: ts.Program | undefined) => boolean, program?: ts.Program | undefined) => ts.TransformerFactory<T>;
/** vsc-base method
 * @description
 * Create a Ts Visitor Transformer for collecting data (Will not remove or replace any nodes) \
 * Normally used in vsc.tsTransform \
 * You can use https://ts-ast-viewer.com/ or https://astexplorer.net/ \
 * to generate the new ts nodes or node type.
 * @see [tsCreateNodeVisitor](http://vsc-base.org/#tsCreateNodeVisitor)
 * @vscType ts
 * @oneLineEx const transformer = vsc.tsCreateNodeVisitor(transformerCallback)
 * @ex
// The vsc-method to collect dependencies from:
const vscMethod = `
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
const collectDefs = vsc.tsCreateNodeVisitor((node) => {
   if (!ts.isCallExpression(node)) { // is call expression
      return
   }
   const expression = node.expression;
   const content = expression.getText();
   for (const [key, list] of Object.entries(dependencyList)) {
      const matcher = `${key}.`;
      if (content.indexOf(matcher) === 0) { // <-- Collect data if it match
         const val = content.substr(matcher.length)
         list.add(val) // <-- Use Set to avoid duplicates
      }
   }
});
//Run transformer:
vsc.tsTransform(vscMethod, [collectDefs]);

// -- dependencyList --
// {
//   vsc: [
//     "sharedPath",
//     "splitPath",
//     "subtractPath"
//   ],
//   ts: [],
//   fs: [],
//   vscode: []
// }

 * @returns ts.TransformerFactory<T>
 */
export declare const tsCreateNodeVisitor: <T extends ts.Node = ts.SourceFile>(callback: (node: ts.Node, typeChecker?: ts.TypeChecker | undefined, program?: ts.Program | undefined) => void, program?: ts.Program | undefined) => ts.TransformerFactory<T>;
/** vsc-base method
 * @description
 * Create a Ts Visitor Transformer for finding a node and it position.
 * @see [tsFindNodePositionFromContent](http://vsc-base.org/#tsFindNodePositionFromContent)
 * @vscType ts
 * @oneLineEx const [node, position] = vsc.tsFindNodePositionFromContent(source, findNodePositionCallback)
 * @ex
 const source = `
   const method2 = () => {
      const moduleNumber1Path = '/module/area/file1'
      return moduleNumber1Path
   }
   function method1(doIt){
      if(doIt){
         const moduleNumber1Path = '/module/area/file1' // <-- Find this
         return moduleNumber1Path
      }
   }
`
// Find a constant with name starting with 'module' within a function but not in an if statement
const [_node, position] = vsc.tsFindNodePositionFromContent(source, node =>
 vsc.tsIsVariable(node, {
      // test name of variable
      name: /^module/,
      // test if is in function
      hasAncestors: [
         ancestor => vsc.tsIsFunction(ancestor, { name: /^method/ }),
         ancestor => ts.isIfStatement(ancestor)
      ]
   })
)
if (position) {
   const realText = source.substring(position.start, position.end);
   // Select the source (assuming the source is from the open document)
   vsc.setSelection(position.start, position.end)
}
 * @returns [ts.Node | undefined, vsc.VscodePosition | undefined]
 */
export declare const tsFindNodePositionFromContent: (source: string, callback: (node: ts.Node, typeChecker?: ts.TypeChecker | undefined, program?: ts.Program | undefined) => boolean, program?: ts.Program | undefined, fromPosition?: number, trimSpaces?: boolean) => [ts.Node | undefined, vsc.VscodePosition | undefined];
/** vsc-base method
 * @description
 * Create a Ts Visitor Transformer for finding a nodes and their position.
 * @see [tsFindAllNodePositionsFromContent](http://vsc-base.org/#tsFindAllNodePositionsFromContent)
 * @vscType ts
 * @oneLineEx const nodePositionArray = vsc.tsFindAllNodePositionsFromContent(source, findNodePositionCallback)
 * @ex
 const source = `
   const method2 = () => {
      const moduleNumber1Path = '/module/area/file1' // <-- Find this
      return moduleNumber1Path // <-- Find this
   }
   function method1(doIt){
      if(doIt){
         const moduleNumber1Path = '/module/area/file1' // <-- Find this
         return moduleNumber1Path // <-- Find this
      }
   }
`
// Find a constant with name starting with 'module' within a function but not in an if statement
const nodePositionArray = vsc.tsFindAllNodePositionsFromContent(source, node =>
 vsc.tsIsVariable(node, {
      // test name of variable
      name: /^module/,
      // test if is in function
      hasAncestors: [
         ancestor => vsc.tsIsFunction(ancestor, { name: /^method/ }),
         ancestor => ts.isIfStatement(ancestor)
      ]
   })
)
nodePositionArray.forEach([node, position] => {
   vsc.addSelection(position.start, position.end)
})
 * @returns [ts.Node, vsc.VscodePosition][]
 */
export declare const tsFindAllNodePositionsFromContent: (source: string, callback: (node: ts.Node, typeChecker?: ts.TypeChecker | undefined, program?: ts.Program | undefined) => boolean, program?: ts.Program | undefined, fromPosition?: number, trimSpaces?: boolean) => [ts.Node, vsc.VscodePosition][];
/** vsc-base method
 * @description
 * tsReplace is a smart search and replace that take the source, a replaceString and a callback for finding the node to replace. \
 * It uses [tsFindNodePositionFromContent](http://vsc-base.org/#tsFindNodePositionFromContent) to find the node.
 * See also [tsReplaceAll](http://vsc-base.org/#tsReplaceAll)
 * @see [tsReplace](http://vsc-base.org/#tsReplace)
 * @vscType ts
 * @oneLineEx source = vsc.tsReplace(source, replaceString, findNodePositionCallback)
 * @ex
let source = `
   const method2 = () => {
      const moduleNumber1Path = '/module/area/file1' // <-- replace this
      return moduleNumber1Path
   }
`
// Find a constant with name starting with 'module' within a function but not in an if statement
source = vsc.tsReplace(source, '/module/area/file2', node => vsc.tsIsValue(node, /\/area\/file1/, {
   hasAncestors: [
      ancestor => vsc.tsIsFunction(ancestor, { name: /^method/ }),
      ancestor => vsc.tsIsVariable(ancestor, { name: /^module.*Path/ })
   ]
}))
 *
 * @returns string
 */
export declare const tsReplace: (source: string, replaceString: string, callback: (node: ts.Node, typeChecker?: ts.TypeChecker | undefined, program?: ts.Program | undefined) => boolean, program?: ts.Program | undefined, fromPosition?: number, trimSpaces?: boolean) => string;
/** vsc-base method
 * @description
 * tsReplace is a smart search and replace that take the source, a replaceString and a callback for finding the node to replace. \
 * It uses [tsFindNodePositionFromContent](http://vsc-base.org/#tsFindNodePositionFromContent) to find the node.
 * @see [tsReplace](http://vsc-base.org/#tsReplace)
 * @vscType ts
 * @oneLineEx source = vsc.tsReplace(source, replaceString, findNodePositionCallback)
 * @ex
let source = `
   const method2 = () => {
      const moduleNumber1Path = '/module/area/file1' // <-- replace moduleNumber1Path
      return moduleNumber1Path // <-- replace moduleNumber1Path
   }
`
// Find a constant with name starting with 'module' within a function but not in an if statement
source = vsc.tsReplaceAll(source, 'moduleNumber2', node => vsc.tsIsIdentifier(node, {
   name: 'moduleNumber1Path'
}))
 *
 * @returns string
 */
export declare const tsReplaceAll: (source: string, replaceString: string, callback: (node: ts.Node, typeChecker?: ts.TypeChecker | undefined, program?: ts.Program | undefined) => boolean, program?: ts.Program | undefined, fromPosition?: number, trimSpaces?: boolean) => string;
/** vsc-base method
 * @description
 * Find is a direct parsedChild that matches conditions in a callback\
 * See also [tsHasChild](http://vsc-base.org/#tsHasChild) \
 * See also [tsFindGrandChild](http://vsc-base.org/#tsFindGrandChildNode)
 * @see [tsFindChildNode](http://vsc-base.org/#tsFindChildNode)
 * @vscType ts
 * @oneLineEx const childNode = vsc.tsFindChild(node, childNodeTestCallback })
 * @ex
const childNode = vsc.tsFindChild(node, (childNode)=> vsc.tsIdVariable(childNode, {
   name:/^varName$/,
   isConst: true
}))
 * @returns ts.Node | undefined
 */
export declare const tsFindChild: (node: ts.Node, callback: (child: ts.Node) => boolean) => ts.Node | undefined;
/** vsc-base method
 * @description
 * Test if direct parsedChild that matches conditions in a callback \
 * Using [tsFind](http://vsc-base.org/#tsFind) \
 * See also [tsHasGrandChild](http://vsc-base.org/#tsHasGrandChild)
 * @see [tsHasChild](http://vsc-base.org/#tsHasChild)
 * @vscType ts
 * @oneLineEx const child = vsc.tsHasChild(node, childNodeTestCallback })
 * @ex
const hasChild = vsc.tsHasChild(node, (childNode) => vsc.tsIsVariable(childNode, {
   name:/^varName$/,
   isConst: true
}))
 * @returns boolean
 */
export declare const tsHasChild: (node: ts.Node, callback: (child: ts.Node) => boolean) => boolean;
/** vsc-base method
 * @description
 * Test if it has all children or grandChildren (child's child) that matches conditions in a callback \
 * Using [tsHasChild](http://vsc-base.org/#tsHasChild)
 * @see [tsHasChildren](http://vsc-base.org/#tsHasChildren)
 * @vscType ts
 * @oneLineEx const childNode = vsc.tsHasChildren(node, [childNodeTestCallback1, childNodeTestCallback2])
 * @ex
// find a variable any where within the parent node, that is a const and has a staring name of: varName
const hasGrandChildNode = vsc.tsHasChildren(node, [
   childNode => vsc.tsIsVariable(childNode, { name:/^varName1/ }),
   childNode => vsc.tsIsVariable(childNode, { name:/^varName2/ })
})
 * @returns ts.Node | undefined
 */
export declare const tsHasChildren: (node: ts.Node, callbacks: ((child: ts.Node, depth: number) => boolean)[]) => boolean;
/** vsc-base method
 * @description
 * Find a child or grandChild (child's child) that matches conditions in a callback\
 * @see [tsFindGrandChild](http://vsc-base.org/#tsFindGrandChild)
 * @vscType ts
 * @oneLineEx const childNode = vsc.tsFindGrandChild(node, childNodeTestCallback)
 * @ex
// find a variable any where within the parent node, that is a const and has a staring name of: varName
const childNode = vsc.tsFindGrandChild(node, (childNode) => vsc.tsIsVariable(childNode, {
   name:/^varName/,
   isConst: true
}))
 * @returns ts.Node | undefined
 */
export declare const tsFindGrandChild: (node: ts.Node, callback: (child: ts.Node, depth: number) => boolean) => ts.Node | undefined;
/** vsc-base method
 * @description
 * Test if it has  a child or grandChild (child's child) that matches conditions in a callback \
 * Using [tsFindGrandchild](http://vsc-base.org/#tsFindGrandchild)
 * @see [tsHasGrandChild](http://vsc-base.org/#tsHasGrandChild)
 * @vscType ts
 * @oneLineEx const found = vsc.tsFindGrandChild(node, childNodeTestCallback)
 * @ex
// find a variable any where within the parent node, that is a const and has a staring name of: varName
const found = vsc.tsHasGrandChild(node, (childNode) => vsc.tsIsVariable(childNode, {
   name:/^varName/,
   isConst: true
}))
 * @returns boolean
 */
export declare const tsHasGrandChild: (node: ts.Node, callback: (child: ts.Node, depth: number) => boolean) => boolean;
/** vsc-base method
 * @description
 * Test if it has all Children or grandChildren (child's child) that matches conditions in a callback \
 * Using [tsFindGrandchild](http://vsc-base.org/#tsFindGrandchild)
 * @see [tsHasGrandChildren](http://vsc-base.org/#tsHasGrandChildren)
 * @vscType ts
 * @oneLineEx const found = vsc.tsHasGrandChildren(node, [childNodeTestCallback1, childNodeTestCallback2])
 * @ex
// find a variable any where within the parent node, that is a const and has a staring name of: varName
const found = vsc.tsHasGrandChildren(node, [
   childNode => return vsc.tsIsVariable(childNode, { name:/^varName1/ }),
   childNode => return vsc.tsIsVariable(childNode, { name:/^varName2/ })
})
 * @returns boolean
 */
export declare const tsHasGrandChildren: (node: ts.Node, callbacks: ((child: ts.Node, depth: number) => boolean)[]) => boolean;
/** vsc-base method
 * @description
 * Find a parent or ancestor (parent's parent) that matches conditions in a callback
 * @see [tsFindAncestor](http://vsc-base.org/#tsFindAncestor)
 * @vscType ts
 * @oneLineEx const ancestor = vsc.tsFindAncestor(node, ancestorNodeTestCallback)
 * @ex
// find a function with name 'someCaller'
const ancestor = vsc.tsFindAncestor(node, (childNode) => vsc.tsIsFunction(childNode, {
   name:/^someCaller$/
}))
 * @returns ts.Node | undefined
 */
export declare const tsFindAncestor: (node: ts.Node, callback: (ancestor: ts.Node, depth: number) => boolean) => ts.Node | undefined;
/** vsc-base method
 * @description
 * Test if it has a parent or ancestor (parent's parent) that matches conditions in a callback \
 * Using [tsFindAncestor](http://vsc-base.org/#tsFindAncestor)
 * @see [tsHasAncestor](http://vsc-base.org/#tsHasAncestor)
 * @vscType ts
 * @oneLineEx const hasAncestor = vsc.tsHasAncestor(node, ancestorNodeTestCallback)
 * @ex
// find a function with name 'someCaller'
const hasAncestor = vsc.tsHasAncestor(node, (childNode) => vsc.tsIsFunction(childNode, {
   name:/^someCaller$/
}))
 * @returns boolean
 */
export declare const tsHasAncestor: (node: ts.Node, callback: (ancestor: ts.Node, depth: number) => boolean) => boolean;
/** vsc-base method
 * @description
 * Test is it has all ancestors (parent's parent) that matches conditions in a callback \
 * Using [tsFindAncestor](http://vsc-base.org/#tsFindAncestor)
 * @see [tsHasAncestors](http://vsc-base.org/#tsHasAncestors)
 * @vscType ts
 * @oneLineEx const hasAncestor = vsc.tsHasAncestor(node, ancestorNodeTestCallback)
 * @ex
// find a function with name 'someCaller'
const hasAncestor = vsc.tsHasAncestor(node, (childNode) => vsc.tsIsFunction(childNode, {
   name:/^someCaller$/
}))
 * @returns boolean
 */
export declare const tsHasAncestors: (node: ts.Node, callbacks: ((ancestor: ts.Node, depth: number) => boolean)[]) => boolean;
/** vsc-base method
 * @description
 * Test is a node is a object property (node: ts.PropertyAssignment) \
 * Optional test for its name with a string or regexp. \
 * Optional test for tsHasAncestor and hasGrandChild \
 * See [tsIsNode](http://vsc-base.org/#tsIsNode) \
 * Optional value can be tested against a string, a number (with a string, number or regexp). \
 * See [tsIsValue](http://vsc-base.org/#tsIsValue)
 * @see [tsMatchObjectProperty](http://vsc-base.org/#tsMatchObjectProperty)
 * @vscType ts
 * @oneLineEx const objNode = vsc.tsMatchObjectProperty(node, options)
 * @ex
const objNode = vsc.tsMatchObjectProperty(node, { name: /^keyName$/ })
 * @returns ts.PropertyAssignment | undefined
 */
export declare const tsMatchObjectProperty: (node: ts.Node | undefined, options?: {
    name?: RegExp | string;
    value?: (RegExp | string | number | boolean | null);
    variableName?: RegExp | string;
    parentObjectPropertyName?: RegExp | string;
    hasParent?: (parent: ts.Node) => boolean;
    hasAncestor?: (parent: ts.Node, depth: number) => boolean;
    hasAncestors?: ((parent: ts.Node, depth: number) => boolean)[];
    hasGrandChild?: (child: ts.Node, depth: number) => boolean;
    hasGrandChildren?: ((child: ts.Node, depth: number) => boolean)[];
}) => ts.PropertyAssignment | undefined;
/** vsc-base method
 * @description
 * Test if a node is a function \
 * (node: ts.isArrowFunction, ts.isFunctionExpression or ts.isFunctionDeclaration) \
 * Optional test for its name with a string or regexp. \
 * (For ArrowFunction's and FunctionExpression's it will test for a variable declaration that points to the function) \
 * Optional test for tsHasAncestor and hasGrandChild \
 * See [tsIsNode](http://vsc-base.org/#tsIsNode) \
 * @see [tsMatchFunction](http://vsc-base.org/#tsMatchFunction)
 * @vscType ts
 * @oneLineEx const funcNone = vsc.tsMatchFunction(node, options)
 * @ex
const funcNone = vsc.tsMatchFunction(node, { name: /^myCaller$/ })
 * @returns ts.ArrowFunction | ts.FunctionExpression | ts.FunctionDeclaration | undefined
 */
export declare const tsMatchFunction: (node: ts.Node | undefined, options?: {
    name?: RegExp | string;
    hasParent?: (parent: ts.Node) => boolean;
    hasAncestor?: (parent: ts.Node, depth: number) => boolean;
    hasAncestors?: ((parent: ts.Node, depth: number) => boolean)[];
    hasGrandChild?: (child: ts.Node, depth: number) => boolean;
    hasGrandChildren?: ((child: ts.Node, depth: number) => boolean)[];
}) => ts.ArrowFunction | ts.FunctionExpression | ts.FunctionDeclaration | undefined;
/** vsc-base method
 * @description
 * Test is a node is a variable declaration (node: ts.VariableDeclaration) \
 * Optional test for its name with a string or regexp, \
 * Optional test if its a const, let or var. \
 * Optional test for tsHasAncestor and hasGrandChild \
 * See [tsIsNode](http://vsc-base.org/#tsIsNode) \
 * Optional value can be tested against a string, a number (with a string, number or regexp). \
 * See [tsIsValue](http://vsc-base.org/#tsIsValue)
 * @see [tsMatchVariable](http://vsc-base.org/#tsMatchVariable)
 * @vscType ts
 * @oneLineEx const varNode = vsc.tsMatchVariable(node, options)
 * @ex
const varNode = vsc.tsMatchVariable(node, { name: /^myCaller$/ })
 * @returns ts.VariableDeclaration | undefined
 */
export declare const tsMatchVariable: (node: ts.Node | undefined, options?: {
    name?: RegExp | string;
    value?: (RegExp | string | number | boolean | null);
    isConst?: boolean;
    isLet?: boolean;
    isVar?: boolean;
    hasParent?: (parent: ts.Node) => boolean;
    hasAncestor?: (parent: ts.Node, depth: number) => boolean;
    hasGrandChild?: (child: ts.Node, depth: number) => boolean;
    hasAncestors?: ((parent: ts.Node, depth: number) => boolean)[];
    hasGrandChildren?: ((child: ts.Node, depth: number) => boolean)[];
}) => ts.VariableDeclaration | undefined;
/** vsc-base method
 * @description
 * Test is a node is a identifier (node: ts.Identifier) \
 * Optional test for its name with a string or regexp, \
 * Optional test for tsHasAncestor and hasGrandChild \
 * See [tsIsNode](http://vsc-base.org/#tsIsNode) \
 * @see [tsMatchIdentifier](http://vsc-base.org/#tsMatchIdentifier)
 * @vscType ts
 * @oneLineEx const identifierNode = vsc.tsMatchIdentifier(node, options)
 * @ex
const identifierNode = vsc.tsMatchIdentifier(node, { name: /^myCaller$/ })
 * @returns ts.Identifier | undefined
 */
export declare const tsMatchIdentifier: (node: ts.Node | undefined, options?: {
    name?: RegExp | string;
    hasParent?: (parent: ts.Node) => boolean;
    hasAncestor?: (parent: ts.Node, depth: number) => boolean;
    hasAncestors?: ((parent: ts.Node, depth: number) => boolean)[];
}) => ts.Identifier | undefined;
/** vsc-base method
 * @description
 * Test is a node is an interface (node: ts.InterfaceDeclaration) \
 * and optional test for its name with a string or regexp. \
 * Optional test for hasAncestor and hasGrandchild. \
 * See [tsIsNode](http://vsc-base.org/#tsIsNode) \
 * @see [tsMatchEnum](http://vsc-base.org/#tsMatchEnum)
 * @vscType ts
 * @oneLineEx const interfaceNode = vsc.tsMatchInterface(node, options)
 * @ex
const interfaceNode = vsc.tsMatchInterface(node, { name: /^myCaller$/ })
 * @returns ts.EnumDeclaration | undefined
 */
export declare const tsMatchInterface: (node: ts.Node | undefined, options?: {
    name?: RegExp | string;
    hasParent?: (parent: ts.Node) => boolean;
    hasAncestor?: (parent: ts.Node, depth: number) => boolean;
    hasGrandChild?: (child: ts.Node, depth: number) => boolean;
    hasAncestors?: ((parent: ts.Node, depth: number) => boolean)[];
    hasGrandChildren?: ((child: ts.Node, depth: number) => boolean)[];
}) => ts.InterfaceDeclaration | undefined;
/** vsc-base method
 * @description
 * Test is a node is an type reference (node: ts.TypeReferenceNode) \
 * and optional test for its name with a string or regexp. \
 * Optional test for hasAncestor and hasGrandchild. \
 * See [tsIsNode](http://vsc-base.org/#tsIsNode) \
 * @see [tsMatchEnum](http://vsc-base.org/#tsMatchEnum)
 * @vscType ts
 * @oneLineEx const typeRefNode = vsc.tsMatchTypeRef(node, options)
 * @ex
const typeRefNode = vsc.tsMatchTypeRef(node, { name: /^myCaller$/ })
 * @returns ts.TypeReferenceNode | undefined
 */
export declare const tsMatchTypeRef: (node: ts.Node | undefined, options?: {
    name?: RegExp | string;
    hasParent?: (parent: ts.Node) => boolean;
    hasAncestor?: (parent: ts.Node, depth: number) => boolean;
    hasGrandChild?: (child: ts.Node, depth: number) => boolean;
    hasAncestors?: ((parent: ts.Node, depth: number) => boolean)[];
    hasGrandChildren?: ((child: ts.Node, depth: number) => boolean)[];
}) => ts.TypeReferenceNode | undefined;
/** vsc-base method
 * @description
 * Test is a node is an enum  declaration (node: ts.EnumDeclaration) \
 * and optional test for its name with a string or regexp. \
 * Optional test for hasAncestor and hasGrandchild. \
 * See [tsIsNode](http://vsc-base.org/#tsIsNode) \
 * @see [tsMatchEnum](http://vsc-base.org/#tsMatchEnum)
 * @vscType ts
 * @oneLineEx const enumNode = vsc.tsMatchEnum(node, options)
 * @ex
const enumNode = vsc.tsMatchEnum(node, { name: /^myCaller$/ })
 * @returns ts.EnumDeclaration | undefined
 */
export declare const tsMatchEnum: (node: ts.Node | undefined, options?: {
    name?: RegExp | string;
    hasParent?: (parent: ts.Node) => boolean;
    hasAncestor?: (parent: ts.Node, depth: number) => boolean;
    hasGrandChild?: (child: ts.Node, depth: number) => boolean;
    hasAncestors?: ((parent: ts.Node, depth: number) => boolean)[];
    hasGrandChildren?: ((child: ts.Node, depth: number) => boolean)[];
}) => ts.EnumDeclaration | undefined;
/** vsc-base method
 * @description
 * Test is a node is a enum member (node: ts.EnumMember) \
 * and optional test for its name, the enum' name (its parent) \
 * it value, hasAncestor and hasGrandchild \
 * See [tsIsNode](http://vsc-base.org/#tsIsNode) \
 * @see [tsMatchEnumMember](http://vsc-base.org/#tsMatchEnumMember)
 * @vscType ts
 * @oneLineEx const enumMemberNode = vsc.tsMatchEnumMember(node, options)
 * @ex
const enumMemberNode = vsc.tsMatchEnumMember(node, { name: /^myCaller$/ })
 * @returns ts.EnumMember | undefined
 */
export declare const tsMatchEnumMember: (node: ts.Node | undefined, options?: {
    name?: RegExp | string;
    value?: (RegExp | string | number | boolean | null);
    enumName?: RegExp | string;
    hasParent?: (parent: ts.Node) => boolean;
    hasAncestor?: (parent: ts.Node, depth: number) => boolean;
    hasAncestors?: ((parent: ts.Node, depth: number) => boolean)[];
    hasGrandChild?: (child: ts.Node, depth: number) => boolean;
    hasGrandChildren?: ((child: ts.Node, depth: number) => boolean)[];
}) => ts.EnumMember | undefined;
/** vsc-base method
 * @description
 * Test is a node is a call expression (node: ts.CallExpression) \
 * and optional test for its name, and arguments.\
 * it's value, hasAncestor and hasGrandchild \
 * See [tsIsNode](http://vsc-base.org/#tsIsNode) \
 * @see [tsMatchCall](http://vsc-base.org/#tsMatchCall)
 * @vscType ts
 * @oneLineEx const callNode = vsc.tsMatchCall(node, options)
 * @ex
const callNode = vsc.tsMatchCall(node, { name: /^myCaller$/ })
 * @returns ts.CallExpression | undefined
 */
export declare const tsMatchCall: (node: ts.Node | undefined, options?: {
    name?: RegExp | string;
    hasArgument?: (parent: ts.Node) => boolean;
    hasArguments?: ((parent: ts.Node) => boolean)[];
    hasParent?: (parent: ts.Node) => boolean;
    hasAncestor?: (parent: ts.Node, depth: number) => boolean;
    hasAncestors?: ((parent: ts.Node, depth: number) => boolean)[];
    hasGrandChild?: (child: ts.Node, depth: number) => boolean;
    hasGrandChildren?: ((child: ts.Node, depth: number) => boolean)[];
}) => ts.CallExpression | undefined;
/** vsc-base method
 * @description
 * Test is a node is a call expression (node: ts.CallExpression) \
 * and optional test for its name, and arguments.\
 * it's value, hasAncestor and hasGrandchild \
 * See [tsIsNode](http://vsc-base.org/#tsIsNode) \
 * @see [tsIsCall](http://vsc-base.org/#tsIsCall)
 * @vscType ts
 * @oneLineEx const isCall = vsc.tsIsCall(node, options)
 * @ex
const isCall = vsc.tsMatchCall(node, { name: /^myCaller$/ })
 * @returns boolean
 */
export declare const tsIsCall: (node: ts.Node | undefined, options?: {
    name?: RegExp | string;
    hasArgument?: (parent: ts.Node) => boolean;
    hasArguments?: ((parent: ts.Node) => boolean)[];
    hasParent?: (parent: ts.Node) => boolean;
    hasAncestor?: (parent: ts.Node, depth: number) => boolean;
    hasAncestors?: ((parent: ts.Node, depth: number) => boolean)[];
    hasGrandChild?: (child: ts.Node, depth: number) => boolean;
    hasGrandChildren?: ((child: ts.Node, depth: number) => boolean)[];
}) => boolean;
/** vsc-base method
 * @description
 * Test is a node is a object property (node: ts.PropertyAssignment) \
 * Uses [tsMatchObjectProperty](http://vsc-base.org/#tsMatchObjectProperty)
 * @see [tsIsObjectProperty](http://vsc-base.org/#tsIsObjectProperty)
 * @vscType ts
 * @oneLineEx const isObjNode = vsc.tsIsObjectProperty(node, options)
 * @ex
const isObjNode = vsc.tsIsObjectProperty(node, { name: /^keyName$/ })
 * @returns boolean
 */
export declare const tsIsObjectProperty: (node: ts.Node | undefined, options?: {
    name?: RegExp | string;
    value?: (RegExp | string | number | boolean | null);
    variableName?: RegExp | string;
    parentObjectPropertyName?: RegExp | string;
    hasParent?: (parent: ts.Node) => boolean;
    hasAncestor?: (parent: ts.Node, depth: number) => boolean;
    hasAncestors?: ((parent: ts.Node, depth: number) => boolean)[];
    hasGrandChild?: (child: ts.Node, depth: number) => boolean;
    hasGrandChildren?: ((child: ts.Node, depth: number) => boolean)[];
}) => boolean;
/** vsc-base method
 * @description
 * Test if a node is a function \
 * (node: ts.isArrowFunction, ts.isFunctionExpression or ts.isFunctionDeclaration) \
 * Uses [tsMatchFunction](http://vsc-base.org/#tsMatchFunction)
 * @see [tsIsFunction](http://vsc-base.org/#tsIsFunction)
 * @vscType ts
 * @oneLineEx const isFunctionNone = vsc.tsIsFunction(node, options)
 * @ex
const isFunctionNone = vsc.tsIsFunction(node, { name: /^myCaller$/ })
 * @returns boolean
 */
export declare const tsIsFunction: (node: ts.Node | undefined, options?: {
    name?: RegExp | string;
    hasParent?: (parent: ts.Node) => boolean;
    hasAncestor?: (parent: ts.Node, depth: number) => boolean;
    hasAncestors?: ((parent: ts.Node, depth: number) => boolean)[];
    hasGrandChild?: (child: ts.Node, depth: number) => boolean;
    hasGrandChildren?: ((child: ts.Node, depth: number) => boolean)[];
}) => boolean;
/** vsc-base method
 * @description
 * Test is a node is a variable declaration (node: ts.VariableDeclaration) \
 * Uses [tsMatchVariable](http://vsc-base.org/#tsMatchVariable)
 * @see [tsIsVariable](http://vsc-base.org/#tsIsVariable)
 * @vscType ts
 * @oneLineEx const isVariableNode = vsc.tsIsVariable(node, options)
 * @ex
const isVariableNode = vsc.tsIsVariable(node, { name: /^myCaller$/ })
 * @returns boolean
 */
export declare const tsIsVariable: (node: ts.Node | undefined, options?: {
    name?: RegExp | string;
    value?: (RegExp | string | number | boolean | null);
    isConst?: boolean;
    isLet?: boolean;
    isVar?: boolean;
    hasParent?: (parent: ts.Node) => boolean;
    hasAncestor?: (parent: ts.Node, depth: number) => boolean;
    hasGrandChild?: (child: ts.Node, depth: number) => boolean;
    hasAncestors?: ((parent: ts.Node, depth: number) => boolean)[];
    hasGrandChildren?: ((child: ts.Node, depth: number) => boolean)[];
}) => boolean;
/** vsc-base method
 * @description
 * Test is a node is a variable declaration (node: ts.VariableDeclaration) \
 * Uses [tsMatchIdentifier](http://vsc-base.org/#tsMatchIdentifier)
 * @see [tsIsIdentifier](http://vsc-base.org/#tsIsIdentifier)
 * @vscType ts
 * @oneLineEx const isIdentifierNode = vsc.tsIsIdentifier(node, options)
 * @ex
const isIdentifierNode = vsc.tsIsIdentifier(node, { name: /^myCaller$/ })
 * @returns boolean
 */
export declare const tsIsIdentifier: (node: ts.Node | undefined, options?: {
    name?: RegExp | string;
    hasParent?: (parent: ts.Node) => boolean;
    hasAncestor?: (parent: ts.Node, depth: number) => boolean;
    hasAncestors?: ((parent: ts.Node, depth: number) => boolean)[];
}) => boolean;
/** vsc-base method
 * @description
 * Test is a node is an interface (node: ts.InterfaceDeclaration) \
 * Uses [tsMatchInterface](http://vsc-base.org/#tsMatchInterface)
 * @see [tsIsEnum](http://vsc-base.org/#tsIsEnum)
 * @vscType ts
 * @oneLineEx const isInterfaceNode = vsc.tsIsInterface(node, options)
 * @ex
const isInterfaceNode = vsc.tsIsInterface(node, { name: /^myCaller$/ })
 * @returns boolean
 */
export declare const tsIsInterface: (node: ts.Node | undefined, options?: {
    name?: RegExp | string;
    hasParent?: (parent: ts.Node) => boolean;
    hasAncestor?: (parent: ts.Node, depth: number) => boolean;
    hasGrandChild?: (child: ts.Node, depth: number) => boolean;
    hasAncestors?: ((parent: ts.Node, depth: number) => boolean)[];
    hasGrandChildren?: ((child: ts.Node, depth: number) => boolean)[];
}) => boolean;
/** vsc-base method
 * @description
 * Test is a node is an type reference (node: ts.TypeReferenceNode) \
 * Uses [tsMatchTypeRef](http://vsc-base.org/#tsMatchTypeRef)
 * @see [tsIsEnum](http://vsc-base.org/#tsIsEnum)
 * @vscType ts
 * @oneLineEx const isTypeRefNode = vsc.tsIsTypeRef(node, options)
 * @ex
const isTypeRefNode = vsc.tsIsTypeRef(node, { name: /^myCaller$/ })
 * @returns boolean
 */
export declare const tsIsTypeRef: (node: ts.Node | undefined, options?: {
    name?: RegExp | string;
    hasParent?: (parent: ts.Node) => boolean;
    hasAncestor?: (parent: ts.Node, depth: number) => boolean;
    hasGrandChild?: (child: ts.Node, depth: number) => boolean;
    hasAncestors?: ((parent: ts.Node, depth: number) => boolean)[];
    hasGrandChildren?: ((child: ts.Node, depth: number) => boolean)[];
}) => boolean;
/** vsc-base method
 * @description
 * Test is a node is an enum  declaration (node: ts.EnumDeclaration) \
 * Uses [tsMatchEnum](http://vsc-base.org/#tsMatchEnum)
 * @see [tsIsEnum](http://vsc-base.org/#tsIsEnum)
 * @vscType ts
 * @oneLineEx const isEnumNode = vsc.tsIsEnum(node, options)
 * @ex
const isEnumNode = vsc.tsIsEnum(node, { name: /^myCaller$/ })
 * @returns boolean
 */
export declare const tsIsEnum: (node: ts.Node | undefined, options?: {
    name?: RegExp | string;
    hasParent?: (parent: ts.Node) => boolean;
    hasAncestor?: (parent: ts.Node, depth: number) => boolean;
    hasGrandChild?: (child: ts.Node, depth: number) => boolean;
    hasAncestors?: ((parent: ts.Node, depth: number) => boolean)[];
    hasGrandChildren?: ((child: ts.Node, depth: number) => boolean)[];
}) => boolean;
/** vsc-base method
 * @description
 * Test is a node is a enum member (node: ts.EnumMember) \
 * Uses [tsMatchEnumMember](http://vsc-base.org/#tsMatchEnumMember)
 * @see [tsIsEnumMember](http://vsc-base.org/#tsIsEnumMember)
 * @vscType ts
 * @oneLineEx const isEnumMember = vsc.tsIsEnumMember(node, options)
 * @ex
const isEnumMember = vsc.tsIsEnumMember(node, { name: /^myCaller$/ })
 * @returns boolean
 */
export declare const tsIsEnumMember: (node: ts.Node | undefined, options?: {
    name?: RegExp | string;
    value?: (RegExp | string | number | boolean | null);
    enumName?: RegExp | string;
    hasParent?: (parent: ts.Node) => boolean;
    hasAncestor?: (parent: ts.Node, depth: number) => boolean;
    hasAncestors?: ((parent: ts.Node, depth: number) => boolean)[];
    hasGrandChild?: (child: ts.Node, depth: number) => boolean;
    hasGrandChildren?: ((child: ts.Node, depth: number) => boolean)[];
}) => boolean;
/** vsc-base method
 * @description
 * Base test for node properties. \
 * Optional test for its name with a string or regexp. \
 * (return false for node that don't have name property)\
 * Optional test for tsHasAncestor and hasGrandChild \
 * See [tsHasAncestor](http://vsc-base.org/#tsHasAncestor), [tsHasAncestors](http://vsc-base.org/#tsHasAncestors), [hasGrandChild](http://vsc-base.org/#hasGrandChild) and [hasGrandChildren](http://vsc-base.org/#hasGrandChildren) \
 * Optional value can be tested against a string, a number (with a string, number or regexp). \
 * (return false for node that don't have initializer)\
 * See [tsIsValue](http://vsc-base.org/#tsIsValue) \
 * @see [tsIsNode](http://vsc-base.org/#tsIsNode)
 * @vscType ts
 * @oneLineEx const found = vsc.tsIsNode(node, options)
 * @ex
const found = vsc.tsIsNode(node, { name: /^keyName$/ })
 * @returns ts.PropertyAssignment | undefined
 */
export declare const tsIsNode: (node: ts.Node | undefined, options?: {
    name?: RegExp | string;
    value?: (RegExp | string | number | boolean | null);
    hasParent?: (parent: ts.Node) => boolean;
    hasAncestor?: (parent: ts.Node, depth: number) => boolean;
    hasAncestors?: ((parent: ts.Node, depth: number) => boolean)[];
    hasGrandChild?: (child: ts.Node, depth: number) => boolean;
    hasGrandChildren?: ((child: ts.Node, depth: number) => boolean)[];
}) => boolean;
/** vsc-base method
 * @description
 * Test if node is an value: string expression, number expression or boolean (true or false) \
 * and match the value: true, false, a number, a string, \
 * A RegExp can be applied for string/number search. \
 * Optional test hasAncestor. \
 * See [tsHasAncestor](http://vsc-base.org/#tsHasAncestor) and [tsHasAncestors](http://vsc-base.org/#tsHasAncestors)
 * @see [tsIsValue](http://vsc-base.org/#tsIsValue)
 * @vscType ts
 * @oneLineEx const found = vsc.tsIsValue(node, value)
 * @ex
// Found a NumberExpression with value 12
const foundNumberExpression = vsc.tsIsValue(node, 12)
// Found a NumberExpression with value 12, with a parent EnumValue
const foundNumberExpression = vsc.tsIsValue(node, 12, {
   hasParent: parent => vsc.matchEnum(parent)
})

 * @returns boolean
 */
export declare const tsIsValue: (node: ts.Node | undefined, value: (RegExp | string | number | boolean | null), options?: {
    hasParent: (parent: ts.Node) => boolean;
    hasAncestor?: (parent: ts.Node, depth: number) => boolean;
    hasAncestors?: ((parent: ts.Node, depth: number) => boolean)[];
}) => boolean;
