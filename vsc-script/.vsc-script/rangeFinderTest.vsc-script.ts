import * as ts from 'typescript'
import * as vsc from 'vsc-base'
import * as vscode from 'vscode'
//import * as vsc from '../src/vsc-base-development/vsc-base'
import { tsIsIdentifier } from '../src/vsc-base-development/vsc-base-typescript';

//hmm

let logger = '';


export async function run(path: string) {
	const fooo = (...args: number[]) => { }
	const foo1 = (...args: number[]) => { }
	// let fileContent = await vsc.getFileContent(path);
	// fileContent = fileContent.replace('let log =', 'let logger =')
	// await vsc.saveFileContent(path, fileContent)
	// await vsc.addFileContent(path, '//CONTENT IN THE END!!!')
	// return;
	const f = [
		/**
		 * asd
		 */
		//commetn11
		//asdasd
		fooo(34, 34521, 12, 1),
		foo1(34, 36521, 12, 1),
		fooo(34, 24, 12),
		fooo(34, 24, 12, 1),
		/**
		 * sdsss
		 */
		//commetn3245
		//asd
		fooo(),
	]

	const ass = 'ParentTest'

	vsc.showMessage("Start finding node... ")
	const source = vsc.getDocumentContent()
	if (!source) {
		vsc.showMessage("No open document!")
		return
	}
	const [node1, pos1] = vsc.tsFindNodePositionFromContent(source, node => vsc.tsIsCall(node, {
		name: /^foo/,
		hasArguments: [
			arg => vsc.tsIsValue(arg, 1),
		]
	})
	)
	// vsc.showMessage(pos1.content)
	// vsc.showMessage(pos1.fullContent)
	vsc.setSelectionFromRange(pos1.range)

	// const [node1, pos1] = vsc.tsFindNodePositionFromContent(source, node => vsc.tsIsValue(node, 'ParentTest', {
	// 	hasParent: node => vsc.tsIsVariable(node, { name: 'ass' })
	// }))
	// vsc.setSelectionFromRange(pos1.range)

	vsc.showMessage("DONE")
	return

	// let varFound = false
	const [node, position] = vsc.tsFindNodePositionFromContent(source, node => {
		return vsc.tsIsIdentifier(node, {
			name: /foo3/,
			hasAncestor: (ancestor, depth) =>
				vsc.tsIsInterface(ancestor)
				&& depth === 1
		})

		// return vsc.tsIsValue(node, 1, {
		// 	hasAncestor: (ancestor) => vsc.tsIsEnumMember(ancestor, {
		// 		name: /foo/,
		// 		enumName: /foo/
		// 	})
		// })
		// return vsc.tsMatchValue(node, '/module/area/file1')

		// return vsc.tsIsValue(node, 45, {
		// 	hasAncestors: [
		// 		parent => ts.isIfStatement(parent),
		// 		parent => vsc.tsIsVariable(parent, { name: /^module/ })
		// 	]
		// })

		// test name of variable
		// return vsc.tsMatchVariable(node, {
		// 	name: /^module/,
		// 	hasAncestors: [
		// 		ancestor => vsc.tsIsFunction(ancestor, { name: /^method/ }),
		// 		ancestor => ts.isIfStatement(ancestor)
		// 	]
		// })
	})
	if (position) {
		const realTextNode = source.substring(node.pos, node.end);
		const realText = source.substring(position.start, position.end);
		//insertAt('\n  newcontent: 12,', position.start - 10);
		//const range = new vscode.Range(position.startPosition, position.startPosition);
		vsc.setSelection(position.start, position.end)
		//insertAtRange('\n  newcontent: 12,', range);
		//vsc.showMessage(realText)
		//vsc.showMessage('RE: ' + realTextNode)
		vsc.appendLineToDocument(vsc.toJSONString(position))
	} else {
		vsc.showMessage('Not found!')
	}

	// -- Select all vars::

	// const positions = vsc.tsFindAllNodePositionsFromContent(source, node =>
	// 	vsc.tsIsIdentifier(node, { name: /^module/ })
	// )
	// vsc.setSelectionsFromRanges(positions.map(([, p]) => p.range);


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
