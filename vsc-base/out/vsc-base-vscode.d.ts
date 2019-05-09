import * as vsc from './vsc-base';
import * as vscode from 'vscode';
/** vsc-base method
 * @description
 * Prompt user for a question
 * @see [ask](http://vsc-base.org/#ask)
 * @param question string
 * @param defaultValue string
 * @dependencyExternal vscode
 * @vscType Vscode
 * @oneLineEx const answer = await vsc.ask(question, defaultValue)
 * @ex const answer = await ask('Where to move file?', currentFilePath)
 * @returns Promise<string | undefined>
 */
export declare const ask: (question: string, defaultValue: string) => Promise<string | undefined>;
/** vsc-base method
 * @description
 * Prompt user for a question with a list of answers
 * @see [pick](http://vsc-base.org/#pick)
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
/** vsc-base method
 * @description
 * Get a list off all filePaths in project the matches a glob pattern
 * @see [findFilePaths](http://vsc-base.org/#findFilePaths)
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
/** vsc-base method
 * @description
 * Get a list off all filePaths from a basePath, in project the matches a glob pattern
 * @see [findFilePathsFromBase](http://vsc-base.org/#findFilePathsFromBase)
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
/** vsc-base method
 * @description
 * Find files based from a releative to a path
 * @see [findRelativeFilePaths](http://vsc-base.org/#findRelativeFilePaths)
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
/** vsc-base method
 * @description
 * Get vscode.window.activeTerminal
 * @see [getActiveTerminal](http://vsc-base.org/#getActiveTerminal)
 * @dependencyExternal vscode
 * @vscType Vscode
 * @oneLineEx const editor = vsc.getActiveTerminal()
 * @returns vscode.TextEditor | undefined
 */
export declare const getActiveTerminal: () => vscode.Terminal | undefined;
/** vsc-base method
 * @description
 * Write text to a terminal \
 * If addNewLine = true (it's the default value), the text written will be executed. \
 * This will also happen if the text contains newline feeds (\n or \r\n) \
 * **NOTE:** \
 * if you use this method in an extension the end user need to be able to actaully \
 * execute the command! \
 * This method is mostly design for vsc-script's, where you have control of the environment. \
 * See also [execFromPath](http://vsc-base.org/#execFromPath)
 * @see [writeToTerminal](http://vsc-base.org/#writeToTerminal)
 * @dependencyExternal vscode
 * @vscType Vscode
 * @oneLineEx const editor = vsc.writeToTerminal()
 * @returns vscode.TextEditor | undefined
 */
export declare const writeToTerminal: (content: string, showTerminal?: boolean, addNewLine?: boolean, terminal?: vscode.Terminal | undefined) => boolean;
/** vsc-base method
 * @description
 * Get vscode.window.activeTextEditor
 * @see [getActiveEditor](http://vsc-base.org/#getActiveEditor)
 * @dependencyExternal vscode
 * @vscType Vscode
 * @oneLineEx const editor = vsc.getActiveEditor()
 * @returns vscode.TextEditor | undefined
 */
export declare const getActiveEditor: () => vscode.TextEditor | undefined;
/** vsc-base method
 * @description
 * Get open vscode.TextDocument
 * @see [getActiveDocument](http://vsc-base.org/#getActiveDocument)
 * @dependencyExternal vscode
 * @vscType Vscode
 * @oneLineEx const document = vsc.getActiveDocument()
 * @returns vscode.TextDocument | undefined
 */
export declare const getActiveDocument: (editor?: vscode.TextEditor | undefined) => vscode.TextDocument | undefined;
/** vsc-base method
 * @description
 * Open a new document (untitled and not saved).
 * @see [newDocument](http://vsc-base.org/#newDocument)
 * @dependencyInternal getActiveDocument
 * @oneLineEx const path = vsc.newDocument(content)
 * @vscType Vscode
 * @returns Promise<vscode.TextDocument>
 */
export declare const newDocument: (content?: string | undefined, language?: string) => Promise<vscode.TextDocument>;
/** vsc-base method
 * @description
 * Get current open file path or undefined if nothing is open.
 * @see [getDocumentPath](http://vsc-base.org/#getDocumentPath)
 * @dependencyInternal getActiveDocument
 * @oneLineEx const path = vsc.getDocumentPath()
 * @vscType Vscode
 * @returns string | undefined
 */
export declare const getDocumentPath: (document?: vscode.TextDocument | undefined) => string | undefined;
/** vsc-base method
 * @description
 * Get current open file's content.
 * @see [getDocumentContent](http://vsc-base.org/#getDocumentContent)
 * @dependencyInternal getActiveDocument
 * @vscType Vscode
 * @oneLineEx const content = vsc.getDocumentContent()
 * @returns string | undefined
 */
export declare const getDocumentContent: (document?: vscode.TextDocument | undefined) => string | undefined;
/** vsc-base method
 * @description
 * Set current open file's content. \
 * Return true if success, and false if there was no active TextEditor or open Document.
 * @see [setDocumentContent](http://vsc-base.org/#setDocumentContent)
 * @param content
 * @param editor
 * @dependencyInternal insertAtRange
 * @dependencyExternal vscode
 * @vscType Vscode
 * @oneLineEx const success = await vsc.setDocumentContent(content)
 * @returns Promise<boolean>
 */
export declare const setDocumentContent: (content: string, editor?: vscode.TextEditor | undefined) => Promise<boolean>;
/** vsc-base method
 * @description
 * Get a vscode.Range for the entire document
 * @see [getFullDocumentRange](http://vsc-base.org/#getFullDocumentRange)
 * @param document
 * @dependencyExternal vscode
 * @vscType Vscode
 * @oneLineEx const fullRange = vsc.getFullDocumentRange(document)
 * @returns boolean
 */
export declare const getFullDocumentRange: (document: vscode.TextDocument) => vscode.Range;
/** vsc-base method
 * @description
 * Append new content in the end of the (open) document. \
 * Return true on success
 * @see [appendToDocument](http://vsc-base.org/#appendToDocument)
 * @param content
 * @param document
 * @param editor
 * @dependencyExternal vscode
 * @vscType Vscode
 * @oneLineEx await vsc.appendToDocument(editor, document, content)
 * @returns Promise<boolean>
 */
export declare const appendToDocument: (content: string, editor?: vscode.TextEditor | undefined) => Promise<boolean>;
/** vsc-base method
 * @description
 * Prepend new content in the end of the open document.
 * Return true on success, false if the document or textEditor was not open/correct
 * @see [prependToDocument](http://vsc-base.org/#prependToDocument)
 * @param content
 * @param editor
 * @dependencyExternal vscode
 * @vscType Vscode
 * @oneLineEx await vsc.prependToDocument(editor, document, content)
 * @returns Promise<boolean>
 */
export declare const prependToDocument: (content: string, editor?: vscode.TextEditor | undefined) => Promise<boolean>;
/** vsc-base method
 * @description
 * Insert content at vscode.Range
 * Return true on success, false if the document or textEditor was not open/correct
 * @see [insertAtRange](http://vsc-base.org/#insertAtRange)
 * @param content
 * @param range
 * @param editor
 * @dependencyExternal vscode
 * @vscType Vscode
 * @oneLineEx const success = await vsc.insertAtRange(content, range)
 * @returns Promise<boolean>
 */
export declare const insertAtRange: (content: string, range: vscode.Range, editor?: vscode.TextEditor | undefined) => Promise<boolean>;
/** vsc-base method
 * @description
 * Insert content at position (start and optional end postion)
 * Return true on success, false if the document or textEditor was not open/correct
 * @see [insertAt](http://vsc-base.org/#insertAt)
 * @param content
 * @param range
 * @param editor
 * @dependencyExternal vscode
 * @vscType Vscode
 * @oneLineEx const success = await vsc.insertAt(content, start, end)
 * @returns Promise<boolean>
 */
export declare const insertAt: (content: string, start: number, end?: number, editor?: vscode.TextEditor | undefined, trimSpaces?: boolean) => Promise<boolean>;
/** vsc-base method
 * @description
 * Append new line content in the end of the (open) document
 * @see [appendLineToDocument](http://vsc-base.org/#appendLineToDocument)
 * @param content
 * @param editor
 * @dependencyInternal appendToActiveDocument
 * @vscType Vscode
 * @oneLineEx const success = await vsc.appendLineToDocument(content)
 * @returns Promise<boolean>
 */
export declare const appendLineToDocument: (content: string, editor?: vscode.TextEditor | undefined) => Promise<boolean>;
/** vsc-base method
 * @description
 * Prepend new line content in the start of the (open) document
 * @see [prependLineToDocument](http://vsc-base.org/#prependLineToDocument)
 * @param content
 * @param document
 * @param editor
 * @vscType Vscode
 * @oneLineEx const success = await vsc.prependLineToDocument(content)
 * @returns Promise<boolean>
 */
export declare const prependLineToDocument: (content: string, editor?: vscode.TextEditor | undefined) => Promise<boolean>;
/** vsc-base method
 * @description
 * Save active open file. \
 * Return true for succes, and false if there was no open document
 * @see [saveDocument](http://vsc-base.org/#saveDocument)
 * @dependencyInternal getActiveDocument
 * @vscType Vscode
 * @oneLineEx const success = await vsc.saveDocument(content)
 * @returns Promise<boolean>
 */
export declare const saveDocument: (document?: vscode.TextDocument | undefined) => Promise<boolean>;
/** vsc-base method
 * @description
 * Takes a start and end and return vscode positons and range objects.
 * @see [createVscodeRangeAndPosition](http://vsc-base.org/#createVscodeRangeAndPosition)
 * @param range
 * @param editor
 * @vscType Vscode
 * @oneLineEx const success = vsc.createVscodeRangeAndPosition(source, start, end)
 * @returns boolean
 */
export declare const createVscodeRangeAndPosition: (source: string, start: number, end?: number, trimSpaces?: boolean) => vsc.VscodePosition;
export declare type VscodePosition = {
    start: number;
    end: number;
    startLineNumber: number;
    endLineNumber: number;
    startPosition: vscode.Position;
    endPosition: vscode.Position;
    range: vscode.Range;
};
/** vsc-base method
 * @description
 * Create a vscode.Selection \
 * @see [createSelection](http://vsc-base.org/#createSelection)
 * @param range
 * @param editor
 * @vscType Vscode
 * @oneLineEx const selection = vsc.createSelection(start, end)
 * @returns vscode.Selection
 */
export declare const createSelection: (source: string, start: number, end?: number, trimSpaces?: boolean) => vscode.Selection;
/** vsc-base method
 * @description
 * Set Selection for an TextEditor (Current document) \
 * Clear other selections. \
 * returns true on success
 * @see [setSelection](http://vsc-base.org/#setSelection)
 * @param range
 * @param editor
 * @vscType Vscode
 * @oneLineEx const success = vsc.setSelection(start, end)
 * @returns boolean
 */
export declare const setSelection: (start: number, end?: number, editor?: vscode.TextEditor | undefined) => boolean;
/** vsc-base method
 * @description
 * Set Selections for an TextEditor (Current document) \
 * Takes a ranges array postions with start and end.
 * Clear other selections. \
 * returns true on success
 * @see [setSelections](http://vsc-base.org/#setSelections)
 * @param range
 * @param editor
 * @vscType Vscode
 * @oneLineEx const success = vsc.setSelections(ranges)
 * @returns boolean
 */
export declare const setSelections: (ranges: {
    start: number;
    end: number;
}[], editor?: vscode.TextEditor | undefined) => boolean;
/** vsc-base method
 * @description
 * Add a Selection for an TextEditor (Current document) \
 * returns true on success
 * @see [addSelection](http://vsc-base.org/#addSelection)
 * @vscType Vscode
 * @oneLineEx const success = vsc.addSelection(range)
 * @returns boolean
 */
export declare const addSelection: (start: number, end?: number, editor?: vscode.TextEditor | undefined) => boolean;
/** vsc-base method
 * @description
 * Set Selection for an TextEditor (Current document) \
 * Clear other selections \
 * returns true on success
 * @see [setSelectionFromRange](http://vsc-base.org/#setSelectionFromRange)
 * @param range
 * @param editor
 * @vscType Vscode
 * @oneLineEx const success = vsc.setSelectionFromRange(range)
 * @returns boolean
 */
export declare const setSelectionFromRange: (range: vscode.Range, editor?: vscode.TextEditor | undefined) => boolean;
/** vsc-base method
 * @description
 * Set Selections for an TextEditor (Current document) \
 * Clear other selections \
 * returns true on success
 * @see [setSelectionsFromRanges](http://vsc-base.org/#setSelectionsFromRanges)
 * @param range
 * @param editor
 * @vscType Vscode
 * @oneLineEx const success = vsc.setSelectionsFromRanges(ranges)
 * @returns boolean
 */
export declare const setSelectionsFromRanges: (range: vscode.Range[], editor?: vscode.TextEditor | undefined) => boolean;
/** vsc-base method
 * @description
 * Add a Selection for an TextEditor (Current document) \
 * returns true on success
 * @see [addSelectionFromRange](http://vsc-base.org/#addSelectionFromRange)
 * @param range
 * @param editor
 * @vscType Vscode
 * @oneLineEx const success = vsc.addSelectionFromRange(range)
 * @returns boolean
 */
export declare const addSelectionFromRange: (range: vscode.Range, editor?: vscode.TextEditor | undefined) => boolean;
/** vsc-base method
 * @description
 * Get project root for a path or undefined if no project was found.
 * @see [getRootPath](http://vsc-base.org/#getRootPath)
 * @param path
 * @dependencyExternal vscode
 * @dependencyInternal pathAsUnix
 * @vscType Vscode
 * @oneLineEx const rootPath = vsc.getRootPath()
 * @returns string | undefined
 */
export declare const getRootPath: (path: string) => string | undefined;
/** vsc-base method
 * @description
 * Save All files
 * @see [saveAll](http://vsc-base.org/#saveAll)
 * @dependencyExternal vscode
 * @vscType Vscode
 * @oneLineEx await vsc.saveAll()
 * @returns Promise<void>
 */
export declare const saveAll: () => Promise<void>;
/** vsc-base method
 * @description
 * Show error message to user
 * @see [showErrorMessage](http://vsc-base.org/#showErrorMessage)
 * @param message
 * @dependencyExternal vscode
 * @vscType Vscode
 * @oneLineEx vsc.showErrorMessage(message)
 * @returns Promise<void>
 */
export declare const showErrorMessage: (message: string) => Promise<void>;
/** vsc-base method
 * @description
 * Show message to user
 * @see [showMessage](http://vsc-base.org/#showMessage)
 * @param message
 * @dependencyExternal vscode
 * @vscType Vscode
 * @oneLineEx vsc.showMessage(message)
 * @returns Promise<void>
 */
export declare const showMessage: (message: string) => Promise<void>;
