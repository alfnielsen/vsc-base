// The module 'vscode' contains the VS Code extensibility API
import * as vscode from 'vscode'

import Script from './Script'

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

	const script = new Script()

	let disposable = vscode.commands.registerCommand('extension.vscScript', (uri?: vscode.Uri, uris?: vscode.Uri[]) => {
			if(uri === undefined){
				vscode.window.showErrorMessage("vsc-script most be run from vscode context menu by rigth-clicking a file or folder and run 'vsc Script'");
				return;
			}
			script.run(uri)
		}
	)

	context.subscriptions.push(disposable)
}

// this method is called when your extension is deactivated
export function deactivate() {}
