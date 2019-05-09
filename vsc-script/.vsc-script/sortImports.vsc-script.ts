import * as vsc from 'vsc-base'
import * as ts from 'typescript'

type Imports = { node: ts.Node; pos: vsc.VscodePosition; path: string; }[]

export async function run(path: string) {
	const dir = vsc.getDir(path)
	const content = vsc.getDocumentContent()
	if (!content) { return }
	const [dependencies, devDependencies] = await vsc.getPackageDependencies()
	//const ppPath = await vsc.getPackageFilePaths()

	const ppPath = await vsc.findFilePaths('**/package.json', '**/{node_modules,.vscode-test}/**')

	await vsc.saveFileContent(vsc.joinPaths(dir, 'PPFILES.txt'), ppPath.join('\n'))

	vsc.showMessage('COUNT::' + ppPath.length);
	return
	const dependencyNames = Object.keys({ ...dependencies, ...devDependencies })
	const [node, firstPos] = vsc.tsFindNodePositionFromContent(content,
		node => !ts.isSourceFile(node) && !ts.isImportDeclaration(node)
	)
	// All imports before first statement, mapped with import path
	const imports: Imports = vsc.tsFindAllNodePositionsFromContent(content,
		node => ts.isImportDeclaration(node) && (!firstPos || node.end < firstPos.start)
	)
		.map(([node, pos]) => ({ node, pos, path: (node as ts.ImportDeclaration).moduleSpecifier.getText() }))
	if (!imports) { return }
	//find last inport
	const lastImport = imports.sort((a, b) => b.pos.end - a.pos.end)[0]
	//sort
	imports.sort((a, b) => a.path.localeCompare(b.path))
	//split into global / local
	const globalImports: Imports = []
	const localImports: Imports = []
	imports.forEach(_import => {
		//is path in json package dependencies: (pos 1 - 0 is " or ')
		const global = !!dependencyNames.find(name => {
			return name.indexOf(_import.path) === 1
		})
		if (global) {
			globalImports.push(_import)
		} else {
			localImports.push(_import)
		}
	})
	const newImportContent =
		globalImports.map(i => i.node.getText()).join('\n')
		+ (globalImports.length > 0 ? '\n\n' : '')
		+ localImports.map(i => i.node.getText()).join('\n')
		+ '\n\n'
	//await vsc.setSelectionFromRange(lastImport.pos.range)
	await vsc.insertAt(newImportContent, 0, lastImport.pos.end)
}
