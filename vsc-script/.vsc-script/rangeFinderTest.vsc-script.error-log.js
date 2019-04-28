
// ------------------ Error log from script -------------- //
// type: 105: Running compiled 'run' method. The error is in the 'run' method.
// time: 2019-04-24T05:13:40.614Z
// selectedScript.path: /Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/.vsc-script/rangeFinderTest.vsc-script.ts
// path: [object Object]
// error:
// Error handler find first error in extension.js: 
var info = {
   "isError": true,
   "type": "TypeError",
   "stack": "TypeError: vsc.tsMatchExpression is not a function\n\tat vsc.tsFindNodePosition.node (eval at <anonymous> (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:135120:9), <anonymous>:26:24)\n\tat visit (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:135511:27)\n\tat Object.visitNode (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:68231:23)\n\tat module.exports.exports.tsFindNodePosition.visitor (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:135522:29)\n\tat module.exports.ts.compose (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:4829:42)\n\tat Object.map (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:3824:29)\n\tat Object.transformNodes (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:85994:30)\n\tat Object.transform (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:125946:25)\n\tat Object.module.exports.exports.tsTransformNode (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:135231:15)\n\tat Object.module.exports.exports.tsVisitWithTransformers (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:135215:9)\n\tat Object.module.exports.exports.tsFindNodePosition (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:135524:9)\n\tat Object.eval (eval at <anonymous> (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:135120:9), <anonymous>:25:39)\n\tat Generator.next (<anonymous>)\n\tat __awaiter (eval at <anonymous> (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:135120:9), <anonymous>:8:71)\n\tat new Promise (<anonymous>)\n\tat __awaiter (eval at <anonymous> (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:135120:9), <anonymous>:4:12)\n\tat Object.run (eval at <anonymous> (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:135120:9), <anonymous>:17:12)\n\tat Script.<anonymous> (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:223:47)\n\tat Generator.next (<anonymous>)\n\tat fulfilled (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:138:58)",
   "message": "vsc.tsMatchExpression is not a function"
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
//import * as vsc from 'vsc-base'
/* const vsc = require("vsc-base") // vsc-base has change the ts transpiled code here. */;
/* const ts = require("typescript") // vsc-base has change the ts transpiled code here. */;
let log = '';
function run(path) {
    return __awaiter(this, void 0, void 0, function* () {
        vsc.showMessage("Start finding node... ");
        const source = vsc.getDocumentContent();
        if (!source) {
            vsc.showMessage("No opnen document!");
            return;
        }
        let varFound = false;
        const [_node, position] = vsc.tsFindNodePosition(source, node => {
            return vsc.tsMatchExpression(node, { mathValue: '/module/area/file1' });
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



// ------------------ Error log from script -------------- //
// type: 105: Running compiled 'run' method. The error is in the 'run' method.
// time: 2019-04-24T05:19:43.809Z
// selectedScript.path: /Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/.vsc-script/rangeFinderTest.vsc-script.ts
// path: [object Object]
// error:
// Error handler find first error in extension.js: defined) {
var info = {
   "isError": true,
   "type": "TypeError",
   "stack": "TypeError: vsc.tsMatchExpression is not a function\n\tat vsc.tsFindNodePosition.node (eval at <anonymous> (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:135120:9), <anonymous>:26:24)\n\tat visit (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:135511:27)\n\tat Object.visitNode (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:68231:23)\n\tat module.exports.exports.tsFindNodePosition.visitor (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:135522:29)\n\tat module.exports.ts.compose (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:4829:42)\n\tat Object.map (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:3824:29)\n\tat Object.transformNodes (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:85994:30)\n\tat Object.transform (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:125946:25)\n\tat Object.module.exports.exports.tsTransformNode (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:135231:15)\n\tat Object.module.exports.exports.tsVisitWithTransformers (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:135215:9)\n\tat Object.module.exports.exports.tsFindNodePosition (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:135524:9)\n\tat Object.eval (eval at <anonymous> (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:135120:9), <anonymous>:25:39)\n\tat Generator.next (<anonymous>)\n\tat __awaiter (eval at <anonymous> (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:135120:9), <anonymous>:8:71)\n\tat new Promise (<anonymous>)\n\tat __awaiter (eval at <anonymous> (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:135120:9), <anonymous>:4:12)\n\tat Object.run (eval at <anonymous> (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:135120:9), <anonymous>:17:12)\n\tat Script.<anonymous> (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:223:47)\n\tat Generator.next (<anonymous>)\n\tat fulfilled (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:138:58)",
   "message": "vsc.tsMatchExpression is not a function"
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
//import * as vsc from '../src/vsc-base-development/vsc-base'
/* const ts = require("typescript") // vsc-base has change the ts transpiled code here. */;
let log = '';
function run(path) {
    return __awaiter(this, void 0, void 0, function* () {
        vsc.showMessage("Start finding node... ");
        const source = vsc.getDocumentContent();
        if (!source) {
            vsc.showMessage("No opnen document!");
            return;
        }
        let varFound = false;
        const [_node, position] = vsc.tsFindNodePosition(source, node => {
            return vsc.tsMatchExpression(node, { matchValue: '/module/area/file1' });
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



// ------------------ Error log from script -------------- //
// type: 104.1: Error in vsc-Script trying to transpile the loaded module. This error is properply incorrect formatting of the module file. Open the script file in vscode and ensure that ts cont find any errors.
// time: 2019-04-28T20:03:03.549Z
// selectedScript.path: /Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/.vsc-script/rangeFinderTest.vsc-script.ts
// path: [object Object]
// error:
// Error handler find first error in extension.js: 
var info = {
   "isError": true,
   "type": "",
   "stack": "Error: Error: Cannot find module '../src/vsc-base-development/vsc-base'\n\tat Object.<anonymous> (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:135128:15)\n\tat Generator.next (<anonymous>)\n\tat module.exports.__awaiter (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:134975:71)\n\tat new Promise (<anonymous>)\n\tat module.exports.__awaiter (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:134971:12)\n\tat loadTsModule_Eval (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:135120:41)\n\tat Object.<anonymous> (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:135101:20)\n\tat Generator.next (<anonymous>)\n\tat fulfilled (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:134972:58)",
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
        vsc.showMessage("Start finding node... ");
        const source = vsc.getDocumentContent();
        if (!source) {
            vsc.showMessage("No opnen document!");
            return;
        }
        // let varFound = false
        const [_node, position] = vsc.tsFindNodePositionFromContent(source, node => {
            //return vsc.tsMatchExpression(node, '/module/area/file1')
            return vsc.tsMatchValue(node, 45, {
                hasAncestors: [
                    parent => ts.isIfStatement(parent),
                    parent => vsc.tsMatchVariable(parent, { name: /^module/ })
                ]
            });
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
        const moduleNumber2Path = 45; // <-- Find this
        const moduleNumber3Path = true; // <-- Find this
        const moduleNumber4Path = [1, 2]; // <-- Find this
        const moduleNumber5Path = () => { }; // <-- Find this
        return moduleNumber1Path;
    }
}
exports.method1 = method1;

return exports})()

