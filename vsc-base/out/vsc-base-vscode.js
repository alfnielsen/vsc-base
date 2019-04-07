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
const vscode = require("vscode");
const vsc = require("./vsc-base");
/**
 * Prompt user for a question
 * @param question string
 * @param defaultValue string
 * @dependencyExternal vscode
 * @oneLineEx const answer = await vsc.ask(question, defaultValue)
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
 * Prompt user for a question with a list of answers
 * @param path string[]
 * @dependencyExternal vscode
 * @oneLineEx const answer = await vsc.pick(answers)
 * @ex const answer = await ask(\['yes', 'no'\])
 * @see http://vsc-base.org/#pick
 * @returns Promise<string | undefined>
 */
exports.pick = (answerList) => __awaiter(this, void 0, void 0, function* () { return yield vscode.window.showQuickPick(answerList); });
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
    const files = uriFiles.map((uri) => vsc.pathAsUnix(uri.fsPath));
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
    let baseDir = vsc.getDir(basePath);
    const include = new vscode.RelativePattern(baseDir, includePattern);
    const filePaths = yield vsc.findFilePaths(include, exclude, maxResults);
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
    const dir = vsc.getDir(path);
    const joinPath = vsc.joinPaths(dir, relativePath);
    let base = vsc.cleanPath(joinPath + '/');
    base = vsc.trimDashes(base);
    const filePaths = yield exports.findFilePathsFromBase(base, includePattern, exclude, maxResults);
    return filePaths;
});
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
 * Get open vscode.TextDocument
 * @dependencyExternal vscode
 * @oneLineEx const document = vsc.getActiveDocument()
 * @see http://vsc-base.org/#getActiveDocument
 * @returns vscode.TextDocument | undefined
 */
exports.getActiveDocument = () => {
    const activeEditor = vsc.getActiveEditor();
    const document = activeEditor && activeEditor.document;
    return document;
};
/**
 * Get current open file path or undefined if nothing is open.
 * @dependencyInternal getActiveDocument
 * @oneLineEx const path = vsc.getActivegetActiveDocumentPath()
 * @see http://vsc-base.org/#getActivegetActiveDocumentPath
 * @returns string | undefined
 */
exports.getActiveDocumentPath = () => {
    const document = vsc.getActiveDocument();
    return (document && document.fileName) || undefined;
};
/**
 * Get current open file's content.
 * @dependencyInternal getActiveDocument
 * @oneLineEx const content = vsc.getActiveDocumentContent()
 * @see http://vsc-base.org/#getActiveDocumentContent
 * @returns string | undefined
 */
exports.getActiveDocumentContent = () => {
    const document = vsc.getActiveDocument();
    return (document && document.getText()) || undefined;
};
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
    const document = vsc.getActiveDocument();
    const editor = vsc.getActiveEditor();
    if (editor && document) {
        const fullRange = vsc.getFullDocumentRange(document);
        const snippetString = new vscode.SnippetString(content);
        yield editor.insertSnippet(snippetString, fullRange);
        return true;
    }
    return false;
});
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
    const document = vsc.getActiveDocument();
    const editor = vsc.getActiveEditor();
    if (document && editor) {
        yield vsc.appendToDocument(editor, document, content);
        return true;
    }
    return false;
});
/**
 * Append new line content in the end of the open document
 * @param content
 * @dependencyInternal appendToActiveDocument
 * @oneLineEx const success = await vsc.appendLineToActiveDocument(content)
 * @see http://vsc-base.org/#appendLineToActiveDocument
 * @returns Promise<boolean>
 */
exports.appendLineToActiveDocument = (content) => __awaiter(this, void 0, void 0, function* () {
    return yield vsc.appendToActiveDocument('\n' + content);
});
/**
 * Save active open file.
 * Return true for succes, and false if there was no open document
 * @dependencyInternal getActiveDocument
 * @oneLineEx const success = await vsc.saveActiveDocument(content)
 * @see http://vsc-base.org/#saveActiveDocument
 * @returns Promise<boolean>
 */
exports.saveActiveDocument = () => __awaiter(this, void 0, void 0, function* () {
    const doc = vsc.getActiveDocument();
    if (doc) {
        yield doc.save();
        return true;
    }
    return new Promise(resolve => {
        resolve(false);
    });
});
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
    rootPath = vsc.pathAsUnix(rootPath);
    return rootPath;
};
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
 * Show error message to user
 * @param message
 * @dependencyExternal vscode
 * @oneLineEx vsc.showErrorMessage(message)
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
 * @oneLineEx vsc.showMessage(message)
 * @see http://vsc-base.org/#showMessage
 * @returns Promise<void>
 */
exports.showMessage = (message) => __awaiter(this, void 0, void 0, function* () {
    yield vscode.window.showInformationMessage(message);
});
//# sourceMappingURL=vsc-base-vscode.js.map