/// <reference types="node" />
import * as fs from 'fs-extra';
import * as vscode from 'vscode';
/**
/**
 * VscTemplate types
 */
export declare type vscTemplate = {
    userInputs: vscUserInput[];
    template: vscTemplateItem[];
};
export declare type vscTemplateItem = vscTemplateFolder | vscTemplateFile;
export declare type vscTemplateFolder = {
    type: 'folder';
    name: vscStringDelegate;
    children?: vscTemplateItem[];
};
export declare type vscTemplateFile = {
    type: 'file';
    name: vscStringDelegate;
    content: vscStringDelegate;
};
export declare type vscUserInput = {
    title: string;
    argumentName: string;
    defaultValue: string;
};
export declare type vscUserInputs = {
    [key: string]: string;
};
export declare type vscStringDelegate = string | ((inputs: vscUserInputs) => string);
/**
 * Add './' to start of path
 * @param path
 * @see http://vsc-base.org/#addLeadingLocalDash
 * @returns string
 */
export declare const addLeadingLocalDash: (path: string) => string;
/**
 * Append new line content in the end of the open document
 * @param content
 * @dependencyInternal appendToActiveDocument
 * @oneLineEx const success = await vsc.appendLineToActiveDocument(content)
 * @see http://vsc-base.org/#appendLineToActiveDocument
 * @returns Promise<boolean>
 */
export declare const appendLineToActiveDocument: (content: string) => Promise<boolean>;
/**
 * Append new content in the end of the open document.
 * Return true for succes, and false if there was no active editor or open document
 * @param content
 * @dependencyInternal getActiveDocument, getActiveEditor
 * @dependencyExternal vscode
 * @oneLineEx const success = await vsc.appendToActiveDocument(content)
 * @see http://vsc-base.org/#appendToActiveDocument
 * @returns Promise<boolean>
 */
export declare const appendToActiveDocument: (content: string) => Promise<boolean>;
/**
 * Append new content in the end of the open document
 * @param editor
 * @param document
 * @param content
 * @dependencyExternal vscode
 * @oneLineEx await vsc.appendToDocument(editor, document, content)
 * @see http://vsc-base.org/#appendToDocument
 * @returns Promise<void>
 */
export declare const appendToDocument: (editor: vscode.TextEditor, document: vscode.TextDocument, content: string) => Promise<void>;
/**
 * Prompt user for a question
 * @param path
 * @dependencyExternal vscode
 * @oneLineEx const answer = await ask(question, defaultValue)
 * @ex const answer = await ask('Where to move file?', currentFilePath)
 * @see http://vsc-base.org/#ask
 * @returns Promise<string | undefined>
 */
export declare const ask: (question: string, defaultValue: string) => Promise<string | undefined>;
/**
 * Ensure that a method result that optional can be a promise is awaited.
 * (Responses from methods loaded with vsc.loadTsModule can be optional async!)
 * @oneLineEx await awaitResult(result)
 * @ex
const varifiedModule = vsc.hasModuleFunction(_module, \['run'])
const result = varifiedModule.run()
await awaitResult(result)
 * @see http://vsc-base.org/#awaitResult
 * @returns Promise<any>
 */
export declare const awaitResult: (result: any) => Promise<any>;
/**
 * Format a string from camel-case to kebab-case. Commonly used to define css class names. (SomeName => some-name)
 * @param str
 * @see http://vsc-base.org/#camalcaseToKebabcase
 * @returns string
 */
export declare const camalcaseToKebabcase: (str: string) => string;
/**
 * Get clean path. folder/../folder/file => folder/file, folder/./file => file
 * @param path
 * @see http://vsc-base.org/#cleanPath
 * @returns string
 */
export declare const cleanPath: (path: string) => string;
/**
 * Does the folder/file exist
 * @param path string
 * @dependencyExternal fs
 * @oneLineEx const exist = vsc.doesExists(path)
 * @see http://vsc-base.org/#doesExists
 * @returns boolean
 */
export declare const doesExists: (path: string) => boolean;
/**
 * Get a list off all filePaths in project the matches a glob pattern
 * @param include glob
 * @param exclude glob
 * @param maxResults
 * @dependencyExternal vscode
 * @dependencyInternal pathAsUnix
 * @oneLineEx const files = await vsc.findFilePaths(includePattern)
 * @ex
const allTestFiles = await vsc.findFilePaths('**\/*.test.{ts,jsx,ts,tsx}')
for (const filePath of allTestFiles){ // <-- enable aync action for each filePath
   // Do something with filePath
}
 * @see http://vsc-base.org/#findFilePaths
 * @returns Promise<string[]>
 */
export declare const findFilePaths: (include?: vscode.GlobPattern, exclude?: vscode.GlobPattern, maxResults?: number) => Promise<string[]>;
/**
 * Get a list off all filePaths from a basePath, in project the matches a glob pattern
 * @param include glob
 * @param exclude glob
 * @dependencyExternal vscode
 * @dependencyInternal getDir, findFilePaths
 * @param maxResults
 * @oneLineEx const files = await vsc.findFilePathsFromBase(dir, includePattern)
 * @ex
const storyFilesInModule1 = await vsc.findFilePathsFromBase('c:/root/src/module1', '*.story.{ts,tsx}')
for (const filePath of storyFilesInModule1){ // <-- enable aync action for each filePath
   // Do something with filePath..
}
 * @see http://vsc-base.org/#findFilePathsFromBase
 * @returns Promise<string[]>
 */
export declare const findFilePathsFromBase: (basePath: string, includePattern?: string, exclude?: vscode.GlobPattern, maxResults?: number) => Promise<string[]>;
/**
 * Find files based from a releative to a path
 * @param path
 * @param relativePath
 * @param includePattern
 * @param exclude
 * @param maxResults
 * @dependencyExternal vscode
 * @dependencyInternal getDir, joinPath, cleanPath, trimDases, findFilePathsFromBase
 * @oneLineEx const files = await vsc.findRelativeFilePaths(path, relativePath, includePattern)
 * @ex
const moduleFileInParentFolder = await vsc.findRelativeFilePaths(path, '../', '*Module.ts')
if(moduleFileInParentFolder.lenght===0){
   vsc.showErrorMessage('Module file was not found in parent folder')
   return
}
if(moduleFileInParentFolder.lenght>1){
   vsc.showErrorMessage('More than one Module file was found in parent folder')
   return
}
const modulePath = moduleFileInParentFolder[0];
// Do something with modulePath..
 * @see http://vsc-base.org/#findRelativeFilePaths
 * @returns Promise<string[]>
 */
export declare const findRelativeFilePaths: (path: string, relativePath: string, includePattern?: string, exclude?: vscode.GlobPattern, maxResults?: number) => Promise<string[]>;
/**
 * Get open vscode.TextDocument
 * @dependencyExternal vscode
 * @oneLineEx const document = vsc.getActiveDocument()
 * @see http://vsc-base.org/#getActiveDocument
 * @returns vscode.TextDocument | undefined
 */
export declare const getActiveDocument: () => vscode.TextDocument | undefined;
/**
 * Get current open file's content.
 * @dependencyInternal getActiveDocument
 * @oneLineEx const content = vsc.getActiveDocumentContent()
 * @see http://vsc-base.org/#getActiveDocumentContent
 * @returns string | undefined
 */
export declare const getActiveDocumentContent: () => string | undefined;
/**
 * Get current open file path or undefined if nothing is open.
 * @dependencyInternal getActiveDocument
 * @oneLineEx const path = vsc.getActivegetActiveDocumentPath()
 * @see http://vsc-base.org/#getActivegetActiveDocumentPath
 * @returns string | undefined
 */
export declare const getActiveDocumentPath: () => string | undefined;
/**
 * Get vscode.activeTextEditor
 * @dependencyExternal vscode
 * @oneLineEx const editor = vsc.getActiveEditor()
 * @see http://vsc-base.org/#getActiveDocument
 * @returns vscode.TextEditor | undefined
 */
export declare const getActiveEditor: () => vscode.TextEditor | undefined;
/**
 * Get vscode project config
 * @dependencyExternal vscode
 * @oneLineEx const myOption = vsc.getConfig(projectName, optionName, defaultValue)
 * @ex const myOption = vsc.getConfig('myExtension', 'doThisThing', false)
 * @see http://vsc-base.org/#getConfig
 * @returns T
 */
export declare const getConfig: <T>(projectName: string, property: string, defaultValue: T) => T;
/**
 * Get dir from path (If path is a dir return it)
 * @param path
 * @dependencyInternal isDir, splitPath
 * @oneLineEx const dir = vsc.getDir(path)
 * @see http://vsc-base.org/#getDir
 * @returns string
 */
export declare const getDir: (path: string) => string;
/**
 * Get file source
 * @param path
 * @dependencyExternal fs
 * @oneLineEx const source = vsc.getFileContent(path)
 * @see http://vsc-base.org/#getFileContent
 * @returns Promise<string>
 */
export declare const getFileContent: (path: string) => Promise<string>;
/**
 * Get a vscodeRange for the entire document
 * @param document
 * @dependencyExternal vscode
 * @oneLineEx const fullRange = vsc.getFullDocumentRange(document)
 * @see http://vsc-base.org/#getFullDocumentRange
 * @returns boolean
 */
export declare const getFullDocumentRange: (document: vscode.TextDocument) => vscode.Range;
/**
 * Get file source as json (return null on invalid json)
 * @param path
 * @dependencyExternal fs
 * @oneLineEx const json = await vsc.getJsonContent(path)
 * @see http://vsc-base.org/#getJsonContent
 * @returns unknown
 */
export declare const getJsonContent: (path: string, throws?: boolean) => Promise<unknown>;
/**
 * Get part of a json object.
 * @param json
 * @param keyPath Ex sub.sub.name >> {sub:{sub:{name:'Foo'}}} >> Foo
 * @see http://vsc-base.org/#getJsonParts
 * @returns any
 */
export declare const getJsonParts: (json: {
    [name: string]: any;
}, keyPath: string) => any;
/**
 * Create a LineReader (generator method) for a ReadStream
 * @param readStream
 * @dependencyExternal fs
 * @oneLineEx const lineReader = getLineStreamReader(readStream)
 * @ex
 const readStream = getReadStream(path)
 const lineReader = getLineStreamReader(readStream)
 for await (line of lineReader) {
    //do something with the line
 }
 * @see http://vsc-base.org/#getLineStreamReader
 * @returns () => AsyncIterableIterator<string>
 */
export declare const getLineStreamReader: (readStream: fs.ReadStream) => () => AsyncIterableIterator<string>;
/**
 * Find package.json files and collect the dependencies and devDependencies.
 * @dependencyInternal getPackageFilePaths, getJsonContent, getJsonParts
 * @oneLineEx const [dependencies, devDependencies] = await vsc.getPackageDependencies()
 * @todo Use unknow guard check instead of any casting
 * @see http://vsc-base.org/#getPackageDependencies
 * @returns Promise<{ [key: string]: string }[]
 */
export declare const getPackageDependencies: () => Promise<{
    [key: string]: string;
}[]>;
/**
 * Find packages file paths in project.
 * @dependencyInternal findFilePaths
 * @oneLineEx const packageFilePaths = await vsc.getPackageFilePaths()
 * @see http://vsc-base.org/#getPackageFilePaths
 * @returns Promise<string[]>
 */
export declare const getPackageFilePaths: () => Promise<string[]>;
/**
 * Get a file ReadStream
 * @param path
 * @dependencyExternal fs
 * @oneLineEx const readStream = getReadStream(path)
 * @ex
 const readStream = getReadStream(path)
 for await (chunk of readStream) {
   //do something with chunk
 }
 * @see http://vsc-base.org/#getReadStream
 * @returns fs.ReadStream
 */
export declare const getReadStream: (path: string) => fs.ReadStream;
/**
 * Generate relative path between two paths.
 * @param fromPath
 * @param toPath
 * @testPrinterArgument fromPath: 'c:/somefolder/sub1/sub2/someFile.js'
 * @testPrinterArgument toPath: 'c:/somefolder/other/someFile.js'
 * @testPrinter
(
   args = getRelativePath.testArguments,
   printResult: (str: string) => void
) => {
   const relativePath = getRelativePath(args.fromPath, args.toPath)
   printResult(relativePath)
}
 * @dependencyInternal sharedPath, splitPath, subtractPath
 * @see http://vsc-base.org/#relatrivePath
 * @returns string
 */
export declare const getRelativePath: (fromPath: string, toPath: string) => string;
/**
 * Get project root for a path or undefined if no project was found.
 * @param path
 * @dependencyExternal vscode
 * @dependencyInternal pathAsUnix
 * @oneLineEx const rootPath = vsc.getRootPath()
 * @see http://vsc-base.org/#getRootPath
 * @returns string | undefined
 */
export declare const getRootPath: (path: string) => string | undefined;
/**
/**
 * Transform an absolute path from root, to a sub-relative path.
 * @param path
 * @param rootPath
 * @param absolutePathFromRoot
 * @dependencyInternal splitPath, subtractPath, addLeadingLocalDash
 * @see http://vsc-base.org/#getSubrelativePathFromAbsoluteRootPath
 * @returns string
 * @test
 */
export declare const getSubrelativePathFromAbsoluteRootPath: (path: string, absolutePathFromRoot: string, rootPath: string) => string;
/**
 * Does path start with charactor [a-zA-Z@] (not '/' or './' or '../')
 * @param path
 * @param startWithRegExp? If your project defines another definition of absolute path then overwrite this.
 * @see http://vsc-base.org/#isAbsolutePath
 * @returns boolean
 */
export declare const isAbsolutePath: (path: string, startWithRegExp?: RegExp) => boolean;
/**
 * Test is a path is directory
 * @param path
 * @dependencyExternal fs
 * @oneLineEx const _isDir = vsc.isDir(path)
 * @see http://vsc-base.org/#isDir
 * @returns boolean
 */
export declare const isDir: (path: string) => boolean;
/**
 * Does subpath start with parentPath
 * @param path
 * @param parentPath
 * @dependencyInternal trimDashes
 * @see http://vsc-base.org/#isSubPath
 * @returns boolean
 */
export declare const isSubPath: (subPath: string, parentPath: string) => boolean;
/**
 * Joins to paths.
 * @param path1
 * @param path2
 * @dependencyInternal trimDashes
 * @see http://vsc-base.org/#joinPaths
 * @returns string
 */
export declare const joinPaths: (path1: string, path2: string) => string;
/**
 * Load a ts file. Transpile it to js (run time) add wrap code and execute it (using eval)!
 * Returning an plainObject with the scripts exports.
 * export default xxx transpile s to export.default
 * IMPORTANT Dont just run code you dont now, this can cause injection!
 * IMPORTANT Be carefull when running scripts that also uses loadTsModule, this can break down entire systems!
 * (If you start a recursive change that dont stop..)
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
 * @see http://vsc-base.org/#loadTsModule
 * @returns Promise<{ [key: string]: unknown; }>
 */
export declare const loadTsModule: (path: string, vsc: any) => Promise<{
    [key: string]: unknown;
}>;
/**
 * Make a folder
 * @param path
 * @param newPathstring
 * @dependencyExternal fs
 * @oneLineEx await vsc.makeDir(path)
 * @see http://vsc-base.org/#makeDir
 * @returns Promise<void>
 */
export declare const makeDir: (folderPath: string) => Promise<void>;
/**
 * Move file/fodler
 * @param path
 * @param newPathstring
 * @oneLineEx await vsc.move(oldPath, newPath)
 * @dependencyExternal fs
 * @see http://vsc-base.org/#move
 * @returns Promise<void>
 */
export declare const move: (path: string, newPath: string) => Promise<void>;
/**
 * Reaplve all '\\'  with '/'
 * @param path
 * @see http://vsc-base.org/#pathAsUnix
 * @returns string
 */
export declare const pathAsUnix: (path: string) => string;
/**
 * Prompt user for a question with a list of answers
 * @param path
 * @dependencyExternal vscode
 * @oneLineEx const answer = await pick(answers)
 * @ex const answer = await ask(\['yes', 'no'\])
 * @see http://vsc-base.org/#pick
 * @returns Promise<string | undefined>
 */
export declare const pick: (answerList: string[]) => Promise<string | undefined>;
/**
 * Transform a relative path to an abspolute path.
 * @param path File from where the relative path begins
 * @param pathRelatriveToPath The relative path
 * @param rootPath The root path
 * @param realPathTest Test if the real  The root path
 * @dependencyInternal isAbsolutePath, splitPath, cleanPath, subtractPath, trimLeadingDash
 * @see http://vsc-base.org/#relatrivePathToAbsolutePath
 * @returns string
 */
export declare const relatrivePathToAbsolutePath: (path: string, pathRelatriveToPath: string, rootPath: string) => string;
/**
 * Save active open file.
 * Return true for succes, and false if there was no open document
 * @dependencyInternal getActiveDocument
 * @oneLineEx const success = await vsc.saveActiveDocument(content)
 * @see http://vsc-base.org/#saveActiveDocument
 * @returns Promise<boolean>
 */
export declare const saveActiveDocument: () => Promise<boolean>;
/**
 * Save All files
 * @dependencyExternal vscode
 * @oneLineEx await vsc.saveAll()
 * @see http://vsc-base.org/#saveAll
 * @returns Promise<void>
 */
export declare const saveAll: () => Promise<void>;
/**
 * Save file
 * @param path
 * @param content
 * @dependencyExternal fs
 * @oneLineEx await vsc.saveFileContent(path, source)
 * @see http://vsc-base.org/#saveFileContent
 * @returns Promise<void>
 */
export declare const saveFileContent: (path: string, content: string) => Promise<void>;
/**
 * Recurvice function that goes through a template tree
 * @param path Full path to where the TemplateItem (file/folder) should be created
 * @param userInputs An object with user inputs {[key: string]: string}
 * @param templateItem An TemplateItem (folde/file)
 * @dependencyInternal makeDir, saveFileContent
 * @oneLineEx await scaffoldTemplate(path, template)
 * @see http://vsc-base.org/#scaffoldTemplate
 * @returns Promise<void>
 */
export declare const scaffoldTemplate: (path: string, templateItem: vscTemplateItem, userInputs?: vscUserInputs) => Promise<void>;
/**
 * Set current open file's content.
 * Return true if success, and false if there was no ActiveTextEditor or OpenDocument.
 * @param content
 * @dependencyInternal getActiveDocument, getActiveEditor
 * @dependencyExternal vscode
 * @oneLineEx const success = await vsc.setActiveDocumentContent(content)
 * @see http://vsc-base.org/#setActiveDocumentContent
 * @returns Promise<boolean>
 */
export declare const setActiveDocumentContent: (content: string) => Promise<boolean>;
/**
 * Return the path that are shared. (Return '' if no path are shared).
 * @param path1
 * @param path2
 * @see http://vsc-base.org/#sharedPath
 * @returns string
 */
export declare const sharedPath: (path1: string, path2: string) => string;
/**
 * Show error message to user
 * @param message
 * @dependencyExternal vscode
 * @oneLineEx await vsc.showErrorMessage(message)
 * @see http://vsc-base.org/#showErrorMessage
 * @returns Promise<void>
 */
export declare const showErrorMessage: (message: string) => Promise<void>;
/**
 * Show message to user
 * @param message
 * @dependencyExternal vscode
 * @oneLineEx await vsc.showMessage(message)
 * @see http://vsc-base.org/#showMessage
 * @returns Promise<void>
 */
export declare const showMessage: (message: string) => Promise<void>;
/**
 * await wrap for setTimeout. Mostly used for debug asyc.
 * @param ms
 * @see http://vsc-base.org/#sleep
 * @async
 * @returns any
 */
export declare const sleep: (ms: number) => Promise<void>;
/**
 * Split path into dir and file
 * @param path
 * @dependencyInternal pathAsUnix
 * @see http://vsc-base.org/#splitPath
 * @returns [dir, name]
 */
export declare const splitPath: (path: string) => [string, string];
/**
 * Remove parent-path from a path
 * @param path
 * @param parentPath
 * @param trimDashes default true
 * @dependencyInternal trimDashes
 * @see http://vsc-base.org/#subtractPath
 * @returns string
 */
export declare const subtractPath: (path: string, parentPath: string, _trimDashes?: boolean) => string;
/**
 * Format a string to camal-case. Commonly used to define js/ts variable names.
 * (Some-Name => someName, some_name => someName, some.name => someName )
 * All non word seperators will be removed and the word charector after will be transforms to upper case
 * @param str
 * @see http://vsc-base.org/#toCamelcase
 * @returns string
 */
export declare const toCamelcase: (str: string) => string;
/**
 * Remove '/' from start and end of path
 * @param path
 * @see http://vsc-base.org/#trimDashes
 * @returns string
 */
export declare const trimDashes: (path: string) => string;
/**
 * Remove '/' from start of path
 * @param path
 * @see http://vsc-base.org/#trimLeadingDash
 * @returns string
 */
export declare const trimLeadingDash: (path: string) => string;
/**
 * Test if a loaded module has methods (Loaded with vsc.loadTsModule)
 * return undefined if a method didnt exist.
 * @oneLineEx const varifyModuleMethods = vsc.hasModuleFunction(_module, methodName)
 * @ex
const varifiedModule = vsc.hasModuleFunction(_module, \['run', 'getId'\])
const result = varifiedModule.run()
 * @see http://vsc-base.org/#varifyModuleMethods
 * @returns { [key: string]: any } | undefined
 */
export declare const varifyModuleMethods: (_module: {
    [key: string]: unknown;
}, methods: string[]) => {
    [key: string]: any;
} | undefined;
