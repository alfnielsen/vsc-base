import vsc from 'vsc-base'
import vscNext from '../src/vsc-next'
import * as vscode from 'vscode'

export async function run(uri: vscode.Uri) {
	const files = await vscNext.findRelativeFilePaths(uri.fsPath, './')
	await files.forEach(async filePath => {
		let source = await vsc.getFileContent(filePath)
		if (source.match('Test')) {
			source = source.replace('Test', 'TEST')
			await vsc.saveFileContent(filePath, source)
		}		
	});
}
