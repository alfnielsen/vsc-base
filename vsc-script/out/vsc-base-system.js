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
const vsc_base_raw_1 = require("./vsc-base-raw");
/**
 * Create a LineReader (generator method) for a ReadStream
 * @returns () => AsyncIterableIterator<string>
 * @see http://vsc-base.org/#getLineStreamReader
 * @returns any
 */
const getLineStreamReader = (readStream) => (function () {
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
});
//codeEx: const readStream = getReadStream(path)
//codeEx: const lineReader = getLineStreamReader(readStream)
//codeEx: for await (chunk of readStream) { }
/**
 * Get a file ReadStream
 * @param path
 * @see http://vsc-base.org/#getReadStream
 * @returns any
 */
const getReadStream = (path) => {
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
//codeEx: const readStream = getReadStream(path) 
//codeEx: for await (chunk of readStream) { }
/**
 * Prompt user for a question
 * @param path
 * @see http://vsc-base.org/#ask
 * @returns any
 */
const ask = (question, defaultValue) => __awaiter(this, void 0, void 0, function* () {
    return yield vscode.window.showInputBox({
        prompt: question,
        value: defaultValue
    });
});
//codeEx: const answer ask(question, defaultValue)
/**
 * Does the folder/file exist
 * @param path string
 * @see http://vsc-base.org/#doesExists
 * @returns any
 */
const doesExists = (path) => {
    return fs.existsSync(path);
};
//codeEx: const exist = vsc.doesExists(path)
/**
 * Get a list off all filePaths in project the matches a glob pattern
 * @param include glob
 * @param exclude glob
 * @param maxResults
 * @see http://vsc-base.org/#findFilePaths
 * @returns any
 */
const findFilePaths = (include = '**/*.{js,jsx,ts,tsx}', exclude = '**/node_modules/**', maxResults = 100000) => __awaiter(this, void 0, void 0, function* () {
    const uriFiles = yield vscode.workspace.findFiles(include, exclude, maxResults);
    const files = uriFiles.map((uri) => vsc.pathAsUnix(uri.fsPath));
    return files;
});
//codeEx: const files = await vsc.findFilePaths('*test*.{ts,jsx,ts,tsx}')
/**
 * Get a list off all filePaths from a basePath, in project the matches a glob pattern
 * @param include glob
 * @param exclude glob
 * @param maxResults
 * @see http://vsc-base.org/#findFilePathsFromBase
 * @returns any
 */
const findFilePathsFromBase = (basePath, includePattern = '**/*.{js,jsx,ts,tsx}', exclude = '**/node_modules/**', maxResults = 100000) => __awaiter(this, void 0, void 0, function* () {
    let baseDir = vsc.getDir(basePath);
    const include = new vscode.RelativePattern(baseDir, includePattern);
    const filePaths = yield vsc.findFilePaths(include, exclude, maxResults);
    return filePaths;
});
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
const findRelativeFilePaths = (path, relativePath, includePattern = '**/*.{js,jsx,ts,tsx}', exclude = '**/node_modules/**', maxResults = 100000) => __awaiter(this, void 0, void 0, function* () {
    const dir = vsc.getDir(path);
    const joinPath = vsc.joinPaths(dir, relativePath);
    let base = vsc.cleanPath(joinPath + '/');
    base = vsc.trimDashes(base);
    const filePaths = yield vsc.findFilePathsFromBase(base, includePattern, exclude, maxResults);
    return filePaths;
});
//codeEx: const files = await vsc.findRelativeFilePaths(path, '../', '*test*.{ts,jsx,ts,tsx}')
/**
 * Get open vscode.TextDocument
 * @see http://vsc-base.org/#getActiveDocument
 * @returns any
 */
const getActiveDocument = () => {
    const activeEditor = vscode.window.activeTextEditor;
    const document = activeEditor && activeEditor.document;
    return document;
};
//codeEx: const doc = vsc.getActiveDocument()
/**
 * Get current open file path or undefined if nothing is open.
 * @see http://vsc-base.org/#getActiveOpenPath
 * @returns any
 */
const getActiveOpenPath = () => {
    const document = vsc.getActiveDocument();
    return (document && document.fileName) || undefined;
};
//codeEx: const openPath = vsc.getActiveOpenPath()
/**
 * Get vscode project config
 * @see http://vsc-base.org/#getConfig
 * @returns any
 */
const getConfig = (projectName, property, defaultValue) => {
    return vscode.workspace.getConfiguration(projectName).get(property, defaultValue);
};
//codeEx: const myOption = vsc.getConfig(projectName, optionName, defaultValue)
/**
* Get dir from path (If path is a dir return it)
* @param path
*/
const getDir = (path) => {
    const isDir = vsc.isDir(path);
    if (isDir) {
        return path;
    }
    const [dir] = vsc.splitPath(path);
    return dir;
};
//codeEx: const dir = vsc.getDir(path)
/**
 * Get file source
 * @param path
 * @see http://vsc-base.org/#getFileContent
 * @returns any
 */
const getFileContent = (path) => __awaiter(this, void 0, void 0, function* () { return yield fs.readFile(path, 'utf8'); });
//codeEx: const source = vsc.getFileContent(path)
/**
 * Get file source as json (return null on invalid json)
 * @param path
 * @see http://vsc-base.org/#getJsonContent
 * @returns Promise<any>
 * @see http://vsc-base.org/#getJsonContent
 * @returns any
 */
const getJsonContent = (path, throws = false) => __awaiter(this, void 0, void 0, function* () { return yield fs.readJson(path, { throws }); });
//codeEx: const json = vsc.getJsonContent(path)
/**
 * Find packages file paths in project.
 * @see http://vsc-base.org/#getPackageFilePaths
 * @returns Promise<string[]>
 * @see http://vsc-base.org/#getPackageFilePaths
 * @returns any
 */
const getPackageFilePaths = () => __awaiter(this, void 0, void 0, function* () {
    const packageFiles = yield vsc.findFilePaths('**/package.json');
    return packageFiles;
});
//codeEx: const packageFilePaths = vsc.getPackageFilePaths()
/**
 * Find roots packages and collect the dependencies and devDependencies.
 * @returns [dependencies, devDependencies]
 * @see http://vsc-base.org/#getPackageDependencies
 * @returns any
 */
const getPackageDependencies = () => __awaiter(this, void 0, void 0, function* () {
    let dependencies = {};
    let devDependencies = {};
    const packageFilePaths = yield getPackageFilePaths();
    for (let i = 0; i < packageFilePaths.length; i++) {
        const packageFile = packageFilePaths[i];
        const packageJson = yield vsc.getJsonContent(packageFile);
        if (!packageJson) {
            continue;
        }
        const packageDependencies = vsc.getJsonParts(packageJson, 'dependencies');
        const packageDevDependencies = vsc.getJsonParts(packageJson, 'devDependencies');
        if (packageDependencies) {
            dependencies = Object.assign({}, dependencies, packageDependencies);
        }
        if (packageDevDependencies) {
            devDependencies = Object.assign({}, devDependencies, packageDevDependencies);
        }
    }
    return [dependencies, devDependencies];
});
//codeEx: const [] = getPackageDependencies()
/**
 * Get project root for a path or undefined if no project was found.
 * dependensies: { vscode.Uri.parse, vscode.workspace.getWorkspaceFolder, methods.pathAsUnix }
 * @param path
 * @see http://vsc-base.org/#getRootPath
 * @returns any
 */
const getRootPath = (uri) => {
    //const uri = vscode.Uri.parse(path)
    const workspaceFolder = vscode.workspace.getWorkspaceFolder(uri);
    if (!workspaceFolder) {
        return undefined;
    }
    let rottPath = workspaceFolder.uri.fsPath;
    rottPath = vsc.pathAsUnix(rottPath);
    return rottPath;
};
/**
 * Test is a path is directory
 * dependensies: { fs.statSync(Faile access) }
 * @param path
 * @see http://vsc-base.org/#isDir
 * @returns any
 */
const isDir = (path) => {
    return fs.statSync(path).isDirectory();
};
/**
 * Make a folder
 * dependensies: { fs.move(File access) }
 * @param path
 * @param newPathstring
 * @see http://vsc-base.org/#makeDir
 * @returns any
 */
const makeDir = (folderPath) => __awaiter(this, void 0, void 0, function* () {
    yield fs.mkdir(folderPath);
});
/**
 * Move file/fodler
 * @param path
 * @param newPathstring
 * @see http://vsc-base.org/#move
 * @returns any
 */
const move = (path, newPath) => __awaiter(this, void 0, void 0, function* () {
    yield fs.move(path, newPath);
});
/**
 * Save All files
 * @see http://vsc-base.org/#saveAll
 * @returns any
 */
const saveAll = () => __awaiter(this, void 0, void 0, function* () {
    yield vscode.workspace.saveAll(false);
});
/**
 * Save file
 * @param path
 * @param content
 * @see http://vsc-base.org/#saveFileContent
 * @returns any
 */
const saveFileContent = (path, content) => __awaiter(this, void 0, void 0, function* () {
    yield fs.writeFile(path, content);
});
/**
 * Show error message to user
 * @param message
 * @see http://vsc-base.org/#showErrorMessage
 * @returns any
 */
const showErrorMessage = (message) => __awaiter(this, void 0, void 0, function* () {
    yield vscode.window.showErrorMessage(message);
});
/**
 * Show message to user
 * @param message
 * @see http://vsc-base.org/#showMessage
 * @returns any
 */
const showMessage = (message) => __awaiter(this, void 0, void 0, function* () {
    yield vscode.window.showInformationMessage(message);
});
/**
 * export methods
 * @see http://vsc-base.org/#vsc
 * @returns any
 */
const vsc /* IVscBase */ = Object.assign({}, vsc_base_raw_1.default, { ask,
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
    showMessage });
exports.default = vsc;
//# sourceMappingURL=vsc-base-system.js.map