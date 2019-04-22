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
 * Replace ts traspiles code's require for vsc, ts, fs and vscode.
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
 * export default xxx transpile's to export.default \
 * IMPORTANT Dont just run code you dont now, this can cause injection! \
 * IMPORTANT Be carefull when running scripts that also uses tsLoadModule, this can break down entire systems! \
 * (If you start a recursive change that dont stop..)
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
   vsc.showErrorMessage(`Loadeding module coused an error: ${e}`)
   return
}
const varifiedModule = vsc.varifyModuleMethods(moduleObj, ['run'])
if (!varifiedModule) {
   vsc.showErrorMessage(`Module didnt have 'run' :: ${JSON.stringify(moduleObj)}`)
   return
}
try {
   const result = varifiedModule.run()
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
 * return undefined if a method didnt exist.
 * @see [varifyModuleMethods](http://vsc-base.org/#varifyModuleMethods)
 * @vscType System
 * @oneLineEx const varifyModuleMethods = vsc.varifyModuleMethods(_module, methodName)
 * @ex
const varifiedModule = vsc.varifyModuleMethods(_module, ['run', 'getId'])
const result = varifiedModule.run()
 * @returns { [key: string]: any } | undefined
 */
export declare const varifyModuleMethods: (_module: {
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
 const varifiedModule = vsc.varifyModuleMethods(_module, ['run'])
 const result = varifiedModule.run()
 await vsc.awaitResult(result)
 * @returns Promise<any>
 */
export declare const awaitResult: (result: any) => Promise<any>;
/** vsc-base method
 * @description
 * Tranform source code using custom transformers \
 * See tsCreateTransformer and tsCreateRemoveNodesTransformer for creating transformer \
 * \
 * See also [tsCreateTransformer](http://vsc-base.org/#tsCreateTransformer) and [tsCreateRemoveNodesTransformer](http://vsc-base.org/#tsCreateRemoveNodesTransformer)
 * @see [tsTransform](http://vsc-base.org/#tsTransform)
 * @param source
 * @param transformers
 * @param compilerOptions
 * @param printer
 * @internal
 * @experimental This method can easily change, because ts api is in experimental state.
 * @vscType ts
 * @oneLineEx const updatedCode = vsc.tsTransform(code, [tranformer1, tranformer2])
 */
export declare const tsTransform: (source: string, transformers: ts.TransformerFactory<ts.SourceFile>[], compilerOptions?: ts.CompilerOptions, printer?: ts.Printer) => string;
/** vsc-base method
 * @description
 * This is like a tsTranform, but it doenst transform or print content.\
 * \
 * @see [tsVisitWithTransformers](http://vsc-base.org/#tsVisitWithTransformers)
 * @param source
 * @param transformers
 * @param compilerOptions
 * @param printer
 * @internal
 * @experimental This method can easily change, because ts api is in experimental state.
 * @vscType ts
 * @oneLineEx vsc.tsVisitWithTransformers(code, [visitor1, trandsformer1])
 */
export declare const tsVisitWithTransformers: (source: string, transformers: ts.TransformerFactory<ts.SourceFile>[], compilerOptions?: ts.CompilerOptions) => void;
/** vsc-base method
 * @description
 * Tranform a ts.Node \
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
 * So to this method uses ts's forEachChild to colloct the parsed nodes. \
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
 * You can use  https://ts-ast-viewer.com/  or  https://astexplorer.net/ \
 * to generate the new ts nodes or node type.
 * @see [tsCreateTransformer](http://vsc-base.org/#tsCreateTransformer)
 * @param callback
 * @param program
 * @vscType ts
 * @experimental This method can easily change, because ts api is in experimental state.
 * @oneLineEx const transformer = vsc.tsCreateTransformer(transformerCallback)
 * @ex
// tranforms arrowFunction with one return statement to lambda function
const transformer = vsc.tsCreateTransformer((node) => {
   if (!ts.isArrowFunction(node)) { // is not an arrow funcion
      return
   }
   const children = vsc.tsGetParsedChildren(node.body)
   if (children.length !== 1) { // dont have one statement
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
export declare const tsCreateTransformer: <T extends ts.Node = ts.SourceFile>(callback: vsc.TsTransformerCallback, program?: ts.Program | undefined) => ts.TransformerFactory<T>;
export declare type TsTransformerCallback = (node: ts.Node, typeChecker?: ts.TypeChecker, program?: ts.Program) => ts.Node | undefined;
/** vsc-base method
 * @description
 * Create a Ts Transformer for removing nodes \
 * Normally used in vsc.tsTransform
 * You can use: \
 * https://ts-ast-viewer.com/ \
 * or \
 * https://astexplorer.net/ \
 * to generate the new ts nodes or node type.
 * @see [tsCreateRemoveNodesTransformer](http://vsc-base.org/#tsCreateRemoveNodesTransformer)
 * @vscType ts
 * @oneLineEx const transformer = vsc.tsCreateRemoveNodesTransformer(transformerCallback)
 * @ex
// Remove all 'debugger' statements
const removeDebuggerTransformner = vsc.tsCreateRemoveNodesTransformer((node) => {
   if (ts.isDebuggerStatement(node)) {
      return true
   }
   return false
});
//Run transformer:
const updatedCode = vsc.tsTransform(code, [removeDebuggerTransformner]);

 * @returns ts.TransformerFactory<T>
 */
export declare const tsCreateRemoveNodesTransformer: <T extends ts.Node = ts.SourceFile>(callback: vsc.TsRemoveTransformerCallback, program?: ts.Program | undefined) => ts.TransformerFactory<T>;
export declare type TsRemoveTransformerCallback = (node: ts.Node, typeChecker?: ts.TypeChecker, program?: ts.Program) => boolean;
/** vsc-base method
 * @description
 * Create a Ts Visitor Transformer for collecting data (Will not remove or reaplce any nodes) \
 * Normally used in vsc.tsTransform
 * You can use: \
 * https://ts-ast-viewer.com/ \
 * or \
 * https://astexplorer.net/ \
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
export declare const tsCreateNodeVisitor: <T extends ts.Node = ts.SourceFile>(callback: vsc.TsNodeVisitorCallback, program?: ts.Program | undefined) => ts.TransformerFactory<T>;
export declare type TsNodeVisitorCallback = (node: ts.Node, typeChecker?: ts.TypeChecker, program?: ts.Program) => void;
/** vsc-base method
 * @description
 * Create a Ts Visitor Transformer for finding a node and it position. \
 * @see [tsFindNodePosition](http://vsc-base.org/#tsFindNodePosition)
 * @vscType ts
 * @oneLineEx const [node, position] = vsc.tsFindNodePosition(source, findNodePositionCallback)
 * @ex
 const source = `
   const method2 = () => {
      const moduleNumber1Path = '/module/area/file1'
      return moduleNumber1Path
   }
   function method1(doit){
      if(doit){
         const moduleNumber1Path = '/module/area/file1' // <-- Find this
         return moduleNumber1Path
      }
   }
`
// Find a constant with name starting with 'module' witin a function but not in an if statement
const [_node, position] = vsc.tsFindNodePosition(source, node => {
   // test name of variable
   const nameIsCorrect = vsc.tsMatchVariable(node, { matchName: /^module/ })
   if (!nameIsCorrect) {
      return false
   }
   // test if is in function
   const funcAncestor = vsc.tsFindAncestor(node, (ancestor) => vsc.tsMatchFunction(ancestor, { matchName: /^method/ }))
   if (!funcAncestor) {
      return false
   }
   // test if is in if statement
   const ifAncestor = vsc.tsFindAncestor(node, (ancestor) => ts.isIfStatement(ancestor))
   if (!ifAncestor) {
      return false
   }
   // fund the correct node
   return true
})
if (position) {
   const realText = source.substring(position.start, position.end);
   // Select the source (asuming the source is from the open document)
   vsc.setSelection(position.start, position.end)
}
 * @returns [ts.Node | undefined, vsc.VscodePosition | undefined]
 */
export declare const tsFindNodePosition: (source: string, callback: vsc.TsFindNodePositionCallback, program?: ts.Program | undefined) => [ts.Node | undefined, vsc.VscodePosition | undefined];
export declare type TsFindNodePositionCallback = (node: ts.Node, typeChecker?: ts.TypeChecker, program?: ts.Program) => boolean;
/** vsc-base method
 * @description
 * Find is a direct parsedChild that matches conditions in a callback\
 * See also [tsFindGrandChildNode](http://vsc-base.org/#tsFindGrandChildNode) \
 * @see [tsFindChildNode](http://vsc-base.org/#tsFindChildNode)
 * @vscType ts
 * @oneLineEx const childNode = vsc.tsFindChildNode(node, childNodeTestCallback })
 * @ex
const childNode = vsc.tsFindChildNode(node, (childNode)=>{
   return vsc.tsMatchVariable(childNode, {
      matchName:/^varName$/,
      isConst: true
   })
})
 * @returns ts.Node | undefined
 */
export declare const tsFindChildNode: (node: ts.Node, callback: (child: ts.Node) => boolean) => ts.Node | undefined;
/** vsc-base method
 * @description
 * Find a child or grandChild (child's child) that matches conditions in a callback\
 * @see [tsFindGrandChildNode](http://vsc-base.org/#tsFindGrandChildNode)
 * @vscType ts
 * @oneLineEx const childNode = vsc.tsFindGrandChildNode(node, childNodeTestCallback)
 * @ex
// find a variable any where within the parent node, that is a const and has a staring name of: varName
const childNode = vsc.tsFindGrandChildNode(node, (childNode)=>{
   return vsc.tsMatchVariable(childNode, {
      matchName:/^varName/,
      isConst: true
   })
})
 * @returns ts.Node | undefined
 */
export declare const tsFindGrandChildNode: (node: ts.Node, callback: (child: ts.Node, depth: number) => boolean) => ts.Node | undefined;
/** vsc-base method
 * @description
 * Find a parent or ancestor (parent's parent) that matches conditions in a callback\
 * @see [tsMatchAncestor](http://vsc-base.org/#tsMatchAncestor)
 * @vscType ts
 * @oneLineEx const ancestor = vsc.tsFindAncestor(node, ancestorNodeTestCallback)
 * @ex
// find a function with name 'someCaller'
const ancestor = vsc.tsFindAncestor(node, (childNode)=>{
   return vsc.tsMatchFunction(childNode, {
      matchName:/^someCaller$/
   })
})
 * @returns ts.Node | undefined
 */
export declare const tsFindAncestor: (node: ts.Node, callback: (ansector: ts.Node, depth: number) => boolean) => ts.Node | undefined;
/** vsc-base method
 * @description
 * Test is a node is a object property (node: ts.PropertyAssignment) \
 * and optional test for its name
 * @see [tsMatchObjectProperty](http://vsc-base.org/#tsMatchObjectProperty)
 * @vscType ts
 * @oneLineEx const found = vsc.tsMatchObjectProperty(node, options)
 * @ex
const found = vsc.tsMatchObjectProperty(node, { matchName: /^keyName$/ })
 * @returns boolean
 */
export declare const tsMatchObjectProperty: TsMatchObjectProperty;
declare type TsMatchObjectProperty = (node: ts.Node, options?: {
    matchName?: RegExp;
}) => boolean;
/** vsc-base method
 * @description
 * Test is a node is a function \
 * (node: ts.SignatureDeclaration, Like FunctionDeclaration, FunctionExpression and ArrowFunction ect.. ) \
 * and optional test for its name. \
 * (For ArrowFunction's and FunctionExpression's it will test for a variable declaration that points to the function)
 * @see [tsMatchFunction](http://vsc-base.org/#tsMatchFunction)
 * @vscType ts
 * @oneLineEx const found = vsc.tsMatchFunction(node, options)
 * @ex
const found = vsc.tsMatchFunction(node, { matchName: /^myCaller$/ })
 * @returns boolean
 */
export declare const tsMatchFunction: TsMatchFunction;
declare type TsMatchFunction = (node: ts.Node, options?: {
    matchName?: RegExp;
}) => boolean;
/** vsc-base method
 * @description
 * Test is a node is a variable declaration (node: ts.VariableDeclaration) \
 * and optional test for its name, \
 * and is its a const, let or var.
 * @see [tsMatchFunction](http://vsc-base.org/#tsMatchFunction)
 * @vscType ts
 * @oneLineEx const found = vsc.tsMatchFunction(node, options)
 * @ex
const found = vsc.tsMatchFunction(node, { matchName: /^myCaller$/ })
 * @returns boolean
 */
export declare const tsMatchVariable: TsMatchVariable;
declare type TsMatchVariable = (node: ts.Node, options?: {
    matchName?: RegExp;
    isConst?: boolean;
    isLet?: boolean;
    isVar?: boolean;
}) => boolean;
export {};
