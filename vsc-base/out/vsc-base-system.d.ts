/// <reference types="node" />
import * as fs from 'fs-extra';
/**
 * @description
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
 * @description
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
 * @description
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
 * @description
 * Get dir from path \
 * (If path is a dir return it)
 * @see http://vsc-base.org/#getDir
 * @param path
 * @dependencyInternal isDir, splitPath
 * @vscType System
 * @oneLineEx const dir = vsc.getDir(path)
 * @returns string
 */
export declare const getDir: (path: string) => string;
/**
 * @description
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
 * @description
 * Get file source as json \
 * (return null on invalid json)
 * @see http://vsc-base.org/#getJsonContent
 * @param path
 * @dependencyExternal fs
 * @vscType System
 * @oneLineEx const json = await vsc.getJsonContent(path)
 * @returns unknown
 */
export declare const getJsonContent: <TStructure = unknown>(path: string, throws?: boolean) => Promise<TStructure>;
/**
 * @description
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
 * @description
 * Find packages file paths in project.
 * @see http://vsc-base.org/#getPackageFilePaths
 * @dependencyInternal findFilePaths
 * @oneLineEx const packageFilePaths = await vsc.getPackageFilePaths()
 * @returns Promise<string[]>
 */
export declare const getPackageFilePaths: () => Promise<string[]>;
/**
 * @description
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
 * @description
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
 * @description
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
 * @description
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
 * @description
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
 * @description
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
