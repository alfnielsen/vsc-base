import * as fs from 'fs-extra'
import * as vscode from 'vscode'
import * as ts from 'typescript'
import * as vsc from './vsc-base'

/**
 * eval in correct content where vsc exists!
 * @param code
 * @private
 */
const evalWithVscEndExport = (code: string): { [key: string]: unknown } => {
   const libs = { fs, vscode, ts, vsc }
   const wrapExports = `_exports = (function (vsc){var exports = {};${code};return exports})(vsc);`
   let _exports: { [key: string]: unknown } = {}
   try {
      eval(wrapExports)
   } catch (e) {
      throw e // retrhow
   }
   return _exports
}
export default evalWithVscEndExport
