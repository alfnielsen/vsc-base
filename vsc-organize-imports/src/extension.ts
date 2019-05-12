import * as vscode from 'vscode'
import OrganizeImports from './OrganizeImports'

// The module 'vscode' contains the VS Code extensibility API

// Import the module and reference it with the alias vscode in your code below
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vsc-script" is now active!')

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json

	const cleanCode = new OrganizeImports()

	let disposableShortcut = vscode.commands.registerTextEditorCommand(
		'extension.vscOrganizeImports',
		() => {
			if (!vscode.window.activeTextEditor) {
				return
			}
			cleanCode.run(vscode.window.activeTextEditor.document.uri)
		}
	)

	let disposableOnSave = vscode.workspace.onWillSaveTextDocument((event: vscode.TextDocumentWillSaveEvent) => {
		const formatOnSave = cleanCode.getConfig('formatOnSave', true)
		if (formatOnSave) {
			event.waitUntil(
				cleanCode.run(event.document.uri)
			);
		}
	})

	//context.subscriptions.push(disposableScriptCommand)
	context.subscriptions.push(disposableShortcut)
	context.subscriptions.push(disposableOnSave)
}

// this method is called when your extension is deactivated
export function deactivate() { }


