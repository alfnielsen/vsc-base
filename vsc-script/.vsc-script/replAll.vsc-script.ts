// libs: { vscode, path, ts, fs }
import * as fs from 'fs-extra'
import * as path from 'path'
import * as vscode from 'vscode'

export async function run(uri: vscode.Uri) {
	await eachFileUnderSelected(uri, '**/*.{js,jsx,ts,tsx}', async (file: vscode.Uri) => {
		let source = await getFileContent(file.fsPath)
		if (source.match('Test')) {
			source = source.replace('Test', 'TEST')
			saveFileContent(file.fsPath, source)
		}
	})
}
const eachFileUnderSelected = async (
	uri: vscode.Uri,
	fileTypes: string,
	callback: (file: vscode.Uri) => Promise<void>
) => {
	const root = getRootPath(uri)
	const relativePath = getRelativeDirPaht(root, uri)
	const glob = `${relativePath}/${fileTypes}`.replace(/^\//g, '')
	//showMessage(`Files in: ${glob}`)
	const files = await getAllFiles(glob)
	//showMessage(`Files found: ${files.length}`)
	await files.forEach(callback)
}
const saveFileContent = async (path: string, content: string) => await fs.writeFile(path, content)
const getFileContent = async (path: string) => await fs.readFile(path, 'utf8')
const getAllFiles = async (glob: vscode.GlobPattern) => {
	return await vscode.workspace.findFiles(glob, '**/node_modules/**', 100000)
}
const showMessage = (message: string) => vscode.window.showInformationMessage(message)
const showErrorMessage = (message: string) => vscode.window.showErrorMessage(message)

const getRootPath = (uri: vscode.Uri): string => {
	return vscode.workspace.getWorkspaceFolder(uri).uri.fsPath
}
const isDir = (path: string) => fs.statSync(path).isDirectory()

const getRelativeDirPaht = (root: string, uri: vscode.Uri): string => {
	const selectedFilePath = uri.fsPath
	let selectedFilePathDir = selectedFilePath
	if (!isDir(selectedFilePath)) {
		selectedFilePathDir = path.dirname(selectedFilePath)
	}
	const relativeDirPath = selectedFilePathDir.replace(root, '')
	return relativeDirPath
}
