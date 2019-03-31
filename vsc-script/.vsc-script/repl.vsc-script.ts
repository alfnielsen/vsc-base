import * as fs from 'fs-extra'
import * as vscode from 'vscode'

export async function run(uri: vscode.Uri) {
	if (isDir(uri.fsPath)) {
		showErrorMessage('Only works on files!')
	}
	let source = await getFileContent(uri.fsPath)
	source = source.replace('test', 'Test')
	await saveFileContent(uri.fsPath, source)
}

const saveFileContent = async (path: string, content: string) => await fs.writeFile(path, content)
const getFileContent = async (path: string) => await fs.readFile(path, 'utf8')
const isDir = (path: string) => fs.statSync(path).isDirectory()
const showMessage = (message: string) => vscode.window.showInformationMessage(message)
const showErrorMessage = (message: string) => vscode.window.showErrorMessage(message)
