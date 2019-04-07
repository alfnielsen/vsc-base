
// Type definitions for vsc-base
// Project: vsc-base
// Definitions by: alf nielsen <alfnielsen@gmail.com>

declare namespace vsc {


 /**
 * Add './' to start of path
 * @see http://vsc-base.org/#addLeadingLocalDash
 * @param path
 * @oneLineEx const path = vsc.addLeadingLocalDash(path)
 * @returns string
 */
   export undefined
,
 /**
 * Append new line content in the end of the open document
 * @see http://vsc-base.org/#appendLineToActiveDocument
 * @param content
 * @dependencyInternal appendToActiveDocument
 * @oneLineEx const success = await vsc.appendLineToActiveDocument(content)
 * @returns Promise<boolean>
 */
   export undefined
,
 /**
 * Append new content in the end of the open document.
 * Return true for succes, and false if there was no active editor or open document
 * @see http://vsc-base.org/#appendToActiveDocument
 * @param content
 * @dependencyInternal getActiveDocument, getActiveEditor
 * @dependencyExternal vscode
 * @oneLineEx const success = await vsc.appendToActiveDocument(content)
 * @returns Promise<boolean>
 */
   export undefined
,
 /**
 * Append new content in the end of the open document
 * @see http://vsc-base.org/#appendToDocument
 * @param editor
 * @param document
 * @param content
 * @dependencyExternal vscode
 * @oneLineEx await vsc.appendToDocument(editor, document, content)
 * @returns Promise<void>
 */
   export undefined
,
 /**
 * Prompt user for a question
 * @see http://vsc-base.org/#ask
 * @param question string
 * @param defaultValue string
 * @dependencyExternal vscode
 * @oneLineEx const answer = await vsc.ask(question, defaultValue)
 * @ex const answer = await ask('Where to move file?', currentFilePath)
 * @returns Promise<string | undefined>
 */
   export undefined
,
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
   export undefined
,
 /**
 * Format a string from camel-case to kebab-case. 
 * Commonly used to define css class names. (SomeName => some-name)
 * @see http://vsc-base.org/#camalcaseToKebabcase
 * @param str
 * @oneLineEx const cssName = vsc.camalcaseToKebabcase(name)
 * @returns string
 */
   export undefined
,
 /**
 * Get clean path. folder/../folder/file => folder/file, folder/./file => file
 * @see http://vsc-base.org/#cleanPath
 * @param path
 * @oneLineEx const newPath = vsc.cleanPath(concatenatedPath)
 * @returns string
 */
   export undefined
,
 /**
 * Copy file/fodler
 * @see http://vsc-base.org/#copy
 * @param path
 * @param newPathstring
 * @oneLineEx await vsc.copy(oldPath, newPath)
 * @dependencyExternal fs
 * @returns Promise<void>
 */
   export undefined
,
 /**
 * Does the folder/file exist
 * @see http://vsc-base.org/#doesExists
 * @param path string
 * @dependencyExternal fs
 * @oneLineEx const exist = vsc.doesExists(path)
 * @returns boolean
 */
   export undefined
,
 /**
 * Get a list off all filePaths in project the matches a glob pattern
 * @see http://vsc-base.org/#findFilePaths
 * @param include glob
 * @param exclude glob
 * @param maxResults
 * @dependencyExternal vscode
 * @dependencyInternal pathAsUnix
 * @oneLineEx const files = await vsc.findFilePaths(includePattern)
 * @ex 
const allTestFiles = await vsc.findFilePaths('**\/*.test.{ts,jsx,ts,tsx}')
for (const filePath of allTestFiles){
   const source = await vsc.getFileContent()
   // do something with the files...
}
 * @returns Promise<string[]>
 */
   export undefined
,
 /**
 * Get a list off all filePaths from a basePath, in project the matches a glob pattern
 * @see http://vsc-base.org/#findFilePathsFromBase
 * @param include glob
 * @param exclude glob
 * @dependencyExternal vscode
 * @dependencyInternal getDir, findFilePaths
 * @param maxResults
 * @oneLineEx const files = await vsc.findFilePathsFromBase(dir, includePattern)
 * @ex 
const storyFilesInModule1 = await vsc.findFilePathsFromBase('c:/root/src/module1', '*.story.{ts,tsx}')
for (const filePath of storyFilesInModule1){
   const source = await vsc.getFileContent()
   // Do something with filePath..
}
 * @returns Promise<string[]>
 */
   export undefined
,
 /**
 * Find files based from a releative to a path
 * @see http://vsc-base.org/#findRelativeFilePaths
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
 * @returns Promise<string[]>
 */
   export undefined
,
 /**
 * Transform a relative path to an abspolute path.
 * @see http://vsc-base.org/#relatrivePathToAbsolutePath
 * @param path File from where the relative path begins
 * @param pathRelatriveToPath The relative path
 * @param rootPath The root path
 * @param realPathTest Test if the real  The root path
 * @dependencyInternal isAbsolutePath, splitPath, cleanPath, subtractPath, trimLeadingDash
 * @oneLineEx const absolutePath = vsc.getAbsolutePathFromRelatrivePath(path, pathRelatriveToPath, rootPath)
 * @returns string
 */
   export undefined
,
 /**
 * Get open vscode.TextDocument
 * @see http://vsc-base.org/#getActiveDocument
 * @dependencyExternal vscode
 * @oneLineEx const document = vsc.getActiveDocument()
 * @returns vscode.TextDocument | undefined
 */
   export undefined
,
 /**
 * Get current open file's content.
 * @see http://vsc-base.org/#getActiveDocumentContent
 * @dependencyInternal getActiveDocument
 * @oneLineEx const content = vsc.getActiveDocumentContent()
 * @returns string | undefined
 */
   export undefined
,
 /**
 * Get current open file path or undefined if nothing is open.
 * @see http://vsc-base.org/#getActivegetActiveDocumentPath
 * @dependencyInternal getActiveDocument
 * @oneLineEx const path = vsc.getActivegetActiveDocumentPath()
 * @returns string | undefined
 */
   export undefined
,
 /**
 * Get vscode.activeTextEditor
 * @see http://vsc-base.org/#getActiveEditor
 * @dependencyExternal vscode
 * @oneLineEx const editor = vsc.getActiveEditor()
 * @returns vscode.TextEditor | undefined
 */
   export undefined
,
 /**
 * Get vscode project config
 * @see http://vsc-base.org/#getConfig
 * @dependencyExternal vscode
 * @oneLineEx const myOption = vsc.getConfig(projectName, optionName, defaultValue)
 * @ex const myOption = vsc.getConfig('myExtension', 'doThisThing', false)
 * @returns T
 */
   export undefined
,
 /**
 * Get dir from path (If path is a dir return it)
 * @see http://vsc-base.org/#getDir
 * @param path
 * @dependencyInternal isDir, splitPath
 * @oneLineEx const dir = vsc.getDir(path)
 * @returns string
 */
   export undefined
,
 /**
 * Test if it an error. Return type (if one of es6 basic error type) return stack
 * @see http://vsc-base.org/#getErrorInfo
 * @param e error
 * @oneLineEx const info = vsc.getErrorInfo(e)
 * @returns \{ isError: boolean; type: string; stack: string; message: string; \}
 */
   export undefined
,
 /**
 * Get file source
 * @see http://vsc-base.org/#getFileContent
 * @param path
 * @dependencyExternal fs
 * @oneLineEx const source = vsc.getFileContent(path)
 * @returns Promise<string>
 */
   export undefined
,
 /**
 * Get a vscodeRange for the entire document
 * @see http://vsc-base.org/#getFullDocumentRange
 * @param document
 * @dependencyExternal vscode
 * @oneLineEx const fullRange = vsc.getFullDocumentRange(document)
 * @returns boolean
 */
   export undefined
,
 /**
 * Get file source as json (return null on invalid json)
 * @see http://vsc-base.org/#getJsonContent
 * @param path
 * @dependencyExternal fs
 * @oneLineEx const json = await vsc.getJsonContent(path)
 * @returns unknown
 */
   export undefined
,
 /**
 * Get part of a json object.
 * @see http://vsc-base.org/#getJsonParts
 * @param json
 * @param keyPath Ex sub.sub.name >> {sub:{sub:{name:'Foo'}}} >> Foo
 * @oneLineEx const startScript = vsc.getJsonParts(packageJson, 'scripts.start')
 * @returns any
 */
   export undefined
,
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
   export undefined
,
 /**
 * Find package.json files and collect the dependencies and devDependencies.
 * @see http://vsc-base.org/#getPackageDependencies
 * @dependencyInternal getPackageFilePaths, getJsonContent, getJsonParts
 * @oneLineEx const [dependencies, devDependencies] = await vsc.getPackageDependencies()
 * @todo Use unknow guard check instead of any casting
 * @returns Promise<{ [key: string]: string }[]
 */
   export undefined
,
 /**
 * Find packages file paths in project.
 * @see http://vsc-base.org/#getPackageFilePaths
 * @dependencyInternal findFilePaths
 * @oneLineEx const packageFilePaths = await vsc.getPackageFilePaths()
 * @returns Promise<string[]>
 */
   export undefined
,
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
   export undefined
,
 /**
 * Generate relative path between two paths.
 * @see http://vsc-base.org/#relatrivePath
 * @param fromPath
 * @param toPath
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
   export undefined
,
 /**
 * Get project root for a path or undefined if no project was found.
 * @see http://vsc-base.org/#getRootPath
 * @param path
 * @dependencyExternal vscode
 * @dependencyInternal pathAsUnix
 * @oneLineEx const rootPath = vsc.getRootPath()
 * @returns string | undefined
 */
   export undefined
,
 /**
 * Transform an absolute path from root, to a sub-relative path.
 * @see http://vsc-base.org/#getSubrelativePathFromAbsoluteRootPath
 * @param path
 * @param rootPath
 * @param absolutePathFromRoot
 * @dependencyInternal splitPath, subtractPath, addLeadingLocalDash
 * @oneLineEx const subrelativePath = vsc.getSubrelativePathFromAbsoluteRootPath(path, absolutePathFromRoot, rootPath)
 * @testPrinterArgument
{
   path: 'c:/root/module/file.ts',
   absolutePathFromRoot: 'module/submodule/file2',
   rootPath: 'c:/root'
}
 * @testPrinter 
(args, setResult) => {
   const res = vsc.getSubrelativePathFromAbsoluteRootPath(args.path, args.absolutePathFromRoot, args.rootPath)
   setResult(res)
}
 * @returns string
 */
   export undefined
,
 /**
 * return ISO timestamp
 * @see http://vsc-base.org/#getTimeStamp
 * @oneLineEx const timestamp = vsc.getTimeStamp()
 * @returns string
 */
   export undefined
,
 /**
 * Return the default module map of vsc-base (Used for ts compiling, module load ect)
 * @see http://vsc-base.org/#getVscDefaultModuleMap
 * @internal this method is primary used by vsc.loadTsModule
 * @oneLineEx const moduleMap = vsc.getVscDefaultModuleMap
 * @returns \{ [key: string]: \{ name: string, module: any \} \}
 */
   export undefined
,
 /**
 * Does path start with charactor [a-zA-Z@] (not '/' or './' or '../')
 * @see http://vsc-base.org/#isAbsolutePath
 * @param path
 * @param startWithRegExp? If your project defines another definition of absolute path then overwrite this.
 * @oneLineEx const isAbsolutePath = vsc.isAbsolutePath(path)
 * @returns boolean
 */
   export undefined
,
 /**
 * Test is a path is directory
 * @param path
 * @dependencyExternal fs
 * @oneLineEx const isDir = vsc.isDir(path)
 * @see http://vsc-base.org/#isDir
 * @returns boolean
 */
   export undefined
,
 /**
 * Does subpath start with parentPath
 * @see http://vsc-base.org/#isSubPath
 * @param path
 * @param parentPath
 * @dependencyInternal trimDashes
 * @oneLineEx const isSubPath = vsc.isSubPath(path)
 * @returns boolean
 */
   export undefined
,
 /**
 * Joins to paths.
 * @see http://vsc-base.org/#joinPaths
 * @param path1
 * @param path2
 * @dependencyInternal trimDashes
 * @oneLineEx const newPath = vsc.joinPaths(path1, path2)
 * @returns string
 */
   export undefined
,
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
   export undefined
,
 /**
 * Pre method for loadTsModule. (This methods load the ts source, transpile it to js and replace all 'require' instance)
 * @see http://vsc-base.org/#loadTsModuleSourceCode
 * @param path
 * @param compilerOptions 
 * @param moduleMap default = vsc.getVscDefaultModuleMap()
 * @oneLineEx const sourceJs = await vsc.loadTsModuleSourceCode(path)
 * @returns Promise<string>
 */
   export undefined
,
 /**
 * Make a folder
 * @see http://vsc-base.org/#makeDir
 * @param path
 * @param newPathstring
 * @dependencyExternal fs
 * @oneLineEx await vsc.makeDir(path)
 * @returns Promise<void>
 */
   export undefined
,
 /**
 * Move file/fodler
 * @see http://vsc-base.org/#move
 * @param path
 * @param newPathstring
 * @oneLineEx await vsc.move(oldPath, newPath)
 * @dependencyExternal fs
 * @returns Promise<void>
 */
   export undefined
,
 /**
 * Reaplve all '\\'  with '/'
 * @see http://vsc-base.org/#pathAsUnix
 * @param path
 * @oneLineEx const path = vsc.joinPaths(path1, path2)
 * @returns string
 */
   export undefined
,
 /**
 * Prompt user for a question with a list of answers
 * @see http://vsc-base.org/#pick
 * @param path string[]
 * @dependencyExternal vscode
 * @oneLineEx const answer = await vsc.pick(answers)
 * @ex 
 const list = \['yes', 'no']
 const answer = await vsc.pick(list)
 * @returns Promise<string | undefined>
 */
   export undefined
,
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
   export undefined
,
 /**
 * Save active open file.
 * Return true for succes, and false if there was no open document
 * @see http://vsc-base.org/#saveActiveDocument
 * @dependencyInternal getActiveDocument
 * @oneLineEx const success = await vsc.saveActiveDocument(content)
 * @returns Promise<boolean>
 */
   export undefined
,
 /**
 * Save All files
 * @see http://vsc-base.org/#saveAll
 * @dependencyExternal vscode
 * @oneLineEx await vsc.saveAll()
 * @returns Promise<void>
 */
   export undefined
,
 /**
 * Save file
 * @see http://vsc-base.org/#saveFileContent
 * @param path
 * @param content
 * @dependencyExternal fs
 * @oneLineEx await vsc.saveFileContent(path, source)
 * @returns Promise<void>
 */
   export undefined
,
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
   export undefined
,
 /**
 * Set current open file's content.
 * Return true if success, and false if there was no ActiveTextEditor or OpenDocument.
 * @see http://vsc-base.org/#setActiveDocumentContent
 * @param content
 * @dependencyInternal getActiveDocument, getActiveEditor
 * @dependencyExternal vscode
 * @oneLineEx const success = await vsc.setActiveDocumentContent(content)
 * @returns Promise<boolean>
 */
   export undefined
,
 /**
 * Return the path that are shared. (Return '' if no path are shared).
 * @see http://vsc-base.org/#sharedPath
 * @param path1
 * @param path2
 * @oneLineEx const sharedPath = vsc.sharedPath(path1, path2)
 * @returns string
 */
   export undefined
,
 /**
 * Show error message to user
 * @see http://vsc-base.org/#showErrorMessage
 * @param message
 * @dependencyExternal vscode
 * @oneLineEx vsc.showErrorMessage(message)
 * @returns Promise<void>
 */
   export undefined
,
 /**
 * Show message to user
 * @see http://vsc-base.org/#showMessage
 * @param message
 * @dependencyExternal vscode
 * @oneLineEx vsc.showMessage(message)
 * @returns Promise<void>
 */
   export undefined
,
 /**
 * await wrap for setTimeout. Mostly used for debug asyc.
 * @see http://vsc-base.org/#sleep
 * @param ms
 * @oneLineEx await vsc.sleep(2000)
 * @async
 * @returns Promise<void>
 */
   export undefined
,
 /**
 * Split filePath into dir and file
 * @see http://vsc-base.org/#splitPath
 * @param path
 * @dependencyInternal pathAsUnix
 * @oneLineEx const [dir, file] = vsc.splitPath(filePath)
 * @returns [string, string]
 */
   export undefined
,
 /**
 * Remove parent-path from a path
 * @see http://vsc-base.org/#subtractPath
 * @param path
 * @param parentPath
 * @param trimDashes default true
 * @dependencyInternal trimDashes
 * @oneLineEx const newPath = vsc.subtractPath(path, parentPath)
 * @returns string
 */
   export undefined
,
 /**
 * Format a string to camal-case. Commonly used to define js/ts variable names.
 * (Some-Name => someName, some_name => someName, some.name => someName )
 * All non word seperators will be removed and the word charector after will be transforms to upper case
 * @see http://vsc-base.org/#toCamelcase
 * @param str
 * @oneLineEx const name = vsc.toCamelcase(kebabName)
 * @returns string
 */
   export undefined
,
 /**
 * Transpile ts source to js
 * @see http://vsc-base.org/#transpileTs
 * @param sourceTs 
 * @param compilerOptions 
 * @oneLineEx const sourceJs = vsc.transpileTs(sourceTs)
 * @returns string
 */
   export undefined
,
 /**
 * Remove '/' from start and end of path
 * @see http://vsc-base.org/#trimDashes
 * @param path
 * @oneLineEx const path = vsc.trimDashes(foundPath)
 * @returns string
 */
   export undefined
,
 /**
 * Remove '/' from start of path
 * @see http://vsc-base.org/#trimLeadingDash
 * @param path
 * @oneLineEx const path = vsc.trimLeadingDash(foundPath)
 * @returns string
 */
   export undefined
,
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
   export undefined

   
}

