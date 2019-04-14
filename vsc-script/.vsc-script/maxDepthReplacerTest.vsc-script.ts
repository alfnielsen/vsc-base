import * as vsc from 'vsc-base'
import * as ts from 'typescript'


let log = '';

export async function run(_path: string) {
	vsc.showMessage('Start transformer test')
	// Source file content
	const testSource = `	const f = (num: number) => {
		debugger
		return [num, 'string']
	}
`
	const pattern = {
		nodeKind: ts.SyntaxKind.ArrowFunction,
		childrenCount: 1,
		children: [
			{
				nodeKind: ts.SyntaxKind.ArrowFunction,
				expression: {

				}
			}
		]

	}

	//const [sourceFile, program] = createTsProgramFromContent(testSource);
	// Create transformer (ArrowMehtod Single Return statement transform to lambda)
	const removeDebuggerTransformer = vsc.tsCreateRemoveNodesTransformer((node) => {
		if (ts.isDebuggerStatement(node)) {
			return true
		}
		return false

	});
	//const [sourceFile, program] = createTsProgramFromContent(testSource);
	// Create transformer (ArrowMehtod Single Return statement transform to lambda)
	const arrowLambdaTranformer = vsc.tsCreateTransformer((node) => {
		if (!ts.isArrowFunction(node)) { // is not an arrow funcion
			return
		}
		const children = vsc.tsGetParsedChildren(node.body)
		if (children.length !== 1) { // dont have one statement
			return
		}
		const child = children[0]
		if (!ts.isReturnStatement(child)) { // statement is not a return statement
			return
		}
		const returnNode = child
		const returnNodeChildren = vsc.tsGetParsedChildren(returnNode);
		log += `\n/* C:: ${toString(returnNodeChildren, undefined, undefined, 2)} */\n`
		const returnExpression = returnNode.expression
		if (returnExpression === undefined) { // return statement is undefined
			return
		}
		node.body = returnExpression
		return node
	});

	const printed = vsc.tsTransform(testSource, [removeDebuggerTransformer, arrowLambdaTranformer]);

	// Add result to log
	log += `
	/* Original:
	${testSource}
	*/
	/* Trandformed:
	${printed}
	*/
		`
	// Add log to end of open document
	vsc.appendLineToActiveDocument('// ' + log + '\n\n');
	// tranforms arrowFunction with one return statement to lambda function
}


/**
 * @description 
 */
const maxDepthReplacer = (obj: unknown, maxDepth: number, currentLevel: number = 0): any => {
	if (Array.isArray(obj)) {
		if (currentLevel > maxDepth) {
			return `[vsc: maxDepth ${maxDepth} reached - Array]`
		}
		return obj.map(child => maxDepthReplacer(child, maxDepth, currentLevel + 1))
	}
	if (typeof obj === "object" && obj !== null) {
		if (currentLevel > maxDepth) {
			return `[vsc: maxDepth ${maxDepth} reached - Object]`
		}
		const children: any = {}
		for (const [key, value] of Object.entries(obj)) {
			children[key] = maxDepthReplacer(value, maxDepth, currentLevel + 1)
		}
		return children;
	}
	return obj
};

const toString = (obj: any, replacer = vsc.getJSONCircularReplacer(), space = 2, maxDepth: number = -1): string => {
	if (maxDepth >= 0) {
		let newObj = maxDepthReplacer(obj, maxDepth);
		return JSON.stringify(newObj, replacer, space)
	}
	return JSON.stringify(obj, replacer, space)
}

