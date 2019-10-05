"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const RenameFiles_1 = require("./RenameFiles");
// Import the module and reference it with the alias vscode in your code below
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "vsc-rename-files" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    const renameFiles = new RenameFiles_1.default();
    let disposable = vscode.commands.registerCommand('extension.vscRenameFiles', (uri, uris) => {
        renameFiles.rename(uri);
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map