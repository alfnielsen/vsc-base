import * as vscode from 'vscode'

import Script from './Script'
//import * as vsc from 'vscode-base'
import * as vsc from './vsc-base-development/vsc-base'

// The module 'vscode' contains the VS Code extensibility API

// Import the module and reference it with the alias vscode in your code below
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
   // Use the console to output diagnostic information (console.log) and errors (console.error)
   // This line of code will only be executed once when your extension is activated
   console.log('Congratulations, your extension "vsc-script" is now active!')
   const script = new Script(context)

   let disposableScriptCommand = vscode.commands.registerCommand('extension.vscScript', (uri?: vscode.Uri, uris?: vscode.Uri[]) => {
      if (uri === undefined || !vscode.window.activeTextEditor) {
         vscode.window.showErrorMessage("vsc-script can only be run from vscode explore context menu or an open document");
         return;
      } else if (uri === undefined) {
         uri = vscode.window.activeTextEditor.document.uri
      }
      script.run(uri)
   })

   let disposableShortcut = vscode.commands.registerTextEditorCommand(
      'extension.vscScriptOnSave',
      () => {
         if (!vscode.window.activeTextEditor) {
            return
         }
         script.runOnSave(vscode.window.activeTextEditor.document.uri)
      }
   )

   let disposableOnSave = vscode.workspace.onWillSaveTextDocument((event: vscode.TextDocumentWillSaveEvent) => {
      event.waitUntil(
         script.runOnSave(event.document.uri)
      );
   })

   context.subscriptions.push(disposableScriptCommand)
   context.subscriptions.push(disposableShortcut)
   context.subscriptions.push(disposableOnSave)
}

// this method is called when your extension is deactivated
export function deactivate() { }


