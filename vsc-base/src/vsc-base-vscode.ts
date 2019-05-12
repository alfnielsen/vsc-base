import * as vscode from 'vscode'
import * as vsc from './vsc-base'

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
export const ask = async (
   question: string,
   defaultValue: string
): Promise<string | undefined> =>
   await vscode.window.showInputBox({
      prompt: question,
      value: defaultValue
   })

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
export const pick = async (answerList: string[]): Promise<string | undefined> =>
   await vscode.window.showQuickPick(answerList)

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
export const findFilePaths = async (
   include: vscode.GlobPattern = '**/*.{js,jsx,ts,tsx}',
   exclude: vscode.GlobPattern = '**/node_modules/**',
   maxResults: number = 100000
): Promise<string[]> => {
   const uriFiles = await vscode.workspace.findFiles(
      include,
      exclude,
      maxResults
   )
   const files = uriFiles.map((uri: vscode.Uri) => vsc.pathAsUnix(uri.fsPath))
   return files
}

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
export const findFilePathsFromBase = async (
   basePath: string,
   includePattern: string = '**/*.{js,jsx,ts,tsx}',
   exclude: vscode.GlobPattern = '**/node_modules/**',
   maxResults: number = 100000
): Promise<string[]> => {
   let baseDir = vsc.getDir(basePath)
   const include = new vscode.RelativePattern(baseDir, includePattern)
   const filePaths = await vsc.findFilePaths(include, exclude, maxResults)
   return filePaths
}

/** vsc-base method
 * @description 
 * Find files based from a relative to a path
 * @see [findRelativeFilePaths](http://vsc-base.org/#findRelativeFilePaths)
 * @param path
 * @param relativePath
 * @param includePattern
 * @param exclude
 * @param maxResults
 * @dependencyExternal vscode
 * @dependencyInternal getDir, joinPath, cleanPath, trimDashes, findFilePathsFromBase
 * @vscType Vscode
 * @oneLineEx const files = await vsc.findRelativeFilePaths(path, relativePath, includePattern)
 * @ex 
const moduleFileInParentFolder = await vsc.findRelativeFilePaths(path, '../', '*Module.ts')
if(moduleFileInParentFolder.length===0){
   vsc.showErrorMessage('Module file was not found in parent folder')
   return
}
if(moduleFileInParentFolder.length>1){
   vsc.showErrorMessage('More than one Module file was found in parent folder')
   return
}
const modulePath = moduleFileInParentFolder[0];
// Do something with modulePath..
 * @returns Promise<string[]>
 */
export const findRelativeFilePaths = async (
   path: string,
   relativePath: string,
   includePattern: string = '**/*.{js,jsx,ts,tsx}',
   exclude: vscode.GlobPattern = '**/node_modules/**',
   maxResults: number = 100000
): Promise<string[]> => {
   const dir = vsc.getDir(path)
   const joinPath = vsc.joinPaths(dir, relativePath)
   let base = vsc.cleanPath(joinPath + '/')
   base = vsc.trimDashes(base)
   const filePaths = await findFilePathsFromBase(
      base,
      includePattern,
      exclude,
      maxResults
   )
   return filePaths
}

/** vsc-base method
 * @description 
 * Get vscode.window.activeTerminal
 * @see [getActiveTerminal](http://vsc-base.org/#getActiveTerminal)
 * @dependencyExternal vscode
 * @vscType Vscode
 * @oneLineEx const editor = vsc.getActiveTerminal()
 * @returns vscode.TextEditor | undefined
 */
export const getActiveTerminal = (): vscode.Terminal | undefined => {
   return vscode.window.activeTerminal
}

/** vsc-base method
 * @description 
 * Write text to a terminal \
 * If addNewLine = true (it's the default value), the text written will be executed. \
 * This will also happen if the text contains newline feeds (\n or \r\n) \
 * **NOTE:** \
 * if you use this method in an extension the end user need to be able to actually \
 * execute the command! \
 * This method is mostly design for vsc-script's, where you have control of the environment. \
 * See also [execFromPath](http://vsc-base.org/#execFromPath)
 * @see [writeToTerminal](http://vsc-base.org/#writeToTerminal)
 * @dependencyExternal vscode
 * @vscType Vscode
 * @oneLineEx const editor = vsc.writeToTerminal()
 * @returns vscode.TextEditor | undefined
 */
export const writeToTerminal = (
   content: string,
   showTerminal = true,
   addNewLine = true,
   terminal?: vscode.Terminal
): boolean => {
   if (!terminal) {
      terminal = vsc.getActiveTerminal();
   }
   if (!terminal) {
      return false
   }
   terminal.sendText(content, addNewLine);
   if (showTerminal) {
      terminal.show();
   }
   return true
}



/** vsc-base method
 * @description 
 * Get vscode.window.activeTextEditor
 * @see [getActiveEditor](http://vsc-base.org/#getActiveEditor)
 * @dependencyExternal vscode
 * @vscType Vscode
 * @oneLineEx const editor = vsc.getActiveEditor()
 * @returns vscode.TextEditor | undefined
 */
export const getActiveEditor = (): vscode.TextEditor | undefined => {
   return vscode.window.activeTextEditor
}


/** vsc-base method
 * @description 
 * Get open vscode.TextDocument
 * @see [getActiveDocument](http://vsc-base.org/#getActiveDocument)
 * @dependencyExternal vscode
 * @vscType Vscode
 * @oneLineEx const document = vsc.getActiveDocument()
 * @returns vscode.TextDocument | undefined
 */
export const getActiveDocument = (
   editor?: vscode.TextEditor
): vscode.TextDocument | undefined => {
   if (!editor) {
      editor = vsc.getActiveEditor()
   }
   const document = editor && editor.document
   return document
}



/** vsc-base method
 * @description 
 * Open a new document (untitled and not saved).
 * @see [newDocument](http://vsc-base.org/#newDocument)
 * @dependencyInternal getActiveDocument
 * @oneLineEx const path = vsc.newDocument(content)
 * @vscType Vscode
 * @returns Promise<vscode.TextDocument> 
 */
export const newDocument = async (
   content?: string,
   language: string = 'typescript'
): Promise<vscode.TextDocument> => {
   const document = await vscode.workspace.openTextDocument({ language, content })
   await vscode.window.showTextDocument(document)
   return document
}


/** vsc-base method
 * @description 
 * Get current open file path or undefined if nothing is open.
 * @see [getDocumentPath](http://vsc-base.org/#getDocumentPath)
 * @dependencyInternal getActiveDocument
 * @oneLineEx const path = vsc.getDocumentPath()
 * @vscType Vscode
 * @returns string | undefined
 */
export const getDocumentPath = (
   document?: vscode.TextDocument
): string | undefined => {
   if (!document) {
      document = vsc.getActiveDocument()
   }
   return (document && document.fileName) || undefined
}

/** vsc-base method
 * @description 
 * Get current open file's content.
 * @see [getDocumentContent](http://vsc-base.org/#getDocumentContent)
 * @dependencyInternal getActiveDocument
 * @vscType Vscode
 * @oneLineEx const content = vsc.getDocumentContent()
 * @returns string | undefined
 */
export const getDocumentContent = (
   document?: vscode.TextDocument
): string | undefined => {
   if (!document) {
      document = vsc.getActiveDocument()
   }
   return (document && document.getText()) || undefined
}

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
export const setDocumentContent = async (
   content: string,
   editor?: vscode.TextEditor,
): Promise<boolean> => {
   if (editor === undefined) {
      editor = vsc.getActiveEditor()
   }
   if (editor === undefined) {
      return Promise.resolve(false)
   }
   const fullRange = vsc.getFullDocumentRange(editor.document)
   return await insertAtRange(content, fullRange, editor);
}

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
export const getFullDocumentRange = (
   document: vscode.TextDocument
): vscode.Range => {
   const startPosition = new vscode.Position(0, 0)
   const endPosition = new vscode.Position(document.lineCount, 0)
   const fullRange = new vscode.Range(startPosition, endPosition)
   return fullRange
}

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
export const appendToDocument = async (
   content: string,
   editor?: vscode.TextEditor
): Promise<boolean> => {
   if (!editor) {
      editor = vsc.getActiveEditor()
   }
   if (!editor) {
      return Promise.resolve(false)
   }
   const startPosition = new vscode.Position(editor.document.lineCount, 0)
   const endPosition = new vscode.Position(editor.document.lineCount, 0)
   const fullRange = new vscode.Range(startPosition, endPosition)
   return await insertAtRange(content, fullRange, editor);
}


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
export const prependToDocument = async (
   content: string,
   editor?: vscode.TextEditor
): Promise<boolean> => {
   const startPosition = new vscode.Position(0, 0)
   const endPosition = new vscode.Position(0, 0)
   const startRange = new vscode.Range(startPosition, endPosition)
   return await insertAtRange(content, startRange, editor);
}



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
export const insertAtRange = async (
   content: string,
   range: vscode.Range,
   editor?: vscode.TextEditor,
): Promise<boolean> => {
   if (editor === undefined) {
      editor = vsc.getActiveEditor()
   }
   if (editor === undefined) {
      return Promise.resolve(false)
   }
   const snippetString = new vscode.SnippetString(content)
   await editor.insertSnippet(snippetString, range)
   return true
}

/** vsc-base method
 * @description 
 * Insert content at position (start and optional end position)
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
export const insertAt = async (
   content: string,
   start: number,
   end: number = start,
   editor?: vscode.TextEditor,
   trimSpaces = false
): Promise<boolean> => {
   if (editor === undefined) {
      editor = vsc.getActiveEditor()
   }
   if (editor === undefined) {
      return Promise.resolve(false)
   }
   const source = editor.document.getText();
   const pos = vsc.createVscodeRangeAndPosition(source, start, end, trimSpaces)
   const snippetString = new vscode.SnippetString(content)
   await editor.insertSnippet(snippetString, pos.range)
   return true
}

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
export const appendLineToDocument = async (
   content: string,
   editor?: vscode.TextEditor
): Promise<boolean> => {
   return await vsc.appendToDocument('\n' + content, editor)
}



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
export const prependLineToDocument = async (
   content: string,
   editor?: vscode.TextEditor
): Promise<boolean> => {
   return await vsc.prependToDocument(content + '\n', editor)
}

/** vsc-base method
 * @description 
 * Save active open file. \
 * Return true for success, and false if there was no open document
 * @see [saveDocument](http://vsc-base.org/#saveDocument)
 * @dependencyInternal getActiveDocument
 * @vscType Vscode
 * @oneLineEx const success = await vsc.saveDocument(content)
 * @returns Promise<boolean>
 */
export const saveDocument = async (
   document?: vscode.TextDocument,
): Promise<boolean> => {
   if (!document) {
      document = vsc.getActiveDocument()
   }
   if (document) {
      await document.save()
      return true
   }
   return Promise.resolve(false)
}



/** vsc-base method
 * @description 
 * Takes a start and end and return vscode positions and range objects.
 * @see [createVscodeRangeAndPosition](http://vsc-base.org/#createVscodeRangeAndPosition)
 * @param range
 * @param editor
 * @vscType Vscode
 * @oneLineEx const success = vsc.createVscodeRangeAndPosition(source, start, end)
 * @returns boolean
 */
export const createVscodeRangeAndPosition = (source: string, start: number, end: number = start, trimSpaces = true): vsc.VscodePosition => {
   if (trimSpaces) {
      const found = source.substring(start, end)
      const startSpaces = found.match(/^\s+/)
      if (startSpaces) {
         start += startSpaces[0].length;
      }
      const endSpaces = found.match(/\s+$/)
      if (endSpaces) {
         end -= endSpaces[0].length;
      }
   }
   const startLines = source.substr(0, start).split("\n");
   const endLines = source.substr(0, end).split("\n");
   const startLineNumber = startLines.length - 1
   const endLineNumber = endLines.length - 1
   const startPosition = new vscode.Position(startLineNumber, startLines[startLines.length - 1].length);
   const endPosition = new vscode.Position(endLineNumber, endLines[endLines.length - 1].length);
   const range = new vscode.Range(startPosition, endPosition);
   return {
      start,
      end,
      startLineNumber,
      endLineNumber,
      startPosition,
      endPosition,
      range,
   }
}
export type VscodePosition = { start: number, end: number, startLineNumber: number, endLineNumber: number, startPosition: vscode.Position, endPosition: vscode.Position, range: vscode.Range }



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
export const createSelection = (
   source: string,
   start: number,
   end: number = start,
   trimSpaces = true
): vscode.Selection => {
   const complexRangeObject = vsc.createVscodeRangeAndPosition(source, start, end, trimSpaces)
   const selection = new vscode.Selection(complexRangeObject.startPosition, complexRangeObject.endPosition)
   return selection
}


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
export const setSelection = (
   start: number,
   end: number = start,
   editor?: vscode.TextEditor,
): boolean => {
   if (!editor) {
      editor = vsc.getActiveEditor()
   }
   if (!editor) {
      return false;
   }
   const source = editor.document.getText()
   const selection = vsc.createSelection(source, start, end)
   editor.selections = [] // clear selections
   editor.selection = selection
   return true
}

/** vsc-base method
 * @description 
 * Set Selections for an TextEditor (Current document) \
 * Takes a ranges array positions with start and end.
 * Clear other selections. \
 * returns true on success
 * @see [setSelections](http://vsc-base.org/#setSelections)
 * @param range
 * @param editor
 * @vscType Vscode
 * @oneLineEx const success = vsc.setSelections(ranges)
 * @returns boolean
 */
export const setSelections = (
   ranges: { start: number, end: number }[],
   editor?: vscode.TextEditor,
): boolean => {
   if (!editor) {
      editor = vsc.getActiveEditor()
   }
   if (!editor) {
      return false;
   }
   const source = editor.document.getText()
   editor.selections = ranges.map((range) => vsc.createSelection(source, range.start, range.end))
   return true
}


/** vsc-base method
 * @description 
 * Add a Selection for an TextEditor (Current document) \
 * returns true on success
 * @see [addSelection](http://vsc-base.org/#addSelection)
 * @vscType Vscode
 * @oneLineEx const success = vsc.addSelection(range)
 * @returns boolean
 */
export const addSelection = (
   start: number,
   end: number = start,
   editor?: vscode.TextEditor,
): boolean => {
   if (!editor) {
      editor = vsc.getActiveEditor()
   }
   if (!editor) {
      return false;
   }
   const source = editor.document.getText()
   const selection = vsc.createSelection(source, start, end)
   editor.selections = [selection, ...editor.selections]
   //editor.selections.push(selection)
   return true
}



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
export const setSelectionFromRange = (
   range: vscode.Range,
   editor?: vscode.TextEditor,
): boolean => {
   if (!editor) {
      editor = vsc.getActiveEditor()
   }
   if (!editor) {
      return false;
   }
   editor.selections = [] // clear selections
   editor.selection = new vscode.Selection(range.start, range.end)
   return true
}

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
export const setSelectionsFromRanges = (
   range: vscode.Range[],
   editor?: vscode.TextEditor,
): boolean => {
   if (!editor) {
      editor = vsc.getActiveEditor()
   }
   if (!editor) {
      return false;
   }
   editor.selections = range.map(range => new vscode.Selection(range.start, range.end))
   return true
}

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
export const addSelectionFromRange = (
   range: vscode.Range,
   editor?: vscode.TextEditor,
): boolean => {
   if (!editor) {
      editor = vsc.getActiveEditor()
   }
   if (!editor) {
      return false;
   }
   editor.selections = [new vscode.Selection(range.start, range.end), ...editor.selections]
   return true
}


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
export const getRootPath = (path: string): string | undefined => {
   const uri = vscode.Uri.file(path)
   const workspaceFolder = vscode.workspace.getWorkspaceFolder(uri)
   if (!workspaceFolder) {
      return undefined
   }
   let rootPath = workspaceFolder.uri.fsPath
   rootPath = vsc.pathAsUnix(rootPath)
   return rootPath
}

/** vsc-base method
 * @description 
 * Save All files
 * @see [saveAll](http://vsc-base.org/#saveAll)
 * @dependencyExternal vscode
 * @vscType Vscode
 * @oneLineEx await vsc.saveAll()
 * @returns Promise<void>
 */
export const saveAll = async (): Promise<void> => {
   await vscode.workspace.saveAll(false)
}

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
export const showErrorMessage = async (message: string): Promise<void> => {
   await vscode.window.showErrorMessage(message)
}

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
export const showMessage = async (message: string): Promise<void> => {
   await vscode.window.showInformationMessage(message)
}
