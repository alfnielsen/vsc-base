/// <reference types="node" />
import * as fs from 'fs-extra';
import * as ts from 'typescript';
import * as vsc from './vsc-base';
/**
 * Create a LineReader (generator method) for a ReadStream
 * @see http://vsc-base.org/#getLineStreamReader
 * @param readStream
 * @dependencyExternal fs
 * @vscType System
 * @oneLineEx const lineReader = vsc.getLineStreamReader(readStream)
 * @ex
 const readStream = vsc.getReadStream(path)
 const lineReader = vsc.getLineStreamReader(readStream)
 for await (line of lineReader) {
    //do something with the line
 }
 * @returns () => AsyncIterableIterator<string>
 */
export declare const getLineStreamReader: (readStream: fs.ReadStream) => () => AsyncIterableIterator<string>;
/**
 * Get a file ReadStream
 * @see http://vsc-base.org/#getReadStream
 * @param path
 * @dependencyExternal fs
 * @vscType System
 * @oneLineEx const readStream = vsc.getReadStream(path)
 * @ex
 const readStream = vsc.getReadStream(path)
 for await (chunk of readStream) {
   //do something with chunk
 }
 * @returns fs.ReadStream
 */
export declare const getReadStream: (path: string) => fs.ReadStream;
/**
 * Does the folder/file exist
 * @see http://vsc-base.org/#doesExists
 * @param path string
 * @dependencyExternal fs
 * @vscType System
 * @oneLineEx const exist = vsc.doesExists(path)
 * @returns boolean
 */
export declare const doesExists: (path: string) => boolean;
/**
 * Get dir from path (If path is a dir return it)
 * @see http://vsc-base.org/#getDir
 * @param path
 * @dependencyInternal isDir, splitPath
 * @vscType System
 * @oneLineEx const dir = vsc.getDir(path)
 * @returns string
 */
export declare const getDir: (path: string) => string;
/**
 * Get file source
 * @see http://vsc-base.org/#getFileContent
 * @param path
 * @dependencyExternal fs
 * @vscType System
 * @oneLineEx const source = vsc.getFileContent(path)
 * @returns Promise<string>
 */
export declare const getFileContent: (path: string) => Promise<string>;
/**
 * Get file source as json (return null on invalid json)
 * @see http://vsc-base.org/#getJsonContent
 * @param path
 * @dependencyExternal fs
 * @vscType System
 * @oneLineEx const json = await vsc.getJsonContent(path)
 * @returns unknown
 */
export declare const getJsonContent: <TStructure = unknown>(path: string, throws?: boolean) => Promise<TStructure>;
/**
 * Get vscode project config
 * @see http://vsc-base.org/#getConfig
 * @dependencyExternal vscode
 * @vscType System
 * @oneLineEx const myOption = vsc.getConfig(projectName, optionName, defaultValue)
 * @ex const myOption = vsc.getConfig('myExtension', 'doThisThing', false)
 * @returns T
 */
export declare const getConfig: <T>(projectName: string, property: string, defaultValue: T) => T;
/**
 * Find packages file paths in project.
 * @see http://vsc-base.org/#getPackageFilePaths
 * @dependencyInternal findFilePaths
 * @oneLineEx const packageFilePaths = await vsc.getPackageFilePaths()
 * @returns Promise<string[]>
 */
export declare const getPackageFilePaths: () => Promise<string[]>;
/**
 * Find package.json files and collect the dependencies and devDependencies.
 * @see http://vsc-base.org/#getPackageDependencies
 * @dependencyInternal getPackageFilePaths, getJsonContent, getJsonParts
 * @vscType System
 * @oneLineEx const [dependencies, devDependencies] = await vsc.getPackageDependencies()
 * @todo Use unknow guard check instead of any casting
 * @returns Promise<{ [key: string]: string }[]
 */
export declare const getPackageDependencies: () => Promise<{
    [key: string]: string;
}[]>;
/**
 * Test is a path is directory
 * @param path
 * @dependencyExternal fs
 * @vscType System
 * @oneLineEx const isDir = vsc.isDir(path)
 * @see http://vsc-base.org/#isDir
 * @returns boolean
 */
export declare const isDir: (path: string) => boolean;
/**
 * Make a folder
 * @see http://vsc-base.org/#makeDir
 * @param path
 * @param newPathstring
 * @vscType System
 * @dependencyExternal fs
 * @oneLineEx await vsc.makeDir(path)
 * @returns Promise<void>
 */
export declare const makeDir: (folderPath: string) => Promise<void>;
/**
 * Move file/fodler
 * @see http://vsc-base.org/#move
 * @param path
 * @param newPathstring
 * @vscType System
 * @oneLineEx await vsc.move(oldPath, newPath)
 * @dependencyExternal fs
 * @returns Promise<void>
 */
export declare const move: (path: string, newPath: string) => Promise<void>;
/**
 * Copy file/fodler
 * @see http://vsc-base.org/#copy
 * @param path
 * @param newPathstring
 * @vscType System
 * @oneLineEx await vsc.copy(oldPath, newPath)
 * @dependencyExternal fs
 * @returns Promise<void>
 */
export declare const copy: (path: string, newPath: string) => Promise<void>;
/**
 * Save file
 * @see http://vsc-base.org/#saveFileContent
 * @param path
 * @param content
 * @vscType System
 * @dependencyExternal fs
 * @oneLineEx await vsc.saveFileContent(path, source)
 * @returns Promise<void>
 */
export declare const saveFileContent: (path: string, content: string) => Promise<void>;
/**
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
 * Pre method for loadTsModule. (This methods load the ts source, transpile it to js and replace all 'require' instance)
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
 * Return the default module map of vsc-base (Used for ts compiling, module load ect)
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
 * Replace ts traspiles code's require for vsc, ts, fs and vscode.
 * @see http://vsc-base.org/#rewriteTstranpiledCodeWithVscBaseModules
 * @internal this method is primary used by vsc.loadTsModule
 * @notes
 * ts.transpile as follows:
 * const vsc_base_1 = require("vsc-base");
 * const fs = require("fs-extra");
 * const typescript_1 = require("typescript");
 * const vscode = require("vscode");
 * @vscType System
 * @oneLineEx sourceJs = vsc.rewriteTstranpiledCodeWithVscBaseModules(sourceJs)
 * @param sourceJs
 * @returns string
 */
export declare const rewriteTstranpiledCodeWithVscBaseModules: (sourceJs: string) => string;
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
 * Test if a loaded module has methods (Loaded with vsc.loadTsModule)
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
 * Ensure that a method result that optional can be a promise is awaited.
 * (Responses from methods loaded with vsc.loadTsModule can be optional async!)
 * @see http://vsc-base.org/#awaitResult
 * @vscType System
 * @oneLineEx await vsc.awaitResult(result)
 * @ex
const varifiedModule = vsc.varifyModuleMethods(_module, \['run'])
const result = varifiedModule.run()
await vsc.awaitResult(result)
 * @returns Promise<any>
 */
export declare const awaitResult: (result: any) => Promise<any>;
/**
 * Recurvice function that goes through a template tree
 * @see http://vsc-base.org/#scaffoldTemplate
 * @param path Full path to where the TemplateItem (file/folder) should be created
 * @param userInputs An object with user inputs {[key: string]: string}
 * @param templateItem An TemplateItem (folde/file)
 * @dependencyInternal makeDir, saveFileContent
 * @vscType System
 * @oneLineEx await vsc.scaffoldTemplate(path, template)
 * @returns Promise<void>
 */
export declare const scaffoldTemplate: (path: string, templateItem: vsc.vscTemplateItem, userInputs?: vsc.vscUserInputs) => Promise<void>;
