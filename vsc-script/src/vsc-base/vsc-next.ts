import * as vscRaw from './vsc-base-raw'
import * as vscSystem from './vsc-base-system'
import * as vscVscode from './vsc-base-vscode'

const vsc = {
   ...vscRaw,
   ...vscSystem,
   ...vscVscode
}

export default vsc
