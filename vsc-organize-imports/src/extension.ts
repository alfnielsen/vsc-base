import * as vscode from 'vscode'
import OrganizeImports from './OrganizeImports'
import { SortImportsOptions } from './SortImports';
import * as vsc from 'vsc-base'

const cleanCode = new OrganizeImports()

// The module 'vscode' contains the VS Code extensibility API

// Import the module and reference it with the alias vscode in your code below
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vsc-organize-imports" is now active!')
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json

	let disposableShortcut = vscode.commands.registerTextEditorCommand(
		'extension.vscOrganizeImports',
		() => {
			if (!vscode.window.activeTextEditor) {
				return
			}
			runExtension(vscode.window.activeTextEditor.document.uri)
		}
	)

	let disposableOnSave = vscode.workspace.onWillSaveTextDocument((event: vscode.TextDocumentWillSaveEvent) => {
		const formatOnSave = cleanCode.getConfig('formatOnSave', true)
		if (formatOnSave) {
			event.waitUntil(
				runExtension(event.document.uri)
			);
		}
	})

	//context.subscriptions.push(disposableScriptCommand)
	context.subscriptions.push(disposableShortcut)
	context.subscriptions.push(disposableOnSave)
}

// this method is called when your extension is deactivated
export function deactivate() { }



const runExtension = async (uri?: vscode.Uri) => {
	if (!uri) {
		return;
	}
	const rootPath = vsc.getRootPath(uri.fsPath);
	if (!rootPath) {
		return
	}
	const options = await getOptions(rootPath)
	if (!options) {
		return
	}
	return cleanCode.run(options, uri)
}


const getOptions = async (rootPath: string) => {
	let options: SortImportsOptions = {
		"orderSpecifiers": true,
		"orderSpecifiersAsSingleLine": true,
		"baseUrl": "src",
		"basePath": "",
		"emptyLinesAfterImports": 1,
		"emptyLinesBetweenFilledGroups": 1,
		"groups": [
			{
				"groups": [
					"global"
				],
				"sortBy": "path",
				"emptyLines": true
			},
			{
				"groups": [
					"absolute"
				],
				"sortBy": "path",
				"emptyLines": true
			},
			{
				"groups": [
					"relative"
				],
				"sortBy": "path",
				"emptyLines": true
			},
			{
				"groups": [
					"globalDirect",
					"absoluteDirect",
					"relativeDirect"
				],
				"sortBy": "path",
				"emptyLines": true
			}
		]
	}
	//load settings:
	const packageJson = await vsc.getRootPackageJson<{
		"vsc-organize-imports": SortImportsOptions
	}>(rootPath);
	if (packageJson["vsc-organize-imports"] !== undefined) {
		const packageJsonOptions = packageJson["vsc-organize-imports"] as SortImportsOptions;
		options = { ...options, ...packageJsonOptions }
		return options;
	}
	return options
}