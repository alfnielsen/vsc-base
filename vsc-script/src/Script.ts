'use strict'
import * as fs from 'fs-extra'
import * as ts from 'typescript'
import * as path from 'path'
import * as vscode from 'vscode'
import vsc from '../src/vsc-base/vsc-next'

export default class Script {
   /**
    * Meta function that ensures the libs are not optimized away!
    */
   getLibs() {
      return { fs, ts, path, vscode, vsc }
   }
   /**
    * The main method that runs
    */
   async run(uri?: vscode.Uri) {
      if (uri === undefined) {
         vsc.showErrorMessage('Must be run from context menu!')
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
            `NOTE: vsc-script didn't find any script files. A script file name can be place anywhere in the project, but it must end with '.vsc-script.js'`
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
            `NOTE: vsc-script didn't find your script '${scriptName}'. The script must be in a file called '${scriptName}.vsc-script.js'`
         )
         return
      }
      // load script and tranpile it
      let scriptFileExport
      try {
         scriptFileExport = await vsc.loadTsModule(selectedScript.path, vsc)
      } catch (e) {
         vsc.showErrorMessage('Error: ' + e)
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
         vsc.showMessage('Script done.')
      } catch (e) {
         vsc.showErrorMessage('Error: ' + e)
      }
   }
}
