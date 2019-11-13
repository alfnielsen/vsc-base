import * as cp from 'child-process-promise'
import * as fs from 'fs-extra'
import * as path from 'path'
import * as ts from 'typescript'
//import * as vsc from 'vsc-base'
import * as vscode from 'vscode'

import * as vsc from './vsc-base-development/vsc-base'

export type SenderFunc = (content: any) => Promise<void>

interface IScriptMap {
   area: string[],
   displayName: string;
   name: string;
   name_lower: string;
   path: string
}

export default class Script {
   constructor(
      public context: vscode.ExtensionContext,
   ) { }

   webViewPanel?: vscode.WebviewPanel;

   /**
    * Meta function that ensures the libs are not optimized away!
    */
   getLibs() {
      return { fs, ts, path, vscode, vsc, cp }
   }

   async runOnSave(uri: vscode.Uri) {
      const path = vsc.pathAsUnix(uri.fsPath)
      // Collect all project scripts:
      const scriptFiles = await vsc.findFilePaths('**/*.vsc-script-onsave.ts')
      scriptFiles.sort((a, b) => {
         const matchA = a.match(/\/.*$/)
         const matchB = b.match(/\/.*$/)
         if (!matchA || !matchB) {
            return 0;
         }
         return matchA[0].localeCompare((matchB[0]))
      })
      for (const filePath of scriptFiles) {
         await this.loadAndRunScript(path, filePath, 'runOnSave');
      }
   }

   async loadAndRunScript(path: string, scriptPath: string, method: string) {
      // load script and transpile it
      let scriptFileExport
      try {
         scriptFileExport = await vsc.tsLoadModule(scriptPath)
      } catch (e) {
         let jsCompiledCode = ''
         if (e instanceof vsc.TSLoadModuleError) {
            jsCompiledCode = e.transpiledCode
            this.errorLog('104.1: Error in vsc-Script trying to transpile the loaded module. This error is properly incorrect formatting of the module file. Open the script file in vscode and ensure that ts cont find any errors.', scriptPath, e, `${jsCompiledCode}`)
         } else {
            const transpiledTs = await vsc.tsTranspile(scriptPath)
            this.errorLog('104.2: Error in vsc-Script trying to transpile the loaded module. Please report it to https://github.com/alfnielsen/vsc-base/issues and include the error-log', scriptPath, e, `${transpiledTs}`)
         }
         return
      }
      const verifiedModule = vsc.verifyModuleMethods(scriptFileExport, [method])
      if (!verifiedModule) {
         vsc.showErrorMessage(
            `Script did not contain method called '${method}' :: ${JSON.stringify(
               scriptFileExport
            )}`
         )
         return
      }
      try {
         vsc.showErrorMessage(`Running '${method}'`)
         await verifiedModule[method](
            path,
            this.context
         )
      } catch (e) {
         const sourceJs = await vsc.tsLoadModuleSourceCode(scriptPath)
         this.errorLog(`105: Running compiled 'run' method. The error is in the '${method}' method.`, scriptPath, e, `${sourceJs}`)
      }
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
      const scriptFiles = await vsc.findFilePaths('**/*.vsc-script.{ts,tsx}')
      // Create lowercase map of scripts
      const scripts: IScriptMap[] = []
      for (let filePath of scriptFiles) {
         const match = filePath.match(/([\w\-]+)\.vsc\-script\.tsx?$/)
         if (match) {
            const content = await vsc.getFileContent(filePath)
            const nameLabelMatch = content.match(/(?:^|\n)\s*\/\/vsc\-script\-name\:([^\n]*)/)
            const name = nameLabelMatch ? nameLabelMatch[1] : match[1]
            scripts.push({
               area: ['Other'],
               name,
               displayName: name,
               name_lower: name.toLocaleLowerCase(),
               path: filePath
            })
         }
      }
      //
      if (scripts.length === 0) {
         vsc.showErrorMessage(
            `ERROR (102): vsc-script didn't find any script files. A script file name can be place anywhere in the project, but it must end with '.vsc-script.js'`
         )
         return
      }
      this.setArea(scripts)
      //Sort scripts
      scripts.sort((a, b) => a.displayName.localeCompare(b.displayName))
      const hasAreas = scripts.find(a => a.area[0] !== 'Other')
      let scriptName: string | undefined
      if (hasAreas) {
         const areas = [...new Set(scripts.map(s => s.area[0]))]
         const areaSelected = await vsc.pick(areas)
         const sel = scripts.filter(s => s.area[0] === areaSelected)
         scriptName = await vsc.pick(sel.map(s => s.displayName))
      } else {
         scriptName = await vsc.pick(scripts.map(s => s.name))
      }
      // Ask user for script to run.
      if (!scriptName) {
         return
      }
      // select script from user input
      const selectedScript = scripts.find(
         t => t.displayName === scriptName
      )
      if (!selectedScript) {
         vsc.showErrorMessage(
            `ERROR (103): NOTE: vsc-script didn't find your script '${scriptName}'. The script must be in a file called '${scriptName}.vsc-script.js'`
         )
         return
      }
      await this.loadAndRunScript(path, selectedScript.path, 'run');
   }

   async errorLog(errorDescription: string, selectedScriptPath: string, e: Error, method: string) {
      const errorFilePath = selectedScriptPath.replace(/\.tsx?/, '.error-log.js')
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


   setArea(scripts: IScriptMap[]) {
      scripts.forEach(s => {
         s.name = s.name.trim()
         s.displayName = s.name.trim()
         if (s.displayName.match('>')) {
            s.area = s.displayName.split('>').map(a => {
               return a.trim()
            })
            s.displayName = s.area.join(' > ')
         }
      });
   }
}


