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
      const path = uri.path

      //load settings:
      const orderSpecifiers = this.getConfig('orderSpecifiers', false)
      const orderSpecifiersAsSingleLine = this.getConfig('orderSpecifiersAsSingleLine', false)
      const baseUrl = this.getConfig('baseUrl', 'src')

      const emptyLinesAfterGlobalImports = this.getConfig('emptyLinesAfterGlobalImports', 0)
      const emptyLinesAfterAbsoluteImports = this.getConfig('emptyLinesAfterAbsoluteImports', 0)
      const emptyLinesLocalImports = this.getConfig('emptyLinesLocalImports', 0)
      const emptyLinesAfterImports = this.getConfig('emptyLinesAfterImports', 1)

      const rootPath = vsc.getRootPath(path)
      if (!rootPath) {
         return
      }
      const basePath = vsc.joinPaths(rootPath, baseUrl)

      await SortImports(
         basePath,
         content,
         emptyLinesAfterGlobalImports,
         emptyLinesAfterAbsoluteImports,
         emptyLinesLocalImports,
         emptyLinesAfterImports,
         orderSpecifiers,
         orderSpecifiersAsSingleLine
      )
   }
}

