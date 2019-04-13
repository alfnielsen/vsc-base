import * as ts from 'typescript';
import * as vsc from './vsc-base';
/**
 * @description
 * Transpile ts source to js
 * @see http://vsc-base.org/#tsTranspile
 * @param sourceTs
 * @param compilerOptions
 * @vscType System
 * @oneLineEx const sourceJs = vsc.tsTranspile(sourceTs)
 * @returns string
 */
export declare const tsTranspile: (sourceTs: string, compilerOptions?: ts.CompilerOptions) => string;
/**
 * @description
 * Pre method for tsLoadModule. \
 * (This methods load the ts source, transpile it to js and replace all 'require' instance)
 * @see http://vsc-base.org/#tsLoadModuleSourceCode
 * @param path
 * @param compilerOptions
 * @param moduleMap default = vsc.getVscDefaultModuleMap()
 * @vscType System
 * @oneLineEx const sourceJs = await vsc.tsLoadModuleSourceCode(path)
 * @returns Promise<string>
 */
export declare const tsLoadModuleSourceCode: (path: string, compilerOptions?: ts.CompilerOptions) => Promise<string>;
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
 * @see http://vsc-base.org/#tsRewriteTranpiledCodeWithVscBaseModules
 * @internal this method is primary used by vsc.tsLoadModule
 * @notes
 * ts.transpile as follows:
 * const vsc_base_1 = require("vsc-base");
 * const fs = require("fs-extra");
 * const typescript_1 = require("typescript");
 * const vscode = require("vscode");
 * @vscType System
 * @oneLineEx sourceJs = vsc.tsRewriteTranpiledCodeWithVscBaseModules(sourceJs)
 * @param sourceJs
 * @returns string
 */
export declare const tsRewriteTranpiledCodeWithVscBaseModules: (sourceJs: string) => string;
/**
 * @description
 * Load a ts file. \
 * Transpile it to js (run time) add wrap code and execute it (using eval)! \
 * Returning an plainObject with the scripts exports. \
 * export default xxx transpile's to export.default \
 * IMPORTANT Dont just run code you dont now, this can cause injection! \
 * IMPORTANT Be carefull when running scripts that also uses tsLoadModule, this can break down entire systems! \
 * (If you start a recursive change that dont stop..)
 * @see http://vsc-base.org/#tsLoadModule
 * @param path
 * @dependencyExternal ts
 * @dependencyInternal getFileContent, showErrorMessage
 * @vscType System
 * @oneLineEx const module = await vsc.tsLoadModule(path)
 * @ex
let _module
try {
   _module = await vsc.tsLoadModule(path)
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
export declare const tsLoadModule: (path: string, compilerOptions?: ts.CompilerOptions) => Promise<{
    [key: string]: unknown;
}>;
export declare class TSLoadModuleError extends Error {
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
const varifiedModule = vsc.varifyModuleMethods(_module, ['run', 'getId'])
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
 * (Responses from methods loaded with vsc.tsLoadModule can be optional async!)
 * @see http://vsc-base.org/#awaitResult
 * @vscType ts
 * @oneLineEx await vsc.awaitResult(result)
 * @ex
 const varifiedModule = vsc.varifyModuleMethods(_module, ['run'])
 const result = varifiedModule.run()
 await vsc.awaitResult(result)
 * @returns Promise<any>
 */
export declare const awaitResult: (result: any) => Promise<any>;
/**
 * @description
 * Tranform source code using custom transformers \
 * See tsCreateTransformer and tsCreateRemoveTransformer for creating transformer \
 * \
 * See also http://vsc-base.org/#tsCreateTransformer and http://vsc-base.org/#tsCreateRemoveTransformer
 * @see http://vsc-base.org/#tsTransform
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
 * @see http://vsc-base.org/#TsDefaultCompilerOptions
 * @internal
 * @experimental This method can easily change, because ts api is in experimental state.
 * @vscType ts
 * @oneLineEx const compilerOptions = vsc.TsDefaultCompilerOptions
 */
export declare const TsDefaultCompilerOptions: Readonly<ts.CompilerOptions>;
/**
 * @description
 * Create a ts.SourceFile
 * @see http://vsc-base.org/#tsCreateSourceFile
 * @param content
 * @param sourceFileName
 * @experimental This method can easily change, because ts api is in experimental state.
 * @vscType ts
 * @oneLineEx const sourceFile = vsc.tsCreateSourceFile(code)
 */
export declare const tsCreateSourceFile: (content: string, sourceFileName?: string) => ts.SourceFile;
/**
 * @description
 * ts.Node's getChildren and getChildrenCount uses tokens not parsed nodes. \
 * So to this method uses ts's forEachChild to colloct the parsed nodes. \
 * Normally used in custom transformer methods (vsc.tsCreateTransformer)
 * @see http://vsc-base.org/#tsGetParsedChildren
 * @params node
 * @experimental This method can easily change, because ts api is in experimental state.
 * @vscType ts
 * @oneLineEx const children = vsc.tsGetParsedChildren(node)
 */
export declare const tsGetParsedChildren: (node: ts.Node) => ts.Node[];
/**
 * @description
 * Create a Ts Transformer factory \
 * Normally used in vsc.tsTransform
 * You can use: \
 * https://ts-ast-viewer.com/ \
 * or \
 * https://astexplorer.net/ \
 * to generate the new ts nodes or node type.
 * @see http://vsc-base.org/#tsCreateTransformer
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
   node.body = returnExpression
   return [true, node]
});

const updatedCode = tsTransform(code, [transformer]);

 * @returns ts.TransformerFactory<T>
 */
export declare const tsCreateTransformer: <T extends ts.Node = ts.SourceFile>(callback: vsc.TsTransformerCallback, program?: ts.Program | undefined) => ts.TransformerFactory<T>;
export declare type TsTransformerCallback = (node: ts.Node, typeChecker?: ts.TypeChecker, program?: ts.Program) => ts.Node | undefined;
/**
 * @description
 * Create a Ts Transformer for removing nodes \
 * Normally used in vsc.tsTransform
 * You can use: \
 * https://ts-ast-viewer.com/ \
 * or \
 * https://astexplorer.net/ \
 * to generate the new ts nodes or node type.
 * @see http://vsc-base.org/#tsCreateRemoveNodesTransformer
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

 * @returns ts.TransformerFactory<T>
 */
export declare const tsCreateRemoveNodesTransformer: <T extends ts.Node = ts.SourceFile>(callback: vsc.TsRemoveTransformerCallback, program?: ts.Program | undefined) => ts.TransformerFactory<T>;
export declare type TsRemoveTransformerCallback = (node: ts.Node, typeChecker?: ts.TypeChecker, program?: ts.Program) => boolean;
