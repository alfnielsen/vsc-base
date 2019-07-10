//vsc-script-name: tsTranspileTransformTest.vsc-script
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
	//const [sourceFile, program] = createTsProgramFromContent(testSource);
	// Create transformer (ArrowMehtod Single Return statement transform to lambda)
	const removeDebuggerTransformner = createTsRemoveNodesTransformerFactory((node) => {
		if (ts.isDebuggerStatement(node)) {
			return true
		}
		return false

	});
	//const [sourceFile, program] = createTsProgramFromContent(testSource);
	// Create transformer (ArrowMehtod Single Return statement transform to lambda)
	const arrowLambdaTranformer = createTsTransformerFactory((node) => {
		if (!ts.isArrowFunction(node)) { // is not an arrow funcion
			return
		}
		const children = tsGetParsedChildrenNodes(node.body)
		if (children.length !== 1) { // dont have one statement
			return
		}
		const child = children[0]
		if (!ts.isReturnStatement(child)) { // statement is not a return statement
			return
		}
		const returnNode = child
		const returnExpression = returnNode.expression
		if (returnExpression === undefined) { // return statement is undefined
			return
		}
		node.body = returnExpression
		return node
	});

	const printed = tsTransform(testSource, [removeDebuggerTransformner, arrowLambdaTranformer]);

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
	const result = tsTransformSourceFile<ts.SourceFile>(sourceFile, transformers, compilerOptions)
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
const tsTransformSourceFile = <T extends ts.Node = ts.SourceFile>(
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
// /**
//  * 
//  * @param content 
//  * @param compilerOptions 
//  * @param sourceFileName 
//  */
// const createTsProgramFromContent = (
// 	content: string,
// 	compilerOptions: ts.CompilerOptions = VscDefaultTsCompilerOptions,
// 	sourceFileName = `sourcefile_${(new Date().getTime())}`
// ): [ts.SourceFile, ts.Program] => {
// 	let sourceFile = ts.createSourceFile(
// 		sourceFileName,
// 		content,
// 		ts.ScriptTarget.ES2015,
// 		/*setParentNodes */ true
// 	);
// 	const program = ts.createProgram([sourceFileName], compilerOptions);
// 	return [sourceFile, program]
// }

/**
 * @description
 * Create Basic Ts Transformer \
 * You can use https://ts-ast-viewer.com/ to generate the new node or node type.
 * @see http://vsc-base.org/#createTsTransformerFactory
 * @vscType System
 * @oneLineEx const transformer = vsc.createTranformer(transformerCallback)
 * @ex 
 * @returns (callback: (node: ts.Node) => [boolean | undefined, ts.Node | undefined]) => <T extends ts.Node>() => ts.TransformerFactory<T>
 */
const createTsTransformerFactory = <T extends ts.Node = ts.SourceFile>(callback: vscTsTransformer, program?: ts.Program): ts.TransformerFactory<T> => {
	let typeChecker: ts.TypeChecker | undefined
	if (program) {
		typeChecker = program.getTypeChecker()
	}
	return (context) => {
		const visit: ts.Visitor = (node) => {
			const replaceNode = callback(node, typeChecker, program);
			if (replaceNode === undefined) {
				return ts.visitEachChild(node, (child) => visit(child), context);
			}
			return replaceNode;
		}
		return (node) => ts.visitNode(node, visit);
	};
}
type vscTsTransformer = (node: ts.Node, typeChecker?: ts.TypeChecker, program?: ts.Program) => ts.Node | undefined;

/**
 * @description
 * Create Basic Ts Transformer for removing nodes \
 * You can use https://ts-ast-viewer.com/ to generate the new node or node type.
 * @see http://vsc-base.org/#createTsRemoveNodesTransformerFactory
 * @vscType System
 * @oneLineEx const transformer = vsc.createTranformer(transformerCallback)
 * @ex 
 * @returns (callback: (node: ts.Node) => [boolean | undefined, ts.Node | undefined]) => <T extends ts.Node>() => ts.TransformerFactory<T>
 */
const createTsRemoveNodesTransformerFactory = <T extends ts.Node = ts.SourceFile>(callback: vscTsRemoveTransformer, program?: ts.Program): ts.TransformerFactory<T> => {
	let typeChecker: ts.TypeChecker | undefined
	if (program) {
		typeChecker = program.getTypeChecker()
	}
	return (context) => {
		const visit: ts.Visitor = (node) => {
			const shouldRemove = callback(node, typeChecker, program);
			if (!shouldRemove) {
				return ts.visitEachChild(node, (child) => visit(child), context);
			}
			return undefined; // This will remove the node
		}
		return (node) => ts.visitNode(node, visit);
	};
}
type vscTsRemoveTransformer = (node: ts.Node, typeChecker?: ts.TypeChecker, program?: ts.Program) => boolean;


/**
 * @description 
 * ts.Node's getChildren and getChildrenCount uses tokens not parsed nodes. \
 * So to this method uses ts's forEachChild to colloct the parsed nodes. \
 * Mostly used in custom transformer method
 * @experimantal This method can easily change, because ts api is only in experimantal state.
 * @params node
 * @see http://vsc-base.org/#tsParsedNodeChildrenCount
 * @vscType ts
 * @oneLineEx const children = vsc.tsGetParsedChildrenNodes(node)
 */
export const tsGetParsedChildrenNodes = (node: ts.Node): ts.Node[] => {
	let chrindren: ts.Node[] = []
	node.forEachChild(c => { chrindren.push(c) });
	return chrindren
}





// 
/* Original:
	const f = (num: number) => {
	debugger
	return [num, 'string']
}

*/
/* Trandformed:
const f = (num: number) => [num, 'string'];

*/


