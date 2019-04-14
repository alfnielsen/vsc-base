/**
 * @description
 * Transform an absolute path from root, to a sub-relative path.
 * @see http://vsc-base.org/#getSubrelativePathFromAbsoluteRootPath
 * @param path
 * @param rootPath
 * @param absolutePathFromRoot
 * @vscType Raw
 * @dependencyInternal splitPath, subtractPath, addLeadingLocalDash
 * @oneLineEx const subrelativePath = vsc.getSubrelativePathFromAbsoluteRootPath(path, absolutePathFromRoot, rootPath)
 * @testPrinterArgument
{
   path: 'c:/root/module/file.ts',
   absolutePathFromRoot: 'module/submodule/file2',
   rootPath: 'c:/root'
}
 * @testPrinter (args, setResult) => {
   const res = vsc.getSubrelativePathFromAbsoluteRootPath(args.path, args.absolutePathFromRoot, args.rootPath)
   setResult(res)
}
 * @returns string
 */
export declare const getSubrelativePathFromAbsoluteRootPath: (path: string, absolutePathFromRoot: string, rootPath: string) => string;
/**
 * @description
 * Add './' to start of path
 * @see http://vsc-base.org/#addLeadingLocalDash
 * @param path
 * @vscType Raw
 * @oneLineEx const path = vsc.addLeadingLocalDash(path)
 * @returns string
 */
export declare const addLeadingLocalDash: (path: string) => string;
/**
 * @description
 * Format a string from camel-case to kebab-case \
 * Commonly used to define css class names. \
 * Ex: 'SomeName' => 'some-name', 'Some_Other.name' => 'some-other-name'
 * @see http://vsc-base.org/#toKebabCase
 * @param str
 * @vscType Raw
 * @testPrinterArgument
{
   str: 'SomeName'
}
 * @testPrinter (args, printResult) => {
   const result = vsc.toKebabCase(args.str)
   printResult(result)
 }
 * @oneLineEx const cssName = vsc.toKebabCase(inputName)
 * @returns string
 */
export declare const toKebabCase: (str: string) => string;
/**
 * @description
 * Format a string from camel-case to snake-case \
 * Ex: 'SomeName' => 'some_name', 'Some_Other.name' => 'some_other_name'
 * @see http://vsc-base.org/#toSnakeCase
 * @param str
 * @param uppercase
 * @vscType Raw
 * @testPrinterArgument
{
   str: 'SomeName'
}
 * @testPrinter (args, printResult) => {
   const result = vsc.toSnakeCase(args.str)
   printResult(result)
 }
 * @oneLineEx const cssName = vsc.toSnakeCase(inputName)
 * @returns string
 */
export declare const toSnakeCase: (str: string, upperCase?: boolean) => string;
/**
 * @description
 * Format a string to camal-case. \
 * Commonly used to define js/ts variable names. \
 * Ex: 'Some-Name' => 'someName', 'some_name' => 'someName', 'some.name' => 'someName' \
 * All non word seperators will be removed and the word charector after will be transforms to upper case.
 * @see http://vsc-base.org/#toCamelCase
 * @param str
 * @vscType Raw
 * @testPrinterArgument
{
   str: 'Some-name'
}
 * @testPrinter (args, printResult) => {
   const result = vsc.toCamelCase(args.str)
   printResult(result)
}
 * @oneLineEx const name = vsc.toCamelCase(inputName)
 * @returns string
 */
export declare const toCamelCase: (str: string) => string;
/**
 * @description
 * Format a string to camal-case. Commonly used to define js/ts variable names. \
 * Ex: 'Some-Name' => 'SomeName', 'some_name' => 'SomeName', 'some.name' => 'SomeName' \
 * All non word seperators will be removed and the word charector after will be transforms to upper case
 * @see http://vsc-base.org/#toPascalCase
 * @param str
 * @vscType Raw
 * @testPrinterArgument
{
   str: 'some-name'
}
 * @testPrinter (args, printResult) => {
   const result = vsc.toPascalCase(args.str)
   printResult(result)
}
 * @oneLineEx const name = vsc.toPascalCase(inputName)
 * @returns string
 */
export declare const toPascalCase: (str: string) => string;
/**
 * @description
 * Get clean path. \
 * Ex: 'folder/../folder/file' => 'folder/file', 'folder/./file' => 'file'
 * @see http://vsc-base.org/#cleanPath
 * @param path
 * @vscType Raw
 * @testPrinterArgument
{
   path: 'folder/../folder/file'
}
 * @testPrinter (args, printResult) => {
   const result = vsc.cleanPath(args.path)
   printResult(result)
}
 * @oneLineEx const newPath = vsc.cleanPath(concatenatedPath)
 * @returns string
 */
export declare const cleanPath: (path: string) => string;
/**
 * @description
 * Get part of a json object.
 * @see http://vsc-base.org/#getJsonParts
 * @param json
 * @param keyPath Ex sub.sub.name >> {sub:{sub:{name:'Foo'}}} >> Foo
 * @vscType Raw
 * @oneLineEx const startScript = vsc.getJsonParts(packageJson, 'scripts.start')
 * @returns any
 */
export declare const getJsonParts: <TStructure = any>(json: {
    [name: string]: unknown;
}, keyPath: string) => TStructure | undefined;
/**
 * @description
 * Does path start with charactor [a-zA-Z@] \
 * (not '/' or './' or '../')
 * @see http://vsc-base.org/#isAbsolutePath
 * @param path
 * @param startWithRegExp? If your project defines another definition of absolute path then overwrite this.
 * @vscType Raw
 * @oneLineEx const isAbsolutePath = vsc.isAbsolutePath(path)
 * @returns boolean
 */
export declare const isAbsolutePath: (path: string, startWithRegExp?: RegExp) => boolean;
/**
 * @description
 * Does subpath start with parentPath
 * @see http://vsc-base.org/#isSubPath
 * @param path
 * @param parentPath
 * @dependencyInternal trimDashes
 * @vscType Raw
 * @oneLineEx const isSubPath = vsc.isSubPath(path)
 * @returns boolean
 */
export declare const isSubPath: (subPath: string, parentPath: string) => boolean;
/**
 * @description
 * Joins to paths.
 * @see http://vsc-base.org/#joinPaths
 * @param path1
 * @param path2
 * @dependencyInternal trimDashes
 * @vscType Raw
 * @oneLineEx const newPath = vsc.joinPaths(path1, path2)
 * @returns string
 */
export declare const joinPaths: (path1: string, path2: string) => string;
/**
 * @description
 * Reaplve all '\\'  with '/' \
 * (Convert all path this way to make them system safe - wotk both on unix/linux/mac and windows)
 * @see http://vsc-base.org/#pathAsUnix
 * @param path
 * @vscType Raw
 * @oneLineEx const path = vsc.joinPaths(path1, path2)
 * @returns string
 */
export declare const pathAsUnix: (path: string) => string;
/**
 * @description
 * Generate relative path between two paths.
 * @see http://vsc-base.org/#getRelativePath
 * @param fromPath
 * @param toPath
 * @vscType Raw
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
 * @description
 * Transform a relative path to an abspolute path.
 * @see http://vsc-base.org/#getAbsolutePathFromRelatrivePath
 * @param path File from where the relative path begins
 * @param pathRelatriveToPath The relative path
 * @param rootPath The root path
 * @param realPathTest Test if the real  The root path
 * @vscType Raw
 * @dependencyInternal isAbsolutePath, splitPath, cleanPath, subtractPath, trimLeadingDash
 * @oneLineEx const absolutePath = vsc.getAbsolutePathFromRelatrivePath(path, pathRelatriveToPath, rootPath)
 * @returns string
 */
export declare const getAbsolutePathFromRelatrivePath: (path: string, pathRelatriveToPath: string, rootPath: string) => string;
/**
 * @description
 * Return the path that are shared. \
 * (Return '' if no path are shared).
 * @see http://vsc-base.org/#sharedPath
 * @param path1
 * @param path2
 * @vscType Raw
 * @oneLineEx const sharedPath = vsc.sharedPath(path1, path2)
 * @returns string
 */
export declare const sharedPath: (path1: string, path2: string) => string;
/**
 * @description
 * await wrap for setTimeout. \
 * Mostly used for debug asyc.
 * @see http://vsc-base.org/#sleep
 * @param ms
 * @oneLineEx await vsc.sleep(2000)
 * @vscType Raw
 * @async
 * @returns Promise<void>
 */
export declare const sleep: (ms: number) => Promise<void>;
/**
 * @description
 * Split filePath into dir and file
 * @see http://vsc-base.org/#splitPath
 * @param path
 * @dependencyInternal pathAsUnix
 * @vscType Raw
 * @oneLineEx const [dir, file] = vsc.splitPath(filePath)
 * @returns [string, string]
 */
export declare const splitPath: (path: string) => [string, string];
/**
 * @description
 * Remove parent-path from a path
 * @see http://vsc-base.org/#subtractPath
 * @param path
 * @param parentPath
 * @param trimDashes default true
 * @dependencyInternal trimDashes
 * @vscType Raw
 * @oneLineEx const newPath = vsc.subtractPath(path, parentPath)
 * @returns string
 */
export declare const subtractPath: (path: string, parentPath: string, _trimDashes?: boolean) => string;
/**
 * @description
 * Remove '/' from start and end of path
 * @see http://vsc-base.org/#trimDashes
 * @param path
 * @vscType Raw
 * @oneLineEx const path = vsc.trimDashes(foundPath)
 * @returns string
 */
export declare const trimDashes: (path: string) => string;
/**
 * @description
 * Remove '/' from start of path
 * @see http://vsc-base.org/#trimLeadingDash
 * @param path
 * @vscType Raw
 * @oneLineEx const path = vsc.trimLeadingDash(foundPath)
 * @returns string
 */
export declare const trimLeadingDash: (path: string) => string;
/**
 * @description
 * Test if it an error. \
 * Return type (if one of es6 basic error type) return stack
 * @see http://vsc-base.org/#getErrorInfo
 * @param e error
 * @vscType Raw
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
 * @description
 * return ISO timestamp
 * @see http://vsc-base.org/#getTimestamp
 * @vscType Raw
 * @oneLineEx const timestamp = vsc.getTimestamp()
 * @returns string
 */
export declare const getTimestamp: () => string;
/**
 * @description
 * Provide a circular safe JSON.stringify replacer. \
 * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Cyclic_object_value#Examples
 * @see http://vsc-base.org/#getJSONCircularReplacer
 * @vscType Raw
 * @debugTool Primary a debugging method.
 * @oneLineEx const objString = JSON.stringify(someObject, vsc.getJSONCircularReplacer(), 2);
 * @returns (_key: string, value: unknown) => unknown
 */
export declare const getJSONCircularReplacer: () => (_key: string, value: unknown) => unknown;
/**
 * @description
 * Stringify an object. \
 * Uses JSON.stringify and the circular ref safe replacer (see vsc.getJSONCircularReplacer)
 * @see http://vsc-base.org/#toJSONString
 * @param obj
 * @param replacer
 * @param space
 * @vscType Raw
 * @debugTool Primary a debugging method.
 * @oneLineEx const objString = vsc.toJSONString(someObject);
 * @returns string
 */
export declare const toJSONString: (obj: any, replacer?: (_key: string, value: unknown) => unknown, space?: number, maxDepth?: number) => string;
/**
 * @description
 * Clone an JSON Object (any type) with max depth. \
 * This method goes through the object structure and replace children that goes deeper then the max Depth
 * @see http://vsc-base.org/#maxDepthReplacer
 * @param obj
 * @param maxDepth
 * @param currentLevel
 * @debugTool Primary a debugging method.
 * @vscType Raw
 * @oneLineEx const newObj = vsc.maxDepthReplacer(obj, 3);
 * @returns string
 */
export declare const maxDepthReplacer: (obj: unknown, maxDepth: number, currentLevel?: number) => any;
