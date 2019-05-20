"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const OrganizeImports_1 = require("./OrganizeImports");
const vsc = require("vsc-base");
const cleanCode = new OrganizeImports_1.default();
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    return __awaiter(this, void 0, void 0, function* () {
        // Use the console to output diagnostic information (console.log) and errors (console.error)
        // This line of code will only be executed once when your extension is activated
        console.log('Congratulations, your extension "vsc-organize-imports" is now active!');
        // The command has been defined in the package.json file
        // Now provide the implementation of the command with registerCommand
        // The commandId parameter must match the command field in package.json
        let disposableShortcut = vscode.commands.registerTextEditorCommand('extension.vscOrganizeImports', () => {
            if (!vscode.window.activeTextEditor) {
                return;
            }
            runExtension(vscode.window.activeTextEditor.document.uri);
        });
        let disposableOnSave = vscode.workspace.onWillSaveTextDocument((event) => {
            const formatOnSave = cleanCode.getConfig('formatOnSave', true);
            if (formatOnSave) {
                event.waitUntil(runExtension(event.document.uri));
            }
        });
        //context.subscriptions.push(disposableScriptCommand)
        context.subscriptions.push(disposableShortcut);
        context.subscriptions.push(disposableOnSave);
    });
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
const runExtension = (uri) => __awaiter(this, void 0, void 0, function* () {
    if (!uri) {
        return;
    }
    const rootPath = vsc.getRootPath(uri.fsPath);
    if (!rootPath) {
        return;
    }
    const options = yield getOptions(rootPath);
    if (!options) {
        return;
    }
    return cleanCode.run(options, uri);
});
const getOptions = (rootPath) => __awaiter(this, void 0, void 0, function* () {
    //load settings:
    const packageJson = yield vsc.getRootPackageJson(rootPath);
    if (packageJson["vsc-organize-imports"] === undefined) {
        vsc.showErrorMessage("vsc-organize-imports was not found in the package.json root file!");
        return;
    }
    const packageJsonOptions = packageJson["vsc-organize-imports"];
    return packageJsonOptions;
});
//# sourceMappingURL=extension.js.map