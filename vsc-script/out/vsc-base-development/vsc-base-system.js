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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const cp = __importStar(require("child-process-promise"));
const fs = __importStar(require("fs-extra"));
const vscode = __importStar(require("vscode"));
const vsc = __importStar(require("./vsc-base"));
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
 * @example
 * const result = await vsc.execFromPath(command, path)
 * @ex
 const rootPath = vsc.getRootPath(path)
 const result = await vsc.execFromPath('yarn start', rootPath)
 const stringResult = result.stdout.toString()
 * @returns Promise<cp.PromiseResult<string>>
 */
exports.execFromPath = (command, path) => __awaiter(this, void 0, void 0, function* () {
    return yield cp.exec(`cd ${path} && ${command}`);
});
/** vsc-base method
 * @description
 * Create a LineReader (generator method) for a ReadStream /
 * Optional params 'excludeNewLine' (default value false). /
 * If set to true it will omit the newline feed from the returned lines. /
 * EXPERIMENTAL NodeJs feature. NodeJs community writes: \
 * ExperimentalWarning: Readable[Symbol.asyncIterator] is an experimental feature. This feature could change at any time.
 * @see [getLineStreamReader](http://vsc-base.org/#getLineStreamReader)
 * @param readStream
 * @dependencyExternal fs
 * @vscType System
 * @example
 * const lineReader = vsc.getLineStreamReader(readStream)
 * @example
 * const readStream = vsc.getReadStream(path)
 * const lineReader = vsc.getLineStreamReader(readStream)
 * for await (const line of lineReader()) {
 *    //do something with the line
 * }
 * @returns () => AsyncIterableIterator<string>
 */
exports.getLineStreamReader = (readStream, excludeNewLine = false) => function () {
    return __asyncGenerator(this, arguments, function* () {
        var e_1, _a;
        let read = '';
        try {
            for (var readStream_1 = __asyncValues(readStream), readStream_1_1; readStream_1_1 = yield __await(readStream_1.next()), !readStream_1_1.done;) {
                const chunk = readStream_1_1.value;
                read += chunk;
                let lineLength;
                while ((lineLength = read.indexOf('\n')) >= 0) {
                    let line;
                    if (excludeNewLine) {
                        line = read.slice(0, lineLength);
                    }
                    else {
                        line = read.slice(0, lineLength + 1);
                    }
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
/** vsc-base method
 * @description
 * Get a file ReadStream \
 * See [fs docs for createReadStream](https://nodejs.org/api/fs.html#fs_fs_createreadstream_path_options)
 * @see [getReadStream](http://vsc-base.org/#getReadStream)
 * @param path
 * @dependencyExternal fs
 * @vscType System
 * @example
 * const readStream = vsc.getReadStream(path)
 * @example
 * const readStream = vsc.getReadStream(path) \
 * for await (const chunk of readStream) { \
 *   //do something with chunk \
 * }
 * @returns fs.ReadStream
 */
exports.getReadStream = (path, options = {
    flags: 'r',
    encoding: 'utf-8',
    fd: undefined,
    mode: 438,
    autoClose: false,
    highWaterMark: 64 * 1024
}) => {
    const stream = fs.createReadStream(path, options);
    return stream;
};
/** vsc-base method
 * @description
 * Does the folder/file exist
 * @see [doesExists](http://vsc-base.org/#doesExists)
 * @param path string
 * @dependencyExternal fs
 * @vscType System
 * @example
 * const exist = vsc.doesExists(path)
 * @returns boolean
 */
exports.doesExists = (path) => {
    return fs.existsSync(path);
};
/** vsc-base method
 * @description
 * Get dir from path \
 * (If path is a dir return it)
 * @see [getDir](http://vsc-base.org/#getDir)
 * @param path
 * @dependencyInternal isDir, splitPath
 * @vscType System
 * @example
 * const dir = vsc.getDir(path)
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
/** vsc-base method
 * @description
 * Get file source
 * @see [getFileContent](http://vsc-base.org/#getFileContent)
 * @param path
 * @dependencyExternal fs
 * @vscType System
 * @example
 * const source = vsc.getFileContent(path)
 * @returns Promise<string>
 */
exports.getFileContent = (path, encoding = 'utf8') => __awaiter(this, void 0, void 0, function* () { return yield fs.readFile(path, encoding); });
/** vsc-base method
 * @description
 * Get file source as json \
 * (return null on invalid json)
 * @see [getJsonContent](http://vsc-base.org/#getJsonContent)
 * @param path
 * @dependencyExternal fs
 * @vscType System
 * @example
 * const json = await vsc.getJsonContent(path)
 * @returns unknown
 */
exports.getJsonContent = (path, throws = false) => __awaiter(this, void 0, void 0, function* () { return yield fs.readJson(path, { throws }); });
/** vsc-base method
 * @description
 * Get vscode project config
 * @see [getConfig](http://vsc-base.org/#getConfig)
 * @dependencyExternal vscode
 * @vscType System
 * @example
 * const myOption = vsc.getConfig(projectName, optionName, defaultValue)
 * @example
 * const myOption = vsc.getConfig('myExtension', 'doThisThing', false)
 * @returns T
 */
exports.getConfig = (projectName, property, defaultValue) => {
    return vscode.workspace
        .getConfiguration(projectName)
        .get(property, defaultValue);
};
/** vsc-base method
 * @description
 * Find package.json file paths in project. /
 * Take an optional 'exclude' which is an exclude pattern for the underlying [findFilePaths](http://vsc-base.org/#findFilePaths) \
 * It can be used to control which package.json files should be included.
 * @see [getPackageFilePaths](http://vsc-base.org/#getPackageFilePaths)
 * @dependencyInternal findFilePaths
 * @vscType System
 * @example
 * const packageFilePaths = await vsc.getPackageFilePaths()
 * @returns Promise<string[]>
 */
exports.getPackageFilePaths = (exclude = '**/{node_modules,.vscode-test}/**') => __awaiter(this, void 0, void 0, function* () {
    const packageFiles = yield vsc.findFilePaths('**/package.json', exclude);
    return packageFiles;
});
/** vsc-base method
 * @description
 * Get json from package.json in the project root.
 * @see [getRootPackageJson](http://vsc-base.org/#getRootPackageJson)
 * @dependencyInternal findFilePaths
 * @vscType System
 * @example
 * const packageJson = await vsc.getRootPackageJson(rootPath)
 * @returns Promise<T = any>
 */
exports.getRootPackageJson = (rootPath) => __awaiter(this, void 0, void 0, function* () {
    const packageJsonPath = vsc.joinPaths(rootPath, 'package.json');
    const packageJson = yield vsc.getJsonContent(packageJsonPath);
    return packageJson;
});
/** vsc-base method
 * @description
 * Find package.json files and collect the dependencies and devDependencies.
 * Take an optional 'exclude' which is an exclude pattern for the underlying [findFilePaths](http://vsc-base.org/#findFilePaths) / [getPackageFilePaths](http://vsc-base.org/#getPackageFilePaths) \
 * It can be used to control which package.json files should be included.
 * @see [getPackageDependencies](http://vsc-base.org/#getPackageDependencies)
 * @dependencyInternal getPackageFilePaths, getJsonContent, getJsonParts
 * @vscType System
 * @example
 * const [dependencies, devDependencies] = await vsc.getPackageDependencies()
 * @todo Use unknown guard check instead of any casting
 * @returns Promise<{ [key: string]: string }[]
 */
exports.getPackageDependencies = (exclude = '**/{node_modules,.vscode-test}/**') => __awaiter(this, void 0, void 0, function* () {
    let dependencies = {};
    let devDependencies = {};
    const packageFilePaths = yield vsc.getPackageFilePaths(exclude);
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
/** vsc-base method
 * @description
 * Test is a path is directory
 * @param path
 * @dependencyExternal fs
 * @vscType System
 * @example
 * const isDir = vsc.isDir(path)
 * @see [isDir](http://vsc-base.org/#isDir)
 * @returns boolean
 */
exports.isDir = (path) => {
    return fs.statSync(path).isDirectory();
};
/** vsc-base method
 * @description
 * Make a folder \
 * See [fs docs for mkdir](https://nodejs.org/api/fs.html#fs_fs_mkdir_path_options_callback)
 * @see [makeDir](http://vsc-base.org/#makeDir)
 * @param folderPath
 * @vscType System
 * @dependencyExternal fs
 * @example
 * await vsc.makeDir(path)
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
/** vsc-base method
 * @description
 * Move a file or folder \
 * See [fs-extra docs for move](https://github.com/jprichardson/node-fs-extra/blob/master/docs/move.md)
 * @see [move](http://vsc-base.org/#move)
 * @vscType System
 * @example
 * await vsc.move(oldPath, newPath)
 * @dependencyExternal fs
 * @returns Promise<void>
 */
exports.move = (path, newPath, options) => __awaiter(this, void 0, void 0, function* () {
    if (options) {
        yield fs.move(path, newPath, options);
    }
    else {
        yield fs.move(path, newPath);
    }
});
/** vsc-base method
 * @description
 * Rename a file or folder \
 * See [fs docs for rename](https://nodejs.org/api/fs.html#fs_fs_rename_oldpath_newpath_callback)
 * @see [move](http://vsc-base.org/#move)
 * @vscType System
 * @example
 * await vsc.move(oldPath, newPath)
 * @dependencyExternal fs
 * @returns Promise<void>
 */
exports.rename = (path, newPath) => __awaiter(this, void 0, void 0, function* () {
    yield fs.rename(path, newPath);
});
/** vsc-base method
 * @description
 * Copy file/folder \
 * See [fs-extra docs for copy](https://github.com/jprichardson/node-fs-extra/blob/master/docs/copy.md)
 * @see [copy](http://vsc-base.org/#copy)
 * @vscType System
 * @example
 * await vsc.copy(oldPath, newPath)
 * @dependencyExternal fs
 * @returns Promise<void>
 */
exports.copy = (path, newPath, options) => __awaiter(this, void 0, void 0, function* () {
    yield fs.copy(path, newPath, options);
});
/** vsc-base method
 * @description
 * Remove file/folder \
 * See [fs-extra docs for remove](https://github.com/jprichardson/node-fs-extra/blob/master/docs/remove.md)
 * @see [remove](http://vsc-base.org/#remove)
 * @vscType System
 * @example
 * await vsc.remove(path)
 * @dependencyExternal fs
 * @returns Promise<void>
 */
exports.remove = (path) => __awaiter(this, void 0, void 0, function* () {
    yield fs.remove(path);
});
/** vsc-base method
 * @description
 * emptyDir folder \
 * See [fs-extra docs for emptyDir](https://github.com/jprichardson/node-fs-extra/blob/master/docs/emptyDir.md)
 * @see [emptyDir](http://vsc-base.org/#emptyDir)
 * @vscType System
 * @example
 * await vsc.remove(path)
 * @dependencyExternal fs
 * @returns Promise<void>
 */
exports.emptyDir = (path) => __awaiter(this, void 0, void 0, function* () {
    yield fs.emptyDir(path);
});
/** vsc-base method
 * @description
 * Save file \
 * See [fs docs for writeFile](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback)
 * @see [saveFileContent](http://vsc-base.org/#saveFileContent)
 * @param path
 * @param content
 * @vscType System
 * @dependencyExternal fs
 * @example
 * await vsc.saveFileContent(path, source)
 * @returns Promise<void>
 */
exports.saveFileContent = (path, content, options) => __awaiter(this, void 0, void 0, function* () {
    yield fs.writeFile(path, content, options);
});
/** vsc-base method
 * @description
 * Append content to a file \
 * See [fs docs for appendFile](https://nodejs.org/api/fs.html#fs_fs_appendfile_path_data_options_callback)
 * @see [saveFileContent](http://vsc-base.org/#saveFileContent)
 * @param path
 * @param content
 * @vscType System
 * @dependencyExternal fs
 * @example
 * await vsc.saveFileContent(path, source)
 * @returns Promise<void>
 */
exports.addFileContent = (path, content, options) => __awaiter(this, void 0, void 0, function* () {
    yield fs.appendFile(path, content, options);
});
//# sourceMappingURL=vsc-base-system.js.map