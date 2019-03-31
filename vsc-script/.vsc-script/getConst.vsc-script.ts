import * as fs from 'fs-extra'
import * as vscode from 'vscode'
/**
 * This script finds all const names in a file (From start of lines) and append the list to the end of that file.
 */
export async function run(uri: vscode.Uri) {
	if (isDir(uri.fsPath)) {
		showErrorMessage('Only works on files!')
	}
	let source = await getFileContent(uri.fsPath)
	const value = runner(source)
	//append result to file
	source = source + '\n\n' + value
	await saveFileContent(uri.fsPath, source)
}

const runner = (source: string) => {
	const lines = source.split(/\n/)
	const list: string[] = []
	lines.forEach((line: string) => {
		const match = line.match(/^const\s*(\w+)/)
		if (match) {
			list.push(match[1])
		}
	})
	return 'const found = {\n\t' + list.join(',\n\t') + '\n}\n'
}

const saveFileContent = async (path: string, content: string) => await fs.writeFile(path, content)
const getFileContent = async (path: string) => await fs.readFile(path, 'utf8')
const isDir = (path: string) => fs.statSync(path).isDirectory()
const showMessage = (message: string) => vscode.window.showInformationMessage(message)
const showErrorMessage = (message: string) => vscode.window.showErrorMessage(message)
