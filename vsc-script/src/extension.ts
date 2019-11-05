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

   // The command has been defined in the package.json file
   // Now provide the implementation of the command with registerCommand
   // The commandId parameter must match the command field in package.json

   const script = new Script()

   let disposableScriptCommand = vscode.commands.registerCommand('extension.vscScript', (uri?: vscode.Uri, uris?: vscode.Uri[]) => {
      if (uri === undefined || !vscode.window.activeTextEditor) {
         vscode.window.showErrorMessage("vsc-script can only be run from vscode explore context menu or an open document");
         return;
      } else if (uri === undefined) {
         uri = vscode.window.activeTextEditor.document.uri
      }
      script.startWebView = ({ body, onMessageCode }: { body: string, onMessageCode: string }) => {
         script.webViewPanel = vscode.window.createWebviewPanel(
            'vscScript',
            'Script',
            vscode.ViewColumn.One,
            {
               enableScripts: true
            }
         );
         script.webViewPanel.webview.html = vsc.WebViewHTMLTemplate(onMessageCode, body)
         // Send a message to webview.
         //vsc.showMessage("JSON:" + JSON.stringify(json))
         script.senderMessageToWebView = script.webViewPanel.webview.postMessage;
         // Handle messages from webview
         script.webViewPanel.webview.onDidReceiveMessage(
            message => {
               if (script.onMessageFromWebView) {
                  script.onMessageFromWebView(message)
               }
            },
            undefined,
            context.subscriptions
         );
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


