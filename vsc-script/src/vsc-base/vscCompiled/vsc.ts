import * as fs from 'fs-extra'
import * as vscode from 'vscode'
import * as ts from 'typescript'

/**
/**
 * VscTemplate types
 */
export type vscTemplate = {
   userInputs: vscUserInput[]
   template: vscTemplateItem[]
}

export type vscTemplateItem = vscTemplateFolder | vscTemplateFile

export type vscTemplateFolder = {
   type: 'folder'
   name: vscStringDelegate
   children?: vscTemplateItem[]
}
export type vscTemplateFile = {
   type: 'file'
   name: vscStringDelegate
   content: vscStringDelegate
}

export type vscUserInput = {
   title: string
   argumentName: string
   defaultValue: string
}
export type vscUserInputs = { [key: string]: string }
export type vscStringDelegate = string | ((inputs: vscUserInputs) => string)

/**
 * Add './' to start of path
 * @param path
 * @see http://vsc-base.org/#addLeadingLocalDash
 * @returns string
 */
export const addLeadingLocalDash = (path: string): string => {
   return './' + path
}

/**
 * Append new line content in the end of the open document
 * @param content
 * @dependencyInternal appendToActiveDocument
 * @oneLineEx const success = await vsc.appendLineToActiveDocument(content)
 * @see http://vsc-base.org/#appendLineToActiveDocument
 * @returns Promise<boolean>
 */
export const appendLineToActiveDocument = async (
   content: string
): Promise<boolean> => {
   return await appendToActiveDocument('\n' + content)
}

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
export const appendToActiveDocument = async (
   content: string
): Promise<boolean> => {
   const document = getActiveDocument()
   const editor = getActiveEditor()
   if (document && editor) {
      await appendToDocument(editor, document, content)
      return true
   }
   return false
}

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
export const appendToDocument = async (
   editor: vscode.TextEditor,
   document: vscode.TextDocument,
   content: string
): Promise<void> => {
   const startPosition = new vscode.Position(document.lineCount, 0)
   const endPosition = new vscode.Position(document.lineCount, 0)
   const fullRange = new vscode.Range(startPosition, endPosition)
   const snippetString = new vscode.SnippetString(content)
   await editor.insertSnippet(snippetString, fullRange)
}

/**
 * Prompt user for a question
 * @param path
 * @dependencyExternal vscode
 * @oneLineEx const answer = await ask(question, defaultValue)
 * @ex const answer = await ask('Where to move file?', currentFilePath)
 * @see http://vsc-base.org/#ask
 * @returns Promise<string | undefined>
 */
export const ask = async (
   question: string,
   defaultValue: string
): Promise<string | undefined> =>
   await vscode.window.showInputBox({
      prompt: question,
      value: defaultValue
   })

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
 * Format a string from camel-case to kebab-case. Commonly used to define css class names. (SomeName => some-name)
 * @param str
 * @see http://vsc-base.org/#camalcaseToKebabcase
 * @returns string
 */
export const camalcaseToKebabcase = (str: string): string =>
   str[0].toLowerCase() +
   str.substr(1).replace(/([A-Z])/g, ([letter]) => `-${letter.toLowerCase()}`)

/**
 * Get clean path. folder/../folder/file => folder/file, folder/./file => file
 * @param path
 * @see http://vsc-base.org/#cleanPath
 * @returns string
 */
export const cleanPath = (path: string): string => {
   path = path.replace(/\/.\//g, '/')
   const reg = /\/\w+\/\.\.\//
   while (reg.test(path)) {
      path = path.replace(reg, '/')
   }
   return path
}

/**
 * Does the folder/file exist
 * @param path string
 * @dependencyExternal fs
 * @oneLineEx const exist = vsc.doesExists(path)
 * @see http://vsc-base.org/#doesExists
 * @returns boolean
 */
export const doesExists = (path: string): boolean => {
   return fs.existsSync(path)
}

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
export const findFilePaths = async (
   include: vscode.GlobPattern = '**/*.{js,jsx,ts,tsx}',
   exclude: vscode.GlobPattern = '**/node_modules/**',
   maxResults: number = 100000
): Promise<string[]> => {
   const uriFiles = await vscode.workspace.findFiles(
      include,
      exclude,
      maxResults
   )
   const files = uriFiles.map((uri: vscode.Uri) => pathAsUnix(uri.fsPath))
   return files
}

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
export const findFilePathsFromBase = async (
   basePath: string,
   includePattern: string = '**/*.{js,jsx,ts,tsx}',
   exclude: vscode.GlobPattern = '**/node_modules/**',
   maxResults: number = 100000
): Promise<string[]> => {
   let baseDir = getDir(basePath)
   const include = new vscode.RelativePattern(baseDir, includePattern)
   const filePaths = await findFilePaths(include, exclude, maxResults)
   return filePaths
}

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
export const findRelativeFilePaths = async (
   path: string,
   relativePath: string,
   includePattern: string = '**/*.{js,jsx,ts,tsx}',
   exclude: vscode.GlobPattern = '**/node_modules/**',
   maxResults: number = 100000
): Promise<string[]> => {
   const dir = getDir(path)
   const joinPath = joinPaths(dir, relativePath)
   let base = cleanPath(joinPath + '/')
   base = trimDashes(base)
   const filePaths = await findFilePathsFromBase(
      base,
      includePattern,
      exclude,
      maxResults
   )
   return filePaths
}

/**
 * Get open vscode.TextDocument
 * @dependencyExternal vscode
 * @oneLineEx const document = vsc.getActiveDocument()
 * @see http://vsc-base.org/#getActiveDocument
 * @returns vscode.TextDocument | undefined
 */
export const getActiveDocument = (): vscode.TextDocument | undefined => {
   const activeEditor = getActiveEditor()
   const document = activeEditor && activeEditor.document
   return document
}

/**
 * Get current open file's content.
 * @dependencyInternal getActiveDocument
 * @oneLineEx const content = vsc.getActiveDocumentContent()
 * @see http://vsc-base.org/#getActiveDocumentContent
 * @returns string | undefined
 */
export const getActiveDocumentContent = (): string | undefined => {
   const document = getActiveDocument()
   return (document && document.getText()) || undefined
}

/**
 * Get current open file path or undefined if nothing is open.
 * @dependencyInternal getActiveDocument
 * @oneLineEx const path = vsc.getActivegetActiveDocumentPath()
 * @see http://vsc-base.org/#getActivegetActiveDocumentPath
 * @returns string | undefined
 */
export const getActiveDocumentPath = (): string | undefined => {
   const document = getActiveDocument()
   return (document && document.fileName) || undefined
}

/**
 * Get vscode.activeTextEditor
 * @dependencyExternal vscode
 * @oneLineEx const editor = vsc.getActiveEditor()
 * @see http://vsc-base.org/#getActiveDocument
 * @returns vscode.TextEditor | undefined
 */
export const getActiveEditor = (): vscode.TextEditor | undefined => {
   return vscode.window.activeTextEditor
}

/**
 * Get vscode project config
 * @dependencyExternal vscode
 * @oneLineEx const myOption = vsc.getConfig(projectName, optionName, defaultValue)
 * @ex const myOption = vsc.getConfig('myExtension', 'doThisThing', false)
 * @see http://vsc-base.org/#getConfig
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
 * Get dir from path (If path is a dir return it)
 * @param path
 * @dependencyInternal isDir, splitPath
 * @oneLineEx const dir = vsc.getDir(path)
 * @see http://vsc-base.org/#getDir
 * @returns string
 */
export const getDir = (path: string) => {
   const _isDir = isDir(path)
   if (_isDir) {
      return path
   }
   const [dir] = splitPath(path)
   return dir
}

/**
 * Get file source
 * @param path
 * @dependencyExternal fs
 * @oneLineEx const source = vsc.getFileContent(path)
 * @see http://vsc-base.org/#getFileContent
 * @returns Promise<string>
 */
export const getFileContent = async (path: string): Promise<string> =>
   await fs.readFile(path, 'utf8')

/**
 * Get a vscodeRange for the entire document
 * @param document
 * @dependencyExternal vscode
 * @oneLineEx const fullRange = vsc.getFullDocumentRange(document)
 * @see http://vsc-base.org/#getFullDocumentRange
 * @returns boolean
 */
export const getFullDocumentRange = (
   document: vscode.TextDocument
): vscode.Range => {
   const startPosition = new vscode.Position(0, 0)
   const endPosition = new vscode.Position(document.lineCount, 0)
   const fullRange = new vscode.Range(startPosition, endPosition)
   return fullRange
}

/**
 * Get file source as json (return null on invalid json)
 * @param path
 * @dependencyExternal fs
 * @oneLineEx const json = await vsc.getJsonContent(path)
 * @see http://vsc-base.org/#getJsonContent
 * @returns unknown
 */
export const getJsonContent = async (
   path: string,
   throws = false
): Promise<unknown> => await fs.readJson(path, { throws })

/**
 * Get part of a json object.
 * @param json
 * @param keyPath Ex sub.sub.name >> {sub:{sub:{name:'Foo'}}} >> Foo
 * @see http://vsc-base.org/#getJsonParts
 * @returns any
 */
export const getJsonParts = (
   json: { [name: string]: any },
   keyPath: string
): any => {
   let current: any = json
   const keySplit = keyPath.split(/\./)
   for (let i = 0; i < keySplit.length; i++) {
      const key = keySplit[i]
      if (current[key] === undefined) {
         return undefined
      }
      current = current[key]
   }
   return current
}

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
export const getLineStreamReader = (readStream: fs.ReadStream) =>
   async function*() {
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
 * Find package.json files and collect the dependencies and devDependencies.
 * @dependencyInternal getPackageFilePaths, getJsonContent, getJsonParts
 * @oneLineEx const [dependencies, devDependencies] = await vsc.getPackageDependencies()
 * @todo Use unknow guard check instead of any casting
 * @see http://vsc-base.org/#getPackageDependencies
 * @returns Promise<{ [key: string]: string }[]
 */
export const getPackageDependencies = async (): Promise<
   { [key: string]: string }[]
> => {
   let dependencies: { [k: string]: string } = {}
   let devDependencies: { [k: string]: string } = {}
   const packageFilePaths = await getPackageFilePaths()
   for (let i = 0; i < packageFilePaths.length; i++) {
      const packageFile = packageFilePaths[i]
      const packageJson = await getJsonContent(packageFile)
      if (!packageJson) {
         continue
      }
      const packageDependencies = getJsonParts(<any>packageJson, 'dependencies')
      const packageDevDependencies = getJsonParts(
         <any>packageJson,
         'devDependencies'
      )
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
 * Find packages file paths in project.
 * @dependencyInternal findFilePaths
 * @oneLineEx const packageFilePaths = await vsc.getPackageFilePaths()
 * @see http://vsc-base.org/#getPackageFilePaths
 * @returns Promise<string[]>
 */
export const getPackageFilePaths = async (): Promise<string[]> => {
   const packageFiles = await findFilePaths('**/package.json')
   return packageFiles
}

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
export const getRelativePath = (fromPath: string, toPath: string): string => {
   const _sharedPath = sharedPath(fromPath, toPath)
   const [fromDir] = splitPath(fromPath)
   const [toDir] = splitPath(toPath)
   const fromPathDownToShared = subtractPath(fromDir, _sharedPath)
   let toPathDownToShared = subtractPath(toDir, _sharedPath)
   const backPath = fromPathDownToShared
      .split(/\//)
      .map(_ => '../')
      .join('')
   const relativePath = backPath + toPathDownToShared
   return relativePath
}

/**
 * Get project root for a path or undefined if no project was found.
 * @param path
 * @dependencyExternal vscode
 * @dependencyInternal pathAsUnix
 * @oneLineEx const rootPath = vsc.getRootPath()
 * @see http://vsc-base.org/#getRootPath
 * @returns string | undefined
 */
export const getRootPath = (path: string): string | undefined => {
   const uri = vscode.Uri.file(path)
   const workspaceFolder = vscode.workspace.getWorkspaceFolder(uri)
   if (!workspaceFolder) {
      return undefined
   }
   let rootPath = workspaceFolder.uri.fsPath
   rootPath = pathAsUnix(rootPath)
   return rootPath
}

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
export const getSubrelativePathFromAbsoluteRootPath = (
   path: string,
   absolutePathFromRoot: string,
   rootPath: string
): string => {
   const [sourceDirPath] = splitPath(path)
   let sourceDirPathFromRoot = subtractPath(sourceDirPath, rootPath)
   sourceDirPathFromRoot = sourceDirPathFromRoot + '/'
   let absolutePathFromSourceDir = subtractPath(
      absolutePathFromRoot,
      sourceDirPathFromRoot
   )
   if (absolutePathFromSourceDir !== absolutePathFromRoot) {
      absolutePathFromSourceDir = addLeadingLocalDash(absolutePathFromSourceDir)
   }
   return absolutePathFromSourceDir
}

/**
 * Does path start with charactor [a-zA-Z@] (not '/' or './' or '../')
 * @param path
 * @param startWithRegExp? If your project defines another definition of absolute path then overwrite this.
 * @see http://vsc-base.org/#isAbsolutePath
 * @returns boolean
 */
export const isAbsolutePath = (
   path: string,
   startWithRegExp = /^[a-zA-Z@]/
): boolean => {
   return startWithRegExp.test(path)
}

/**
 * Test is a path is directory
 * @param path
 * @dependencyExternal fs
 * @oneLineEx const _isDir = vsc.isDir(path)
 * @see http://vsc-base.org/#isDir
 * @returns boolean
 */
export const isDir = (path: string): boolean => {
   return fs.statSync(path).isDirectory()
}

/**
 * Does subpath start with parentPath
 * @param path
 * @param parentPath
 * @dependencyInternal trimDashes
 * @see http://vsc-base.org/#isSubPath
 * @returns boolean
 */
export const isSubPath = (subPath: string, parentPath: string): boolean => {
   parentPath = trimDashes(parentPath)
   const result = subPath.indexOf(parentPath + '/') === 0
   return result
}

/**
 * Joins to paths.
 * @param path1
 * @param path2
 * @dependencyInternal trimDashes
 * @see http://vsc-base.org/#joinPaths
 * @returns string
 */
export const joinPaths = (path1: string, path2: string): string => {
   path1 = trimDashes(path1)
   path2 = trimDashes(path2)
   const result = path1 + '/' + path2
   return result
}

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
export const loadTsModule = async (
   path: string,
   vsc: any
): Promise<{ [key: string]: unknown }> => {
   const scriptFileTs = await getFileContent(path)
   const transpiledOutput = ts.transpileModule(scriptFileTs, {})
   const sourceJs = transpiledOutput.outputText
   const wrapExports = `_exports = (function (vsc){var exports = {};${sourceJs};return exports})(vsc);`
   let _exports: { [key: string]: unknown } = {}
   try {
      eval(wrapExports)
   } catch (e) {
      throw e // retrhow
   }
   return _exports
}

/**
 * Make a folder
 * @param path
 * @param newPathstring
 * @dependencyExternal fs
 * @oneLineEx await vsc.makeDir(path)
 * @see http://vsc-base.org/#makeDir
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
 * @param path
 * @param newPathstring
 * @oneLineEx await vsc.move(oldPath, newPath)
 * @dependencyExternal fs
 * @see http://vsc-base.org/#move
 * @returns Promise<void>
 */
export const move = async (path: string, newPath: string): Promise<void> => {
   await fs.move(path, newPath)
}

/**
 * Reaplve all '\\'  with '/'
 * @param path
 * @see http://vsc-base.org/#pathAsUnix
 * @returns string
 */
export const pathAsUnix = (path: string): string => {
   return path.replace(/\\/g, '/')
}

/**
 * Prompt user for a question with a list of answers
 * @param path
 * @dependencyExternal vscode
 * @oneLineEx const answer = await pick(answers)
 * @ex const answer = await ask(\['yes', 'no'\])
 * @see http://vsc-base.org/#pick
 * @returns Promise<string | undefined>
 */
export const pick = async (answerList: string[]): Promise<string | undefined> =>
   await vscode.window.showQuickPick(answerList)

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
export const relatrivePathToAbsolutePath = (
   path: string,
   pathRelatriveToPath: string,
   rootPath: string
): string => {
   if (isAbsolutePath(pathRelatriveToPath)) {
      return pathRelatriveToPath
   }
   let [dir] = splitPath(path)
   dir += '/'
   const relativePath = dir + pathRelatriveToPath
   let cleanRelativePath = cleanPath(relativePath)
   let absolutePathToRelative = subtractPath(cleanRelativePath, rootPath)
   absolutePathToRelative = trimLeadingDash(absolutePathToRelative)
   return absolutePathToRelative
}

/**
 * Save active open file.
 * Return true for succes, and false if there was no open document
 * @dependencyInternal getActiveDocument
 * @oneLineEx const success = await vsc.saveActiveDocument(content)
 * @see http://vsc-base.org/#saveActiveDocument
 * @returns Promise<boolean>
 */
export const saveActiveDocument = async (): Promise<boolean> => {
   const doc = getActiveDocument()
   if (doc) {
      await doc.save()
      return true
   }
   return new Promise(resolve => {
      resolve(false)
   })
}

/**
 * Save All files
 * @dependencyExternal vscode
 * @oneLineEx await vsc.saveAll()
 * @see http://vsc-base.org/#saveAll
 * @returns Promise<void>
 */
export const saveAll = async (): Promise<void> => {
   await vscode.workspace.saveAll(false)
}

/**
 * Save file
 * @param path
 * @param content
 * @dependencyExternal fs
 * @oneLineEx await vsc.saveFileContent(path, source)
 * @see http://vsc-base.org/#saveFileContent
 * @returns Promise<void>
 */
export const saveFileContent = async (
   path: string,
   content: string
): Promise<void> => {
   await fs.writeFile(path, content)
}

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
export const scaffoldTemplate = async (
   path: string,
   templateItem: vscTemplateItem,
   userInputs: vscUserInputs = {}
): Promise<void> => {
   switch (templateItem.type) {
      case 'folder': {
         let name = templateItem.name
         if (typeof name === 'function') {
            name = name.call(null, userInputs)
         }
         const folderPath = path + '/' + name
         await makeDir(folderPath)
         if (!templateItem.children) {
            break
         }
         templateItem.children.forEach(async (childItem: any) => {
            scaffoldTemplate(folderPath, childItem, userInputs)
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
         await saveFileContent(filePath, content)
      }
   }
}

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
export const setActiveDocumentContent = async (
   content: string
): Promise<boolean> => {
   const document = getActiveDocument()
   const editor = getActiveEditor()
   if (editor && document) {
      const fullRange = getFullDocumentRange(document)
      const snippetString = new vscode.SnippetString(content)
      await editor.insertSnippet(snippetString, fullRange)
      return true
   }
   return false
}

/**
 * Return the path that are shared. (Return '' if no path are shared).
 * @param path1
 * @param path2
 * @see http://vsc-base.org/#sharedPath
 * @returns string
 */
export const sharedPath = (path1: string, path2: string): string => {
   const path1Parts = path1.split(/\//)
   const path2Parts = path2.split(/\//)
   const shared = []
   for (let i = 0; i < path1Parts.length; i++) {
      if (!path2Parts[i] || path1Parts[i] !== path2Parts[i]) {
         break
      }
      shared.push(path1Parts[i])
   }
   const finalShared = shared.join('/')
   return finalShared
}

/**
 * Show error message to user
 * @param message
 * @dependencyExternal vscode
 * @oneLineEx await vsc.showErrorMessage(message)
 * @see http://vsc-base.org/#showErrorMessage
 * @returns Promise<void>
 */
export const showErrorMessage = async (message: string): Promise<void> => {
   await vscode.window.showErrorMessage(message)
}

/**
 * Show message to user
 * @param message
 * @dependencyExternal vscode
 * @oneLineEx await vsc.showMessage(message)
 * @see http://vsc-base.org/#showMessage
 * @returns Promise<void>
 */
export const showMessage = async (message: string): Promise<void> => {
   await vscode.window.showInformationMessage(message)
}

/**
 * await wrap for setTimeout. Mostly used for debug asyc.
 * @param ms
 * @see http://vsc-base.org/#sleep
 * @async
 * @returns any
 */
export const sleep = async (ms: number): Promise<void> => {
   return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Split path into dir and file
 * @param path
 * @dependencyInternal pathAsUnix
 * @see http://vsc-base.org/#splitPath
 * @returns [dir, name]
 */
export const splitPath = (path: string): [string, string] => {
   path = pathAsUnix(path)
   const splits = path.split('/')
   const name = splits.pop() || ''
   const dir = splits.join('/')
   return [dir, name]
}

/**
 * Remove parent-path from a path
 * @param path
 * @param parentPath
 * @param trimDashes default true
 * @dependencyInternal trimDashes
 * @see http://vsc-base.org/#subtractPath
 * @returns string
 */
export const subtractPath = (
   path: string,
   parentPath: string,
   _trimDashes = true
): string => {
   const regexp = new RegExp(`^${parentPath}`)
   let newPath = path.replace(regexp, '')
   if (trimDashes) {
      newPath = trimDashes(newPath)
   }
   return newPath
}

/**
 * Format a string to camal-case. Commonly used to define js/ts variable names.
 * (Some-Name => someName, some_name => someName, some.name => someName )
 * All non word seperators will be removed and the word charector after will be transforms to upper case
 * @param str
 * @see http://vsc-base.org/#toCamelcase
 * @returns string
 */
export const toCamelcase = (str: string): string =>
   str[0].toLowerCase() +
   str.substr(1).replace(/[^a-zA-Z]+(.)/g, (_match, chr) => chr.toUpperCase())

/**
 * Remove '/' from start and end of path
 * @param path
 * @see http://vsc-base.org/#trimDashes
 * @returns string
 */
export const trimDashes = (path: string): string => {
   return path.replace(/(^\/|\/$)/g, '')
}

/**
 * Remove '/' from start of path
 * @param path
 * @see http://vsc-base.org/#trimLeadingDash
 * @returns string
 */
export const trimLeadingDash = (path: string): string => {
   return path.replace(/^\//, '')
}

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
