
// ------------------ Error log from script -------------- //
// type: 105: Running compiled 'run' method. The error is in the 'run' method.
// time: 2019-04-14T17:43:44.022Z
// selectedScript.path: /Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/.vsc-script/tsTransformerPattern.vsc-script.ts
// path: [object Object]
// error 
var info = {
   "isError": true,
   "type": "TypeError",
   "stack": "TypeError: Converting circular structure to JSON\n\tat JSON.stringify (<anonymous>)\n\tat vsc.tsCreateTransformer (eval at <anonymous> (/Users/alfnielsen/.vscode/extensions/alfnielsen.vsc-script-0.3.1/dist/extension.js:16:2181160), <anonymous>:58:35)\n\tat i (/Users/alfnielsen/.vscode/extensions/alfnielsen.vsc-script-0.3.1/dist/extension.js:16:2182238)\n\tat module.exports.exports.tsCreateTransformer.ts.visitEachChild.e (/Users/alfnielsen/.vscode/extensions/alfnielsen.vsc-script-0.3.1/dist/extension.js:16:2182288)\n\tat r (/Users/alfnielsen/.vscode/extensions/alfnielsen.vsc-script-0.3.1/dist/extension.js:16:1183192)\n\tat Object.module.exports.e.visitEachChild (/Users/alfnielsen/.vscode/extensions/alfnielsen.vsc-script-0.3.1/dist/extension.js:16:1194969)\n\tat i (/Users/alfnielsen/.vscode/extensions/alfnielsen.vsc-script-0.3.1/dist/extension.js:16:2182268)\n\tat module.exports.exports.tsCreateTransformer.ts.visitEachChild.e (/Users/alfnielsen/.vscode/extensions/alfnielsen.vsc-script-0.3.1/dist/extension.js:16:2182288)\n\tat n (/Users/alfnielsen/.vscode/extensions/alfnielsen.vsc-script-0.3.1/dist/extension.js:16:1183693)\n\tat Object.module.exports.e.visitEachChild (/Users/alfnielsen/.vscode/extensions/alfnielsen.vsc-script-0.3.1/dist/extension.js:16:1195054)\n\tat i (/Users/alfnielsen/.vscode/extensions/alfnielsen.vsc-script-0.3.1/dist/extension.js:16:2182268)\n\tat module.exports.exports.tsCreateTransformer.ts.visitEachChild.e (/Users/alfnielsen/.vscode/extensions/alfnielsen.vsc-script-0.3.1/dist/extension.js:16:2182288)\n\tat r (/Users/alfnielsen/.vscode/extensions/alfnielsen.vsc-script-0.3.1/dist/extension.js:16:1183192)\n\tat Object.module.exports.e.visitEachChild (/Users/alfnielsen/.vscode/extensions/alfnielsen.vsc-script-0.3.1/dist/extension.js:16:1193155)\n\tat i (/Users/alfnielsen/.vscode/extensions/alfnielsen.vsc-script-0.3.1/dist/extension.js:16:2182268)\n\tat module.exports.exports.tsCreateTransformer.ts.visitEachChild.e (/Users/alfnielsen/.vscode/extensions/alfnielsen.vsc-script-0.3.1/dist/extension.js:16:2182288)\n\tat n (/Users/alfnielsen/.vscode/extensions/alfnielsen.vsc-script-0.3.1/dist/extension.js:16:1183693)\n\tat i (/Users/alfnielsen/.vscode/extensions/alfnielsen.vsc-script-0.3.1/dist/extension.js:16:1184086)\n\tat Object.module.exports.e.visitEachChild (/Users/alfnielsen/.vscode/extensions/alfnielsen.vsc-script-0.3.1/dist/extension.js:16:1199877)\n\tat i (/Users/alfnielsen/.vscode/extensions/alfnielsen.vsc-script-0.3.1/dist/extension.js:16:2182268)\n\tat Object.r [as visitNode] (/Users/alfnielsen/.vscode/extensions/alfnielsen.vsc-script-0.3.1/dist/extension.js:16:1183192)\n\tat module.exports.exports.tsCreateTransformer.e (/Users/alfnielsen/.vscode/extensions/alfnielsen.vsc-script-0.3.1/dist/extension.js:16:2182312)\n\tat /Users/alfnielsen/.vscode/extensions/alfnielsen.vsc-script-0.3.1/dist/extension.js:16:13100\n\tat Object.a [as map] (/Users/alfnielsen/.vscode/extensions/alfnielsen.vsc-script-0.3.1/dist/extension.js:16:3995)\n\tat Object.module.exports.e.transformNodes (/Users/alfnielsen/.vscode/extensions/alfnielsen.vsc-script-0.3.1/dist/extension.js:16:1439039)\n\tat Object.module.exports.e.transform (/Users/alfnielsen/.vscode/extensions/alfnielsen.vsc-script-0.3.1/dist/extension.js:16:2092253)\n\tat Object.module.exports.exports.tsTransformSourceFile (/Users/alfnielsen/.vscode/extensions/alfnielsen.vsc-script-0.3.1/dist/extension.js:16:2181795)\n\tat Object.module.exports.exports.tsTransform (/Users/alfnielsen/.vscode/extensions/alfnielsen.vsc-script-0.3.1/dist/extension.js:16:2181635)\n\tat Object.eval (eval at <anonymous> (/Users/alfnielsen/.vscode/extensions/alfnielsen.vsc-script-0.3.1/dist/extension.js:16:2181160), <anonymous>:66:29)\n\tat Generator.next (<anonymous>)\n\tat __awaiter (eval at <anonymous> (/Users/alfnielsen/.vscode/extensions/alfnielsen.vsc-script-0.3.1/dist/extension.js:16:2181160), <anonymous>:8:71)\n\tat new Promise (<anonymous>)\n\tat __awaiter (eval at <anonymous> (/Users/alfnielsen/.vscode/extensions/alfnielsen.vsc-script-0.3.1/dist/extension.js:16:2181160), <anonymous>:4:12)\n\tat Object.run (eval at <anonymous> (/Users/alfnielsen/.vscode/extensions/alfnielsen.vsc-script-0.3.1/dist/extension.js:16:2181160), <anonymous>:16:12)\n\tat module.exports.t.default.<anonymous> (/Users/alfnielsen/.vscode/extensions/alfnielsen.vsc-script-0.3.1/dist/extension.js:16:2121237)\n\tat Generator.next (<anonymous>)\n\tat o (/Users/alfnielsen/.vscode/extensions/alfnielsen.vsc-script-0.3.1/dist/extension.js:16:2119421)",
   "message": "Converting circular structure to JSON"
}
// ts transpiled js code:
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/* const vsc = require("vsc-base") // vsc-base has change the ts transpiled code here. */;
/* const ts = require("typescript") // vsc-base has change the ts transpiled code here. */;
let log = '';
function run(_path) {
    return __awaiter(this, void 0, void 0, function* () {
        vsc.showMessage('Start transformer test');
        // Source file content
        const testSource = `	const f = (num: number) => {
		debugger
		return [num, 'string']
	}
`;
        const pattern = {
            nodeKind: ts.SyntaxKind.ArrowFunction,
            childrenCount: 1,
            children: [
                {
                    nodeKind: ts.SyntaxKind.ArrowFunction,
                    expression: {}
                }
            ]
        };
        //const [sourceFile, program] = createTsProgramFromContent(testSource);
        // Create transformer (ArrowMehtod Single Return statement transform to lambda)
        const removeDebuggerTransformer = vsc.tsCreateRemoveNodesTransformer((node) => {
            if (ts.isDebuggerStatement(node)) {
                return true;
            }
            return false;
        });
        //const [sourceFile, program] = createTsProgramFromContent(testSource);
        // Create transformer (ArrowMehtod Single Return statement transform to lambda)
        const arrowLambdaTranformer = vsc.tsCreateTransformer((node) => {
            if (!ts.isArrowFunction(node)) { // is not an arrow funcion
                return;
            }
            const children = vsc.tsGetParsedChildren(node.body);
            if (children.length !== 1) { // dont have one statement
                return;
            }
            const child = children[0];
            if (!ts.isReturnStatement(child)) { // statement is not a return statement
                return;
            }
            const returnNode = child;
            const returnNodeChildren = vsc.tsGetParsedChildren(returnNode);
            log += `/* C:: ${JSON.stringify(returnNodeChildren)} */\n`;
            const returnExpression = returnNode.expression;
            if (returnExpression === undefined) { // return statement is undefined
                return;
            }
            node.body = returnExpression;
            return node;
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
		`;
        // Add log to end of open document
        vsc.appendLineToActiveDocument('// ' + log + '\n\n');
        // tranforms arrowFunction with one return statement to lambda function
    });
}
exports.run = run;


