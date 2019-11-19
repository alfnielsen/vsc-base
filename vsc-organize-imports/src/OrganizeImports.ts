'use strict'
import * as vsc from 'vsc-base'
import * as vscode from 'vscode'

import { SortImports, SortImportsOptions } from './SortImports'

export default class OrganizeImports {
   getConfig<T>(property: string, defaultValue: T): T {
      return vsc.getConfig('vscOrganizeImports', property, defaultValue)
   }
   async run(options: SortImportsOptions, uri?: vscode.Uri) {
      //var t0 = Date.now()
      if (!uri) {
         return
      }

      const content = vsc.getDocumentContent()
      if (!content) {
         return
      }
      const path = vsc.pathAsUnix(uri.fsPath)

      const rootPath = vsc.getRootPath(path)
      if (!rootPath) {
         return
      }

      options.basePath = vsc.joinPaths(rootPath, options.baseUrl)

      await SortImports(path, content, options)
      // var t1 = Date.now()
      // var time = t1 - t0
      // console.log('Call to doSomething took ' + time + ' milliseconds.')
   }
}
