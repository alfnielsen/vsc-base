"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const vscode = require("vscode");
const ts = require("typescript");
const vsc_evel_1 = require("./vsc-evel");
/**
 * Add './' to start of path
 * @param path
 * @see http://vsc-base.org/#addLeadingLocalDash
 * @returns string
 */
exports.addLeadingLocalDash = (path) => {
    return './' + path;
};
/**
 * Append new line content in the end of the open document
 * @param content
 * @dependencyInternal appendToActiveDocument
 * @oneLineEx const success = await vsc.appendLineToActiveDocument(content)
 * @see http://vsc-base.org/#appendLineToActiveDocument
 * @returns Promise<boolean>
 */
exports.appendLineToActiveDocument = (content) => __awaiter(this, void 0, void 0, function* () {
    return yield exports.appendToActiveDocument('\n' + content);
});
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
exports.appendToActiveDocument = (content) => __awaiter(this, void 0, void 0, function* () {
    const document = exports.getActiveDocument();
    const editor = exports.getActiveEditor();
    if (document && editor) {
        yield exports.appendToDocument(editor, document, content);
        return true;
    }
    return false;
});
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
exports.appendToDocument = (editor, document, content) => __awaiter(this, void 0, void 0, function* () {
    const startPosition = new vscode.Position(document.lineCount, 0);
    const endPosition = new vscode.Position(document.lineCount, 0);
    const fullRange = new vscode.Range(startPosition, endPosition);
    const snippetString = new vscode.SnippetString(content);
    yield editor.insertSnippet(snippetString, fullRange);
});
/**
 * Prompt user for a question
 * @param path
 * @dependencyExternal vscode
 * @oneLineEx const answer = await ask(question, defaultValue)
 * @ex const answer = await ask('Where to move file?', currentFilePath)
 * @see http://vsc-base.org/#ask
 * @returns Promise<string | undefined>
 */
exports.ask = (question, defaultValue) => __awaiter(this, void 0, void 0, function* () {
    return yield vscode.window.showInputBox({
        prompt: question,
        value: defaultValue
    });
});
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
exports.awaitResult = (result) => __awaiter(this, void 0, void 0, function* () {
    if (result instanceof Promise) {
        return result;
    }
    else {
        return new Promise(resolve => {
            resolve(result);
        });
    }
});
/**
 * Format a string from camel-case to kebab-case. Commonly used to define css class names. (SomeName => some-name)
 * @param str
 * @see http://vsc-base.org/#camalcaseToKebabcase
 * @returns string
 */
exports.camalcaseToKebabcase = (str) => str[0].toLowerCase() +
    str.substr(1).replace(/([A-Z])/g, ([letter]) => `-${letter.toLowerCase()}`);
/**
 * Get clean path. folder/../folder/file => folder/file, folder/./file => file
 * @param path
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
 * Does the folder/file exist
 * @param path string
 * @dependencyExternal fs
 * @oneLineEx const exist = vsc.doesExists(path)
 * @see http://vsc-base.org/#doesExists
 * @returns boolean
 */
exports.doesExists = (path) => {
    return fs.existsSync(path);
};
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
exports.findFilePaths = (include = '**/*.{js,jsx,ts,tsx}', exclude = '**/node_modules/**', maxResults = 100000) => __awaiter(this, void 0, void 0, function* () {
    const uriFiles = yield vscode.workspace.findFiles(include, exclude, maxResults);
    const files = uriFiles.map((uri) => exports.pathAsUnix(uri.fsPath));
    return files;
});
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
exports.findFilePathsFromBase = (basePath, includePattern = '**/*.{js,jsx,ts,tsx}', exclude = '**/node_modules/**', maxResults = 100000) => __awaiter(this, void 0, void 0, function* () {
    let baseDir = exports.getDir(basePath);
    const include = new vscode.RelativePattern(baseDir, includePattern);
    const filePaths = yield exports.findFilePaths(include, exclude, maxResults);
    return filePaths;
});
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
exports.findRelativeFilePaths = (path, relativePath, includePattern = '**/*.{js,jsx,ts,tsx}', exclude = '**/node_modules/**', maxResults = 100000) => __awaiter(this, void 0, void 0, function* () {
    const dir = exports.getDir(path);
    const joinPath = exports.joinPaths(dir, relativePath);
    let base = exports.cleanPath(joinPath + '/');
    base = exports.trimDashes(base);
    const filePaths = yield exports.findFilePathsFromBase(base, includePattern, exclude, maxResults);
    return filePaths;
});
/**
 * Get open vscode.TextDocument
 * @dependencyExternal vscode
 * @oneLineEx const document = vsc.getActiveDocument()
 * @see http://vsc-base.org/#getActiveDocument
 * @returns vscode.TextDocument | undefined
 */
exports.getActiveDocument = () => {
    const activeEditor = exports.getActiveEditor();
    const document = activeEditor && activeEditor.document;
    return document;
};
/**
 * Get current open file's content.
 * @dependencyInternal getActiveDocument
 * @oneLineEx const content = vsc.getActiveDocumentContent()
 * @see http://vsc-base.org/#getActiveDocumentContent
 * @returns string | undefined
 */
exports.getActiveDocumentContent = () => {
    const document = exports.getActiveDocument();
    return (document && document.getText()) || undefined;
};
/**
 * Get current open file path or undefined if nothing is open.
 * @dependencyInternal getActiveDocument
 * @oneLineEx const path = vsc.getActivegetActiveDocumentPath()
 * @see http://vsc-base.org/#getActivegetActiveDocumentPath
 * @returns string | undefined
 */
exports.getActiveDocumentPath = () => {
    const document = exports.getActiveDocument();
    return (document && document.fileName) || undefined;
};
/**
 * Get vscode.activeTextEditor
 * @dependencyExternal vscode
 * @oneLineEx const editor = vsc.getActiveEditor()
 * @see http://vsc-base.org/#getActiveDocument
 * @returns vscode.TextEditor | undefined
 */
exports.getActiveEditor = () => {
    return vscode.window.activeTextEditor;
};
/**
 * Get vscode project config
 * @dependencyExternal vscode
 * @oneLineEx const myOption = vsc.getConfig(projectName, optionName, defaultValue)
 * @ex const myOption = vsc.getConfig('myExtension', 'doThisThing', false)
 * @see http://vsc-base.org/#getConfig
 * @returns T
 */
exports.getConfig = (projectName, property, defaultValue) => {
    return vscode.workspace
        .getConfiguration(projectName)
        .get(property, defaultValue);
};
/**
 * Get dir from path (If path is a dir return it)
 * @param path
 * @dependencyInternal isDir, splitPath
 * @oneLineEx const dir = vsc.getDir(path)
 * @see http://vsc-base.org/#getDir
 * @returns string
 */
exports.getDir = (path) => {
    const _isDir = exports.isDir(path);
    if (_isDir) {
        return path;
    }
    const [dir] = exports.splitPath(path);
    return dir;
};
/**
 * Get file source
 * @param path
 * @dependencyExternal fs
 * @oneLineEx const source = vsc.getFileContent(path)
 * @see http://vsc-base.org/#getFileContent
 * @returns Promise<string>
 */
exports.getFileContent = (path) => __awaiter(this, void 0, void 0, function* () { return yield fs.readFile(path, 'utf8'); });
/**
 * Get a vscodeRange for the entire document
 * @param document
 * @dependencyExternal vscode
 * @oneLineEx const fullRange = vsc.getFullDocumentRange(document)
 * @see http://vsc-base.org/#getFullDocumentRange
 * @returns boolean
 */
exports.getFullDocumentRange = (document) => {
    const startPosition = new vscode.Position(0, 0);
    const endPosition = new vscode.Position(document.lineCount, 0);
    const fullRange = new vscode.Range(startPosition, endPosition);
    return fullRange;
};
/**
 * Get file source as json (return null on invalid json)
 * @param path
 * @dependencyExternal fs
 * @oneLineEx const json = await vsc.getJsonContent(path)
 * @see http://vsc-base.org/#getJsonContent
 * @returns unknown
 */
exports.getJsonContent = (path, throws = false) => __awaiter(this, void 0, void 0, function* () { return yield fs.readJson(path, { throws }); });
/**
 * Get part of a json object.
 * @param json
 * @param keyPath Ex sub.sub.name >> {sub:{sub:{name:'Foo'}}} >> Foo
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
exports.getLineStreamReader = (readStream) => function () {
    return __asyncGenerator(this, arguments, function* () {
        var e_1, _a;
        let read = '';
        try {
            for (var readStream_1 = __asyncValues(readStream), readStream_1_1; readStream_1_1 = yield __await(readStream_1.next()), !readStream_1_1.done;) {
                const chunk = readStream_1_1.value;
                read += chunk;
                let lineLength;
                while ((lineLength = read.indexOf('\n')) >= 0) {
                    const line = read.slice(0, lineLength + 1);
                    yield yield __await(line);
                    read = read.slice(lineLength + 1);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (readStream_1_1 && !readStream_1_1.done && (_a = readStream_1.return)) yield __await(_a.call(readStream_1));
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (read.length > 0) {
            yield yield __await(read);
        }
    });
};
/**
 * Find package.json files and collect the dependencies and devDependencies.
 * @dependencyInternal getPackageFilePaths, getJsonContent, getJsonParts
 * @oneLineEx const [dependencies, devDependencies] = await vsc.getPackageDependencies()
 * @todo Use unknow guard check instead of any casting
 * @see http://vsc-base.org/#getPackageDependencies
 * @returns Promise<{ [key: string]: string }[]
 */
exports.getPackageDependencies = () => __awaiter(this, void 0, void 0, function* () {
    let dependencies = {};
    let devDependencies = {};
    const packageFilePaths = yield exports.getPackageFilePaths();
    for (let i = 0; i < packageFilePaths.length; i++) {
        const packageFile = packageFilePaths[i];
        const packageJson = yield exports.getJsonContent(packageFile);
        if (!packageJson) {
            continue;
        }
        const packageDependencies = exports.getJsonParts(packageJson, 'dependencies');
        const packageDevDependencies = exports.getJsonParts(packageJson, 'devDependencies');
        if (packageDependencies) {
            dependencies = Object.assign({}, dependencies, packageDependencies);
        }
        if (packageDevDependencies) {
            devDependencies = Object.assign({}, devDependencies, packageDevDependencies);
        }
    }
    return [dependencies, devDependencies];
});
/**
 * Find packages file paths in project.
 * @dependencyInternal findFilePaths
 * @oneLineEx const packageFilePaths = await vsc.getPackageFilePaths()
 * @see http://vsc-base.org/#getPackageFilePaths
 * @returns Promise<string[]>
 */
exports.getPackageFilePaths = () => __awaiter(this, void 0, void 0, function* () {
    const packageFiles = yield exports.findFilePaths('**/package.json');
    return packageFiles;
});
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
exports.getReadStream = (path) => {
    const stream = fs.createReadStream(path, {
        flags: 'r',
        encoding: 'utf-8',
        fd: undefined,
        mode: 438,
        autoClose: false,
        highWaterMark: 64 * 1024
    });
    return stream;
};
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
exports.getRelativePath = (fromPath, toPath) => {
    const _sharedPath = exports.sharedPath(fromPath, toPath);
    const [fromDir] = exports.splitPath(fromPath);
    const [toDir] = exports.splitPath(toPath);
    const fromPathDownToShared = exports.subtractPath(fromDir, _sharedPath);
    let toPathDownToShared = exports.subtractPath(toDir, _sharedPath);
    const backPath = fromPathDownToShared
        .split(/\//)
        .map(_ => '../')
        .join('');
    const relativePath = backPath + toPathDownToShared;
    return relativePath;
};
/**
 * Get project root for a path or undefined if no project was found.
 * @param path
 * @dependencyExternal vscode
 * @dependencyInternal pathAsUnix
 * @oneLineEx const rootPath = vsc.getRootPath()
 * @see http://vsc-base.org/#getRootPath
 * @returns string | undefined
 */
exports.getRootPath = (path) => {
    const uri = vscode.Uri.file(path);
    const workspaceFolder = vscode.workspace.getWorkspaceFolder(uri);
    if (!workspaceFolder) {
        return undefined;
    }
    let rootPath = workspaceFolder.uri.fsPath;
    rootPath = exports.pathAsUnix(rootPath);
    return rootPath;
};
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
exports.getSubrelativePathFromAbsoluteRootPath = (path, absolutePathFromRoot, rootPath) => {
    const [sourceDirPath] = exports.splitPath(path);
    let sourceDirPathFromRoot = exports.subtractPath(sourceDirPath, rootPath);
    sourceDirPathFromRoot = sourceDirPathFromRoot + '/';
    let absolutePathFromSourceDir = exports.subtractPath(absolutePathFromRoot, sourceDirPathFromRoot);
    if (absolutePathFromSourceDir !== absolutePathFromRoot) {
        absolutePathFromSourceDir = exports.addLeadingLocalDash(absolutePathFromSourceDir);
    }
    return absolutePathFromSourceDir;
};
/**
 * Does path start with charactor [a-zA-Z@] (not '/' or './' or '../')
 * @param path
 * @param startWithRegExp? If your project defines another definition of absolute path then overwrite this.
 * @see http://vsc-base.org/#isAbsolutePath
 * @returns boolean
 */
exports.isAbsolutePath = (path, startWithRegExp = /^[a-zA-Z@]/) => {
    return startWithRegExp.test(path);
};
/**
 * Test is a path is directory
 * @param path
 * @dependencyExternal fs
 * @oneLineEx const _isDir = vsc.isDir(path)
 * @see http://vsc-base.org/#isDir
 * @returns boolean
 */
exports.isDir = (path) => {
    return fs.statSync(path).isDirectory();
};
/**
 * Does subpath start with parentPath
 * @param path
 * @param parentPath
 * @dependencyInternal trimDashes
 * @see http://vsc-base.org/#isSubPath
 * @returns boolean
 */
exports.isSubPath = (subPath, parentPath) => {
    parentPath = exports.trimDashes(parentPath);
    const result = subPath.indexOf(parentPath + '/') === 0;
    return result;
};
/**
 * Joins to paths.
 * @param path1
 * @param path2
 * @dependencyInternal trimDashes
 * @see http://vsc-base.org/#joinPaths
 * @returns string
 */
exports.joinPaths = (path1, path2) => {
    path1 = exports.trimDashes(path1);
    path2 = exports.trimDashes(path2);
    const result = path1 + '/' + path2;
    return result;
};
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
exports.loadTsModule = (path) => __awaiter(this, void 0, void 0, function* () {
    const scriptFileTs = yield exports.getFileContent(path);
    const transpiledOutput = ts.transpileModule(scriptFileTs, {});
    const sourceJs = transpiledOutput.outputText;
    const wrapExports = `_exports = (function (vsc){var exports = {};${sourceJs};return exports})(vsc);`;
    let _exports = {};
    try {
        _exports = vsc_evel_1.default(wrapExports);
    }
    catch (e) {
        throw e; // retrhow
    }
    return _exports;
});
/**
 * Make a folder
 * @param path
 * @param newPathstring
 * @dependencyExternal fs
 * @oneLineEx await vsc.makeDir(path)
 * @see http://vsc-base.org/#makeDir
 * @returns Promise<void>
 */
exports.makeDir = (folderPath) => __awaiter(this, void 0, void 0, function* () {
    try {
        yield fs.mkdir(folderPath);
    }
    catch (e) {
        throw e;
    }
});
/**
 * Move file/fodler
 * @param path
 * @param newPathstring
 * @oneLineEx await vsc.move(oldPath, newPath)
 * @dependencyExternal fs
 * @see http://vsc-base.org/#move
 * @returns Promise<void>
 */
exports.move = (path, newPath) => __awaiter(this, void 0, void 0, function* () {
    yield fs.move(path, newPath);
});
/**
 * Reaplve all '\\'  with '/'
 * @param path
 * @see http://vsc-base.org/#pathAsUnix
 * @returns string
 */
exports.pathAsUnix = (path) => {
    return path.replace(/\\/g, '/');
};
/**
 * Prompt user for a question with a list of answers
 * @param path
 * @dependencyExternal vscode
 * @oneLineEx const answer = await pick(answers)
 * @ex const answer = await ask(\['yes', 'no'\])
 * @see http://vsc-base.org/#pick
 * @returns Promise<string | undefined>
 */
exports.pick = (answerList) => __awaiter(this, void 0, void 0, function* () { return yield vscode.window.showQuickPick(answerList); });
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
exports.relatrivePathToAbsolutePath = (path, pathRelatriveToPath, rootPath) => {
    if (exports.isAbsolutePath(pathRelatriveToPath)) {
        return pathRelatriveToPath;
    }
    let [dir] = exports.splitPath(path);
    dir += '/';
    const relativePath = dir + pathRelatriveToPath;
    let cleanRelativePath = exports.cleanPath(relativePath);
    let absolutePathToRelative = exports.subtractPath(cleanRelativePath, rootPath);
    absolutePathToRelative = exports.trimLeadingDash(absolutePathToRelative);
    return absolutePathToRelative;
};
/**
 * Save active open file.
 * Return true for succes, and false if there was no open document
 * @dependencyInternal getActiveDocument
 * @oneLineEx const success = await vsc.saveActiveDocument(content)
 * @see http://vsc-base.org/#saveActiveDocument
 * @returns Promise<boolean>
 */
exports.saveActiveDocument = () => __awaiter(this, void 0, void 0, function* () {
    const doc = exports.getActiveDocument();
    if (doc) {
        yield doc.save();
        return true;
    }
    return new Promise(resolve => {
        resolve(false);
    });
});
/**
 * Save All files
 * @dependencyExternal vscode
 * @oneLineEx await vsc.saveAll()
 * @see http://vsc-base.org/#saveAll
 * @returns Promise<void>
 */
exports.saveAll = () => __awaiter(this, void 0, void 0, function* () {
    yield vscode.workspace.saveAll(false);
});
/**
 * Save file
 * @param path
 * @param content
 * @dependencyExternal fs
 * @oneLineEx await vsc.saveFileContent(path, source)
 * @see http://vsc-base.org/#saveFileContent
 * @returns Promise<void>
 */
exports.saveFileContent = (path, content) => __awaiter(this, void 0, void 0, function* () {
    yield fs.writeFile(path, content);
});
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
exports.scaffoldTemplate = (path, templateItem, userInputs = {}) => __awaiter(this, void 0, void 0, function* () {
    switch (templateItem.type) {
        case 'folder': {
            let name = templateItem.name;
            if (typeof name === 'function') {
                name = name.call(null, userInputs);
            }
            const folderPath = path + '/' + name;
            yield exports.makeDir(folderPath);
            if (!templateItem.children) {
                break;
            }
            templateItem.children.forEach((childItem) => __awaiter(this, void 0, void 0, function* () {
                exports.scaffoldTemplate(folderPath, childItem, userInputs);
            }));
            break;
        }
        case 'file': {
            let name = templateItem.name;
            if (typeof name === 'function') {
                name = name.call(null, userInputs);
            }
            const filePath = path + '/' + name;
            let content = templateItem.content;
            if (typeof content === 'function') {
                content = content.call(null, userInputs);
            }
            yield exports.saveFileContent(filePath, content);
        }
    }
});
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
exports.setActiveDocumentContent = (content) => __awaiter(this, void 0, void 0, function* () {
    const document = exports.getActiveDocument();
    const editor = exports.getActiveEditor();
    if (editor && document) {
        const fullRange = exports.getFullDocumentRange(document);
        const snippetString = new vscode.SnippetString(content);
        yield editor.insertSnippet(snippetString, fullRange);
        return true;
    }
    return false;
});
/**
 * Return the path that are shared. (Return '' if no path are shared).
 * @param path1
 * @param path2
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
    const finalShared = shared.join('/');
    return finalShared;
};
/**
 * Show error message to user
 * @param message
 * @dependencyExternal vscode
 * @oneLineEx await vsc.showErrorMessage(message)
 * @see http://vsc-base.org/#showErrorMessage
 * @returns Promise<void>
 */
exports.showErrorMessage = (message) => __awaiter(this, void 0, void 0, function* () {
    yield vscode.window.showErrorMessage(message);
});
/**
 * Show message to user
 * @param message
 * @dependencyExternal vscode
 * @oneLineEx await vsc.showMessage(message)
 * @see http://vsc-base.org/#showMessage
 * @returns Promise<void>
 */
exports.showMessage = (message) => __awaiter(this, void 0, void 0, function* () {
    yield vscode.window.showInformationMessage(message);
});
/**
 * await wrap for setTimeout. Mostly used for debug asyc.
 * @param ms
 * @see http://vsc-base.org/#sleep
 * @async
 * @returns any
 */
exports.sleep = (ms) => __awaiter(this, void 0, void 0, function* () {
    return new Promise(resolve => setTimeout(resolve, ms));
});
/**
 * Split path into dir and file
 * @param path
 * @dependencyInternal pathAsUnix
 * @see http://vsc-base.org/#splitPath
 * @returns [dir, name]
 */
exports.splitPath = (path) => {
    path = exports.pathAsUnix(path);
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
 * @see http://vsc-base.org/#subtractPath
 * @returns string
 */
exports.subtractPath = (path, parentPath, _trimDashes = true) => {
    const regexp = new RegExp(`^${parentPath}`);
    let newPath = path.replace(regexp, '');
    if (exports.trimDashes) {
        newPath = exports.trimDashes(newPath);
    }
    return newPath;
};
/**
 * Format a string to camal-case. Commonly used to define js/ts variable names.
 * (Some-Name => someName, some_name => someName, some.name => someName )
 * All non word seperators will be removed and the word charector after will be transforms to upper case
 * @param str
 * @see http://vsc-base.org/#toCamelcase
 * @returns string
 */
exports.toCamelcase = (str) => str[0].toLowerCase() +
    str.substr(1).replace(/[^a-zA-Z]+(.)/g, (_match, chr) => chr.toUpperCase());
/**
 * Remove '/' from start and end of path
 * @param path
 * @see http://vsc-base.org/#trimDashes
 * @returns string
 */
exports.trimDashes = (path) => {
    return path.replace(/(^\/|\/$)/g, '');
};
/**
 * Remove '/' from start of path
 * @param path
 * @see http://vsc-base.org/#trimLeadingDash
 * @returns string
 */
exports.trimLeadingDash = (path) => {
    return path.replace(/^\//, '');
};
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
exports.varifyModuleMethods = (_module, methods) => {
    const map = {};
    for (const key of methods) {
        if (_module.hasOwnProperty(key) && _module[key] instanceof Function) {
            map[key] = _module[key];
        }
        else {
            return undefined;
        }
    }
    return map;
};
//# sourceMappingURL=vsc-base.js.map