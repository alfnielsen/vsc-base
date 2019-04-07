"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vsc = require("./vsc-base");
/**
 * Transform an absolute path from root, to a sub-relative path.
 * @param path
 * @param rootPath
 * @param absolutePathFromRoot
 * @dependencyInternal splitPath, subtractPath, addLeadingLocalDash
 * @oneLineEx const subrelativePath = vsc.getSubrelativePathFromAbsoluteRootPath(path, absolutePathFromRoot, rootPath)
 * @see http://vsc-base.org/#getSubrelativePathFromAbsoluteRootPath
 * @returns string
 * @test
 */
exports.getSubrelativePathFromAbsoluteRootPath = (path, absolutePathFromRoot, rootPath) => {
    const [sourceDirPath] = vsc.splitPath(path);
    let sourceDirPathFromRoot = vsc.subtractPath(sourceDirPath, rootPath);
    sourceDirPathFromRoot = sourceDirPathFromRoot + '/';
    let absolutePathFromSourceDir = vsc.subtractPath(absolutePathFromRoot, sourceDirPathFromRoot);
    if (absolutePathFromSourceDir !== absolutePathFromRoot) {
        absolutePathFromSourceDir = vsc.addLeadingLocalDash(absolutePathFromSourceDir);
    }
    return absolutePathFromSourceDir;
};
/**
 * Add './' to start of path
 * @param path
 * @oneLineEx path = vsc.addLeadingLocalDash(path)
 * @see http://vsc-base.org/#addLeadingLocalDash
 * @returns string
 */
exports.addLeadingLocalDash = (path) => {
    return './' + path;
};
/**
 * Format a string from camel-case to kebab-case.
 * Commonly used to define css class names. (SomeName => some-name)
 * @param str
 * @oneLineEx const cssName = vsc.camalcaseToKebabcase(name)
 * @see http://vsc-base.org/#camalcaseToKebabcase
 * @returns string
 */
exports.camalcaseToKebabcase = (str) => str[0].toLowerCase() +
    str.substr(1).replace(/([A-Z])/g, ([letter]) => `-${letter.toLowerCase()}`);
/**
 * Get clean path. folder/../folder/file => folder/file, folder/./file => file
 * @param path
 * @oneLineEx const newPath = vsc.cleanPath(concatenatedPath)
 * @see http://vsc-base.org/#cleanPath
 * @returns string
 */
exports.cleanPath = (path) => {
    path = path.replace(/\/.\//g, '/');
    const reg = /\/\w+\/\.\.\//;
    while (reg.test(path)) {
        path = path.replace(reg, '/');
    }
    return path;
};
/**
 * Get part of a json object.
 * @param json
 * @param keyPath Ex sub.sub.name >> {sub:{sub:{name:'Foo'}}} >> Foo
 * @oneLineEx const startScript = vsc.getJsonParts(packageJson, 'scripts.start')
 * @see http://vsc-base.org/#getJsonParts
 * @returns any
 */
exports.getJsonParts = (json, keyPath) => {
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
/**
 * Does path start with charactor [a-zA-Z@] (not '/' or './' or '../')
 * @param path
 * @param startWithRegExp? If your project defines another definition of absolute path then overwrite this.
 * @oneLineEx const isAbsolutePath = vsc.isAbsolutePath(path)
 * @see http://vsc-base.org/#isAbsolutePath
 * @returns boolean
 */
exports.isAbsolutePath = (path, startWithRegExp = /^[a-zA-Z@]/) => {
    return startWithRegExp.test(path);
};
/**
 * Does subpath start with parentPath
 * @param path
 * @param parentPath
 * @dependencyInternal trimDashes
 * @oneLineEx const isSubPath = vsc.isSubPath(path)
 * @see http://vsc-base.org/#isSubPath
 * @returns boolean
 */
exports.isSubPath = (subPath, parentPath) => {
    parentPath = vsc.trimDashes(parentPath);
    const result = subPath.indexOf(parentPath + '/') === 0;
    return result;
};
/**
 * Joins to paths.
 * @param path1
 * @param path2
 * @dependencyInternal trimDashes
 * @oneLineEx const newPath = vsc.joinPaths(path1, path2)
 * @see http://vsc-base.org/#joinPaths
 * @returns string
 */
exports.joinPaths = (path1, path2) => {
    path1 = vsc.trimDashes(path1);
    path2 = vsc.trimDashes(path2);
    const result = path1 + '/' + path2;
    return result;
};
/**
 * Reaplve all '\\'  with '/'
 * @param path
 * @see http://vsc-base.org/#pathAsUnix
 * @oneLineEx const path = vsc.joinPaths(path1, path2)
 * @returns string
 */
exports.pathAsUnix = (path) => {
    return path.replace(/\\/g, '/');
};
/**
 * Generate relative path between two paths.
 * @param fromPath
 * @param toPath
 * @oneLineEx const relativePath = vsc.getRelativePath(fromPath, toPath)
 * @testPrinterArgument
 {
    fromPath: 'c:/somefolder/sub1/sub2/someFile.js',
    toPath: 'c:/somefolder/other/someFile.js'
 }
 * @testPrinter
(
   args = getRelativePath.testArguments,
   printResult: (str: string) => void
) => {
   const relativePath = vsc.getRelativePath(args.fromPath, args.toPath)
   printResult(relativePath)
}
 * @dependencyInternal sharedPath, splitPath, subtractPath
 * @see http://vsc-base.org/#relatrivePath
 * @returns string
 */
exports.getRelativePath = (fromPath, toPath) => {
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
/**
 * Transform a relative path to an abspolute path.
 * @param path File from where the relative path begins
 * @param pathRelatriveToPath The relative path
 * @param rootPath The root path
 * @param realPathTest Test if the real  The root path
 * @dependencyInternal isAbsolutePath, splitPath, cleanPath, subtractPath, trimLeadingDash
 * @oneLineEx const absolutePath = vsc.getAbsolutePathFromRelatrivePath(path, pathRelatriveToPath, rootPath)
 * @see http://vsc-base.org/#relatrivePathToAbsolutePath
 * @returns string
 */
exports.getAbsolutePathFromRelatrivePath = (path, pathRelatriveToPath, rootPath) => {
    if (vsc.isAbsolutePath(pathRelatriveToPath)) {
        return pathRelatriveToPath;
    }
    let [dir] = vsc.splitPath(path);
    dir += '/';
    const relativePath = dir + pathRelatriveToPath;
    let cleanRelativePath = vsc.cleanPath(relativePath);
    let absolutePathToRelative = vsc.subtractPath(cleanRelativePath, rootPath);
    absolutePathToRelative = vsc.trimLeadingDash(absolutePathToRelative);
    return absolutePathToRelative;
};
/**
 * Return the path that are shared. (Return '' if no path are shared).
 * @param path1
 * @param path2
 * @oneLineEx const sharedPath = vsc.sharedPath(path1, path2)
 * @see http://vsc-base.org/#sharedPath
 * @returns string
 */
exports.sharedPath = (path1, path2) => {
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
/**
 * await wrap for setTimeout. Mostly used for debug asyc.
 * @param ms
 * @see http://vsc-base.org/#sleep
 * @oneLineEx await vs.sleep(2000)
 * @async
 * @returns Promise<void>
 */
exports.sleep = (ms) => __awaiter(this, void 0, void 0, function* () {
    return new Promise(resolve => setTimeout(resolve, ms));
});
/**
 * Split filePath into dir and file
 * @param path
 * @dependencyInternal pathAsUnix
 * @oneLineEx const [dir, file] = vsc.splitPath(filePath)
 * @see http://vsc-base.org/#splitPath
 * @returns [string, string]
 */
exports.splitPath = (path) => {
    path = vsc.pathAsUnix(path);
    const splits = path.split('/');
    const name = splits.pop() || '';
    const dir = splits.join('/');
    return [dir, name];
};
/**
 * Remove parent-path from a path
 * @param path
 * @param parentPath
 * @param trimDashes default true
 * @dependencyInternal trimDashes
 * @oneLineEx const newPath = vsc.subtractPath(path, parentPath)
 * @see http://vsc-base.org/#subtractPath
 * @returns string
 */
exports.subtractPath = (path, parentPath, _trimDashes = true) => {
    const regexp = new RegExp(`^${parentPath}`);
    let newPath = path.replace(regexp, '');
    if (exports.trimDashes) {
        newPath = vsc.trimDashes(newPath);
    }
    return newPath;
};
/**
 * Format a string to camal-case. Commonly used to define js/ts variable names.
 * (Some-Name => someName, some_name => someName, some.name => someName )
 * All non word seperators will be removed and the word charector after will be transforms to upper case
 * @param str
 * @oneLineEx const name = vsc.toCamelcase(kebabName)
 * @see http://vsc-base.org/#toCamelcase
 * @returns string
 */
exports.toCamelcase = (str) => str[0].toLowerCase() +
    str.substr(1).replace(/[^a-zA-Z]+(.)/g, (_match, chr) => chr.toUpperCase());
/**
 * Remove '/' from start and end of path
 * @param path
 * @oneLineEx const path = trimDashes(foundPath)
 * @see http://vsc-base.org/#trimDashes
 * @returns string
 */
exports.trimDashes = (path) => {
    return path.replace(/(^\/|\/$)/g, '');
};
/**
 * Remove '/' from start of path
 * @param path
 * @oneLineEx const path = vsc.trimLeadingDash(foundPath)
 * @see http://vsc-base.org/#trimLeadingDash
 * @returns string
 */
exports.trimLeadingDash = (path) => {
    return path.replace(/^\//, '');
};
/**
 * Test if it an error. Return type (if one of es6 basic error type) return stack
 * @param e error
 * @oneLineEx const info = vsc.getErrorInfo(e)
 * @see http://vsc-base.org/#getErrorInfo
 * @returns \{ isError: boolean; type: string; stack: string; message: string; \}
 */
exports.getErrorInfo = (e) => {
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
/**
 * return ISO timestamp
 * @see
 * @oneLineEx const timestamp = vsc.getTimeStamp()
 * @see http://vsc-base.org/#getTimeStamp
 * @returns string
 */
exports.getTimeStamp = () => {
    return new Date().toISOString();
};
//# sourceMappingURL=vsc-base-raw.js.map