'use strict'
import * as vsc from 'vsc-base'
import * as vscode from 'vscode'
import { SortImports } from './cleaners/SortImports'

export default class CleanCode {
   formatOnSave = true
   spaceBetweenImportGroups = true
   getConfig<T>(property: string, defaultValue: T): T {
      return vsc.getConfig('vscCleanCode', property, defaultValue)
   }
   setup() {
      this.formatOnSave = this.getConfig('formatOnSave', true)
      this.spaceBetweenImportGroups = this.getConfig('spaceBetweenImportGroups', true)
   }
   async run(uri?: vscode.Uri) {
      if (!uri) {
         return
      }
      const content = vsc.getDocumentContent();
      if (!content) {
         return
      }
      //load settings:
      await SortImports(content, this.spaceBetweenImportGroups)

   }
}

