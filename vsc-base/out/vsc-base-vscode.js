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
/** vsc-base method
 * @description
 * Prompt user for a question
 * @see http://vsc-base.org/#ask
 * @param question string
 * @param defaultValue string
 * @dependencyExternal vscode
 * @vscType Vscode
 * @oneLineEx const answer = await vsc.ask(question, defaultValue)
 * @ex const answer = await ask('Where to move file?', currentFilePath)
 * @returns Promise<string | undefined>
 */
exports.ask = (question, defaultValue) => __awaiter(this, void 0, void 0, function* () {
    return yield vscode.window.showInputBox({
        prompt: question,
        value: defaultValue
    });
});
/** vsc-base method
 * @description
 * Prompt user for a question with a list of answers
 * @see http://vsc-base.org/#pick
 * @param path string[]
 * @dependencyExternal vscode
 * @vscType Vscode
 * @oneLineEx const answer = await vsc.pick(answers)
 * @ex
 const list = ['yes', 'no']
 const answer = await vsc.pick(list)
 * @returns Promise<string | undefined>
 */
exports.pick = (answerList) => __awaiter(this, void 0, void 0, function* () { return yield vscode.window.showQuickPick(answerList); });
/** vsc-base method
 * @description
 * Get a list off all filePaths in project the matches a glob pattern
 * @see http://vsc-base.org/#findFilePaths
 * @param include glob
 * @param exclude glob
 * @param maxResults
 * @dependencyExternal vscode
 * @dependencyInternal pathAsUnix
 * @vscType Vscode
 * @oneLineEx const files = await vsc.findFilePaths(includePattern)
 * @ex
const allTestFiles = await vsc.findFilePaths('**\/*.test.{ts,jsx,ts,tsx}')
for (const filePath of allTestFiles){
   const source = await vsc.getFileContent()
   // do something with the files...
}
 * @returns Promise<string[]>
 */
exports.findFilePaths = (include = '**/*.{js,jsx,ts,tsx}', exclude = '**/node_modules/**', maxResults = 100000) => __awaiter(this, void 0, void 0, function* () {
    const uriFiles = yield vscode.workspace.findFiles(include, exclude, maxResults);
    const files = uriFiles.map((uri) => vsc.pathAsUnix(uri.fsPath));
    return files;
});
/** vsc-base method
 * @description
 * Get a list off all filePaths from a basePath, in project the matches a glob pattern
 * @see http://vsc-base.org/#findFilePathsFromBase
 * @param include glob
 * @param exclude glob
 * @dependencyExternal vscode
 * @dependencyInternal getDir, findFilePaths
 * @param maxResults
 * @vscType Vscode
 * @oneLineEx const files = await vsc.findFilePathsFromBase(dir, includePattern)
 * @ex
const storyFilesInModule1 = await vsc.findFilePathsFromBase('c:/root/src/module1', '*.story.{ts,tsx}')
for (const filePath of storyFilesInModule1){
   const source = await vsc.getFileContent()
   // Do something with filePath..
}
 * @returns Promise<string[]>
 */
exports.findFilePathsFromBase = (basePath, includePattern = '**/*.{js,jsx,ts,tsx}', exclude = '**/node_modules/**', maxResults = 100000) => __awaiter(this, void 0, void 0, function* () {
    let baseDir = vsc.getDir(basePath);
    const include = new vscode.RelativePattern(baseDir, includePattern);
    const filePaths = yield vsc.findFilePaths(include, exclude, maxResults);
    return filePaths;
});
/** vsc-base method
 * @description
 * Find files based from a releative to a path
 * @see http://vsc-base.org/#findRelativeFilePaths
 * @param path
 * @param relativePath
 * @param includePattern
 * @param exclude
 * @param maxResults
 * @dependencyExternal vscode
 * @dependencyInternal getDir, joinPath, cleanPath, trimDases, findFilePathsFromBase
 * @vscType Vscode
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
/** vsc-base method
 * @description
 * Get vscode.activeTextEditor
 * @see http://vsc-base.org/#getActiveEditor
 * @dependencyExternal vscode
 * @vscType Vscode
 * @oneLineEx const editor = vsc.getActiveEditor()
 * @returns vscode.TextEditor | undefined
 */
exports.getActiveEditor = () => {
    return vscode.window.activeTextEditor;
};
/** vsc-base method
 * @description
 * Get open vscode.TextDocument
 * @see http://vsc-base.org/#getActiveDocument
 * @dependencyExternal vscode
 * @vscType Vscode
 * @oneLineEx const document = vsc.getActiveDocument()
 * @returns vscode.TextDocument | undefined
 */
exports.getActiveDocument = () => {
    const activeEditor = vsc.getActiveEditor();
    const document = activeEditor && activeEditor.document;
    return document;
};
/** vsc-base method
 * @description
 * Get current open file path or undefined if nothing is open.
 * @see http://vsc-base.org/#getActivegetActiveDocumentPath
 * @dependencyInternal getActiveDocument
 * @oneLineEx const path = vsc.getActivegetActiveDocumentPath()
 * @vscType Vscode
 * @returns string | undefined
 */
exports.getActiveDocumentPath = () => {
    const document = vsc.getActiveDocument();
    return (document && document.fileName) || undefined;
};
/** vsc-base method
 * @description
 * Get current open file's content.
 * @see http://vsc-base.org/#getActiveDocumentContent
 * @dependencyInternal getActiveDocument
 * @vscType Vscode
 * @oneLineEx const content = vsc.getActiveDocumentContent()
 * @returns string | undefined
 */
exports.getActiveDocumentContent = () => {
    const document = vsc.getActiveDocument();
    return (document && document.getText()) || undefined;
};
/** vsc-base method
 * @description
 * Set current open file's content. \
 * Return true if success, and false if there was no ActiveTextEditor or OpenDocument.
 * @see http://vsc-base.org/#setActiveDocumentContent
 * @param content
 * @dependencyInternal getActiveDocument, getActiveEditor
 * @dependencyExternal vscode
 * @vscType Vscode
 * @oneLineEx const success = await vsc.setActiveDocumentContent(content)
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
/** vsc-base method
 * @description
 * Get a vscodeRange for the entire document
 * @see http://vsc-base.org/#getFullDocumentRange
 * @param document
 * @dependencyExternal vscode
 * @vscType Vscode
 * @oneLineEx const fullRange = vsc.getFullDocumentRange(document)
 * @returns boolean
 */
exports.getFullDocumentRange = (document) => {
    const startPosition = new vscode.Position(0, 0);
    const endPosition = new vscode.Position(document.lineCount, 0);
    const fullRange = new vscode.Range(startPosition, endPosition);
    return fullRange;
};
/** vsc-base method
 * @description
 * Append new content in the end of the open document
 * @see http://vsc-base.org/#appendToDocument
 * @param editor
 * @param document
 * @param content
 * @dependencyExternal vscode
 * @vscType Vscode
 * @oneLineEx await vsc.appendToDocument(editor, document, content)
 * @returns Promise<void>
 */
exports.appendToDocument = (editor, document, content) => __awaiter(this, void 0, void 0, function* () {
    const startPosition = new vscode.Position(document.lineCount, 0);
    const endPosition = new vscode.Position(document.lineCount, 0);
    const fullRange = new vscode.Range(startPosition, endPosition);
    const snippetString = new vscode.SnippetString(content);
    yield editor.insertSnippet(snippetString, fullRange);
});
/** vsc-base method
 * @description
 * Append new content in the end of the open document. \
 * Return true for succes, and false if there was no active editor or open document
 * @see http://vsc-base.org/#appendToActiveDocument
 * @param content
 * @dependencyInternal getActiveDocument, getActiveEditor
 * @dependencyExternal vscode
 * @vscType Vscode
 * @oneLineEx const success = await vsc.appendToActiveDocument(content)
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
/** vsc-base method
 * @description
 * Append new line content in the end of the open document
 * @see http://vsc-base.org/#appendLineToActiveDocument
 * @param content
 * @dependencyInternal appendToActiveDocument
 * @vscType Vscode
 * @oneLineEx const success = await vsc.appendLineToActiveDocument(content)
 * @returns Promise<boolean>
 */
exports.appendLineToActiveDocument = (content) => __awaiter(this, void 0, void 0, function* () {
    return yield vsc.appendToActiveDocument('\n' + content);
});
/** vsc-base method
 * @description
 * Save active open file. \
 * Return true for succes, and false if there was no open document
 * @see http://vsc-base.org/#saveActiveDocument
 * @dependencyInternal getActiveDocument
 * @vscType Vscode
 * @oneLineEx const success = await vsc.saveActiveDocument(content)
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
/** vsc-base method
 * @description
 * Get project root for a path or undefined if no project was found.
 * @see http://vsc-base.org/#getRootPath
 * @param path
 * @dependencyExternal vscode
 * @dependencyInternal pathAsUnix
 * @vscType Vscode
 * @oneLineEx const rootPath = vsc.getRootPath()
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
/** vsc-base method
 * @description
 * Save All files
 * @see http://vsc-base.org/#saveAll
 * @dependencyExternal vscode
 * @vscType Vscode
 * @oneLineEx await vsc.saveAll()
 * @returns Promise<void>
 */
exports.saveAll = () => __awaiter(this, void 0, void 0, function* () {
    yield vscode.workspace.saveAll(false);
});
/** vsc-base method
 * @description
 * Show error message to user
 * @see http://vsc-base.org/#showErrorMessage
 * @param message
 * @dependencyExternal vscode
 * @vscType Vscode
 * @oneLineEx vsc.showErrorMessage(message)
 * @returns Promise<void>
 */
exports.showErrorMessage = (message) => __awaiter(this, void 0, void 0, function* () {
    yield vscode.window.showErrorMessage(message);
});
/** vsc-base method
 * @description
 * Show message to user
 * @see http://vsc-base.org/#showMessage
 * @param message
 * @dependencyExternal vscode
 * @vscType Vscode
 * @oneLineEx vsc.showMessage(message)
 * @returns Promise<void>
 */
exports.showMessage = (message) => __awaiter(this, void 0, void 0, function* () {
    yield vscode.window.showInformationMessage(message);
});
//# sourceMappingURL=vsc-base-vscode.js.map