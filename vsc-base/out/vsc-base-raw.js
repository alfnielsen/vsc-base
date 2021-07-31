"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectWalker = exports.escapeHtml = exports.keyValueReplacer = exports.maxDepthReplacer = exports.toJSONString = exports.getJSONCircularReplacer = exports.getTimestamp = exports.getErrorInfo = exports.trimLeadingDash = exports.trimDashes = exports.subtractPath = exports.splitPath = exports.sleep = exports.sharedPath = exports.getAbsolutePathFromRelativePath = exports.getRelativePath = exports.pathAsUnix = exports.joinPaths = exports.isSubPath = exports.insertBefore = exports.insertAfter = exports.isAbsolutePath = exports.getJsonParts = exports.cleanPath = exports.toTitleCase = exports.toPascalCase = exports.toCamelCase = exports.toSnakeCase = exports.toKebabCase = exports.addLeadingLocalDash = exports.getSubRelativePathFromAbsoluteRootPath = void 0;
const vsc = require("./vsc-base");
/** vsc-base method
 * @description
 * Transform an absolute path from root, to a sub-relative path.
 * @see [getSubRelativePathFromAbsoluteRootPath](http://vsc-base.org/#getSubRelativePathFromAbsoluteRootPath)
 * @param path
 * @param rootPath
 * @param absolutePathFromRoot
 * @vscType Raw
 * @dependencyInternal splitPath, subtractPath, addLeadingLocalDash
 * @example
 * const subRelativePath = vsc.getSubRelativePathFromAbsoluteRootPath(path, absolutePathFromRoot, rootPath)
 * @testPrinterArgument
{
   path: 'c:/root/module/file.ts',
   absolutePathFromRoot: 'module/sub-module/file2',
   rootPath: 'c:/root'
}
 * @testPrinter (args, setResult) => {
   const res = vsc.getSubRelativePathFromAbsoluteRootPath(args.path, args.absolutePathFromRoot, args.rootPath)
   setResult(res)
}
 * @returns string
 */
const getSubRelativePathFromAbsoluteRootPath = (path, absolutePathFromRoot, rootPath) => {
    const [sourceDirPath] = vsc.splitPath(path);
    let sourceDirPathFromRoot = vsc.subtractPath(sourceDirPath, rootPath);
    sourceDirPathFromRoot = sourceDirPathFromRoot + '/';
    let absolutePathFromSourceDir = vsc.subtractPath(absolutePathFromRoot, sourceDirPathFromRoot);
    if (absolutePathFromSourceDir !== absolutePathFromRoot) {
        absolutePathFromSourceDir = vsc.addLeadingLocalDash(absolutePathFromSourceDir);
    }
    return absolutePathFromSourceDir;
};
exports.getSubRelativePathFromAbsoluteRootPath = getSubRelativePathFromAbsoluteRootPath;
/** vsc-base method
 * @description
 * Add './' to start of path
 * @see [addLeadingLocalDash](http://vsc-base.org/#addLeadingLocalDash)
 * @param path
 * @vscType Raw
 * @example
 * const path = vsc.addLeadingLocalDash(path)
 * @testPrinterArgument
{
   path: 'file.ts',
}
 * @testPrinter (args, setResult) => {
   const res = vsc.addLeadingLocalDash(args.path)
   setResult(res)
}
 * @returns string
 */
const addLeadingLocalDash = (path) => {
    return './' + path;
};
exports.addLeadingLocalDash = addLeadingLocalDash;
/** vsc-base method
 * @description
 * Format a string from camel-case to kebab-case \
 * Commonly used to define css class names. \
 * Ex: 'SomeName' => 'some-name', 'Some_Other.name' => 'some-other-name'
 * @see [toKebabCase](http://vsc-base.org/#toKebabCase)
 * @param str
 * @vscType Raw
 * @example
 * const cssName = vsc.toKebabCase(inputName)
 * @testPrinterArgument
{
   str: 'SomeName'
}
 * @testPrinter (args, printResult) => {
   const result = vsc.toKebabCase(args.str)
   printResult(result)
 }
 * @returns string
 */
const toKebabCase = (str) => str[0].toLowerCase() +
    str.substr(1)
        .replace(/([A-Z])/g, (_match, chr) => `-${chr.toLowerCase()}`)
        .replace(/[^a-zA-Z]+(.)/g, (_match, chr) => `-${chr.toLowerCase()}`);
exports.toKebabCase = toKebabCase;
/** vsc-base method
 * @description
 * Format a string from camel-case to snake-case \
 * Ex: 'SomeName' => 'some_name', 'Some_Other.name' => 'some_other_name'
 * @see [toSnakeCase](http://vsc-base.org/#toSnakeCase)
 * @param str
 * @param uppercase
 * @vscType Raw
 * @example
 * const cssName = vsc.toSnakeCase(inputName)
 * @testPrinterArgument
{
   str: 'SomeName',
   upperCase: 'false'
}
 * @testPrinter (args, printResult) => {
   const result = vsc.toSnakeCase(args.str, args.upperCase!=='false')
   printResult(result)
 }
 * @returns string
 */
const toSnakeCase = (str, upperCase = false) => {
    str = str[0].toLowerCase() +
        str.substr(1)
            .replace(/([A-Z])/g, (_match, chr) => `_${chr.toLowerCase()}`)
            .replace(/[^a-zA-Z]+(.)/g, (_match, chr) => `_${chr.toLowerCase()}`);
    if (upperCase) {
        str = str.toUpperCase();
    }
    return str;
};
exports.toSnakeCase = toSnakeCase;
/** vsc-base method
 * @description
 * Format a string to camel-case. \
 * Commonly used to define js/ts variable names. \
 * Ex: 'Some-Name' => 'someName', 'some_name' => 'someName', 'some.name' => 'someName' \
 * All non word separators will be removed and the word character after will be transforms to upper case.
 * @see [toCamelCase](http://vsc-base.org/#toCamelCase)
 * @param str
 * @vscType Raw
 * @example
 * const name = vsc.toCamelCase(inputName)
 * @testPrinterArgument
{
   str: 'Some-name'
}
 * @testPrinter (args, printResult) => {
   const result = vsc.toCamelCase(args.str)
   printResult(result)
}
 * @returns string
 */
const toCamelCase = (str) => str[0].toLowerCase() +
    str.substr(1)
        .replace(/[^a-zA-Z]+(.)/g, (_match, chr) => chr.toUpperCase());
exports.toCamelCase = toCamelCase;
/** vsc-base method
 * @description
 * Format a string to camel-case. Commonly used to define js/ts variable names. \
 * Ex: 'Some-Name' => 'SomeName', 'some_name' => 'SomeName', 'some.name' => 'SomeName' \
 * All non word separators will be removed and the word character after will be transforms to upper case
 * @see [toPascalCase](http://vsc-base.org/#toPascalCase)
 * @param str
 * @vscType Raw
 * @example
 * const name = vsc.toPascalCase(inputName)
 * @testPrinterArgument
{
   str: 'some-name'
}
 * @testPrinter (args, printResult) => {
   const result = vsc.toPascalCase(args.str)
   printResult(result)
}
 * @returns string
 */
const toPascalCase = (str) => str[0].toUpperCase() +
    str.substr(1).replace(/[^a-zA-Z]+(.)/g, (_match, chr) => chr.toUpperCase());
exports.toPascalCase = toPascalCase;
/** vsc-base method
 * @description
 * Format a string to a title string  \
 * Ex: 'Some-Name' => 'Some Name', 'some_name' => 'Some Name', 'some.name' => 'Some Name' \
 * All non word separators will be removed and the word character after will be transforms to upper case, \
 * if allWordUppercase is true only the first word will have uppercase.
 * @see [toTitleCase](http://vsc-base.org/#toTitleCase)
 * @param str
 * @vscType Raw
 * @example
 * const name = vsc.toTitleCase(inputName)
 * @testPrinterArgument
{
   str: 'some-name'
}
 * @testPrinter (args, printResult) => {
   const result = vsc.toTitleCase(args.str)
   printResult(result)
}
 * @returns string
 */
const toTitleCase = (str, allWordUpperCase = true) => str[0].toUpperCase() +
    str.substr(1)
        .replace(/([A-Z])/g, (_match, chr) => ` ${allWordUpperCase ? chr.toUpperCase() : chr.toLowerCase()}`)
        .replace(/[^a-zA-Z]+(.)/g, (_match, chr) => ` ${allWordUpperCase ? chr.toUpperCase() : chr.toLowerCase()}`);
exports.toTitleCase = toTitleCase;
/** vsc-base method
 * @description
 * Get clean path. \
 * Ex: 'folder/../folder/file' => 'folder/file', 'folder/./file' => 'file'
 * @see [cleanPath](http://vsc-base.org/#cleanPath)
 * @param path
 * @vscType Raw
 * @example
 * const newPath = vsc.cleanPath(concatenatedPath)
 * @testPrinterArgument
{
   path: 'folder/../folder/file'
}
 * @testPrinter (args, printResult) => {
   const result = vsc.cleanPath(args.path)
   printResult(result)
}
 * @returns string
 */
const cleanPath = (path) => {
    path = path.replace(/\/.\//g, '/');
    const reg = /\b\w+\/\.\.\//;
    while (reg.test(path)) {
        path = path.replace(reg, '');
    }
    return path;
};
exports.cleanPath = cleanPath;
/** vsc-base method
 * @description
 * Get part of a json object.
 * @see [getJsonParts](http://vsc-base.org/#getJsonParts)
 * @param json
 * @param keyPath Ex sub.sub.name >> {sub:{sub:{name:'Foo'}}} >> Foo
 * @vscType Raw
 * @example
 * const startScript = vsc.getJsonParts(packageJson, 'scripts.start')
 * @testPrinterArgument
{
   json: '{ "a": { "t": true, "o": { "n": 12 }, "b": "b"  }}',
   keyPath: 'a.o.n',
}
 * @testPrinter (args, setResult) => {
    try{
       const json = JSON.parse(args.json)
       const res = vsc.getJsonParts(json, args.keyPath)
       const resString = JSON.stringify(res)
       setResult(resString)
    }catch(e){
       setResult(''+e)
    }
}
 * @returns any
 */
const getJsonParts = (json, keyPath) => {
    let current = json;
    const keySplit = keyPath.split(/\./);
    for (let i = 0; i < keySplit.length; i++) {
        const key = keySplit[i];
        if (current[key] === undefined) {
            return undefined;
        }
        current = current[key];
    }
    return current;
};
exports.getJsonParts = getJsonParts;
/** vsc-base method
 * @description
 * Does path start with character [a-zA-Z@] \
 * (not '/' or './' or '../')
 * @see [isAbsolutePath](http://vsc-base.org/#isAbsolutePath)
 * @param path
 * @param startWithRegExp? If your project defines another definition of absolute path then overwrite this.
 * @vscType Raw
 * @example
 * const isAbsolutePath = vsc.isAbsolutePath(path)
 * @testPrinterArgument
{
   path: 'some/path/to/file.ts'
}
 * @testPrinter (args, setResult) => {
   const res = vsc.isAbsolutePath(args.path)
   setResult(res?'true':'false')
}
 * @returns boolean
 */
const isAbsolutePath = (path, startWithRegExp = /^[a-zA-Z@]/) => {
    return startWithRegExp.test(path);
};
exports.isAbsolutePath = isAbsolutePath;
/** vsc-base method
 * @description
 * Insert after the match of a string or regExp.
 * @see [insertAfter](http://vsc-base.org/#insertAfter)
 * @vscType Raw
 * @example
 * source = vsc.insertAfter(source, regExp, content)
 * @testPrinterArgument
{
   source: '1 2 3 4 5',
   match: '/3/',
   content: 'T'
}
 * @testPrinter (args, setResult) => {
   const matchRegExp = args.match.match(/^\/(.*)\/(i?)/)
   if(matchRegExp){
      try{
         const reg = new RegExp(matchRegExp[1], matchRegExp[2])
         const res = vsc.insertAfter(args.source, reg, args.content)
         setResult(res)
      }catch(e){
         setResult('error: '+e)
      }
   }else{
      const res = vsc.insertAfter(args.source, args.match, args.content)
      setResult(res)
   }
}
 * @returns boolean
 */
const insertAfter = (source, match, content) => {
    const stringMatch = source.match(match);
    if (stringMatch && stringMatch.index && stringMatch.index >= 0) {
        const index = stringMatch.index + stringMatch[0].length;
        source = source.substring(0, index) + content + source.substring(index);
    }
    return source;
};
exports.insertAfter = insertAfter;
/** vsc-base method
 * @description
 * Insert before the match of a string or regExp.
 * @see [insertBefore](http://vsc-base.org/#insertBefore)
 * @vscType Raw
 * @example
 * source = vsc.insertBefore(source, regExp, content)
 * @testPrinterArgument
{
   source: '1 2 3 4 5',
   match: '/3/',
   content: 'T'
}
 * @testPrinter (args, setResult) => {
   const matchRegExp = args.match.match(/^\/(.*)\/(i?)/)
   if(matchRegExp){
      try{
         const reg = new RegExp(matchRegExp[1], matchRegExp[2])
         const res = vsc.insertBefore(args.source, reg, args.content)
         setResult(res)
      }catch(e){
         setResult('error: '+e)
      }
   }else{
      const res = vsc.insertBefore(args.source, args.match, args.content)
      setResult(res)
   }
}
 * @returns boolean
 */
const insertBefore = (source, match, content) => {
    const index = source.search(match);
    if (index >= 0) {
        source = source.substring(0, index) + content + source.substring(index);
    }
    return source;
};
exports.insertBefore = insertBefore;
/** vsc-base method
 * @description
 * Does sub-path start with parentPath
 * @see [isSubPath](http://vsc-base.org/#isSubPath)
 * @param path
 * @param parentPath
 * @dependencyInternal trimDashes
 * @vscType Raw
 * @example
 * const isSubPath = vsc.isSubPath(path)
 * @testPrinterArgument
{
   subPath: 'c:/root/area/module1/file.ts',
   parentPath: 'c:/root/area'
}
 * @testPrinter (args, setResult) => {
     const res = vsc.isSubPath(args.subPath, args.parentPath)
   setResult(res?'true':'false')
}
 * @returns boolean
 */
const isSubPath = (subPath, parentPath) => {
    parentPath = vsc.trimDashes(parentPath);
    const result = subPath.indexOf(parentPath + '/') === 0;
    return result;
};
exports.isSubPath = isSubPath;
/** vsc-base method
 * @description
 * Joins to paths.
 * @see [joinPaths](http://vsc-base.org/#joinPaths)
 * @param path1
 * @param path2
 * @dependencyInternal trimDashes
 * @vscType Raw
 * @example
 * const newPath = vsc.joinPaths(path1, path2)
 * @testPrinterArgument
{
   path1: 'root/area/',
   path2: '/module2/file.ts'
}
 * @testPrinter (args, setResult) => {
     const res = vsc.joinPaths(args.path1, args.path2)
     setResult(res)
}
 * @returns string
 */
const joinPaths = (path1, path2) => {
    path1 = vsc.trimDashes(path1);
    path2 = vsc.trimDashes(path2);
    const result = path1 + '/' + path2;
    return result;
};
exports.joinPaths = joinPaths;
/** vsc-base method
 * @description
 * Replace all '\\'  with '/' \
 * (Convert all path this way to make them system safe - work both on unix/linux/mac and windows)
 * @see [pathAsUnix](http://vsc-base.org/#pathAsUnix)
 * @param path
 * @vscType Raw
 * @example
 * const safePath = vsc.pathAsUnix(path)
 * @testPrinterArgument
{
   path: 'root\area\module1\file.ts'
}
 * @testPrinter (args, setResult) => {
     const res = vsc.pathAsUnix(args.path)
     setResult(res)
}
 * @returns string
 */
const pathAsUnix = (path) => {
    return path.replace(/\\/g, '/');
};
exports.pathAsUnix = pathAsUnix;
/** vsc-base method
 * @description
 * Generate relative path between two paths.
 * @see [getRelativePath](http://vsc-base.org/#getRelativePath)
 * @param fromPath
 * @param toPath
 * @vscType Raw
 * @example
 * const relativePath = vsc.getRelativePath(fromPath, toPath)
 * @testPrinterArgument
 {
    fromPath: 'c:/folder/sub1/sub2/someFile.js',
    toPath: 'c:/folder/other/someFile.js'
 }
 * @testPrinter (args, printResult) => {
   const relativePath = vsc.getRelativePath(args.fromPath, args.toPath)
   printResult(relativePath)
}
 * @dependencyInternal sharedPath, splitPath, subtractPath
 * @returns string
 */
const getRelativePath = (fromPath, toPath) => {
    const _sharedPath = vsc.sharedPath(fromPath, toPath);
    const [fromDir] = vsc.splitPath(fromPath);
    const [toDir] = vsc.splitPath(toPath);
    const fromPathDownToShared = vsc.subtractPath(fromDir, _sharedPath);
    let toPathDownToShared = vsc.subtractPath(toDir, _sharedPath);
    const backPath = fromPathDownToShared
        .split(/\//)
        .map(_ => '../')
        .join('');
    const relativePath = backPath + toPathDownToShared;
    return relativePath;
};
exports.getRelativePath = getRelativePath;
/** vsc-base method
 * @description
 * Transform a relative path to an absolute path.
 * @see [getAbsolutePathFromRelativePath](http://vsc-base.org/#getAbsolutePathFromRelativePath)
 * @param path File from where the relative path begins
 * @param pathRelativeToPath The relative path
 * @param rootPath The root path
 * @param realPathTest Test if the real  The root path
 * @vscType Raw
 * @dependencyInternal isAbsolutePath, splitPath, cleanPath, subtractPath, trimLeadingDash
 * @example
 * const absolutePath = vsc.getAbsolutePathFromRelativePath(path, pathRelativeToPath, rootPath)
 * @testPrinterArgument
{
   path: 'c:/root/area/module1/file.ts',
   pathRelativeToPath: '../module2/file2.ts',
   rootPath: 'c:/root'
}
 * @testPrinter (args, setResult) => {
     const res = vsc.getAbsolutePathFromRelativePath(args.path, args.pathRelativeToPath, args.rootPath)
     setResult(res)
}
 * @returns string
 */
const getAbsolutePathFromRelativePath = (path, pathRelativeToPath, rootPath) => {
    if (vsc.isAbsolutePath(pathRelativeToPath)) {
        return pathRelativeToPath;
    }
    let [dir] = vsc.splitPath(path);
    dir += '/';
    const relativePath = dir + pathRelativeToPath;
    let cleanRelativePath = vsc.cleanPath(relativePath);
    let absolutePathToRelative = vsc.subtractPath(cleanRelativePath, rootPath);
    absolutePathToRelative = vsc.trimLeadingDash(absolutePathToRelative);
    return absolutePathToRelative;
};
exports.getAbsolutePathFromRelativePath = getAbsolutePathFromRelativePath;
/** vsc-base method
 * @description
 * Return the path that are shared. \
 * (Return '' if no path are shared).
 * @see [sharedPath](http://vsc-base.org/#sharedPath)
 * @param path1
 * @param path2
 * @vscType Raw
 * @example
 * const sharedPath = vsc.sharedPath(path1, path2)
 * @testPrinterArgument
{
   path1: 'root/area/module1/file1.ts',
   path2: 'root/area/module2/file2.ts'
}
 * @testPrinter (args, setResult) => {
     const res = vsc.sharedPath(args.path1, args.path2)
     setResult(res)
}
 * @returns string
 */
const sharedPath = (path1, path2) => {
    const path1Parts = path1.split(/\//);
    const path2Parts = path2.split(/\//);
    const shared = [];
    for (let i = 0; i < path1Parts.length; i++) {
        if (!path2Parts[i] || path1Parts[i] !== path2Parts[i]) {
            break;
        }
        shared.push(path1Parts[i]);
    }
    const sharedPath = shared.join('/');
    return sharedPath;
};
exports.sharedPath = sharedPath;
/** vsc-base method
 * @description
 * await wrap for setTimeout. \
 * Mostly used for debug async.
 * @see [sleep](http://vsc-base.org/#sleep)
 * @param ms
 * @example
 * await vsc.sleep(2000)
 * @vscType Raw
 * @async
 * @testPrinterArgument
{
   ms: '2000'
}
 * @testPrinter (args, setResult) => {
    setResult('Start sleep...'+args.ms)
    const ms = parseInt(args.ms)
    vsc.sleep(ms).then(()=>{
      setResult('Done sleeping')
    })
}
 * @returns Promise<void>
 */
const sleep = (ms) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise(resolve => setTimeout(resolve, ms));
});
exports.sleep = sleep;
/** vsc-base method
 * @description
 * Split filePath into dir and file
 * @see [splitPath](http://vsc-base.org/#splitPath)
 * @param path
 * @dependencyInternal pathAsUnix
 * @vscType Raw
 * @example
 * const [dir, file] = vsc.splitPath(filePath)
 * @testPrinterArgument
{
   path: 'root/area/module/file1.ts'
}
 * @testPrinter (args, setResult) => {
     const res = vsc.splitPath(args.path)
     setResult(JSON.stringify(res))
}
 * @returns [string, string]
 */
const splitPath = (path) => {
    path = vsc.pathAsUnix(path);
    const splits = path.split('/');
    const name = splits.pop() || '';
    const dir = splits.join('/');
    return [dir, name];
};
exports.splitPath = splitPath;
/** vsc-base method
 * @description
 * Remove parent-path from a path
 * @see [subtractPath](http://vsc-base.org/#subtractPath)
 * @param path
 * @param parentPath
 * @param trimDashes default true
 * @dependencyInternal trimDashes
 * @vscType Raw
 * @example
 * const newPath = vsc.subtractPath(path, parentPath)
 * @testPrinterArgument
{
   path: 'root/area/module/file1.ts',
   parentPath: 'root/area',
   trimDashes: 'true'
}
 * @testPrinter (args, setResult) => {
     const res = vsc.subtractPath(args.path, args.parentPath, args.trimDashes==='true')
     setResult(res)
}
 * @returns string
 */
const subtractPath = (path, parentPath, trimDashes = true) => {
    const regexp = new RegExp(`^${parentPath}`);
    let newPath = path.replace(regexp, '');
    if (trimDashes) {
        newPath = vsc.trimDashes(newPath);
    }
    return newPath;
};
exports.subtractPath = subtractPath;
/** vsc-base method
 * @description
 * Remove '/' from start and end of path
 * @see [trimDashes](http://vsc-base.org/#trimDashes)
 * @param path
 * @vscType Raw
 * @example
 * const path = vsc.trimDashes(foundPath)
 * @testPrinterArgument
{
   path: '/root/area/module/'
}
 * @testPrinter (args, setResult) => {
     const res = vsc.trimDashes(args.path)
     setResult(res)
}
 * @returns string
 */
const trimDashes = (path) => {
    return path.replace(/(^\/|\/$)/g, '');
};
exports.trimDashes = trimDashes;
/** vsc-base method
 * @description
 * Remove '/' from start of path
 * @see [trimLeadingDash](http://vsc-base.org/#trimLeadingDash)
 * @param path
 * @vscType Raw
 * @example
 * const path = vsc.trimLeadingDash(foundPath)
 * @testPrinterArgument
{
   path: '/root/area/module1/file1.ts'
}
 * @testPrinter (args, setResult) => {
     const res = vsc.trimLeadingDash(args.path)
     setResult(res)
}
 * @returns string
 */
const trimLeadingDash = (path) => {
    return path.replace(/^\//, '');
};
exports.trimLeadingDash = trimLeadingDash;
/** vsc-base method
 * @description
 * Test if it an error. \
 * Return type (if one of es6 basic error type) return stack
 * @see [getErrorInfo](http://vsc-base.org/#getErrorInfo)
 * @param e error
 * @vscType Raw
 * @example
 * const info = vsc.getErrorInfo(e)
 * @returns \{ isError: boolean; type: string; stack: string; message: string; \}
 */
const getErrorInfo = (e) => {
    let info = { isError: false, type: '', stack: '', message: '' };
    if (e instanceof Error) {
        info.isError = true;
        info.stack = e.stack || '';
        info.message = e.message;
    }
    else if (typeof e === 'string') {
        info.message = e;
    }
    if (e instanceof EvalError) {
        info.type = "EvalError";
    }
    if (e instanceof RangeError) {
        info.type = "RangeError";
    }
    if (e instanceof ReferenceError) {
        info.type = "ReferenceError";
    }
    if (e instanceof SyntaxError) {
        info.type = "SyntaxError";
    }
    if (e instanceof TypeError) {
        info.type = "TypeError";
    }
    if (e instanceof URIError) {
        info.type = "URIError";
    }
    return info;
};
exports.getErrorInfo = getErrorInfo;
/** vsc-base method
 * @description
 * return ISO timestamp
 * @see [getTimestamp](http://vsc-base.org/#getTimestamp)
 * @vscType Raw
 * @example
 * const timestamp = vsc.getTimestamp()
 * @testPrinterArgument
{
   trigger: 'write any!'
}
 * @testPrinter (args, setResult) => {
     const res = vsc.getTimestamp()
     setResult(res)
}
 * @returns string
 */
const getTimestamp = () => {
    return new Date().toISOString();
};
exports.getTimestamp = getTimestamp;
/** vsc-base method
 * @description
 * Provide a circular safe JSON.stringify replacer. \
 * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Cyclic_object_value#Examples
 * @see [getJSONCircularReplacer](http://vsc-base.org/#getJSONCircularReplacer)
 * @vscType Raw
 * @debugTool Primary a debugging method.
 * @example
 * const objString = JSON.stringify(someObject, vsc.getJSONCircularReplacer(), 2);
 * @returns (_key: string, value: unknown) => unknown
 */
const getJSONCircularReplacer = () => {
    const seen = new WeakSet();
    return (_key, value) => {
        if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
                return '[vsc: circular reference]'; // Write out that this is a Circular Reference.
            }
            seen.add(value);
        }
        return value;
    };
};
exports.getJSONCircularReplacer = getJSONCircularReplacer;
/** vsc-base method
 * @description
 * Stringify an object. \
 * Uses JSON.stringify and the circular ref safe replacer (see vsc.getJSONCircularReplacer)
 * @see [toJSONString](http://vsc-base.org/#toJSONString)
 * @param obj
 * @param replacer
 * @param space
 * @vscType Raw
 * @debugTool Primary a debugging method.
 * @example
 * const objString = vsc.toJSONString(someObject);
 * @returns string
 */
const toJSONString = (obj, replacer = vsc.getJSONCircularReplacer(), space = 2, maxDepth = -1) => {
    if (maxDepth >= 0) {
        let maxDepthObj = vsc.maxDepthReplacer(obj, maxDepth);
        return JSON.stringify(maxDepthObj, replacer, space);
    }
    return JSON.stringify(obj, replacer, space);
};
exports.toJSONString = toJSONString;
/** vsc-base method
 * @description
 * Clone an JSON Object (any type) with max depth. \
 * This method goes through the object structure and replace children that goes deeper then the max Depth
 * @see [maxDepthReplacer](http://vsc-base.org/#maxDepthReplacer)
 * @param obj
 * @param maxDepth
 * @param currentLevel
 * @debugTool Primary a debugging method.
 * @vscType Raw
 * @example
 * const newObj = vsc.maxDepthReplacer(obj, 3);
 * @testPrinterArgument
{
   obj: '{"a":{"b":{"c":{"d":12}}}}',
   maxDepth: '2'
}
 * @testPrinter (args, setResult) => {
    try{
       const json = JSON.parse(args.obj)
       const maxDepth = parseInt(args.maxDepth)
       const res = vsc.maxDepthReplacer(json, maxDepth)
       const resString = JSON.stringify(res)
       setResult(resString)
    }catch(e){
       setResult(''+e)
    }
}
 * @returns string
 */
const maxDepthReplacer = (obj, maxDepth) => {
    const walkedObj = vsc.objectWalker(obj, (state) => {
        if (state.depth >= maxDepth) {
            state.replace(Array.isArray(state.ancestors[0])
                ? `[vsc: maxDepth ${maxDepth} reached - Array]`
                : `[vsc: maxDepth ${maxDepth} reached - Object]`);
        }
    });
    return walkedObj;
};
exports.maxDepthReplacer = maxDepthReplacer;
/** vsc-base method
 * @description
 * Clone an JSON Object (any type) and replace all properties with the given name with a new value. \
 * This method goes through the object structure and replace children that has the given name/key
 * @see [keyValueReplacer](http://vsc-base.org/#keyValueReplacer)
 * @param obj
 * @param maxDepth
 * @param currentLevel
 * @debugTool Primary a debugging method.
 * @vscType Raw
 * @example
 * const newObj = vsc.keyValueReplacer(obj, key, newValue);
 * @testPrinterArgument
{
   obj: '{"a":{"b":{"c":{"d":12}}}}',
   key: 'c',
   value: 'foo'
}
 * @testPrinter (args, setResult) => {
    try{
       const json = JSON.parse(args.obj)
       const res = vsc.keyValueReplacer(json, args.key, args.value)
       const resString = JSON.stringify(res)
       setResult(resString)
    }catch(e){
       setResult(''+e)
    }
}
 * @returns string
 */
const keyValueReplacer = (obj, key, newValue) => {
    const walkedObj = vsc.objectWalker(obj, (state) => {
        if (state.key === key) {
            state.replace(newValue);
        }
    });
    return walkedObj;
};
exports.keyValueReplacer = keyValueReplacer;
/** vsc-base method
 * @description
 * Simple implementation of that escape: & < > " and ' \
 * It will also encode curly bracket { } unless option is set to false (encodeCurlyBracket: default is true) \
 * @see [escapeHtml](http://vsc-base.org/#escapeHtml)
 * @vscType Raw
 * @example
 * const safeHTML = vsc.escapeHtml(unsafeHTML);
 * @testPrinterArgument
{
   html: ''
}
 * @testPrinter (args, setResult) => {
    try{
       const res = vsc.escapeHtml(args.html)
       const resString = JSON.stringify(res)
       setResult(resString)
    }catch(e){
       setResult(''+e)
    }
}
 * @returns string
 */
const escapeHtml = (unsafe, encodeCurlyBracket = true) => {
    let save = unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    if (encodeCurlyBracket) {
        save = save
            .replace(/{/g, "&#123;")
            .replace(/}/g, "&#125;");
    }
    return save;
};
exports.escapeHtml = escapeHtml;
/** vsc-base method
 * @description
 * Clone an JSON Object (any type) going through its entire tree structure. \
 * This method goes through the object structure, and call the given callback on esh child (and grandchild). \
 * The call back can replace each child or stop the iteration. \
 * See [maxDepthReplacer](http://vsc-base.org/#maxDepthReplacer) and [keyValueReplacer](http://vsc-base.org/#keyValueReplacer) \
 * they both use the objectWalker.
 * @see [objectWalker](http://vsc-base.org/#objectWalker)
 * @param obj
 * @param maxDepth
 * @param currentLevel
 * @debugTool Primary a debugging method.
 * @vscType Raw
 * @example
 * const newObj = vsc.objectWalker(obj, walkerCallback);
 * @example
 * // try this walker out in the tester
 * const json = {"a":{"b1":{"c1":12},"b2":{ "c2":{"c3":9}}}}
 * let longestAncestorList = 0;
 * let ancestorKeysString: (string|number)[] = [];
 * vsc.objectWalker(json,(state)=>{
 *    if(longestAncestorList<state.depth){
 *       longestAncestorList = state.depth
 *       ancestorKeysString = [state.key, ...state.ancestorKeys]
 *    }
 * })
 * // log: ancestorKeysList.join('.') + '\nreverse:\n' + ancestorKeysString.reverse().join('.');
 * @testPrinterArgument
{
   obj: '{"a":{"b1":{"c1":12},"b2":{ "c2":{"c3":9}}}}'
}
 * @testPrinter (args, setResult) => {
    try{
       const json = JSON.parse(args.obj)
      let longestAncestorList = 0;
      let ancestorKeysString: (string|number)[] = [];
      vsc.objectWalker(json,(state)=>{
         if(longestAncestorList<state.depth){
            longestAncestorList = state.depth
            ancestorKeysString = [state.key, ...state.ancestorKeys]
         }
      })
       setResult(<>{ancestorKeysString.join('.')}<br/>{'reverse:'}<br/>{ancestorKeysString.reverse().join('.')}</>)
    }catch(e){
       setResult(''+e)
    }
}
 * @returns string
 */
const objectWalker = (obj, callback) => {
    let stopFlag = false;
    const stop = () => {
        stopFlag = true;
    };
    const objectWalkerRecursive = (obj, key, depth, ancestors, ancestorKeys) => {
        if (stopFlag) {
            return obj;
        }
        let doReplace = false, replaceValue;
        const callbackState = {
            obj,
            key,
            replace: (val) => {
                replaceValue = val;
                doReplace = true;
            },
            stop,
            depth,
            ancestors,
            ancestorKeys
        };
        callback(callbackState);
        if (doReplace) {
            return replaceValue;
        }
        if (stopFlag) {
            return obj;
        }
        if (Array.isArray(obj)) {
            obj.map((child, index) => {
                const nextAncestorsList = [obj, ...ancestors];
                const nextAncestorKeyList = [...ancestorKeys];
                if (depth !== 0) {
                    nextAncestorKeyList.unshift(key);
                }
                const result = objectWalkerRecursive(child, index, depth + 1, nextAncestorsList, nextAncestorKeyList);
                return result;
            });
        }
        if (typeof obj === "object" && obj !== null) {
            for (const [currentKey, child] of Object.entries(obj)) {
                const nextAncestorsList = [obj, ...ancestors];
                const nextAncestorKeyList = [...ancestorKeys];
                if (depth !== 0) {
                    nextAncestorKeyList.unshift(key);
                }
                const result = objectWalkerRecursive(child, currentKey, depth + 1, nextAncestorsList, nextAncestorKeyList);
                obj[currentKey] = result;
            }
        }
        return obj;
    };
    objectWalkerRecursive(obj, '', 0, [], []);
    return obj;
};
exports.objectWalker = objectWalker;
//# sourceMappingURL=vsc-base-raw.js.map