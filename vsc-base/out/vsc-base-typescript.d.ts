import * as ts from 'typescript';
import * as vsc from './vsc-base';
/**
 * @description
 * Transpile ts source to js
 * @see http://vsc-base.org/#transpileTs
 * @param sourceTs
 * @param compilerOptions
 * @vscType System
 * @oneLineEx const sourceJs = vsc.transpileTs(sourceTs)
 * @returns string
 */
export declare const transpileTs: (sourceTs: string, compilerOptions?: ts.CompilerOptions) => string;
/**
 * @description
 * Pre method for loadTsModule. \
 * (This methods load the ts source, transpile it to js and replace all 'require' instance)
 * @see http://vsc-base.org/#loadTsModuleSourceCode
 * @param path
 * @param compilerOptions
 * @param moduleMap default = vsc.getVscDefaultModuleMap()
 * @vscType System
 * @oneLineEx const sourceJs = await vsc.loadTsModuleSourceCode(path)
 * @returns Promise<string>
 */
export declare const loadTsModuleSourceCode: (path: string, compilerOptions?: ts.CompilerOptions) => Promise<string>;
/**
 * @description
 * Return the default module map of vsc-base \
 * (Used for ts compiling, module load ect)
 * @see http://vsc-base.org/#getVscDefaultModuleMap
 * @internal this method is primary used by vsc.loadTsModule
 * @vscType System
 * @oneLineEx const moduleMap = vsc.getVscDefaultModuleMap
 * @returns \{ [key: string]: \{ name: string, module: any \} \}
 */
export declare const getVscDefaultModuleMap: () => {
    key: string;
    name: string;
    module: any;
}[];
/**
 * @description
 * Replace ts traspiles code's require for vsc, ts, fs and vscode.
 * @see http://vsc-base.org/#rewriteTsTranpiledCodeWithVscBaseModules
 * @internal this method is primary used by vsc.loadTsModule
 * @notes
 * ts.transpile as follows:
 * const vsc_base_1 = require("vsc-base");
 * const fs = require("fs-extra");
 * const typescript_1 = require("typescript");
 * const vscode = require("vscode");
 * @vscType System
 * @oneLineEx sourceJs = vsc.rewriteTsTranpiledCodeWithVscBaseModules(sourceJs)
 * @param sourceJs
 * @returns string
 */
export declare const rewriteTsTranpiledCodeWithVscBaseModules: (sourceJs: string) => string;
/**
 * @description
 * Load a ts file. \
 * Transpile it to js (run time) add wrap code and execute it (using eval)! \
 * Returning an plainObject with the scripts exports. \
 * export default xxx transpile s to export.default \
 * IMPORTANT Dont just run code you dont now, this can cause injection! \
 * IMPORTANT Be carefull when running scripts that also uses loadTsModule, this can break down entire systems! \
 * (If you start a recursive change that dont stop..)
 * @see http://vsc-base.org/#loadTsModule
 * @param path
 * @dependencyExternal ts
 * @dependencyInternal getFileContent, showErrorMessage
 * @vscType System
 * @oneLineEx const module = await vsc.loadTsModule(path)
 * @ex
let _module
try {
   _module = await vsc.loadTsModule(path)
} catch (e){
   vsc.showErrorMessage(`Loadeding module coused an error: ${e}`)
   return
}
const varifiedModule = vsc.varifyModuleMethods(_module, ['run'])
if (!varifiedModule) {
   vsc.showErrorMessage(`Module didnt have 'run' :: ${JSON.stringify(_module)}`)
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
export declare const loadTsModule: (path: string, compilerOptions?: ts.CompilerOptions) => Promise<{
    [key: string]: unknown;
}>;
export declare class LoadTsModuleError extends Error {
    transpiledCode: string;
    constructor(message: string, transpiledCode: string);
}
/**
 * @description
 * Test if a loaded module has methods (Loaded with vsc.loadTsModule) \
 * return undefined if a method didnt exist.
 * @see http://vsc-base.org/#varifyModuleMethods
 * @vscType System
 * @oneLineEx const varifyModuleMethods = vsc.varifyModuleMethods(_module, methodName)
 * @ex
const varifiedModule = vsc.varifyModuleMethods(_module, \['run', 'getId'\])
const result = varifiedModule.run()
 * @returns { [key: string]: any } | undefined
 */
export declare const varifyModuleMethods: (_module: {
    [key: string]: unknown;
}, methods: string[]) => {
    [key: string]: any;
} | undefined;
/**
 * @description
 * Ensure that a method result that optional can be a promise is awaited. \
 * (Responses from methods loaded with vsc.loadTsModule can be optional async!)
 * @see http://vsc-base.org/#awaitResult
 * @vscType ts
 * @oneLineEx await vsc.awaitResult(result)
 * @ex
 const varifiedModule = vsc.varifyModuleMethods(_module, \['run'])
 const result = varifiedModule.run()
 await vsc.awaitResult(result)
 * @returns Promise<any>
 */
export declare const awaitResult: (result: any) => Promise<any>;
/**
 * @description
 * Tranform source code using custom transformers \
 * See createTsTransformerFactory and createTsRemoveTransformerFactory for creating transformer \
 * (See http://vsc-base.org/#createTsTransformerFactory, http://vsc-base.org/#createTsRemoveTransformerFactory)
 * @see http://vsc-base.org/#tsTransform
 * @param source
 * @param transformers
 * @param compilerOptions
 * @param printer
 * @internal
 * @experimental This method can easily change, because ts api is in experimental state.
 * @vscType ts
 * @oneLineEx const updatedCode = vsc.tsTransform(code, \[tranformer1, tranformer2\])
 */
export declare const tsTransform: (source: string, transformers: ts.TransformerFactory<ts.SourceFile>[], compilerOptions?: ts.CompilerOptions, printer?: ts.Printer) => string;
/**
 * @description
 * Tranform a ts.Node \
 * (default node-type is ts.Sourcefile)
 * @see http://vsc-base.org/#tsTransformSourceFile
 * @param sourceFile
 * @param transformers
 * @param compilerOptions
 * @internal
 * @experimental This method can easily change, because ts api is in experimental state.
 * @vscType ts
 * @oneLineEx const result = tsTransformSourceFile(sourceFile, transformers, compilerOptions)
 */
export declare const tsTransformSourceFile: <T extends ts.Node = ts.SourceFile>(sourceFile: T, transformers: ts.TransformerFactory<T>[], compilerOptions?: ts.CompilerOptions) => ts.TransformationResult<T>;
/**
 * @description
 * vsc-base's internal default ts compiler options
 * @see http://vsc-base.org/#DefaultTsCompilerOptions
 * @internal
 * @experimental This method can easily change, because ts api is in experimental state.
 * @vscType ts
 * @oneLineEx const compilerOptions = vsc.DefaultTsCompilerOptions
 */
export declare const DefaultTsCompilerOptions: Readonly<ts.CompilerOptions>;
/**
 * @description
 * Create a ts.SourceFile
 * @see http://vsc-base.org/#createTsSourceFile
 * @param content
 * @param sourceFileName
 * @experimental This method can easily change, because ts api is in experimental state.
 * @vscType ts
 * @oneLineEx const sourceFile = vsc.createTsSourceFile(code)
 */
export declare const createTsSourceFile: (content: string, sourceFileName?: string) => ts.SourceFile;
/**
 * @description
 * ts.Node's getChildren and getChildrenCount uses tokens not parsed nodes. \
 * So to this method uses ts's forEachChild to colloct the parsed nodes. \
 * Mostly used in custom transformer method
 * @see http://vsc-base.org/#tsParsedNodeChildrenCount
 * @params node
 * @experimental This method can easily change, because ts api is in experimental state.
 * @vscType ts
 * @oneLineEx const children = vsc.tsGetParsedChildrenNodes(node)
 */
export declare const tsGetParsedChildrenNodes: (node: ts.Node) => ts.Node[];
/**
 * @description
 * Create a Ts Transformer factory \
 * You can use: \
 * https://ts-ast-viewer.com/ \
 * or \
 * https://astexplorer.net/ \
 * to generate the new node or node type.
 * @see http://vsc-base.org/#createTsTransformerFactory
 * @param callback
 * @param program
 * @vscType ts
 * @experimental This method can easily change, because ts api is in experimental state.
 * @oneLineEx const transformer = vsc.createTranformer(transformerCallback)
 * @ex
// tranforms arrowFunction with one return statement to lambda function
const transformer = vsc.createTsTransformerFactory((node) => {
   if (!ts.isArrowFunction(node)) { // is not an arrow funcion
      return
   }
   const children = vsc.tsGetParsedChildrenNodes(node.body)
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
   node.body = returnExpression
   return [true, node]
});

const updatedCode = tsTransform(code, [transformer]);

 * @returns ts.TransformerFactory<T>
 */
export declare const createTsTransformerFactory: <T extends ts.Node = ts.SourceFile>(callback: vsc.TsTransformerCallback, program?: ts.Program | undefined) => ts.TransformerFactory<T>;
export declare type TsTransformerCallback = (node: ts.Node, typeChecker?: ts.TypeChecker, program?: ts.Program) => ts.Node | undefined;
/**
 * @description
 * Create Basic Ts Transformer for removing nodes \
 * You can use https://ts-ast-viewer.com/ to generate the new node or node type.
 * @see http://vsc-base.org/#createTsRemoveNodesTransformerFactory
 * @vscType ts
 * @oneLineEx const transformer = vsc.createTranformer(transformerCallback)
 * @ex
// Remove all 'debugger' statements
const removeDebuggerTransformner = createTsRemoveNodesTransformerFactory((node) => {
   if (ts.isDebuggerStatement(node)) {
      return true
   }
   return false
});

 * @returns ts.TransformerFactory<T>
 */
export declare const createTsRemoveNodesTransformerFactory: <T extends ts.Node = ts.SourceFile>(callback: vsc.TsRemoveTransformer, program?: ts.Program | undefined) => ts.TransformerFactory<T>;
export declare type TsRemoveTransformer = (node: ts.Node, typeChecker?: ts.TypeChecker, program?: ts.Program) => boolean;
