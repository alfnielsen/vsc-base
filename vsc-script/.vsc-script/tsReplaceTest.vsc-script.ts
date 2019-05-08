import * as vsc from 'vsc-base'
//import * as vsc from '../src/vsc-base-development/vsc-base'

import * as ts from 'typescript'

export async function run(path: string) {
	vsc.showMessage("Start finding node... ")


	let source = `
		const method2 = () => {
			const moduleNumber1Path = '/module/area/file1'
			return moduleNumber1Path
		}
		`
	source = vsc.tsReplace(source, "'/module/area/file2'", node => vsc.tsIsValue(node, /file1/, {
		hasAncestors: [
			ancestor => vsc.tsIsFunction(ancestor, { name: /^method/ }),
			//ancestor => vsc.tsIsVariable(ancestor, { name: /^module.*Path/ })
		]
	}))
	// Find a constant with name starting with 'module' witin a function but not in an if statement
	source = vsc.tsReplaceAll(source, 'moduleNumber21231231212312313', node => vsc.tsIsIdentifier(node, {
		name: 'moduleNumber1Path'
	}))

	vsc.appendLineToDocument(source);

}
