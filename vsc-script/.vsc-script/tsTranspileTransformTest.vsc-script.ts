import * as vsc from 'vsc-base'
import * as ts from 'typescript'

type vscTsTransformer = (node: ts.Node, typeChecker: ts.TypeChecker, program: ts.Program) => [boolean, ts.Node | undefined];

let log = '';

export async function run(_path: string) {
	vsc.showMessage('Start transformer test')
	// source file content
	const testSource = `	const f = (num: number) => {
		return [num, 'string']
	}
`
	// compilerOptions
	const compilerOptions = {
		module: ts.ModuleKind.CommonJS,
		target: ts.ScriptTarget.ES2015,
		libs: ['es6']
	}
	// create a ts.SourceFile from content
	let sourceFile = ts.createSourceFile(
		'Name1',
		testSource,
		ts.ScriptTarget.ES2015,
		/*setParentNodes */ true
	);
	// create a ts.Program from sourcefile
	const program = ts.createProgram(['Name1'], compilerOptions);
	// Create program typechecker
	const typeChecker = program.getTypeChecker()
	// create transformer
	const sourceFileTransformer = transformerArrowFunctionFactory(program)


	//const checker = ts.getTypeChecker()
	const printer: ts.Printer = ts.createPrinter();
	const printerJS: ts.Printer = ts.createPrinter()

	//const dummyContext = getTransformationContext(compilerOptions);
	//const dummyTransformer = sourceFileTransformer(dummyContext);
	// const updatedSourceFile = dummyTransformer(sourceFile)

	const errors = [];
	const transformResult = ts.transform(sourceFile, [sourceFileTransformer], compilerOptions)

	const updatedSourceFile = transformResult.transformed[0]

	const printed = printer.printFile(updatedSourceFile)


	transformResult.dispose()

	//const json = JSON.stringify(updatedSourceFile, null, 2)

	log += `
	/* Compiled ts (Including transformer)
	
	${updatedSourceFile.getText()}
	
	*/
		`
	log += `
	/* printed::
	
	${printed}
	
	*/
		`


	// const customTransformers: ts.CustomTransformers = {
	// 	before: [sourceFileTransformer]
	// }
	// const customTransformersNormal: ts.CustomTransformers = {
	// 	before: []
	// }


	// const tst = ts.transpileModule(testSource, {
	// 	compilerOptions,
	// 	transformers: customTransformers
	// })
	// const tstNormal = ts.transpileModule(testSource, {
	// 	compilerOptions,
	// 	transformers: customTransformersNormal
	// })


	vsc.appendLineToActiveDocument('// ' + log + '\n\n');
}

/**
 * @description
 * Create Basic Ts Transformer \
 * You can use https://ts-ast-viewer.com/ to generate the new node or node type.
 * @see http://vsc-base.org/#awaitResult
 * @vscType System
 * @oneLineEx const transformer = vsc.createTranformer(transformerCallback)
 * @ex 
 * @returns (callback: (node: ts.Node) => [boolean | undefined, ts.Node | undefined]) => <T extends ts.Node>() => ts.TransformerFactory<T>
 */
const createTransformerFactory = <T extends ts.Node>(program: ts.Program, callback: vscTsTransformer): ts.TransformerFactory<T> => {
	const typeChecker = program.getTypeChecker()
	// function TsTransformer<T extends ts.Node>(): ts.TransformerFactory<T> {
	// 	return (context) => {
	// 		const visit: ts.Visitor = (node) => {
	// 			log += `\n //####### ${JSON.stringify(node.getText())} \n//`
	// 			const [replaceNode, tranformerResult] = callback(node, typeChecker, program);
	// 			if (replaceNode) {
	// 				return tranformerResult;
	// 			}
	// 			return ts.visitEachChild(node, (child) => visit(child), context);
	// 		}
	// 		return (node) => ts.visitNode(node, visit);
	// 	};
	// }
	//return TsTransformer();
	return (context) => {
		const visit: ts.Visitor = (node) => {
			log += `\n //####### ${JSON.stringify(node.getText())} \n//`
			const [replaceNode, tranformerResult] = callback(node, typeChecker, program);
			if (replaceNode) {
				return tranformerResult;
			}
			return ts.visitEachChild(node, (child) => visit(child), context);
		}
		return (node) => ts.visitNode(node, visit);
	};
}
//const createTransformerFactory = (program: ts.Program, callback: vscTsTransformer) => createTransformerFactoryBase(program, callback);

const parsedNodeChildrenCount = (node: ts.Node): [number, ts.Node] => {
	let count = 0;
	let lastChild: ts.Node
	node.forEachChild(c => {
		count++;
		lastChild = c
	})
	return [count, lastChild];
}

// In this example we test is the node is an arrow function with only one return statement: () => { return 1 }
// If it is we rewrite it to a lambda fundion: () =>  1

const raw: vscTsTransformer = (node, typeChecker, program) => {
	if (!node) { // is not an arrow funcion
		return [false, undefined]
	}
	if (!ts.isArrowFunction(node)) { // is not an arrow funcion
		return [false, undefined]
	}
	log += ` - isArrow`
	const [count, child] = parsedNodeChildrenCount(node.body)
	log += ` childCount: '${count}' `
	if (count !== 1) { // dont have one statement
		return [false, undefined]
	}
	log += ` childType: '${ts.SyntaxKind[child.kind]}' `

	if (!ts.isReturnStatement(child)) { // statement is not a return statement
		return [false, undefined]
	}
	log += ` - Chils is Return statement`
	const returnNode = child
	const returnExpression = returnNode.expression
	if (returnExpression === undefined) { // return statement is undefined
		return [false, undefined]
	}
	log += ` - All good!!!`
	//return arrow function body with the return statement's expression
	node.body = returnExpression
	return [true, node]
}

const transformerArrowFunctionFactory = (program: ts.Program) => createTransformerFactory<ts.SourceFile>(program, raw);

// /**
//  * Create a dummy context!
//  * @param compilerOptions 
//  */
// const getTransformationContext = (compilerOptions: ts.CompilerOptions) => {
// 	let empty = () => { };
// 	let context: ts.TransformationContext = {
// 		startLexicalEnvironment: empty,
// 		suspendLexicalEnvironment: empty,
// 		resumeLexicalEnvironment: empty,
// 		endLexicalEnvironment: () => [],
// 		getCompilerOptions: () => compilerOptions,
// 		hoistFunctionDeclaration: empty,
// 		hoistVariableDeclaration: empty,
// 		readEmitHelpers: () => undefined,
// 		requestEmitHelper: empty,
// 		enableEmitNotification: empty,
// 		enableSubstitution: empty,
// 		isEmitNotificationEnabled: () => false,
// 		isSubstitutionEnabled: () => false,
// 		onEmitNode: empty,
// 		onSubstituteNode: (hint, node) => node,
// 	};
// 	return context
// }

