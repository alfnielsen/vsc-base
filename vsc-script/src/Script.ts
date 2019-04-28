'use strict'
import * as fs from 'fs-extra'
import * as ts from 'typescript'
import * as path from 'path'
import * as vscode from 'vscode'
import * as cp from 'child-process-promise'
import * as vsc from 'vsc-base'
//import * as vsc from './vsc-base-development/vsc-base'


export default class Script {
   /**
    * Meta function that ensures the libs are not optimized away!
    */
   getLibs() {
      return { fs, ts, path, vscode, vsc, cp }
   }
   /**
    * The main method that runs
    */
   async run(uri?: vscode.Uri) {

      if (uri === undefined) {
         vsc.showErrorMessage('ERROR (101): Must be run from context menu!')
         return
      }

      const path = vsc.pathAsUnix(uri.fsPath)

      // Collect all project scripts:
      const scriptFiles = await vsc.findFilePaths('**/*.vsc-script.ts')
      // Create lowercase map of scripts
      const scripts: { name: string; name_lower: string; path: string }[] = []
      scriptFiles.forEach(filePath => {
         const match = filePath.match(/([\w\-]+)\.vsc\-script\.ts$/)
         if (match) {
            const name = match[1]
            scripts.push({
               name,
               name_lower: name.toLocaleLowerCase(),
               path: filePath
            })
         }
      })
      if (scripts.length === 0) {
         vsc.showErrorMessage(
            `ERROR (102): vsc-script didn't find any script files. A script file name can be place anywhere in the project, but it must end with '.vsc-script.js'`
         )
         return
      }
      // Ask user for script to run.
      const scriptName = await vsc.pick(scripts.map(s => s.name))
      if (!scriptName) {
         return
      }
      // select script from user input
      const scriptName_lower = scriptName.toLocaleLowerCase()
      const selectedScript = scripts.find(
         t => t.name_lower === scriptName_lower
      )
      if (!selectedScript) {
         vsc.showErrorMessage(
            `ERROR (103): NOTE: vsc-script didn't find your script '${scriptName}'. The script must be in a file called '${scriptName}.vsc-script.js'`
         )
         return
      }

      // load script and tranpile it
      let scriptFileExport
      try {
         scriptFileExport = await vsc.tsLoadModule(selectedScript.path)
      } catch (e) {
         let jsCompiledCode = ''
         if (e instanceof vsc.TSLoadModuleError) {
            jsCompiledCode = e.transpiledCode
            this.errorLog('104.1: Error in vsc-Script trying to transpile the loaded module. This error is properply incorrect formatting of the module file. Open the script file in vscode and ensure that ts cont find any errors.', selectedScript.path, e, `${jsCompiledCode}`)
         } else {
            const transpiledTs = await vsc.tsTranspile(selectedScript.path)
            this.errorLog('104.2: Error in vsc-Script trying to transpile the loaded module. Please report it to https://github.com/alfnielsen/vsc-base/issues and include the error-log', selectedScript.path, e, `${transpiledTs}`)
         }
         return
      }
      const varifiedModule = vsc.varifyModuleMethods(scriptFileExport, ['run'])
      if (!varifiedModule) {
         vsc.showErrorMessage(
            `Script did not contain method called 'run' :: ${JSON.stringify(
               scriptFileExport
            )}`
         )
         return
      }
      try {
         const result = varifiedModule.run(path, this.getLibs())
         await vsc.awaitResult(result)
         if (typeof result === 'string') {
            vsc.showMessage(`Script done: ${result}`)
         } else {
            vsc.showMessage('Script done.')
         }
      } catch (e) {
         const sourceJs = await vsc.tsLoadModuleSourceCode(selectedScript.path)

         this.errorLog(`105: Running compiled 'run' method. The error is in the 'run' method.`, selectedScript.path, e, `${sourceJs}`)
      }
   }

   async errorLog(errorDescription: string, selectedScriptPath: string, e: Error, method: string) {
      const errorFilePath = selectedScriptPath.replace(/\.ts/, '.error-log.js')
      let errorLogContent = ''
      if (vsc.doesExists(errorFilePath)) {
         errorLogContent = await vsc.getFileContent(errorFilePath)
      }
      const info = vsc.getErrorInfo(e)
      const stackInfo = await this.getStackInfo(info.stack)
      errorLogContent += `
// ------------------ Error log from script -------------- //
// type: ${errorDescription}
// time: ${vsc.getTimestamp()}
// selectedScript.path: ${selectedScriptPath}
// path: ${path}
// error:
// ${stackInfo}
var info = ${JSON.stringify(info, null, 3)}
// ts transpiled js code:
${method}

`
      await vsc.saveFileContent(errorFilePath, errorLogContent)
      vsc.showErrorMessage(`Error (${errorDescription}). Error log in file: '${errorFilePath}'`)
   }

   async getStackInfo(stack: string) {
      const fileMatch = stack.match(/\((.*extension.js)\:(\d+)\:(\d+)\)\n/)
      if (fileMatch === null) {
         return 'Error handler did not find the extension.js!';
      }
      const filePath = fileMatch[1]
      const line = parseInt(fileMatch[2])
      const char = parseInt(fileMatch[3])
      const fileContent = await vsc.getFileContent(filePath)
      const lines = fileContent.split('\n');
      const lineContent = lines[line]
      const errorContent = lineContent.substr(char, 120);
      return 'Error handler find first error in extension.js: ' + errorContent
   }

}


