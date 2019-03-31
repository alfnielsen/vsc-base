import * as fs from 'fs-extra'
import * as vscode from 'vscode'
import vscRaw from './vsc-base-raw'

/**
 * Create a LineReader (generator method) for a ReadStream
 */
const getLineStreamReader = (): ReadStreamGenerator =>
   async function*(chunksAsync: fs.ReadStream): any {
      let previous = ''
      for await (const chunk of chunksAsync) {
         previous += chunk
         let eolIndex
         while ((eolIndex = previous.indexOf('\n')) >= 0) {
            // line includes the EOL
            const line = previous.slice(0, eolIndex + 1)
            yield line
            previous = previous.slice(eolIndex + 1)
         }
      }
      if (previous.length > 0) {
         yield previous
      }
   }
type ReadStreamGenerator = (chunksAsync: fs.ReadStream) => any

/**
 * Get a fs.ReadStream
 * @param path
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
// explame:
const f = async (path: string) => {
   const lineReader = getLineStreamReader()
   const readStream = getReadStream(path)
   for await (const chunk of lineReader(readStream)) {
      console.log('>>> ' + chunk)
   }
}

/**
 * Prompt user for a question
 * @param path
 */
const ask = async (question: string, defaultValue: string): Promise<string | undefined> =>
   await vscode.window.showInputBox({
      prompt: question,
      value: defaultValue
   })

/**
 * Does the folder/file exist
 * @param path string
 */
const doesExists = (path: string): boolean => {
   return fs.existsSync(path)
}

/**
 * Get a list off all filePaths in project the matches a glob pattern
 * @param include glob
 * @param exclude glob
 * @param maxResults
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

/**
 * Get a list off all filePaths from a basePath, in project the matches a glob pattern
 * @param include glob
 * @param exclude glob
 * @param maxResults
 */
const findFilePathsFromBase = async (
   basePath: string,
   includePattern: string,
   exclude: vscode.GlobPattern = '**/node_modules/**',
   maxResults: number = 100000
): Promise<string[]> => {
   let [dir] = vsc.splitPath(basePath)
   if (!vsc.isDir(basePath)) {
      dir = basePath
   }
   const include = new vscode.RelativePattern(dir, includePattern)
   const uriFiles = await vscode.workspace.findFiles(include, exclude, maxResults)
   const files = uriFiles.map((uri: vscode.Uri) => vsc.pathAsUnix(uri.fsPath))
   return files
}

const findRelativeFilePaths = async (
   path: string,
   relativePath: string,
   includePattern: string,
   exclude: vscode.GlobPattern = '**/node_modules/**',
   maxResults: number = 100000
): Promise<string[]> => {
   let [dir] = vsc.splitPath(path)
   if (vsc.isDir(path)) {
      dir = path
   }
   const base = vsc.cleanPath(dir + relativePath)
   const filePaths = await vsc.findFilePathsFromBase(base, includePattern, exclude, maxResults)
   return filePaths
}

/**
 * Get current open file path or undefioned if nonothing is open.
 */
const getActiveOpenPath = (): string | undefined => {
   const activeEditor = vscode.window.activeTextEditor
   const document = activeEditor && activeEditor.document
   return (document && document.fileName) || undefined
}

/**
 * Get vscode project config
 */
const getConfig = <T>(projectName: string, property: string, defaultValue: T): T => {
   return vscode.workspace.getConfiguration(projectName).get<T>(property, defaultValue)
}

/**
 * Get file source
 * dependensies: { fs.readFile(File access) }
 * @param path
 */
const getFileContent = async (path: string): Promise<string> => await fs.readFile(path, 'utf8')

/**
 * Find roots packages and collect the dependencies and devDependencies.
 * Return as: {dependencies:{names:version}[], devDependencies:{names:version}[]}
 */
const getPackageDependencies = async (): Promise<{
   dependencies: { [key: string]: string }[]
   devDependencies: { [key: string]: string }[]
}> => {
   const packageFiles = await vscode.workspace.findFiles('**/package.json', '**/node_modules/**', 1000)
   const res = { dependencies: [], devDependencies: [] }
   for (let i = 0; i < packageFiles.length; i++) {
      const packageFile = packageFiles[i]
      const packageFileSource = await vsc.getFileContent(packageFile.fsPath)
      const packageJsonRoot = JSON.parse(packageFileSource)
      if (!packageJsonRoot) {
         continue
      }
      const dependencies = vsc.getJsonParts(packageJsonRoot, 'dependencies')
      const devDependencies = vsc.getJsonParts(packageJsonRoot, 'devDependencies')
      if (dependencies) {
         res.dependencies = { ...res.dependencies, ...dependencies }
      }
      if (devDependencies) {
         packageJsonRoot.devDependencies = { ...res.devDependencies, ...devDependencies }
      }
   }
   return res
}

/**
 * Get project root for a path or undefined if no project was found.
 * dependensies: { vscode.Uri.parse, vscode.workspace.getWorkspaceFolder, methods.pathAsUnix }
 * @param path
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
 */
const isDir = (path: string): boolean => {
   return fs.statSync(path).isDirectory()
}

/**
 * Make a folder
 * dependensies: { fs.move(File access) }
 * @param path
 * @param newPathstring
 */
const makeDir = async (folderPath: string): Promise<void> => {
   await fs.mkdir(folderPath)
}

/**
 * Move file/fodler
 * @param path
 * @param newPathstring
 */
const move = async (path: string, newPath: string): Promise<void> => {
   await fs.move(path, newPath)
}

/**
 * Save All files
 */
const saveAll = async (): Promise<void> => {
   await vscode.workspace.saveAll(false)
}

/**
 * Save file
 * @param path
 * @param content
 */
const saveFileContent = async (path: string, content: string): Promise<void> => {
   await fs.writeFile(path, content)
}

/**
 * Show error message to user
 * @param message
 */
const showErrorMessage = async (message: string): Promise<void> => {
   await vscode.window.showErrorMessage(message)
}

/**
 * Show message to user
 * @param message
 */
const showMessage = async (message: string): Promise<void> => {
   await vscode.window.showInformationMessage(message)
}

/**
 * export methods
 */
const vsc /* IVscBase */ = {
   ...vscRaw,
   ask,
   doesExists,
   findFilePaths,
   findFilePathsFromBase,
   findRelativeFilePaths,
   getActiveOpenPath,
   getConfig,
   getFileContent,
   getPackageDependencies,
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
