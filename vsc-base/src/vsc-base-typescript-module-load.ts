import * as cp from 'child-process-promise'
import * as fs from 'fs-extra'
import * as ts from 'typescript'
import * as vscode from 'vscode'

import * as vsc from './vsc-base'

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
export const tsLoadModuleSourceCode = async (
   path: string,
   compilerOptions: ts.CompilerOptions = vsc.TsDefaultCompilerOptions
): Promise<string> => {
   const scriptFileTs = await vsc.getFileContent(path)
   let sourceJs = vsc.tsTranspile(scriptFileTs, compilerOptions)
   sourceJs = vsc.tsRewriteTranspiledCodeWithVscBaseModules(sourceJs)
   return sourceJs;
}

/** vsc-base method
 * @description 
 * Return the default module map of vsc-base \
 * (Used for ts compiling, module load ect)
 * @see [getVscDefaultModuleMap](http://vsc-base.org/#getVscDefaultModuleMap)
 * @internal this method is primary used by vsc.loadTsModule
 * @vscType System
 * @example
 * const moduleMap = vsc.getVscDefaultModuleMap()
 * @returns \{ [key: string]: \{ name: string, module: any \} \}
 */
export const getVscDefaultModuleMap = (): { key: string, name: string, module: any }[] => {
   return [
      { key: 'vsc', name: 'vsc-base', module: vsc },
      { key: 'ts', name: 'typescript', module: ts },
      { key: 'fs', name: 'fs-extra', module: fs },
      { key: 'vscode', name: 'vscode', module: vscode },
      { key: 'cp', name: 'child-process-promise', module: cp }
   ]
}

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
export const tsRewriteTranspiledCodeWithVscBaseModules = (
   sourceJs: string,
): string => {
   const modulesMap = vsc.getVscDefaultModuleMap()
   modulesMap.forEach(obj => {
      const reg = new RegExp(`\\bconst (\\w+) = require\\(\\"${obj.name}\\"\\)`, 'g')
      sourceJs = sourceJs.replace(reg, (str: string) =>
         `/* // vsc-base has change the ts transpiled code here. */`
      )
   })
   return sourceJs
}


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
export const tsGetLocalModules = async (
   baseDir: string,
   sourceJs: string,
   renameRequireToObject: string
): Promise<[string, { [key: string]: any }]> => {
   const reg = new RegExp(`\\bconst (\\w+) = require\\(\\"([^\\"]+)\\"\\)`, 'g')
   let match: RegExpExecArray | null;
   const internalModules: { name: string, path: string, exported: any }[] = []
   while ((match = reg.exec(sourceJs)) !== null) {
      sourceJs = sourceJs.substring(0, match.index) + `const ${match[1]} = ${renameRequireToObject}["${match[1]}"]` + sourceJs.substring(match.index + match[0].length)
      internalModules.push({
         name: match[1],
         path: match[2],
         exported: null
      })
   }
   const internalModuleExports: { [key: string]: any } = {}
   for (const m of internalModules) {
      let path = vsc.joinPaths(baseDir, m.path);
      if (!path.match(/\.tsx?/)) {
         path += ".ts"
      }
      m.exported = await vsc.tsLoadModule(path)
      internalModuleExports[m.name] = m.exported;
   }
   return [sourceJs, internalModuleExports]
}





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
export const tsLoadModule = async (
   path: string,
   compilerOptions: ts.CompilerOptions = vsc.TsDefaultCompilerOptions
): Promise<{ [key: string]: unknown }> => {
   const sourceJs = await vsc.tsLoadModuleSourceCode(path, compilerOptions)
   const renamedRequire = "__vsc__import__exports"
   const [baseDir] = vsc.splitPath(path)
   const [sourceJsRenamed, importExports] = await tsGetLocalModules(baseDir, sourceJs, renamedRequire)

   let _exports: { [key: string]: unknown } = {}
   try {
      _exports = loadTsModule_Eval(sourceJsRenamed, importExports, renamedRequire)
   } catch (e) {
      if (e instanceof TSLoadModuleError) {
         throw e
      } else {
         throw new TSLoadModuleError(e, sourceJsRenamed)
      }
   }
   return _exports
}

export class TSLoadModuleError extends Error {
   constructor(
      message: string,
      public transpiledCode: string
   ) {
      super(message)
   }
}

const loadTsModule_Eval = (
   sourceJs: string,
   importExports: { [key: string]: any },
   renamedRequire: string
): { [key: string]: unknown } => {
   //Wrap code in enclosed function. Add vsc as only dependency.
   const wrapExports = `let ${renamedRequire} = importExports;\n_exports = (function(){var exports = {};\n${sourceJs}\nreturn exports})()`
   let _exports: { [key: string]: unknown } = {}
   try {
      eval(wrapExports)
   } catch (e) {
      throw new TSLoadModuleError(e, wrapExports)
   }
   return _exports
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
export const verifyModuleMethods = (
   _module: { [key: string]: unknown },
   methods: string[]
): { [key: string]: any } | undefined => {
   const map: { [key: string]: any } = {}
   for (const key of methods) {
      if (_module.hasOwnProperty(key) && _module[key] instanceof Function) {
         map[key] = _module[key]
      } else {
         return undefined
      }
   }
   return map
}

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
export const awaitResult = async <T = any>(result: any): Promise<T> => {
   if (result instanceof Promise) {
      return result
   } else {
      return Promise.resolve(result)
   }
}
