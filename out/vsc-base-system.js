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
 */
const getLineStreamReader = () => function (chunksAsync) {
    return __asyncGenerator(this, arguments, function* () {
        var e_1, _a;
        let previous = '';
        try {
            for (var chunksAsync_1 = __asyncValues(chunksAsync), chunksAsync_1_1; chunksAsync_1_1 = yield __await(chunksAsync_1.next()), !chunksAsync_1_1.done;) {
                const chunk = chunksAsync_1_1.value;
                previous += chunk;
                let eolIndex;
                while ((eolIndex = previous.indexOf('\n')) >= 0) {
                    // line includes the EOL
                    const line = previous.slice(0, eolIndex + 1);
                    yield yield __await(line);
                    previous = previous.slice(eolIndex + 1);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (chunksAsync_1_1 && !chunksAsync_1_1.done && (_a = chunksAsync_1.return)) yield __await(_a.call(chunksAsync_1));
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (previous.length > 0) {
            yield yield __await(previous);
        }
    });
};
/**
 * Get a fs.ReadStream
 * @param path
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
// explame:
const f = (path) => __awaiter(this, void 0, void 0, function* () {
    var e_2, _a;
    const lineReader = getLineStreamReader();
    const readStream = getReadStream(path);
    try {
        for (var _b = __asyncValues(lineReader(readStream)), _c; _c = yield _b.next(), !_c.done;) {
            const chunk = _c.value;
            console.log('>>> ' + chunk);
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) yield _a.call(_b);
        }
        finally { if (e_2) throw e_2.error; }
    }
});
/**
 * Test is a path is directory
 * dependensies: { vscode.window.shoInputBox }
 * @param path
 */
const ask = (question, defaultValue) => __awaiter(this, void 0, void 0, function* () {
    return yield vscode.window.showInputBox({
        prompt: question,
        value: defaultValue
    });
});
/**
 * Does the folder/file exist
 * dependensies: { fs.existsSync(Faile access) }
 * @param path string
 */
const doesExists = (path) => {
    return fs.existsSync(path);
};
/**
 * Get a list off all filePaths in project the matches a glob pattern
 * dependensies: { vscode.workspace.findFiles(File access), methods.pathAsUnix }
 * @param include glob
 * @param exclude glob
 * @param maxResults
 */
const findFilePaths = (include, exclude = '**/node_modules/**', maxResults = 100000) => __awaiter(this, void 0, void 0, function* () {
    const uriFiles = yield vscode.workspace.findFiles(include, exclude, maxResults);
    const files = uriFiles.map((uri) => vsc.pathAsUnix(uri.fsPath));
    return files;
});
/**
 * Get current open file path or undefioned if nonothing is open.
 * dependensies: { vscode.window.activeTextEditor }
 */
const getActiveOpenPath = () => {
    const activeEditor = vscode.window.activeTextEditor;
    const document = activeEditor && activeEditor.document;
    return (document && document.fileName) || undefined;
};
/**
 * Get vscode project config
 * dependensies: { vscode.window.getConfiguration }
 */
const getConfig = (projectName, property, defaultValue) => {
    return vscode.workspace.getConfiguration(projectName).get(property, defaultValue);
};
/**
 * Get file source
 * dependensies: { fs.readFile(File access) }
 * @param path
 */
const getFileContent = (path) => __awaiter(this, void 0, void 0, function* () { return yield fs.readFile(path, 'utf8'); });
/**
 * Find roots packages and collect the dependencies and devDependencies.
 * Return as: {dependencies:{names:version}[], devDependencies:{names:version}[]}
 * dependensies: { vscode.window.findFiles, methods.getFileContent(File access) }
 */
const getPackageDependencies = () => __awaiter(this, void 0, void 0, function* () {
    const packageFiles = yield vscode.workspace.findFiles('**/package.json', '**/node_modules/**', 1000);
    const res = { dependencies: [], devDependencies: [] };
    for (let i = 0; i < packageFiles.length; i++) {
        const packageFile = packageFiles[i];
        const packageFileSource = yield vsc.getFileContent(packageFile.fsPath);
        const packageJsonRoot = JSON.parse(packageFileSource);
        if (!packageJsonRoot) {
            continue;
        }
        const dependencies = vsc.getJsonParts(packageJsonRoot, 'dependencies');
        const devDependencies = vsc.getJsonParts(packageJsonRoot, 'devDependencies');
        if (dependencies) {
            res.dependencies = Object.assign({}, res.dependencies, dependencies);
        }
        if (devDependencies) {
            packageJsonRoot.devDependencies = Object.assign({}, res.devDependencies, devDependencies);
        }
    }
    return res;
});
/**
 * Get project root for a path or undefined if no project was found.
 * dependensies: { vscode.Uri.parse, vscode.workspace.getWorkspaceFolder, methods.pathAsUnix }
 * @param path
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
 */
const isDir = (path) => {
    return fs.statSync(path).isDirectory();
};
/**
 * Wraps fs.move
 * dependensies: { fs.move(File access) }
 * @param path
 * @param newPathstring
 */
const move = (path, newPath) => __awaiter(this, void 0, void 0, function* () {
    yield fs.move(path, newPath);
});
/**
 * Save All files
 * dependensies: { vscode.workspace.saveAll(File access) }
 */
const saveAll = () => __awaiter(this, void 0, void 0, function* () {
    yield vscode.workspace.saveAll(false);
});
/**
 * Save file
 * dependensies: { fs.writeFile(File access) }
 * @param path
 * @param content
 */
const saveFileContent = (path, content) => __awaiter(this, void 0, void 0, function* () {
    yield fs.writeFile(path, content);
});
/**
 * Show error message to user
 * dependensies: { vscode.window.showErrorMessage }
 * @param message
 */
const showErrorMessage = (message) => __awaiter(this, void 0, void 0, function* () {
    yield vscode.window.showErrorMessage(message);
});
/**
 * Show message to user
 * dependensies: { vscode.window.showErrorMessage }
 * @param message
 */
const showMessage = (message) => __awaiter(this, void 0, void 0, function* () {
    yield vscode.window.showInformationMessage(message);
});
/**
 * export methods
 */
const vsc /* IVscBase */ = Object.assign({}, vsc_base_raw_1.default, { ask,
    doesExists,
    findFilePaths,
    getActiveOpenPath,
    getConfig,
    getFileContent,
    getPackageDependencies,
    getRootPath,
    isDir,
    move,
    saveAll,
    saveFileContent,
    showErrorMessage,
    showMessage });
exports.default = vsc;
//# sourceMappingURL=vsc-base-system.js.map