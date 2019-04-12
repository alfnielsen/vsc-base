import * as vsc from 'vsc-base'
import * as ts from 'typescript'

type vscTsTransformer = (node: ts.Node, typeChecker: ts.TypeChecker, program: ts.Program) => [true, ts.Node | undefined] | undefined;

let log = '';

export async function run(_path: string) {
	vsc.showMessage('Start transformer test')
	// Source file content
	const testSource = `	const f = (num: number) => {
		return [num, 'string']
	}
`
	const [sourceFile, program] = createTsProgramFromContent(testSource);
	// Create transformer (ArrowMehtod Single Return statement transform to lambda)
	const sourceFileTransformer = transformerArrowFunctionFactory(program)
	// Do tranforming
	// const transformResult = tsTransform(sourceFile, [sourceFileTransformer])
	// // Get tranfor result
	// const updatedSourceFile = transformResult.transformed[0]

	const printed = tsTransform(testSource, [sourceFileTransformer]);
	// Create printer
	const printer: ts.Printer = ts.createPrinter();
	// Print
	// const printed = printer.printFile(updatedSourceFile)
	// Dispose of transformer
	// transformResult.dispose()

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
}

/**
 * 
 * @param sourceFile 
 * @param transformers 
 * @param compilerOptions 
 */
const tsTransform = (
	source: string,
	transformers: ts.TransformerFactory<ts.SourceFile>[],
	compilerOptions: ts.CompilerOptions = VscDefaultTsCompilerOptions,
	printer: ts.Printer = ts.createPrinter()
): string => {
	const sourceFile = createTsSourceFile(source)
	const result = tsTransformBase<ts.SourceFile>(sourceFile, transformers, compilerOptions)
	const transformedSourceFile = result.transformed[0];
	const print = printer.printFile(transformedSourceFile)
	result.dispose()
	return print
}

/**
 * 
 * @param sourceFile 
 * @param transformers 
 * @param compilerOptions 
 */
const tsTransformBase = <T extends ts.Node = ts.SourceFile>(
	sourceFile: T,
	transformers: ts.TransformerFactory<T>[],
	compilerOptions: ts.CompilerOptions = VscDefaultTsCompilerOptions
) => {
	return ts.transform<T>(sourceFile, transformers, compilerOptions)
}

/**
 * 
 */
const VscDefaultTsCompilerOptions: Readonly<ts.CompilerOptions> = ({
	module: ts.ModuleKind.CommonJS,
	target: ts.ScriptTarget.ES2015,
	libs: ['es6']
})

/**
 * 
 * @param content 
 * @param sourceFileName 
 */
const createTsSourceFile = (
	content: string,
	sourceFileName = `sourcefile_${(new Date().getTime())}`
): ts.SourceFile => {
	let sourceFile = ts.createSourceFile(
		sourceFileName,
		content,
		ts.ScriptTarget.ES2015,
		/*setParentNodes */ true
	);
	return sourceFile;
}
/**
 * 
 * @param content 
 * @param compilerOptions 
 * @param sourceFileName 
 */
const createTsProgramFromContent = (
	content: string,
	compilerOptions: ts.CompilerOptions = VscDefaultTsCompilerOptions,
	sourceFileName = `sourcefile_${(new Date().getTime())}`
): [ts.SourceFile, ts.Program] => {
	let sourceFile = ts.createSourceFile(
		sourceFileName,
		content,
		ts.ScriptTarget.ES2015,
		/*setParentNodes */ true
	);
	const program = ts.createProgram([sourceFileName], compilerOptions);
	return [sourceFile, program]
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
const createTsTransformerFactory = <T extends ts.Node>(program: ts.Program, callback: vscTsTransformer): ts.TransformerFactory<T> => {
	const typeChecker = program.getTypeChecker()
	return (context) => {
		const visit: ts.Visitor = (node) => {
			// log += `\n //####### ${JSON.stringify(node.getText())} \n//`
			const result = callback(node, typeChecker, program);
			if (result === undefined) {
				return ts.visitEachChild(node, (child) => visit(child), context);
			}
			const [replaceNode, tranformerResult] = result;
			if (replaceNode) {
				return tranformerResult;
			}
		}
		return (node) => ts.visitNode(node, visit);
	};
}

/**
 * ts.Node's getChildren and getChildrenCount uses tokens not parsed nodes.
 * So to get node count and 
 * @param node $$
 */
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
	if (!ts.isArrowFunction(node)) { // is not an arrow funcion
		return
	}
	// log += ` - isArrow`
	//const children = node.body.getChildren();
	// children.forEach(c => {
	// 	log += `//c: ${c.getText()} \n`
	// })
	const [count, child] = parsedNodeChildrenCount(node.body)
	// log += ` childCount: '${count}' `
	if (count !== 1) { // dont have one statement
		return
	}
	// log += ` childType: '${ts.SyntaxKind[child.kind]}' `

	if (!ts.isReturnStatement(child)) { // statement is not a return statement
		return
	}
	// log += ` - Chils is Return statement`
	const returnNode = child
	const returnExpression = returnNode.expression

	// const symbol = typeChecker.getSymbolAtLocation(returnNode);
	// if (symbol) {
	// 	const type = typeChecker.getDeclaredTypeOfSymbol(symbol);
	// 	const properties = typeChecker.getPropertiesOfType(type);
	// 	log += ' - type-properties: ' + properties.map(declaration => declaration.name).join(',');
	// }
	if (returnExpression === undefined) { // return statement is undefined
		return
	}
	// log += ` - All good!!!`
	//return arrow function body with the return statement's expression
	node.body = returnExpression
	return [true, node]
}

const transformerArrowFunctionFactory = (program: ts.Program) => createTsTransformerFactory<ts.SourceFile>(program, raw);

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




// 
/* Original:

const f = (num: number) => {
	return [num, 'string']
}

*/
/* Trandformed:

const f = (num: number) => [num, 'string'];

*/


