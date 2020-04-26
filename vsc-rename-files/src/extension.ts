import * as vsc from 'vsc-base'
import * as vscode from 'vscode'

import RenameFiles from './RenameFiles'

// Import the module and reference it with the alias vscode in your code below
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
   // Use the console to output diagnostic information (console.log) and errors (console.error)
   // This line of code will only be executed once when your extension is activated
   console.log('Congratulations, your extension "vsc-rename-files" is now active!')

   // The command has been defined in the package.json file
   // Now provide the implementation of the command with registerCommand
   // The commandId parameter must match the command field in package.json

   const renameFiles = new RenameFiles()

   let disposable = vscode.commands.registerCommand(
      'extension.vscRenameFiles',
      (uri?: vscode.Uri, uris?: vscode.Uri[]) => {
         vsc.showMessage("" + uri)
         if (!uri) {
            vsc.showErrorMessage(
               'vsc rename-files most be run by right-clicking a file or folder!'
            )
            return
         }
         const selectedPath = vsc.pathAsUnix(uri.fsPath)
         renameFiles.rename(selectedPath, context)
      }
   )

   context.subscriptions.push(disposable)
}

// this method is called when your extension is deactivated
export function deactivate() { }
