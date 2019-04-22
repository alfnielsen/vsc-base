
// ------------------ Error log from script -------------- //
// type: 105: Running compiled 'run' method. The error is in the 'run' method.
// time: 2019-04-21T12:21:42.064Z
// selectedScript.path: /Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/.vsc-script/rangeFinderTest.vsc-script.ts
// path: [object Object]
// error:
// Error handler find first error in extension.js: 
var info = {
   "isError": true,
   "type": "TypeError",
   "stack": "TypeError: Cannot read property 'kind' of undefined\n\tat Object.isSourceFile (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:17331:21)\n\tat emitShebangIfNeeded (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:89370:20)\n\tat writeFile (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:87067:13)\n\tat Object.printFile (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:86936:13)\n\tat Object.module.exports.exports.tsTransform (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:135180:27)\n\tat tsFindNodePosition (eval at <anonymous> (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:135108:9), <anonymous>:190:9)\n\tat Object.eval (eval at <anonymous> (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:135108:9), <anonymous>:21:26)\n\tat Generator.next (<anonymous>)\n\tat __awaiter (eval at <anonymous> (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:135108:9), <anonymous>:8:71)\n\tat new Promise (<anonymous>)\n\tat __awaiter (eval at <anonymous> (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:135108:9), <anonymous>:4:12)\n\tat Object.run (eval at <anonymous> (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:135108:9), <anonymous>:17:12)\n\tat Script.<anonymous> (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:223:47)\n\tat Generator.next (<anonymous>)\n\tat fulfilled (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:138:58)",
   "message": "Cannot read property 'kind' of undefined"
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
/* const vscode = require("vscode") // vsc-base has change the ts transpiled code here. */;
let log = '';
function run(path) {
    return __awaiter(this, void 0, void 0, function* () {
        vsc.showMessage("Start finding node...");
        const source = vsc.getDocumentContent();
        let varFound = false;
        const position = tsFindNodePosition(source, (node, context) => {
            const matchFunc = exports.tsMatchFunction(node, { matchName: /^tsMatch/ });
            if (matchFunc) {
                return false;
            }
            const funcChild = exports.tsMatchGrandChild(node, context, (childFunc, _depth) => {
                if (!exports.tsMatchFunction(childFunc)) {
                    return false;
                }
                const forChild = exports.tsMatchGrandChild(childFunc, context, (child) => {
                    return ts.isForStatement(child);
                });
                return !!forChild;
            });
            return funcChild !== undefined;
            // if (tsMatchFunction(node, {matchName: /^visitor/ })) {
            // 	return true
            // }
            // if (
            // 	tsMatchObjectProperty(node, {matchName: /^some$/ })
            // 	&&
            // 	tsMatchAnsector(node, (ancestor) => {
            // 		return tsMatchVariable({
            // 			node: ancestor,
            // 			isConst: true,
            // 			matchName: /^test$/
            // 		})
            // 	})
            // 	&&
            // 	tsMatchAnsector(node, (ancestor) => {
            // 		return tsMatchFunctionLike({
            // 			node: ancestor,
            // 			matchName: /^foo/
            // 		})
            // 	})
            // ) {
            // 	return true;
            // }
        });
        if (position) {
            const realText = source.substring(position.start, position.end);
            //insertAt('\n  newcontent: 12,', position.start - 10);
            //const range = new vscode.Range(position.startPosition, position.startPosition);
            setSelection(position.start, position.end);
            //insertAtRange('\n  newcontent: 12,', range);
            vsc.showMessage(realText);
            //vsc.appendLineToActiveDocument(vsc.toJSONString(position))
        }
        else {
            vsc.showMessage('Not found!');
        }
    });
}
exports.run = run;
function foo() {
    const test666 = {
        some: 1,
        some2: 3
    };
}
exports.test = {
    some: 1,
    some2: 3
};
exports.tsMatchChild = (node, callback) => {
    const children = vsc.tsGetParsedChildren(node);
    for (let index = 0; index < children.length; index++) {
        const child = children[index];
        const found = callback(child);
        if (found) {
            return child;
        }
    }
    return undefined;
};
exports.tsMatchGrandChild = (node, context, callback) => {
    let found = undefined;
    const visit = (node) => {
        if (found) {
            return;
        }
        const result = callback(node, 0);
        if (result) {
            found = node;
        }
        else {
            return ts.visitEachChild(node, (child) => visit(child), context);
        }
    };
    ts.visitNode(node, visit);
    return found;
};
exports.tsMatchAnsector = (node, callback) => {
    let ansector = node.parent, depth = 0;
    while (ansector) {
        depth += 1;
        const found = callback(ansector, depth);
        if (found) {
            return ansector;
        }
        ansector = ansector.parent;
    }
    return undefined;
};
exports.tsMatchObjectProperty = (node, { matchName } = {}) => {
    if (!ts.isPropertyAssignment(node)) {
        return false;
    }
    if (matchName !== undefined && !matchName.test(node.name.getText())) {
        return false;
    }
    return true;
};
exports.tsMatchVariable = (node, { matchName, isConst, isLet, isVar } = {}) => {
    if (!ts.isVariableDeclaration(node)) {
        return false;
    }
    if (matchName !== undefined && !matchName.test(node.name.getText())) {
        return false;
    }
    if (isConst !== undefined && (!node.parent || node.parent.flags !== 2)) {
        return false;
    }
    if (isLet !== undefined && (!node.parent || node.parent.flags !== 1)) {
        return false;
    }
    if (isVar !== undefined && (!node.parent || node.parent.flags !== 0)) {
        return false;
    }
    return true;
};
exports.tsMatchFunction = (node, { matchName } = {}) => {
    if (!ts.isFunctionLike(node)) {
        return false;
    }
    if (matchName !== undefined) {
        let name;
        if ((ts.isArrowFunction(node) || ts.isFunctionExpression(node)) && ts.isVariableDeclaration(node.parent)) {
            name = node.parent.name.getText();
        }
        if (ts.isFunctionDeclaration(node)) {
            name = node.name.getText();
        }
        if (!matchName.test(name)) {
            return false;
        }
    }
    return true;
};
const tsFindNodePosition = (source, callback, program, findAll = false) => {
    let position;
    let typeChecker;
    if (program) {
        typeChecker = program.getTypeChecker();
    }
    const visitor = (context) => {
        const visit = (node) => {
            const found = callback(node, context, typeChecker, program);
            if (!found) {
                return ts.visitEachChild(node, (child) => visit(child), context);
            }
            if (node === undefined) {
                throw new Error('Node is undefined!!!');
            }
            position = getComplexRangeObject(source, node.pos, node.end);
            position.node = node;
        };
        return (node) => ts.visitNode(node, visit);
    };
    vsc.tsTransform(source, [visitor]);
    return position;
};
const insertAtRange = (content, range, editor) => __awaiter(this, void 0, void 0, function* () {
    if (editor === undefined) {
        editor = vsc.getActiveEditor();
    }
    if (editor === undefined) {
        return Promise.resolve(false);
    }
    const snippetString = new vscode.SnippetString(content);
    yield editor.insertSnippet(snippetString, range);
    return true;
});
const insertAt = (content, start, end = start, editor) => __awaiter(this, void 0, void 0, function* () {
    if (editor === undefined) {
        editor = vsc.getActiveEditor();
    }
    if (editor === undefined) {
        return Promise.resolve(false);
    }
    const source = editor.document.getText();
    const pos = getComplexRangeObject(source, start, end);
    const snippetString = new vscode.SnippetString(content);
    yield editor.insertSnippet(snippetString, pos.range);
    return true;
});
const getComplexRangeObject = (source, start, end = start) => {
    const startLines = source.substr(0, start).split("\n");
    const endLines = source.substr(0, end).split("\n");
    const startLineNumber = startLines.length - 1;
    const endLineNumber = endLines.length - 1;
    const startPosition = new vscode.Position(startLineNumber, startLines[startLines.length - 1].length + 1);
    const endPosition = new vscode.Position(endLineNumber, endLines[endLines.length - 1].length + 1);
    const range = new vscode.Range(startPosition, endPosition);
    return {
        start,
        end,
        startLineNumber,
        endLineNumber,
        startPosition,
        endPosition,
        range,
    };
};
const setSelection = (start, end = start, editor) => {
    if (!editor) {
        editor = vsc.getActiveEditor();
    }
    if (!editor) {
        return false;
    }
    const source = editor.document.getText();
    const selection = createSelection(source, start, end);
    editor.selections = []; // clear selections
    editor.selection = selection;
    return true;
};
const createSelection = (source, start, end = start) => {
    const complexRangeObject = getComplexRangeObject(source, start, end);
    const selection = new vscode.Selection(complexRangeObject.startPosition, complexRangeObject.endPosition);
    return selection;
};



// ------------------ Error log from script -------------- //
// type: 104.1: Error in vsc-Script trying to transpile the loaded module. This error is properply incorrect formatting of the module file. Open the script file in vscode and ensure that ts cont find any errors.
// time: 2019-04-22T09:14:49.835Z
// selectedScript.path: /Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/.vsc-script/rangeFinderTest.vsc-script.ts
// path: [object Object]
// error:
// Error handler find first error in extension.js: 
var info = {
   "isError": true,
   "type": "",
   "stack": "Error: Error: Cannot find module '../src/vsc-base-development/vsc-base'\n\tat Object.<anonymous> (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:135119:15)\n\tat Generator.next (<anonymous>)\n\tat module.exports.__awaiter (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:134966:71)\n\tat new Promise (<anonymous>)\n\tat module.exports.__awaiter (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:134962:12)\n\tat loadTsModule_Eval (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:135111:41)\n\tat Object.<anonymous> (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:135092:20)\n\tat Generator.next (<anonymous>)\n\tat fulfilled (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:134963:58)",
   "message": "Error: Cannot find module '../src/vsc-base-development/vsc-base'"
}
// ts transpiled js code:
_exports = (function(){var exports = {};
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
//import * as vsc from 'vsc-base'
const vsc = require("../src/vsc-base-development/vsc-base");
/* const ts = require("typescript") // vsc-base has change the ts transpiled code here. */;
let log = '';
function run(path) {
    return __awaiter(this, void 0, void 0, function* () {
        vsc.showMessage("Start finding node... 666 ");
        const source = vsc.getDocumentContent();
        if (!source) {
            vsc.showMessage("No opnen document!");
            return;
        }
        let varFound = false;
        const [_node, position] = vsc.tsFindNodePosition(source, node => {
            // test name of variable
            const nameIsCorrect = vsc.tsMatchVariable(node, { matchName: /^module/ });
            if (!nameIsCorrect) {
                return false;
            }
            // test if is in function
            const funcAncestor = vsc.tsFindAncestor(node, (ancestor) => vsc.tsMatchFunction(ancestor, { matchName: /^method/ }));
            if (!funcAncestor) {
                return false;
            }
            // test if is in if statement
            const ifAncestor = vsc.tsFindAncestor(node, (ancestor) => ts.isIfStatement(ancestor));
            if (!ifAncestor) {
                return false;
            }
            return true;
        });
        if (position) {
            const realText = source.substring(position.start, position.end);
            //insertAt('\n  newcontent: 12,', position.start - 10);
            //const range = new vscode.Range(position.startPosition, position.startPosition);
            vsc.setSelection(position.start, position.end);
            //insertAtRange('\n  newcontent: 12,', range);
            vsc.showMessage(realText);
            //vsc.appendLineToActiveDocument(vsc.toJSONString(position))
        }
        else {
            vsc.showMessage('Not found!');
        }
    });
}
exports.run = run;
exports.method2 = () => {
    const moduleNumber1Path = '/module/area/file1';
    return moduleNumber1Path;
};
function method1(doit) {
    if (doit) {
        const moduleNumber1Path = '/module/area/file1'; // <-- Find this
        return moduleNumber1Path;
    }
}
exports.method1 = method1;

return exports})()

