/// <reference types="node" />
import * as cp from 'child-process-promise';
import * as fs from 'fs-extra';
/** vsc-base method
 * @description
 * Execute a bash command. \
 * (Execute a command using child-process-promise) \
 * **NOTE:** If you use this method in an extension the end user need to be able to actually
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
export declare const execFromPath: (command: string, path: string) => Promise<cp.PromiseResult<string>>;
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
export declare const getLineStreamReader: (readStream: fs.ReadStream) => () => AsyncIterableIterator<string>;
/** vsc-base method
 * @description
 * Get a file ReadStream \
 * See [fs docs for createReadStream](https://nodejs.org/api/fs.html#fs_fs_createreadstream_path_options)
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
export declare const getReadStream: (path: string, options?: {
    flags: string;
    encoding: string;
    fd: undefined;
    mode: number;
    autoClose: boolean;
    highWaterMark: number;
}) => fs.ReadStream;
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
export declare const doesExists: (path: string) => boolean;
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
export declare const getDir: (path: string) => string;
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
export declare const getFileContent: (path: string, encoding?: string) => Promise<string>;
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
export declare const getJsonContent: <TStructure = unknown>(path: string, throws?: boolean) => Promise<TStructure>;
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
export declare const getConfig: <T>(projectName: string, property: string, defaultValue: T) => T;
/** vsc-base method
 * @description
 * Find package.json file paths in project. /
 * Take an optional 'exclude' which is an exclude pattern for the underlying [findFilePaths](http://vsc-base.org/#findFilePaths) \
 * It can be used to control which package.json files should be included.
 * @see [getPackageFilePaths](http://vsc-base.org/#getPackageFilePaths)
 * @dependencyInternal findFilePaths
 * @oneLineEx const packageFilePaths = await vsc.getPackageFilePaths()
 * @returns Promise<string[]>
 */
export declare const getPackageFilePaths: (exclude?: string) => Promise<string[]>;
/** vsc-base method
 * @description
 * Find package.json files and collect the dependencies and devDependencies.
 * Take an optional 'exclude' which is an exclude pattern for the underlying [findFilePaths](http://vsc-base.org/#findFilePaths) / [getPackageFilePaths](http://vsc-base.org/#getPackageFilePaths) \
 * It can be used to control which package.json files should be included.
 * @see [getPackageDependencies](http://vsc-base.org/#getPackageDependencies)
 * @dependencyInternal getPackageFilePaths, getJsonContent, getJsonParts
 * @vscType System
 * @oneLineEx const [dependencies, devDependencies] = await vsc.getPackageDependencies()
 * @todo Use unknown guard check instead of any casting
 * @returns Promise<{ [key: string]: string }[]
 */
export declare const getPackageDependencies: (exclude?: string) => Promise<{
    [key: string]: string;
}[]>;
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
export declare const isDir: (path: string) => boolean;
/** vsc-base method
 * @description
 * Make a folder \
 * See [fs docs for mkdir](https://nodejs.org/api/fs.html#fs_fs_mkdir_path_options_callback)
 * @see [makeDir](http://vsc-base.org/#makeDir)
 * @param folderPath
 * @vscType System
 * @dependencyExternal fs
 * @oneLineEx await vsc.makeDir(path)
 * @returns Promise<void>
 */
export declare const makeDir: (folderPath: string) => Promise<void>;
/** vsc-base method
 * @description
 * Move a file or folder \
 * See [fs-extra docs for move](https://github.com/jprichardson/node-fs-extra/blob/master/docs/move.md)
 * @see [move](http://vsc-base.org/#move)
 * @vscType System
 * @oneLineEx await vsc.move(oldPath, newPath)
 * @dependencyExternal fs
 * @returns Promise<void>
 */
export declare const move: (path: string, newPath: string, options?: fs.MoveOptions | undefined) => Promise<void>;
/** vsc-base method
 * @description
 * Rename a file or folder \
 * See [fs docs for rename](https://nodejs.org/api/fs.html#fs_fs_rename_oldpath_newpath_callback)
 * @see [move](http://vsc-base.org/#move)
 * @vscType System
 * @oneLineEx await vsc.move(oldPath, newPath)
 * @dependencyExternal fs
 * @returns Promise<void>
 */
export declare const rename: (path: string, newPath: string) => Promise<void>;
/** vsc-base method
 * @description
 * Copy file/folder \
 * See [fs-extra docs for copy](https://github.com/jprichardson/node-fs-extra/blob/master/docs/copy.md)
 * @see [copy](http://vsc-base.org/#copy)
 * @vscType System
 * @oneLineEx await vsc.copy(oldPath, newPath)
 * @dependencyExternal fs
 * @returns Promise<void>
 */
export declare const copy: (path: string, newPath: string, options?: fs.CopyOptions | undefined) => Promise<void>;
/** vsc-base method
 * @description
 * Remove file/folder \
 * See [fs-extra docs for remove](https://github.com/jprichardson/node-fs-extra/blob/master/docs/remove.md)
 * @see [remove](http://vsc-base.org/#remove)
 * @vscType System
 * @oneLineEx await vsc.remove(path)
 * @dependencyExternal fs
 * @returns Promise<void>
 */
export declare const remove: (path: string) => Promise<void>;
/** vsc-base method
 * @description
 * emptyDir folder \
 * See [fs-extra docs for emptyDir](https://github.com/jprichardson/node-fs-extra/blob/master/docs/emptyDir.md)
 * @see [emptyDir](http://vsc-base.org/#emptyDir)
 * @vscType System
 * @oneLineEx await vsc.remove(path)
 * @dependencyExternal fs
 * @returns Promise<void>
 */
export declare const emptyDir: (path: string) => Promise<void>;
/** vsc-base method
 * @description
 * Save file \
 * See [fs docs for writeFile](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback)
 * @see [saveFileContent](http://vsc-base.org/#saveFileContent)
 * @param path
 * @param content
 * @vscType System
 * @dependencyExternal fs
 * @oneLineEx await vsc.saveFileContent(path, source)
 * @returns Promise<void>
 */
export declare const saveFileContent: (path: string, content: string, options?: fs.WriteFileOptions | undefined) => Promise<void>;
/** vsc-base method
 * @description
 * Append content to a file \
 * See [fs docs for appendFile](https://nodejs.org/api/fs.html#fs_fs_appendfile_path_data_options_callback)
 * @see [saveFileContent](http://vsc-base.org/#saveFileContent)
 * @param path
 * @param content
 * @vscType System
 * @dependencyExternal fs
 * @oneLineEx await vsc.saveFileContent(path, source)
 * @returns Promise<void>
 */
export declare const addFileContent: (path: string, content: string, options?: fs.WriteFileOptions | undefined) => Promise<void>;
