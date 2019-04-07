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
const vsc = require("./vsc-base");
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
 * Get dir from path (If path is a dir return it)
 * @param path
 * @dependencyInternal isDir, splitPath
 * @oneLineEx const dir = vsc.getDir(path)
 * @see http://vsc-base.org/#getDir
 * @returns string
 */
exports.getDir = (path) => {
    const _isDir = vsc.isDir(path);
    if (_isDir) {
        return path;
    }
    const [dir] = vsc.splitPath(path);
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
 * Get file source as json (return null on invalid json)
 * @param path
 * @dependencyExternal fs
 * @oneLineEx const json = await vsc.getJsonContent(path)
 * @see http://vsc-base.org/#getJsonContent
 * @returns unknown
 */
exports.getJsonContent = (path, throws = false) => __awaiter(this, void 0, void 0, function* () { return yield fs.readJson(path, { throws }); });
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
 * Find packages file paths in project.
 * @dependencyInternal findFilePaths
 * @oneLineEx const packageFilePaths = await vsc.getPackageFilePaths()
 * @see http://vsc-base.org/#getPackageFilePaths
 * @returns Promise<string[]>
 */
exports.getPackageFilePaths = () => __awaiter(this, void 0, void 0, function* () {
    const packageFiles = yield vsc.findFilePaths('**/package.json');
    return packageFiles;
});
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
    const packageFilePaths = yield vsc.getPackageFilePaths();
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
 * Copy file/fodler
 * @param path
 * @param newPathstring
 * @oneLineEx await vsc.copy(oldPath, newPath)
 * @dependencyExternal fs
 * @see http://vsc-base.org/#copy
 * @returns Promise<void>
 */
exports.copy = (path, newPath) => __awaiter(this, void 0, void 0, function* () {
    yield fs.copy(path, newPath);
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
 * Transpile ts source to js
 * @param sourceTs
 * @param compilerOptions
 * @oneLineEx const sourceJs = vsc.transpileTs(sourceTs)
 * @see http://vsc-base.org/#transpileTs
 * @returns string
 */
exports.transpileTs = (sourceTs, compilerOptions = {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2015,
    libs: ['es6']
}) => {
    const transpiledOutput = ts.transpileModule(sourceTs, { compilerOptions });
    let sourceJs = transpiledOutput.outputText;
    return sourceJs;
};
/**
 * Pre method for loadTsModule. (This methods load the ts source, transpile it to js and replace all 'require' instance)
 * @param path $
 * @param compilerOptions
 * @param moduleMap default = vsc.getVscDefaultModuleMap()
 * @oneLineEx const sourceJs = await vsc.loadTsModuleSourceCode(path)
 * @see http://vsc-base.org/#loadTsModuleSourceCode
 * @returns Promise<string>
 */
exports.loadTsModuleSourceCode = (path, compilerOptions = {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2015,
    libs: ['es6']
}) => __awaiter(this, void 0, void 0, function* () {
    const scriptFileTs = yield vsc.getFileContent(path);
    let sourceJs = vsc.transpileTs(scriptFileTs, compilerOptions);
    sourceJs = vsc.rewriteTstranpiledCodeWithVscBaseModules(sourceJs);
    return sourceJs;
});
/**
 * Return the default module map of vsc-base (Used for ts compiling, module load ect)
 * @internal this method is primary used by vsc.loadTsModule
 * @oneLineEx const moduleMap = getVscDefaultModuleMap
 * @see http://vsc-base.org/#getVscDefaultModuleMap
 * @returns \{ [key: string]: \{ name: string, module: any \} \}
 */
exports.getVscDefaultModuleMap = () => {
    return [
        { key: 'vsc', name: 'vsc-base', module: vsc },
        { key: 'ts', name: 'typescript', module: ts },
        { key: 'fs', name: 'fs-extra', module: fs },
        { key: 'vscode', name: 'vscode', module: vscode }
    ];
};
/**
 * Replace ts traspiles code's require for vsc, ts, fs and vscode.
 * @internal this method is primary used by vsc.loadTsModule
 * @notes
 * ts.transpile as follows:
 * const vsc_base_1 = require("vsc-base");
 * const fs = require("fs-extra");
 * const typescript_1 = require("typescript");
 * const vscode = require("vscode");
 * @oneLineEx sourceJs = vsc.rewriteTstranpiledCodeWithVscBaseModules(sourceJs)
 * @param sourceJs
 * @see http://vsc-base.org/#rewriteTstranpiledCodeWithVscBaseModules
 * @returns string
 */
exports.rewriteTstranpiledCodeWithVscBaseModules = (sourceJs) => {
    const modulesMap = vsc.getVscDefaultModuleMap();
    modulesMap.forEach(obj => {
        const reg = new RegExp(`\\bconst (\\w+) = require\\(\\"${obj.name}\\"\\)`, 'g');
        sourceJs = sourceJs.replace(reg, (str) => `/* ${str} // vsc-base has change the ts transpiled code here. */`);
    });
    return sourceJs;
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
exports.loadTsModule = (path, compilerOptions = {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2015,
    libs: ['es6']
}) => __awaiter(this, void 0, void 0, function* () {
    const sourceJs = yield vsc.loadTsModuleSourceCode(path, compilerOptions);
    let _exports = {};
    try {
        _exports = loadTsModule_Eval(sourceJs);
    }
    catch (e) {
        if (e instanceof LoadTsModuleError) {
            throw e;
        }
        else {
            throw new LoadTsModuleError(e, sourceJs);
        }
    }
    return _exports;
});
class LoadTsModuleError extends Error {
    constructor(message, transpiledCode) {
        super(message);
        this.transpiledCode = transpiledCode;
    }
}
exports.LoadTsModuleError = LoadTsModuleError;
const loadTsModule_Eval = (sourceJs) => __awaiter(this, void 0, void 0, function* () {
    //Wrap code in enclosed function. Add vsc as only dependency.
    const wrapExports = `_exports = (function(){var exports = {};\n${sourceJs}\nreturn exports})()`;
    let _exports = {};
    try {
        eval(wrapExports);
    }
    catch (e) {
        throw new LoadTsModuleError(e, wrapExports);
    }
    return _exports;
});
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
            yield vsc.makeDir(folderPath);
            if (!templateItem.children) {
                break;
            }
            templateItem.children.forEach((childItem) => __awaiter(this, void 0, void 0, function* () {
                vsc.scaffoldTemplate(folderPath, childItem, userInputs);
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
            yield vsc.saveFileContent(filePath, content);
        }
    }
});
//# sourceMappingURL=vsc-base-system.js.map