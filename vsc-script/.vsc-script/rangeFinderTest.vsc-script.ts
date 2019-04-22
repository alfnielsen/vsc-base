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
	let varFound = false
	const [_node, position] = vsc.tsFindNodePosition(source, node => {
		// test name of variable
		const nameIsCorrect = vsc.tsMatchVariable(node, { matchName: /^module/ })
		if (!nameIsCorrect) {
			return false
		}
		// test if is in function
		const funcAncestor = vsc.tsFindAncestor(node, (ancestor) => vsc.tsMatchFunction(ancestor, { matchName: /^method/ }))
		if (!funcAncestor) {
			return false
		}
		// test if is in if statement
		const ifAncestor = vsc.tsFindAncestor(node, (ancestor) => ts.isIfStatement(ancestor))
		if (!ifAncestor) {
			return false
		}
		return true
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

export const method2 = () => {
	const moduleNumber1Path = '/module/area/file1'
	return moduleNumber1Path
}
export function method1(doit: boolean) {
	if (doit) {
		const moduleNumber1Path = '/module/area/file1' // <-- Find this
		return moduleNumber1Path
	}
}

