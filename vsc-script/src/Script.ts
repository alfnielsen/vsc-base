'use strict'
import * as fs from 'fs-extra'
import * as ts from 'typescript'
import * as vscode from 'vscode'
import vsc from 'vsc-base'

export default class Script {
   /**
    * Return a list of all project script files.
    * (async return a list of all files in current project that ends with .vsc-tempate.js)
    */
   async getScriptFiles() {
      const files = await vscode.workspace.findFiles('**/*.vsc-script.ts', '**/node_modules/**', 100000)
      return files
   }
   /**
    * Get the path to the current active file in vscode
    */
   getCurrentPath(): string {
      const activeEditor = vscode.window.activeTextEditor
      const document = activeEditor && activeEditor.document
      return (document && document.fileName) || ''
   }

   /**
    * The main method that runs
    * @todo Code split!!! :-P
    */
   async run(uri?: vscode.Uri) {
      if (uri === undefined) {
         vsc.showErrorMessage('Must be run from context menu!')
         return
      }
      const path = vsc.pathAsUnix(uri.fsPath)

      /**
       * Collect all project scripts:
       * This scans all files for .vsc-script.js to make a list of scripts
       * @todo Maybe move this code, so it do not scan all file every times it run
       */
      const scriptFiles = await this.getScriptFiles()
      const scripts: { name: string; name_lower: string; path: string }[] = []
      scriptFiles.forEach(file => {
         const match = file.fsPath.match(/([\w\-]+)\.vsc\-script\.ts$/)
         if (match) {
            const name = match[1]
            scripts.push({ name, name_lower: name.toLocaleLowerCase(), path: file.fsPath })
         }
      })
      if (scripts.length === 0) {
         vsc.showErrorMessage(
            `NOTE: vsc-script didn't find any script files. A script file name can be place anywhere in the project, but it must end with '.vsc-script.js'`
         )
         return
      }
      const scriptName = await vsc.ask('What Script will you run? (Name of script)', scripts[0].name)
      if (!scriptName) {
         return
      }
      const scriptName_lower = scriptName.toLocaleLowerCase()
      const selectedScript = scripts.find(t => t.name_lower === scriptName_lower)
      if (!selectedScript) {
         vsc.showErrorMessage(
            `NOTE: vsc-script didn't find your script '${scriptName}'. The script must be in a file called '${scriptName}.vsc-script.js'`
         )
         return
      }
      //
      const scriptFileTs = await vsc.getFileContent(selectedScript.path)
      const scriptFileJs = ts.transpile(scriptFileTs)
      const scriptFileExport = eval(scriptFileJs)
      try {
         const r = scriptFileExport(uri, { vsc, vscode, path, ts, fs })
         if (r instanceof Promise) {
            r.then(() => {
               vsc.showMessage('Script done.')
            })
         } else {
            vsc.showMessage('Script done.')
         }
      } catch (e) {
         vsc.showErrorMessage('Error: ' + e)
      }
   }
}
