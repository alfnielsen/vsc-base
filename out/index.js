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
const fs = require("fs-extra");
const path = require("path");
const vscode = require("vscode");
exports.getFilesUnder = (uri, fileTypes) => __awaiter(this, void 0, void 0, function* () {
    const root = getRootPath(uri);
    const relativePath = getRelativeDirPaht(root, uri);
    const glob = `${relativePath}/${fileTypes}`.replace(/^\//g, '');
    //showMessage(`Files in: ${glob}`)
    const files = yield getAllFiles(glob);
    //showMessage(`Files found: ${files.length}`)
    yield files.forEach(callback);
});
const saveFileContent = (path, content) => __awaiter(this, void 0, void 0, function* () { return yield fs.writeFile(path, content); });
const getFileContent = (path) => __awaiter(this, void 0, void 0, function* () { return yield fs.readFile(path, 'utf8'); });
const getAllFiles = (glob) => __awaiter(this, void 0, void 0, function* () {
    return yield vscode.workspace.findFiles(glob, '**/node_modules/**', 100000);
});
const showMessage = (message) => vscode.window.showInformationMessage(message);
const showErrorMessage = (message) => vscode.window.showErrorMessage(message);
const getRootPath = (uri) => {
    return vscode.workspace.getWorkspaceFolder(uri).uri.fsPath;
};
const isDir = (path) => fs.statSync(path).isDirectory();
const getRelativeDirPaht = (root, uri) => {
    const selectedFilePath = uri.fsPath;
    let selectedFilePathDir = selectedFilePath;
    if (!isDir(selectedFilePath)) {
        selectedFilePathDir = path.dirname(selectedFilePath);
    }
    const relativeDirPath = selectedFilePathDir.replace(root, '');
    return relativeDirPath;
};
//# sourceMappingURL=index.js.map