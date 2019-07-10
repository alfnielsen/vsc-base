//vsc-script-name: ys.vsc-script
import * as vsc from 'vsc-base'

export async function run(path: string) {
	const rootPath = vsc.getRootPath()
	vsc.showMessage(rootPath);
	await vsc.cpExecFromPath('ys', rootPath);
	//await vsc.fsExec('yarn start')
}