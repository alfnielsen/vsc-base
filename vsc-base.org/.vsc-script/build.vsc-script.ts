import * as fs from 'fs-extra'
import * as vscode from 'vscode'
import vsc from 'vsc-base'
/**
 * This script finds all const names in a file (From start of lines) and append the list to the end of that file.
 */
export async function run(_: vscode.Uri) {
   const files = await vsc.findFilePaths('**/vsc-base-*.ts')
   vsc.showMessage('Files found:' + files.join(' | '))
}
