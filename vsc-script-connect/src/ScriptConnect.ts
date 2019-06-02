'use strict'
import * as cp from 'child-process-promise'
import * as fs from 'fs-extra'
import * as path from 'path'
import * as ts from 'typescript'
import * as vsc from 'vsc-base'
import * as vscode from 'vscode'

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
      const files = await vsc.findFilePaths("**/.vsc-script-connect/connect.js")
      const [dir, file] = vsc.splitPath(files[0])

      const result = await vsc.execFromPath(`node ${file}`, dir)

      const stringResult = result.stdout.toString()

      vsc.showMessage(stringResult)

   }


}


