import * as vscode from 'vscode'
import { pathAsUnix, joinPaths, cleanPath, trimDashes } from './vsc-base-raw'
import { getDir } from './vsc-base-system'

/**
 * Prompt user for a question
 * @param path
 * @dependencyExternal vscode
 * @oneLineEx const answer = await ask(question, defaultValue)
 * @ex const answer = await ask('Where to move file?', currentFilePath)
 * @see http://vsc-base.org/#ask
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

/**
 * Prompt user for a question with a list of answers
 * @param path
 * @dependencyExternal vscode
 * @oneLineEx const answer = await pick(answers)
 * @ex const answer = await ask(\['yes', 'no'\])
 * @see http://vsc-base.org/#pick
 * @returns Promise<string | undefined>
 */
export const pick = async (answerList: string[]): Promise<string | undefined> =>
   await vscode.window.showQuickPick(answerList)

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
   const files = uriFiles.map((uri: vscode.Uri) => pathAsUnix(uri.fsPath))
   return files
}

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
export const findFilePathsFromBase = async (
   basePath: string,
   includePattern: string = '**/*.{js,jsx,ts,tsx}',
   exclude: vscode.GlobPattern = '**/node_modules/**',
   maxResults: number = 100000
): Promise<string[]> => {
   let baseDir = getDir(basePath)
   const include = new vscode.RelativePattern(baseDir, includePattern)
   const filePaths = await findFilePaths(include, exclude, maxResults)
   return filePaths
}

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
export const findRelativeFilePaths = async (
   path: string,
   relativePath: string,
   includePattern: string = '**/*.{js,jsx,ts,tsx}',
   exclude: vscode.GlobPattern = '**/node_modules/**',
   maxResults: number = 100000
): Promise<string[]> => {
   const dir = getDir(path)
   const joinPath = joinPaths(dir, relativePath)
   let base = cleanPath(joinPath + '/')
   base = trimDashes(base)
   const filePaths = await findFilePathsFromBase(
      base,
      includePattern,
      exclude,
      maxResults
   )
   return filePaths
}

/**
 * Get vscode.activeTextEditor
 * @dependencyExternal vscode
 * @oneLineEx const editor = vsc.getActiveEditor()
 * @see http://vsc-base.org/#getActiveDocument
 * @returns vscode.TextEditor | undefined
 */
export const getActiveEditor = (): vscode.TextEditor | undefined => {
   return vscode.window.activeTextEditor
}
/**
 * Get open vscode.TextDocument
 * @dependencyExternal vscode
 * @oneLineEx const document = vsc.getActiveDocument()
 * @see http://vsc-base.org/#getActiveDocument
 * @returns vscode.TextDocument | undefined
 */
export const getActiveDocument = (): vscode.TextDocument | undefined => {
   const activeEditor = getActiveEditor()
   const document = activeEditor && activeEditor.document
   return document
}

/**
 * Get current open file path or undefined if nothing is open.
 * @dependencyInternal getActiveDocument
 * @oneLineEx const path = vsc.getActivegetActiveDocumentPath()
 * @see http://vsc-base.org/#getActivegetActiveDocumentPath
 * @returns string | undefined
 */
export const getActiveDocumentPath = (): string | undefined => {
   const document = getActiveDocument()
   return (document && document.fileName) || undefined
}

/**
 * Get current open file's content.
 * @dependencyInternal getActiveDocument
 * @oneLineEx const content = vsc.getActiveDocumentContent()
 * @see http://vsc-base.org/#getActiveDocumentContent
 * @returns string | undefined
 */
export const getActiveDocumentContent = (): string | undefined => {
   const document = getActiveDocument()
   return (document && document.getText()) || undefined
}

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
export const setActiveDocumentContent = async (
   content: string
): Promise<boolean> => {
   const document = getActiveDocument()
   const editor = getActiveEditor()
   if (editor && document) {
      const fullRange = getFullDocumentRange(document)
      const snippetString = new vscode.SnippetString(content)
      await editor.insertSnippet(snippetString, fullRange)
      return true
   }
   return false
}

/**
 * Get a vscodeRange for the entire document
 * @param document
 * @dependencyExternal vscode
 * @oneLineEx const fullRange = vsc.getFullDocumentRange(document)
 * @see http://vsc-base.org/#getFullDocumentRange
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
export const appendToDocument = async (
   editor: vscode.TextEditor,
   document: vscode.TextDocument,
   content: string
): Promise<void> => {
   const startPosition = new vscode.Position(document.lineCount, 0)
   const endPosition = new vscode.Position(document.lineCount, 0)
   const fullRange = new vscode.Range(startPosition, endPosition)
   const snippetString = new vscode.SnippetString(content)
   await editor.insertSnippet(snippetString, fullRange)
}

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
export const appendToActiveDocument = async (
   content: string
): Promise<boolean> => {
   const document = getActiveDocument()
   const editor = getActiveEditor()
   if (document && editor) {
      await appendToDocument(editor, document, content)
      return true
   }
   return false
}
/**
 * Append new line content in the end of the open document
 * @param content
 * @dependencyInternal appendToActiveDocument
 * @oneLineEx const success = await vsc.appendLineToActiveDocument(content)
 * @see http://vsc-base.org/#appendLineToActiveDocument
 * @returns Promise<boolean>
 */
export const appendLineToActiveDocument = async (
   content: string
): Promise<boolean> => {
   return await appendToActiveDocument('\n' + content)
}

/**
 * Save active open file.
 * Return true for succes, and false if there was no open document
 * @dependencyInternal getActiveDocument
 * @oneLineEx const success = await vsc.saveActiveDocument(content)
 * @see http://vsc-base.org/#saveActiveDocument
 * @returns Promise<boolean>
 */
export const saveActiveDocument = async (): Promise<boolean> => {
   const doc = getActiveDocument()
   if (doc) {
      await doc.save()
      return true
   }
   return new Promise(resolve => {
      resolve(false)
   })
}

/**
 * Get project root for a path or undefined if no project was found.
 * @param path
 * @dependencyExternal vscode
 * @dependencyInternal pathAsUnix
 * @oneLineEx const rootPath = vsc.getRootPath()
 * @see http://vsc-base.org/#getRootPath
 * @returns string | undefined
 */
export const getRootPath = (path: string): string | undefined => {
   const uri = vscode.Uri.file(path)
   const workspaceFolder = vscode.workspace.getWorkspaceFolder(uri)
   if (!workspaceFolder) {
      return undefined
   }
   let rootPath = workspaceFolder.uri.fsPath
   rootPath = pathAsUnix(rootPath)
   return rootPath
}

/**
 * Save All files
 * @dependencyExternal vscode
 * @oneLineEx await vsc.saveAll()
 * @see http://vsc-base.org/#saveAll
 * @returns Promise<void>
 */
export const saveAll = async (): Promise<void> => {
   await vscode.workspace.saveAll(false)
}

/**
 * Show error message to user
 * @param message
 * @dependencyExternal vscode
 * @oneLineEx await vsc.showErrorMessage(message)
 * @see http://vsc-base.org/#showErrorMessage
 * @returns Promise<void>
 */
export const showErrorMessage = async (message: string): Promise<void> => {
   await vscode.window.showErrorMessage(message)
}

/**
 * Show message to user
 * @param message
 * @dependencyExternal vscode
 * @oneLineEx await vsc.showMessage(message)
 * @see http://vsc-base.org/#showMessage
 * @returns Promise<void>
 */
export const showMessage = async (message: string): Promise<void> => {
   await vscode.window.showInformationMessage(message)
}
