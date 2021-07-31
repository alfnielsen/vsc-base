/// <reference types="node" />
import * as ts from 'typescript';
/** vsc-base method
 * @description
 * Pre method for tsLoadModule. \
 * (This methods load the ts source, transpile it to js and replace all 'require' instance)
 * @see [tsLoadModuleSourceCode](http://vsc-base.org/#tsLoadModuleSourceCode)
 * @param path
 * @param compilerOptions
 * @param moduleMap default = vsc.getVscDefaultModuleMap()
 * @vscType System
 * @example
 * const sourceJs = await vsc.tsLoadModuleSourceCode(path)
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
 * @example
 * const moduleMap = vsc.getVscDefaultModuleMap()
 * @returns \{ [key: string]: \{ key: string, name: string, module: any \} \}
 */
export declare const getVscDefaultModuleMap: () => {
    key: string;
    name: string;
    module: any;
}[];
/** vsc-base method
 * @description
 * Replace ts transpiled code's require for vsc, ts, fs and vscode.
 * @see [tsRewriteTranspiledCodeWithVscBaseModules](http://vsc-base.org/#tsRewriteTranspiledCodeWithVscBaseModules)
 * @internal this method is primary used by vsc.tsLoadModule
 * @notes
 * ts.transpile as follows:
 * const vsc_base_1 = require("vsc-base");
 * const fs = require("fs-extra");
 * const typescript_1 = require("typescript");
 * const vscode = require("vscode");
 * @vscType System
 * @example
 * const sourceJs = vsc.tsRewriteTranspiledCodeWithVscBaseModules(sourceJs)
 * @param sourceJs
 * @returns string
 */
export declare const tsRewriteTranspiledCodeWithVscBaseModules: (sourceJs: string) => string;
/** vsc-base method
 * @description
 * Replace ts transpiled code's require by loading each import with another tsLoadModule execution. \
 * This enables tsLoadModule to load files with imports. \
 * IMPORTANT: It does not check for circular imports, which will create infinity loops!
 * @see [tsGetLocalModules](http://vsc-base.org/#tsGetLocalModules)
 * @internal this method is primary used by vsc.tsLoadModule
 * @notes
 * const XX = require("XXX");
 * @vscType System
 * @example
 * const sourceJs = vsc.tsGetLocalModules(baseDir, sourceJs, renameRequireToObject)
 * @param sourceJs
 * @returns string
 */
export declare const tsGetLocalModules: (baseDir: string, sourceJs: string, renameRequireToObject: string) => Promise<[string, {
    [key: string]: any;
}]>;
/** vsc-base method
 * @description
 * Load a ts file. \
 * Transpile it to js (run time) add wrap code and execute it (using eval)! \
 * Returning an plainObject with the scripts exports. \
 * export default xxx transpile to export.default \
 * IMPORTANT Don't just run code you don't now, this can cause injection! \
 * IMPORTANT Be careful when running scripts that also uses tsLoadModule, this can break down entire systems! \
 * (If you start a recursive change that don't stop..) \
 * IMPORTANT: It does not check for circular imports, which will create infinity loops! \
 * (Its recommended to only use imports from your local project that don't have other imports)
 * @see [tsLoadModule](http://vsc-base.org/#tsLoadModule)
 * @param path
 * @dependencyExternal ts
 * @dependencyInternal getFileContent, showErrorMessage
 * @vscType System
 * @example
 * const moduleObj = await vsc.tsLoadModule(path)
 * @example
 * let moduleObj
 * try {
 *   moduleObj = await vsc.tsLoadModule(path)
 * } catch (e){
 *   vsc.showErrorMessage(`Loading module coursed an error: ${e}`)
 *   return
 * }
 * const verifiedModule = vsc.verifyModuleMethods(
 *   moduleObj,
 *   ['run']
 * )
 * if (!verifiedModule) {
 *   vsc.showErrorMessage(`Module didn't have 'run' :: ${JSON.stringify(moduleObj)}`)
 *   return
 * }
 * try {
 *   const result = verifiedModule.run()
 *   await vsc.awaitResult(result)
 *   vsc.showMessage(`Loaded Run resulted with value: ${result}`)
 * } catch (e) {
 *   vsc.showErrorMessage('Error: ' + e)
 * }
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
 * @example
 * const verifyModuleMethods = vsc.verifyModuleMethods(_module, methodName)
 * @example
 * const verifiedModule = vsc.verifyModuleMethods(
 *   _module,
 *   ['run','getId']
 * )
 * const result = verifiedModule.run()
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
 * @example
 * await vsc.awaitResult(result)
 * @example
 * const verifiedModule = vsc.verifyModuleMethods(
 *   _module,
 *   ['run']
 * )
 * let result = verifiedModule.run()
 * result = await vsc.awaitResult(result)
 * @returns Promise<any>
 */
export declare const awaitResult: <T = any>(result: any) => Promise<T>;
