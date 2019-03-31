import * as fs from 'fs-extra'
import * as vscode from 'vscode'
import vscRaw from './vsc-base-raw'

/**
 * Create a LineReader (generator method) for a ReadStream
 * @returns () => AsyncIterableIterator<string>
 * @see http://vsc-base.org/#getLineStreamReader
 * @returns any
 */
const getLineStreamReader = (readStream: fs.ReadStream) => (
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
   })
//codeEx: const readStream = getReadStream(path)
//codeEx: const lineReader = getLineStreamReader(readStream)
//codeEx: for await (chunk of readStream) { }

/**
 * Get a file ReadStream
 * @param path
 * @see http://vsc-base.org/#getReadStream
 * @returns any
 */
const getReadStream = (path: string) => {
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
//codeEx: const readStream = getReadStream(path) 
//codeEx: for await (chunk of readStream) { }

/**
 * Prompt user for a question
 * @param path
 * @see http://vsc-base.org/#ask
 * @returns any
 */
const ask = async (question: string, defaultValue: string): Promise<string | undefined> =>
   await vscode.window.showInputBox({
      prompt: question,
      value: defaultValue
   })
//codeEx: const answer ask(question, defaultValue)

/**
 * Does the folder/file exist
 * @param path string
 * @see http://vsc-base.org/#doesExists
 * @returns any
 */
const doesExists = (path: string): boolean => {
   return fs.existsSync(path)
}
//codeEx: const exist = vsc.doesExists(path)


/**
 * Get a list off all filePaths in project the matches a glob pattern
 * @param include glob
 * @param exclude glob
 * @param maxResults
 * @see http://vsc-base.org/#findFilePaths
 * @returns any
 */
const findFilePaths = async (
   include: vscode.GlobPattern,
   exclude: vscode.GlobPattern = '**/node_modules/**',
   maxResults: number = 100000
): Promise<string[]> => {
   const uriFiles = await vscode.workspace.findFiles(include, exclude, maxResults)
   const files = uriFiles.map((uri: vscode.Uri) => vsc.pathAsUnix(uri.fsPath))
   return files
}
//codeEx: const files = await vsc.findFilePaths('*test*.{ts,jsx,ts,tsx}')

/**
 * Get a list off all filePaths from a basePath, in project the matches a glob pattern
 * @param include glob
 * @param exclude glob
 * @param maxResults
 * @see http://vsc-base.org/#findFilePathsFromBase
 * @returns any
 */
const findFilePathsFromBase = async (
   basePath: string,
   includePattern: string,
   exclude: vscode.GlobPattern = '**/node_modules/**',
   maxResults: number = 100000
): Promise<string[]> => {
   let baseDir = vsc.getDir(basePath)
   const include = new vscode.RelativePattern(baseDir, includePattern)
   const filePaths = await vsc.findFilePaths(include, exclude, maxResults)
   return filePaths
}
//codeEx: const files = await vsc.findFilePathsFromBase(dir, '*test*.{ts,jsx,ts,tsx}')

/**
 * Find files based from a releative to a path
 * @param path 
 * @param relativePath 
 * @param includePattern 
 * @param exclude 
 * @param maxResults 
 * @see http://vsc-base.org/#findRelativeFilePaths
 * @returns any
 */
const findRelativeFilePaths = async (
   path: string,
   relativePath: string,
   includePattern: string,
   exclude: vscode.GlobPattern = '**/node_modules/**',
   maxResults: number = 100000
): Promise<string[]> => {
   const dir = vsc.getDir(path)
   const joinPath = vsc.joinPaths(dir, relativePath)
   let base = vsc.cleanPath(joinPath+'/')
   base = vsc.trimDashes(base)
   const filePaths = await vsc.findFilePathsFromBase(base, includePattern, exclude, maxResults)
   return filePaths
}
//codeEx: const files = await vsc.findRelativeFilePaths(path, '../', '*test*.{ts,jsx,ts,tsx}')


/**
 * Get open vscode.TextDocument
 * @see http://vsc-base.org/#getActiveDocument
 * @returns any
 */
const getActiveDocument = (): vscode.TextDocument | undefined => {
   const activeEditor = vscode.window.activeTextEditor
   const document = activeEditor && activeEditor.document
   return document
}
//codeEx: const doc = vsc.getActiveDocument()

/**
 * Get current open file path or undefined if nothing is open.
 * @see http://vsc-base.org/#getActiveOpenPath
 * @returns any
 */
const getActiveOpenPath = (): string | undefined => {
   const document = vsc.getActiveDocument()
   return (document && document.fileName) || undefined
}
//codeEx: const openPath = vsc.getActiveOpenPath()

/**
 * Get vscode project config
 * @see http://vsc-base.org/#getConfig
 * @returns any
 */
const getConfig = <T>(projectName: string, property: string, defaultValue: T): T => {
   return vscode.workspace.getConfiguration(projectName).get<T>(property, defaultValue)
}
//codeEx: const myOption = vsc.getConfig(projectName, optionName, defaultValue)

/**
* Get dir from path (If path is a dir return it)
* @param path 
*/
const getDir = (path: string) => {
   const isDir = vsc.isDir(path);
   if(isDir){
      return path;
   }
   const [dir] = vsc.splitPath(path);
   return dir;
}
//codeEx: const dir = vsc.getDir(path)


/**
 * Get file source
 * @param path
 * @see http://vsc-base.org/#getFileContent
 * @returns any
 */
const getFileContent = async (path: string): Promise<string> => await fs.readFile(path, 'utf8')
//codeEx: const source = vsc.getFileContent(path)

/**
 * Get file source as json (return null on invalid json)
 * @param path
 * @see http://vsc-base.org/#getJsonContent
 * @returns Promise<any>
 * @see http://vsc-base.org/#getJsonContent
 * @returns any
 */
const getJsonContent = async (path: string, throws = false): Promise<any> => await fs.readJson(path, { throws })
//codeEx: const json = vsc.getJsonContent(path)


/**
 * Find packages file paths in project.
 * @see http://vsc-base.org/#getPackageFilePaths
 * @returns Promise<string[]>
 * @see http://vsc-base.org/#getPackageFilePaths
 * @returns any
 */
const getPackageFilePaths = async (): Promise<string[]> => {
   const packageFiles = await vsc.findFilePaths('**/package.json')
   return packageFiles;
}
//codeEx: const packageFilePaths = vsc.getPackageFilePaths()

/**
 * Find roots packages and collect the dependencies and devDependencies.
 * @returns [dependencies, devDependencies]
 * @see http://vsc-base.org/#getPackageDependencies
 * @returns any
 */
const getPackageDependencies = async (): Promise<{[ket: string]: string}[]> => {
   let dependencies: {[k:string]: string} = {}
   let devDependencies: {[k:string]: string } = {}
   const packageFilePaths = await getPackageFilePaths()
   for (let i = 0; i < packageFilePaths.length; i++) {
      const packageFile = packageFilePaths[i]
      const packageJson = await vsc.getJsonContent(packageFile)
      if (!packageJson) {
         continue
      }
      const packageDependencies = vsc.getJsonParts(packageJson, 'dependencies')
      const packageDevDependencies = vsc.getJsonParts(packageJson, 'devDependencies')
      if (packageDependencies) {
         dependencies = {...dependencies, ...packageDependencies }
      }
      if (packageDevDependencies) {
         devDependencies = { ...devDependencies, ...packageDevDependencies }
      }
   }
   return [dependencies, devDependencies]
}
//codeEx: const [] = getPackageDependencies()


/**
 * Get project root for a path or undefined if no project was found.
 * dependensies: { vscode.Uri.parse, vscode.workspace.getWorkspaceFolder, methods.pathAsUnix }
 * @param path
 * @see http://vsc-base.org/#getRootPath
 * @returns any
 */
const getRootPath = (uri: vscode.Uri): string | undefined => {
   //const uri = vscode.Uri.parse(path)
   const workspaceFolder = vscode.workspace.getWorkspaceFolder(uri)
   if (!workspaceFolder) {
      return undefined
   }
   let rottPath = workspaceFolder.uri.fsPath
   rottPath = vsc.pathAsUnix(rottPath)
   return rottPath
}

/**
 * Test is a path is directory
 * dependensies: { fs.statSync(Faile access) }
 * @param path
 * @see http://vsc-base.org/#isDir
 * @returns any
 */
const isDir = (path: string): boolean => {
   return fs.statSync(path).isDirectory()
}

/**
 * Make a folder
 * dependensies: { fs.move(File access) }
 * @param path
 * @param newPathstring
 * @see http://vsc-base.org/#makeDir
 * @returns any
 */
const makeDir = async (folderPath: string): Promise<void> => {
   await fs.mkdir(folderPath)
}

/**
 * Move file/fodler
 * @param path
 * @param newPathstring
 * @see http://vsc-base.org/#move
 * @returns any
 */
const move = async (path: string, newPath: string): Promise<void> => {
   await fs.move(path, newPath)
}

/**
 * Save All files
 * @see http://vsc-base.org/#saveAll
 * @returns any
 */
const saveAll = async (): Promise<void> => {
   await vscode.workspace.saveAll(false)
}

/**
 * Save file
 * @param path
 * @param content
 * @see http://vsc-base.org/#saveFileContent
 * @returns any
 */
const saveFileContent = async (path: string, content: string): Promise<void> => {
   await fs.writeFile(path, content)
}

/**
 * Show error message to user
 * @param message
 * @see http://vsc-base.org/#showErrorMessage
 * @returns any
 */
const showErrorMessage = async (message: string): Promise<void> => {
   await vscode.window.showErrorMessage(message)
}

/**
 * Show message to user
 * @param message
 * @see http://vsc-base.org/#showMessage
 * @returns any
 */
const showMessage = async (message: string): Promise<void> => {
   await vscode.window.showInformationMessage(message)
}

/**
 * export methods
 * @see http://vsc-base.org/#vsc
 * @returns any
 */
const vsc /* IVscBase */ = {
   ...vscRaw,
   ask,
   doesExists,
   findFilePaths,
   findFilePathsFromBase,
   findRelativeFilePaths,
   getActiveDocument,
   getActiveOpenPath,
   getConfig,
   getDir,
   getFileContent,
   getJsonContent,
   getLineStreamReader,
   getPackageDependencies,
   getReadStream,
   getRootPath,
   isDir,
   makeDir,
   move,
   saveAll,
   saveFileContent,
   showErrorMessage,
   showMessage
}
export default vsc
