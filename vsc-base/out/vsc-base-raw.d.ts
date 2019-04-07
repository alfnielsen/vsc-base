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
export declare const getSubrelativePathFromAbsoluteRootPath: (path: string, absolutePathFromRoot: string, rootPath: string) => string;
/**
 * Add './' to start of path
 * @see http://vsc-base.org/#addLeadingLocalDash
 * @param path
 * @oneLineEx const path = vsc.addLeadingLocalDash(path)
 * @returns string
 */
export declare const addLeadingLocalDash: (path: string) => string;
/**
 * Format a string from camel-case to kebab-case.
 * Commonly used to define css class names. (SomeName => some-name)
 * @see http://vsc-base.org/#camalcaseToKebabcase
 * @param str
 * @oneLineEx const cssName = vsc.camalcaseToKebabcase(name)
 * @returns string
 */
export declare const camalcaseToKebabcase: (str: string) => string;
/**
 * Get clean path. folder/../folder/file => folder/file, folder/./file => file
 * @see http://vsc-base.org/#cleanPath
 * @param path
 * @oneLineEx const newPath = vsc.cleanPath(concatenatedPath)
 * @returns string
 */
export declare const cleanPath: (path: string) => string;
/**
 * Get part of a json object.
 * @see http://vsc-base.org/#getJsonParts
 * @param json
 * @param keyPath Ex sub.sub.name >> {sub:{sub:{name:'Foo'}}} >> Foo
 * @oneLineEx const startScript = vsc.getJsonParts(packageJson, 'scripts.start')
 * @returns any
 */
export declare const getJsonParts: <TStructure = any>(json: {
    [name: string]: unknown;
}, keyPath: string) => TStructure | undefined;
/**
 * Does path start with charactor [a-zA-Z@] (not '/' or './' or '../')
 * @see http://vsc-base.org/#isAbsolutePath
 * @param path
 * @param startWithRegExp? If your project defines another definition of absolute path then overwrite this.
 * @oneLineEx const isAbsolutePath = vsc.isAbsolutePath(path)
 * @returns boolean
 */
export declare const isAbsolutePath: (path: string, startWithRegExp?: RegExp) => boolean;
/**
 * Does subpath start with parentPath
 * @see http://vsc-base.org/#isSubPath
 * @param path
 * @param parentPath
 * @dependencyInternal trimDashes
 * @oneLineEx const isSubPath = vsc.isSubPath(path)
 * @returns boolean
 */
export declare const isSubPath: (subPath: string, parentPath: string) => boolean;
/**
 * Joins to paths.
 * @see http://vsc-base.org/#joinPaths
 * @param path1
 * @param path2
 * @dependencyInternal trimDashes
 * @oneLineEx const newPath = vsc.joinPaths(path1, path2)
 * @returns string
 */
export declare const joinPaths: (path1: string, path2: string) => string;
/**
 * Reaplve all '\\'  with '/'
 * @see http://vsc-base.org/#pathAsUnix
 * @param path
 * @oneLineEx const path = vsc.joinPaths(path1, path2)
 * @returns string
 */
export declare const pathAsUnix: (path: string) => string;
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
export declare const getRelativePath: (fromPath: string, toPath: string) => string;
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
export declare const getAbsolutePathFromRelatrivePath: (path: string, pathRelatriveToPath: string, rootPath: string) => string;
/**
 * Return the path that are shared. (Return '' if no path are shared).
 * @see http://vsc-base.org/#sharedPath
 * @param path1
 * @param path2
 * @oneLineEx const sharedPath = vsc.sharedPath(path1, path2)
 * @returns string
 */
export declare const sharedPath: (path1: string, path2: string) => string;
/**
 * await wrap for setTimeout. Mostly used for debug asyc.
 * @see http://vsc-base.org/#sleep
 * @param ms
 * @oneLineEx await vsc.sleep(2000)
 * @async
 * @returns Promise<void>
 */
export declare const sleep: (ms: number) => Promise<void>;
/**
 * Split filePath into dir and file
 * @see http://vsc-base.org/#splitPath
 * @param path
 * @dependencyInternal pathAsUnix
 * @oneLineEx const [dir, file] = vsc.splitPath(filePath)
 * @returns [string, string]
 */
export declare const splitPath: (path: string) => [string, string];
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
export declare const subtractPath: (path: string, parentPath: string, _trimDashes?: boolean) => string;
/**
 * Format a string to camal-case. Commonly used to define js/ts variable names.
 * (Some-Name => someName, some_name => someName, some.name => someName )
 * All non word seperators will be removed and the word charector after will be transforms to upper case
 * @see http://vsc-base.org/#toCamelcase
 * @param str
 * @oneLineEx const name = vsc.toCamelcase(kebabName)
 * @returns string
 */
export declare const toCamelcase: (str: string) => string;
/**
 * Remove '/' from start and end of path
 * @see http://vsc-base.org/#trimDashes
 * @param path
 * @oneLineEx const path = vsc.trimDashes(foundPath)
 * @returns string
 */
export declare const trimDashes: (path: string) => string;
/**
 * Remove '/' from start of path
 * @see http://vsc-base.org/#trimLeadingDash
 * @param path
 * @oneLineEx const path = vsc.trimLeadingDash(foundPath)
 * @returns string
 */
export declare const trimLeadingDash: (path: string) => string;
/**
 * Test if it an error. Return type (if one of es6 basic error type) return stack
 * @see http://vsc-base.org/#getErrorInfo
 * @param e error
 * @oneLineEx const info = vsc.getErrorInfo(e)
 * @returns \{ isError: boolean; type: string; stack: string; message: string; \}
 */
export declare const getErrorInfo: (e: any) => {
    isError: boolean;
    type: string;
    stack: string;
    message: string;
};
/**
 * return ISO timestamp
 * @see http://vsc-base.org/#getTimeStamp
 * @oneLineEx const timestamp = vsc.getTimeStamp()
 * @returns string
 */
export declare const getTimeStamp: () => string;
