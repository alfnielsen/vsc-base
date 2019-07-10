//vsc-script-name: findRel.vsc-script
import vscNext from '../src/vsc-base/vsc-next'
import * as vscode from 'vscode'

export async function run(path: string, { vscNext1 }) {
	const files = await vscNext.findRelativeFilePaths(path, '..')
	const names = files.map(p => vscNext.cleanPath)
	
   vscNext.showMessage('Found: ' + JSON.stringify(files));
}
