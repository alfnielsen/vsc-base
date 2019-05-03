import * as vsc from 'vsc-base'
//import * as vsc from '../src/vsc-base-development/vsc-base'

import * as ts from 'typescript'
import * as vscode from 'vscode'

let log = '';


export async function run(path: string) {
	vsc.showMessage("Start finding node... ")
	const source = vsc.getDocumentContent()
	if (!source) {
		vsc.showMessage("No opnen document!")
		return
	}
	// let varFound = false
	const [, position] = vsc.tsFindNodePositionFromContent(source, node => {
		return !!vsc.tsMatchIdentifier(node, {
			name: /foo/,
			hasAncestor: (ancestor, depth) =>
				!!vsc.tsMatchInterface(ancestor)
				&& depth === 1

		})

		// return !!vsc.tsMatchValue(node, 1, {
		// 	hasAncestor: (ancestor) => !!vsc.tsMatchEnumMember(ancestor, {
		// 		name: /foo/,
		// 		enumName: /foo/
		// 	})
		// })
		// return vsc.tsMatchValue(node, '/module/area/file1')

		// return vsc.tsMatchValue(node, 45, {
		// 	hasAncestors: [
		// 		parent => ts.isIfStatement(parent),
		// 		parent => !!vsc.tsMatchVariable(parent, { name: /^module/ })
		// 	]
		// })
		// test name of variable
		// const nameIsCorrect = vsc.tsMatchVariable(node, { matchName: /^module/ })
		// if (!nameIsCorrect) {
		// 	return false
		// }
		// // test if is in function
		// const funcAncestor = vsc.tsFindAncestor(node, (ancestor) => vsc.tsMatchFunction(ancestor, { matchName: /^method/ }))
		// if (!funcAncestor) {
		// 	return false
		// }
		// // test if is in if statement
		// const ifAncestor = vsc.tsFindAncestor(node, (ancestor) => ts.isIfStatement(ancestor))
		// if (!ifAncestor) {
		// 	return false
		// }
		// return true
	})
	if (position) {
		const realText = source.substring(position.start, position.end);
		//insertAt('\n  newcontent: 12,', position.start - 10);
		//const range = new vscode.Range(position.startPosition, position.startPosition);
		vsc.setSelection(position.start, position.end)
		//insertAtRange('\n  newcontent: 12,', range);
		vsc.showMessage(realText)
		//vsc.appendLineToActiveDocument(vsc.toJSONString(position))
	} else {
		vsc.showMessage('Not found!')
	}
}

interface foo33 {

}

export const method2 = () => {
	const moduleNumber1Path = '/module/area/file1'
	return moduleNumber1Path
}
export function method1(doit: boolean) {
	if (doit) {
		const moduleNumber1Path = '/module/area/file1' // <-- Find this
		const moduleNumber3Path = true // <-- Find this
		const moduleNumber2Path = 45 // <-- Find this
		const moduleNumber4Path = [1, 2] // <-- Find this
		const moduleNumber5Path = () => { } // <-- Find this
		return moduleNumber1Path
	}
}

enum foo {
	foo1 = 1 //<-- FIND this
}