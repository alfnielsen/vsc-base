import vsc from 'vsc-base'

export async function run(path: string) {
	if (vsc.isDir(path)) {
		vsc.showErrorMessage('Only works on files!')
	}
	let source = await vsc.getFileContent(path)
	source = source.replace('test', 'Test')
	await vsc.saveFileContent(path, source)
}
