'use strict'
import * as vsc from 'vsc-base'
import * as vscode from 'vscode'
import { SortImports } from './SortImports'

export default class OrganizeImports {
   getConfig<T>(property: string, defaultValue: T): T {
      return vsc.getConfig('vscOrganizeImports', property, defaultValue)
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
      const spaceBetweenImportGroups = this.getConfig('spaceBetweenImportGroups', false)
      const orderSpecifiers = this.getConfig('orderSpecifiers', false)
      const orderSpecifiersAsSingleLine = this.getConfig('orderSpecifiersAsSingleLine', false)

      const editor = vsc.getActiveEditor()
      let selection: vscode.Selection | undefined
      if (editor) {
         selection = editor.selection
      }
      await SortImports(content, spaceBetweenImportGroups, orderSpecifiers, orderSpecifiersAsSingleLine)
      if (editor && selection) {
         editor.selection = selection
      }
   }
}

