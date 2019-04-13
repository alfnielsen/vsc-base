import * as vscode from 'vscode';
/**
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
export declare const ask: (question: string, defaultValue: string) => Promise<string | undefined>;
/**
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
export declare const pick: (answerList: string[]) => Promise<string | undefined>;
/**
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
export declare const findFilePaths: (include?: vscode.GlobPattern, exclude?: vscode.GlobPattern, maxResults?: number) => Promise<string[]>;
/**
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
export declare const findFilePathsFromBase: (basePath: string, includePattern?: string, exclude?: vscode.GlobPattern, maxResults?: number) => Promise<string[]>;
/**
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
export declare const findRelativeFilePaths: (path: string, relativePath: string, includePattern?: string, exclude?: vscode.GlobPattern, maxResults?: number) => Promise<string[]>;
/**
 * @description
 * Get vscode.activeTextEditor
 * @see http://vsc-base.org/#getActiveEditor
 * @dependencyExternal vscode
 * @vscType Vscode
 * @oneLineEx const editor = vsc.getActiveEditor()
 * @returns vscode.TextEditor | undefined
 */
export declare const getActiveEditor: () => vscode.TextEditor | undefined;
/**
 * @description
 * Get open vscode.TextDocument
 * @see http://vsc-base.org/#getActiveDocument
 * @dependencyExternal vscode
 * @vscType Vscode
 * @oneLineEx const document = vsc.getActiveDocument()
 * @returns vscode.TextDocument | undefined
 */
export declare const getActiveDocument: () => vscode.TextDocument | undefined;
/**
 * @description
 * Get current open file path or undefined if nothing is open.
 * @see http://vsc-base.org/#getActivegetActiveDocumentPath
 * @dependencyInternal getActiveDocument
 * @oneLineEx const path = vsc.getActivegetActiveDocumentPath()
 * @vscType Vscode
 * @returns string | undefined
 */
export declare const getActiveDocumentPath: () => string | undefined;
/**
 * @description
 * Get current open file's content.
 * @see http://vsc-base.org/#getActiveDocumentContent
 * @dependencyInternal getActiveDocument
 * @vscType Vscode
 * @oneLineEx const content = vsc.getActiveDocumentContent()
 * @returns string | undefined
 */
export declare const getActiveDocumentContent: () => string | undefined;
/**
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
export declare const setActiveDocumentContent: (content: string) => Promise<boolean>;
/**
 * @description
 * Get a vscodeRange for the entire document
 * @see http://vsc-base.org/#getFullDocumentRange
 * @param document
 * @dependencyExternal vscode
 * @vscType Vscode
 * @oneLineEx const fullRange = vsc.getFullDocumentRange(document)
 * @returns boolean
 */
export declare const getFullDocumentRange: (document: vscode.TextDocument) => vscode.Range;
/**
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
export declare const appendToDocument: (editor: vscode.TextEditor, document: vscode.TextDocument, content: string) => Promise<void>;
/**
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
export declare const appendToActiveDocument: (content: string) => Promise<boolean>;
/**
 * @description
 * Append new line content in the end of the open document
 * @see http://vsc-base.org/#appendLineToActiveDocument
 * @param content
 * @dependencyInternal appendToActiveDocument
 * @vscType Vscode
 * @oneLineEx const success = await vsc.appendLineToActiveDocument(content)
 * @returns Promise<boolean>
 */
export declare const appendLineToActiveDocument: (content: string) => Promise<boolean>;
/**
 * @description
 * Save active open file. \
 * Return true for succes, and false if there was no open document
 * @see http://vsc-base.org/#saveActiveDocument
 * @dependencyInternal getActiveDocument
 * @vscType Vscode
 * @oneLineEx const success = await vsc.saveActiveDocument(content)
 * @returns Promise<boolean>
 */
export declare const saveActiveDocument: () => Promise<boolean>;
/**
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
export declare const getRootPath: (path: string) => string | undefined;
/**
 * @description
 * Save All files
 * @see http://vsc-base.org/#saveAll
 * @dependencyExternal vscode
 * @vscType Vscode
 * @oneLineEx await vsc.saveAll()
 * @returns Promise<void>
 */
export declare const saveAll: () => Promise<void>;
/**
 * @description
 * Show error message to user
 * @see http://vsc-base.org/#showErrorMessage
 * @param message
 * @dependencyExternal vscode
 * @vscType Vscode
 * @oneLineEx vsc.showErrorMessage(message)
 * @returns Promise<void>
 */
export declare const showErrorMessage: (message: string) => Promise<void>;
/**
 * @description
 * Show message to user
 * @see http://vsc-base.org/#showMessage
 * @param message
 * @dependencyExternal vscode
 * @vscType Vscode
 * @oneLineEx vsc.showMessage(message)
 * @returns Promise<void>
 */
export declare const showMessage: (message: string) => Promise<void>;
