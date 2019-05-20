'use strict'

import * as vsc from 'vsc-base'
import * as vscode from 'vscode'
import { SortImports, SortImportsOptions } from './SortImports'

export default class OrganizeImports {
   getConfig<T>(property: string, defaultValue: T): T {
      return vsc.getConfig('vscOrganizeImports', property, defaultValue)
   }
   async run(options: SortImportsOptions, uri?: vscode.Uri, ) {
      if (!uri) {
         return
      }

      const content = vsc.getDocumentContent();
      if (!content) {
         return
      }
      const path = uri.path

      const rootPath = vsc.getRootPath(path)
      if (!rootPath) {
         return
      }

      options.basePath = vsc.joinPaths(rootPath, options.baseUrl)

      await SortImports(
         path,
         content,
         options
      )
   }
}

