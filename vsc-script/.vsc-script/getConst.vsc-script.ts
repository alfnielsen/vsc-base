import vsc from 'vsc-base'
/**
 * This script finds all const names in a file (From start of lines) and append the list to the end of that file.
 */
export async function run(path: string) {
	if (vsc.isDir(path)) {
		vsc.showErrorMessage('Only works on files!')
	}
	let source = await vsc.getFileContent(path)
	const value = runner(source)
	//append result to file
	source = source + '\n\n' + value
	await vsc.saveFileContent(path, source)
}

const runner = (source: string) => {
	const lines = source.split(/\n/)
	const list: string[] = []
	lines.forEach((line: string) => {
		const match = line.match(/^const\s*(\w+)/)
		if (match) {
			list.push(match[1])
		}
	})
	return 'const found = {\n\t' + list.join(',\n\t') + '\n}\n'
}
