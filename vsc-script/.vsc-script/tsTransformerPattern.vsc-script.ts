import * as vsc from 'vsc-base'
import * as ts from 'typescript'


let log = '';

type TranformarPatterTest = {
	nodeKind: ts.SyntaxKind
	childrenCount?: number,
	expression?: {
		notUndefined?: boolean,
		setRef?: string
	}
	children?: TranformarPatterTest[]
}
type TranformarPatter = {
	test: TranformarPatterTest,
	replace: {
		body?: string
	}
}


export async function run(_path: string) {
	vsc.showMessage('Start transformer test')
	// Source file content
	const testSource = `	const f = (num: number) => {
		debugger
		return [num, 'string']
	}
`
	const pattern: TranformarPatter = {
		test: {
			nodeKind: ts.SyntaxKind.ArrowFunction,
			childrenCount: 1,
			children: [
				{
					nodeKind: ts.SyntaxKind.ArrowFunction,
					expression: {
						notUndefined: true,
						setRef: 'returnExpression'
					}
				}
			],
		},
		replace: {}
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
		//const returnNodeChildren = vsc.tsGetParsedChildren(returnNode);
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

