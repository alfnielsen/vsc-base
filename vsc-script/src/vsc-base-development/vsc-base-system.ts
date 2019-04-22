import * as fs from 'fs-extra'
import * as vscode from 'vscode'
import * as vsc from './vsc-base'
import * as cp from 'child-process-promise'

/** vsc-base method
 * @description 
 * Execute a bash command. \
 * (Execute a command using child-process-promise) \
 * **NOTE:** If you use this method in an extension the end user need to be able to actaully 
 * execute the command! \
 * This method is mostly design for vsc-script's, where you have control of the environment. \
 * See also [vsc.writeToTerminal](http://vsc-base.org/#writeToTerminal)
 * @see [execFromPath](http://vsc-base.org/#execFromPath)
 * @param path
 * @param content
 * @vscType System
 * @dependencyExternal fs
 * @oneLineEx const result = await vsc.execFromPath(command, path)
 * @ex
 const rootPath = vsc.getRootPath(path)
 const result = await vsc.execFromPath('yarn start', rootPath)
 const stringResult = result.stdout.toString()
 * @returns Promise<cp.PromiseResult<string>>
 */

export const execFromPath = async (command: string, path: string): Promise<cp.PromiseResult<string>> => {
   return await cp.exec(`cd ${path} && ${command}`);
}

/** vsc-base method
 * @description 
 * Create a LineReader (generator method) for a ReadStream
 * @see [getLineStreamReader](http://vsc-base.org/#getLineStreamReader)
 * @param readStream
 * @dependencyExternal fs
 * @vscType System
 * @oneLineEx const lineReader = vsc.getLineStreamReader(readStream)
 * @ex
 const readStream = vsc.getReadStream(path)
 const lineReader = vsc.getLineStreamReader(readStream)
 for await (const line of lineReader) {
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

/** vsc-base method
 * @description 
 * Get a file ReadStream
 * @see [getReadStream](http://vsc-base.org/#getReadStream)
 * @param path
 * @dependencyExternal fs
 * @vscType System
 * @oneLineEx const readStream = vsc.getReadStream(path)
 * @ex
 const readStream = vsc.getReadStream(path)
 for await (const chunk of readStream) {
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

/** vsc-base method
 * @description 
 * Does the folder/file exist
 * @see [doesExists](http://vsc-base.org/#doesExists)
 * @param path string
 * @dependencyExternal fs
 * @vscType System
 * @oneLineEx const exist = vsc.doesExists(path)
 * @returns boolean
 */
export const doesExists = (path: string): boolean => {
   return fs.existsSync(path)
}

/** vsc-base method
 * @description 
 * Get dir from path \
 * (If path is a dir return it)
 * @see [getDir](http://vsc-base.org/#getDir)
 * @param path
 * @dependencyInternal isDir, splitPath
 * @vscType System
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

/** vsc-base method
 * @description 
 * Get file source
 * @see [getFileContent](http://vsc-base.org/#getFileContent)
 * @param path
 * @dependencyExternal fs
 * @vscType System
 * @oneLineEx const source = vsc.getFileContent(path)
 * @returns Promise<string>
 */
export const getFileContent = async (path: string): Promise<string> =>
   await fs.readFile(path, 'utf8')

/** vsc-base method
 * @description 
 * Get file source as json \
 * (return null on invalid json)
 * @see [getJsonContent](http://vsc-base.org/#getJsonContent)
 * @param path
 * @dependencyExternal fs
 * @vscType System
 * @oneLineEx const json = await vsc.getJsonContent(path)
 * @returns unknown
 */
export const getJsonContent = async <TStructure = unknown>(
   path: string,
   throws = false
): Promise<TStructure> => await fs.readJson(path, { throws })

/** vsc-base method
 * @description 
 * Get vscode project config
 * @see [getConfig](http://vsc-base.org/#getConfig)
 * @dependencyExternal vscode
 * @vscType System
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

/** vsc-base method
 * @description 
 * Find packages file paths in project.
 * @see [getPackageFilePaths](http://vsc-base.org/#getPackageFilePaths)
 * @dependencyInternal findFilePaths
 * @oneLineEx const packageFilePaths = await vsc.getPackageFilePaths()
 * @returns Promise<string[]>
 */
export const getPackageFilePaths = async (): Promise<string[]> => {
   const packageFiles = await vsc.findFilePaths('**/package.json')
   return packageFiles
}

/** vsc-base method
 * @description 
 * Find package.json files and collect the dependencies and devDependencies.
 * @see [getPackageDependencies](http://vsc-base.org/#getPackageDependencies)
 * @dependencyInternal getPackageFilePaths, getJsonContent, getJsonParts
 * @vscType System
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

/** vsc-base method
 * @description 
 * Test is a path is directory
 * @param path
 * @dependencyExternal fs
 * @vscType System
 * @oneLineEx const isDir = vsc.isDir(path)
 * @see [isDir](http://vsc-base.org/#isDir)
 * @returns boolean
 */
export const isDir = (path: string): boolean => {
   return fs.statSync(path).isDirectory()
}

/** vsc-base method
 * @description 
 * Make a folder
 * @see [makeDir](http://vsc-base.org/#makeDir)
 * @param path
 * @param newPathstring
 * @vscType System
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

/** vsc-base method
 * @description 
 * Move a file or folder
 * @see [move](http://vsc-base.org/#move)
 * @param path
 * @param newPathstring
 * @vscType System
 * @oneLineEx await vsc.move(oldPath, newPath)
 * @dependencyExternal fs
 * @returns Promise<void>
 */
export const move = async (path: string, newPath: string): Promise<void> => {
   await fs.move(path, newPath)
}

/** vsc-base method
 * @description 
 * Copy file/fodler
 * @see [copy](http://vsc-base.org/#copy)
 * @param path
 * @param newPathstring
 * @vscType System
 * @oneLineEx await vsc.copy(oldPath, newPath)
 * @dependencyExternal fs
 * @returns Promise<void>
 */
export const copy = async (path: string, newPath: string): Promise<void> => {
   await fs.copy(path, newPath)
}

/** vsc-base method
 * @description 
 * Save file
 * @see [saveFileContent](http://vsc-base.org/#saveFileContent)
 * @param path
 * @param content
 * @vscType System
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

