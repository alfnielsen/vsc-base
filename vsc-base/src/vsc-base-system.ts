import * as fs from 'fs-extra'
import * as vscode from 'vscode'
import * as ts from 'typescript'
import * as vsc from './vsc-base'

/**
 * Create a LineReader (generator method) for a ReadStream
 * @see http://vsc-base.org/#getLineStreamReader
 * @param readStream
 * @dependencyExternal fs
 * @oneLineEx const lineReader = vsc.getLineStreamReader(readStream)
 * @ex
 const readStream = vsc.getReadStream(path)
 const lineReader = vsc.getLineStreamReader(readStream)
 for await (line of lineReader) {
    //do something with the line
 }
 * @returns () => AsyncIterableIterator<string>
 */
export const getLineStreamReader = (readStream: fs.ReadStream) =>
   async function* () {
      let read = ''
      for await (const chunk of readStream) {
         read += chunk
         let lineLength: number
         while ((lineLength = read.indexOf('\n')) >= 0) {
            const line = read.slice(0, lineLength + 1)
            yield line
            read = read.slice(lineLength + 1)
         }
      }
      if (read.length > 0) {
         yield read
      }
   }

/**
 * Get a file ReadStream
 * @see http://vsc-base.org/#getReadStream
 * @param path
 * @dependencyExternal fs
 * @oneLineEx const readStream = vsc.getReadStream(path)
 * @ex
 const readStream = vsc.getReadStream(path)
 for await (chunk of readStream) {
   //do something with chunk
 }
 * @returns fs.ReadStream
 */
export const getReadStream = (path: string) => {
   const stream = fs.createReadStream(path, {
      flags: 'r',
      encoding: 'utf-8',
      fd: undefined,
      mode: 438, // 0666 in Octal
      autoClose: false,
      highWaterMark: 64 * 1024
   })
   return stream
}

/**
 * Does the folder/file exist
 * @see http://vsc-base.org/#doesExists
 * @param path string
 * @dependencyExternal fs
 * @oneLineEx const exist = vsc.doesExists(path)
 * @returns boolean
 */
export const doesExists = (path: string): boolean => {
   return fs.existsSync(path)
}

/**
 * Get dir from path (If path is a dir return it)
 * @see http://vsc-base.org/#getDir
 * @param path
 * @dependencyInternal isDir, splitPath
 * @oneLineEx const dir = vsc.getDir(path)
 * @returns string
 */
export const getDir = (path: string) => {
   const _isDir = vsc.isDir(path)
   if (_isDir) {
      return path
   }
   const [dir] = vsc.splitPath(path)
   return dir
}

/**
 * Get file source
 * @see http://vsc-base.org/#getFileContent
 * @param path
 * @dependencyExternal fs
 * @oneLineEx const source = vsc.getFileContent(path)
 * @returns Promise<string>
 */
export const getFileContent = async (path: string): Promise<string> =>
   await fs.readFile(path, 'utf8')

/**
 * Get file source as json (return null on invalid json)
 * @see http://vsc-base.org/#getJsonContent
 * @param path
 * @dependencyExternal fs
 * @oneLineEx const json = await vsc.getJsonContent(path)
 * @returns unknown
 */
export const getJsonContent = async <TStructure = unknown>(
   path: string,
   throws = false
): Promise<TStructure> => await fs.readJson(path, { throws })

/**
 * Get vscode project config
 * @see http://vsc-base.org/#getConfig
 * @dependencyExternal vscode
 * @oneLineEx const myOption = vsc.getConfig(projectName, optionName, defaultValue)
 * @ex const myOption = vsc.getConfig('myExtension', 'doThisThing', false)
 * @returns T
 */
export const getConfig = <T>(
   projectName: string,
   property: string,
   defaultValue: T
): T => {
   return vscode.workspace
      .getConfiguration(projectName)
      .get<T>(property, defaultValue)
}

/**
 * Find packages file paths in project.
 * @see http://vsc-base.org/#getPackageFilePaths
 * @dependencyInternal findFilePaths
 * @oneLineEx const packageFilePaths = await vsc.getPackageFilePaths()
 * @returns Promise<string[]>
 */
export const getPackageFilePaths = async (): Promise<string[]> => {
   const packageFiles = await vsc.findFilePaths('**/package.json')
   return packageFiles
}

/**
 * Find package.json files and collect the dependencies and devDependencies.
 * @see http://vsc-base.org/#getPackageDependencies
 * @dependencyInternal getPackageFilePaths, getJsonContent, getJsonParts
 * @oneLineEx const [dependencies, devDependencies] = await vsc.getPackageDependencies()
 * @todo Use unknow guard check instead of any casting
 * @returns Promise<{ [key: string]: string }[]
 */
export const getPackageDependencies = async (): Promise<
   { [key: string]: string }[]
> => {
   let dependencies: { [k: string]: string } = {}
   let devDependencies: { [k: string]: string } = {}
   const packageFilePaths = await vsc.getPackageFilePaths()
   for (let i = 0; i < packageFilePaths.length; i++) {
      const packageFile = packageFilePaths[i]
      const packageJson = await vsc.getJsonContent<{
         dependencies: { [key: string]: string },
         devDependencies: { [key: string]: string }
      }>(packageFile)
      if (!packageJson) {
         continue
      }
      const packageDependencies = vsc.getJsonParts<{ [k: string]: string }>(packageJson, 'dependencies')
      const packageDevDependencies = vsc.getJsonParts<{ [k: string]: string }>(packageJson, 'devDependencies')
      if (packageDependencies) {
         dependencies = { ...dependencies, ...packageDependencies }
      }
      if (packageDevDependencies) {
         devDependencies = { ...devDependencies, ...packageDevDependencies }
      }
   }
   return [dependencies, devDependencies]
}

/**
 * Test is a path is directory
 * @param path
 * @dependencyExternal fs
 * @oneLineEx const isDir = vsc.isDir(path)
 * @see http://vsc-base.org/#isDir
 * @returns boolean
 */
export const isDir = (path: string): boolean => {
   return fs.statSync(path).isDirectory()
}

/**
 * Make a folder
 * @see http://vsc-base.org/#makeDir
 * @param path
 * @param newPathstring
 * @dependencyExternal fs
 * @oneLineEx await vsc.makeDir(path)
 * @returns Promise<void>
 */
export const makeDir = async (folderPath: string): Promise<void> => {
   try {
      await fs.mkdir(folderPath)
   } catch (e) {
      throw e
   }
}

/**
 * Move file/fodler
 * @see http://vsc-base.org/#move
 * @param path
 * @param newPathstring
 * @oneLineEx await vsc.move(oldPath, newPath)
 * @dependencyExternal fs
 * @returns Promise<void>
 */
export const move = async (path: string, newPath: string): Promise<void> => {
   await fs.move(path, newPath)
}

/**
 * Copy file/fodler
 * @see http://vsc-base.org/#copy
 * @param path
 * @param newPathstring
 * @oneLineEx await vsc.copy(oldPath, newPath)
 * @dependencyExternal fs
 * @returns Promise<void>
 */
export const copy = async (path: string, newPath: string): Promise<void> => {
   await fs.copy(path, newPath)
}


/**
 * Save file
 * @see http://vsc-base.org/#saveFileContent
 * @param path
 * @param content
 * @dependencyExternal fs
 * @oneLineEx await vsc.saveFileContent(path, source)
 * @returns Promise<void>
 */
export const saveFileContent = async (
   path: string,
   content: string
): Promise<void> => {
   await fs.writeFile(path, content)
}

/**
 * Transpile ts source to js
 * @see http://vsc-base.org/#transpileTs
 * @param sourceTs 
 * @param compilerOptions 
 * @oneLineEx const sourceJs = vsc.transpileTs(sourceTs)
 * @returns string
 */
export const transpileTs = (sourceTs: string,
   compilerOptions: ts.CompilerOptions = {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2015,
      libs: ['es6']
   }) => {
   const transpiledOutput = ts.transpileModule(sourceTs, { compilerOptions })
   let sourceJs = transpiledOutput.outputText
   return sourceJs;
}


/**
 * Pre method for loadTsModule. (This methods load the ts source, transpile it to js and replace all 'require' instance)
 * @see http://vsc-base.org/#loadTsModuleSourceCode
 * @param path
 * @param compilerOptions 
 * @param moduleMap default = vsc.getVscDefaultModuleMap()
 * @oneLineEx const sourceJs = await vsc.loadTsModuleSourceCode(path)
 * @returns Promise<string>
 */
export const loadTsModuleSourceCode = async (
   path: string,
   compilerOptions: ts.CompilerOptions = {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2015,
      libs: ['es6']
   }
): Promise<string> => {
   const scriptFileTs = await vsc.getFileContent(path)
   let sourceJs = vsc.transpileTs(scriptFileTs, compilerOptions)
   sourceJs = vsc.rewriteTstranpiledCodeWithVscBaseModules(sourceJs)
   return sourceJs;
}

/**
 * Return the default module map of vsc-base (Used for ts compiling, module load ect)
 * @see http://vsc-base.org/#getVscDefaultModuleMap
 * @internal this method is primary used by vsc.loadTsModule
 * @oneLineEx const moduleMap = vsc.getVscDefaultModuleMap
 * @returns \{ [key: string]: \{ name: string, module: any \} \}
 */
export const getVscDefaultModuleMap = (): { key: string, name: string, module: any }[] => {
   return [
      { key: 'vsc', name: 'vsc-base', module: vsc },
      { key: 'ts', name: 'typescript', module: ts },
      { key: 'fs', name: 'fs-extra', module: fs },
      { key: 'vscode', name: 'vscode', module: vscode }

   ]

}

/**
 * Replace ts traspiles code's require for vsc, ts, fs and vscode.
 * @see http://vsc-base.org/#rewriteTstranpiledCodeWithVscBaseModules
 * @internal this method is primary used by vsc.loadTsModule
 * @notes
 * ts.transpile as follows:
 * const vsc_base_1 = require("vsc-base");
 * const fs = require("fs-extra");
 * const typescript_1 = require("typescript");
 * const vscode = require("vscode");
 * @oneLineEx sourceJs = vsc.rewriteTstranpiledCodeWithVscBaseModules(sourceJs)
 * @param sourceJs 
 * @returns string
 */
export const rewriteTstranpiledCodeWithVscBaseModules = (
   sourceJs: string,
): string => {
   const modulesMap = vsc.getVscDefaultModuleMap()
   modulesMap.forEach(obj => {
      const reg = new RegExp(`\\bconst (\\w+) = require\\(\\"${obj.name}\\"\\)`, 'g')
      sourceJs = sourceJs.replace(reg, (str: string) =>
         `/* ${str} // vsc-base has change the ts transpiled code here. */`
      )
   })
   return sourceJs
}

/**
 * Load a ts file. Transpile it to js (run time) add wrap code and execute it (using eval)!
 * Returning an plainObject with the scripts exports.
 * export default xxx transpile s to export.default
 * IMPORTANT Dont just run code you dont now, this can cause injection!
 * IMPORTANT Be carefull when running scripts that also uses loadTsModule, this can break down entire systems!
 * (If you start a recursive change that dont stop..)
 * @see http://vsc-base.org/#loadTsModule
 * @param path
 * @dependencyExternal ts
 * @dependencyInternal getFileContent, showErrorMessage
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
export const loadTsModule = async (
   path: string,
   compilerOptions: ts.CompilerOptions = {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2015,
      libs: ['es6']
   },
): Promise<{ [key: string]: unknown }> => {
   const sourceJs = await vsc.loadTsModuleSourceCode(path, compilerOptions)
   let _exports: { [key: string]: unknown } = {}
   try {
      _exports = loadTsModule_Eval(sourceJs)
   } catch (e) {
      if (e instanceof LoadTsModuleError) {
         throw e
      } else {
         throw new LoadTsModuleError(e, sourceJs)
      }
   }
   return _exports
}
export class LoadTsModuleError extends Error {
   constructor(
      message: string,
      public transpiledCode: string
   ) {
      super(message)
   }
}

const loadTsModule_Eval = async (
   sourceJs: string
): Promise<{ [key: string]: unknown }> => {
   //Wrap code in enclosed function. Add vsc as only dependency.
   const wrapExports = `_exports = (function(){var exports = {};\n${sourceJs}\nreturn exports})()`

   let _exports: { [key: string]: unknown } = {}
   try {
      eval(wrapExports)
   } catch (e) {
      throw new LoadTsModuleError(e, wrapExports)
   }
   return _exports
}


/**
 * Test if a loaded module has methods (Loaded with vsc.loadTsModule)
 * return undefined if a method didnt exist.
 * @see http://vsc-base.org/#varifyModuleMethods
 * @oneLineEx const varifyModuleMethods = vsc.varifyModuleMethods(_module, methodName)
 * @ex 
const varifiedModule = vsc.varifyModuleMethods(_module, \['run', 'getId'\])
const result = varifiedModule.run()
 * @returns { [key: string]: any } | undefined
 */
export const varifyModuleMethods = (
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

/**
 * Ensure that a method result that optional can be a promise is awaited.
 * (Responses from methods loaded with vsc.loadTsModule can be optional async!)
 * @see http://vsc-base.org/#awaitResult
 * @oneLineEx await vsc.awaitResult(result)
 * @ex 
const varifiedModule = vsc.varifyModuleMethods(_module, \['run'])
const result = varifiedModule.run()
await vsc.awaitResult(result)
 * @returns Promise<any>
 */
export const awaitResult = async (result: any): Promise<any> => {
   if (result instanceof Promise) {
      return result
   } else {
      return new Promise(resolve => {
         resolve(result)
      })
   }
}

/**
 * Recurvice function that goes through a template tree
 * @see http://vsc-base.org/#scaffoldTemplate
 * @param path Full path to where the TemplateItem (file/folder) should be created
 * @param userInputs An object with user inputs {[key: string]: string}
 * @param templateItem An TemplateItem (folde/file)
 * @dependencyInternal makeDir, saveFileContent
 * @oneLineEx await vsc.scaffoldTemplate(path, template)
 * @returns Promise<void>
 */
export const scaffoldTemplate = async (
   path: string,
   templateItem: vsc.vscTemplateItem,
   userInputs: vsc.vscUserInputs = {}
): Promise<void> => {
   switch (templateItem.type) {
      case 'folder': {
         let name = templateItem.name
         if (typeof name === 'function') {
            name = name.call(null, userInputs)
         }
         const folderPath = path + '/' + name
         await vsc.makeDir(folderPath)
         if (!templateItem.children) {
            break
         }
         templateItem.children.forEach(async (childItem: any) => {
            vsc.scaffoldTemplate(folderPath, childItem, userInputs)
         })
         break
      }
      case 'file': {
         let name = templateItem.name
         if (typeof name === 'function') {
            name = name.call(null, userInputs)
         }
         const filePath = path + '/' + name
         let content = templateItem.content
         if (typeof content === 'function') {
            content = content.call(null, userInputs)
         }
         await vsc.saveFileContent(filePath, content)
      }
   }
}
