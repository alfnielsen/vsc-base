"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const CleanCode_1 = require("./CleanCode");
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "vsc-script" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    const cleanCode = new CleanCode_1.default();
    // let disposableScriptCommand = vscode.commands.registerCommand('extension.vscCleanCode', (uri?: vscode.Uri, uris?: vscode.Uri[]) => {
    // 	if (uri === undefined || !vscode.window.activeTextEditor) {
    // 		vscode.window.showErrorMessage("vsc-script can only be run from an open document");
    // 		return;
    // 	} else if (uri === undefined) {
    // 		uri = vscode.window.activeTextEditor.document.uri
    // 	}
    // 	cleanCode.run(uri)
    // })
    let disposableShortcut = vscode.commands.registerTextEditorCommand('extension.vscScriptOnSave', () => {
        if (!vscode.window.activeTextEditor) {
            return;
        }
        cleanCode.run(vscode.window.activeTextEditor.document.uri);
    });
    let disposableOnSave = vscode.workspace.onWillSaveTextDocument((event) => {
        if (cleanCode.formatOnSave) {
            event.waitUntil(cleanCode.run(event.document.uri));
        }
    });
    //context.subscriptions.push(disposableScriptCommand)
    context.subscriptions.push(disposableShortcut);
    context.subscriptions.push(disposableOnSave);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map