
// ------------------ Error log from script -------------- //
// type: 104.1: Error in vsc-Script trying to transpile the loaded module. This error is properply incorrect formatting of the module file. Open the script file in vscode and ensure that ts cont find any errors.
// time: 2019-05-08T11:50:24.297Z
// selectedScript.path: /Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/.vsc-script/rangeFinderTest.vsc-script.ts
// path: [object Object]
// error:
// Error handler find first error in extension.js: 
var info = {
   "isError": true,
   "type": "",
   "stack": "Error: Error: Cannot find module '../src/vsc-base-development/vsc-base'\n\tat Object.<anonymous> (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:135255:15)\n\tat Generator.next (<anonymous>)\n\tat module.exports.__awaiter (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:135102:71)\n\tat new Promise (<anonymous>)\n\tat module.exports.__awaiter (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:135098:12)\n\tat loadTsModule_Eval (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:135247:41)\n\tat Object.<anonymous> (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:135228:20)\n\tat Generator.next (<anonymous>)\n\tat fulfilled (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:135099:58)",
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
let log = '';
function run(path) {
    return __awaiter(this, void 0, void 0, function* () {
        let fileContent = yield vsc.getFileContent(path);
        fileContent = fileContent.replace('let logger =', 'let logger =');
        yield vsc.saveFileContent(path, fileContent);
        yield vsc.addFileContent(path, '//CONTENT IN THE END!!!');
        return;
        vsc.showMessage("Start finding node... ");
        const source = vsc.getDocumentContent();
        if (!source) {
            vsc.showMessage("No opnen document!");
            return;
        }
        // // let varFound = false
        // const [node, position] = vsc.tsFindNodePositionFromContent(source, node => {
        // 	// return vsc.tsIsIdentifier(node, {
        // 	// 	name: /foo3/,
        // 	// 	hasAncestor: (ancestor, depth) =>
        // 	// 		vsc.tsIsInterface(ancestor)
        // 	// 		&& depth === 1
        // 	// })
        // 	// return vsc.tsIsValue(node, 1, {
        // 	// 	hasAncestor: (ancestor) => vsc.tsIsEnumMember(ancestor, {
        // 	// 		name: /foo/,
        // 	// 		enumName: /foo/
        // 	// 	})
        // 	// })
        // 	// return vsc.tsMatchValue(node, '/module/area/file1')
        // 	// return vsc.tsIsValue(node, 45, {
        // 	// 	hasAncestors: [
        // 	// 		parent => ts.isIfStatement(parent),
        // 	// 		parent => vsc.tsIsVariable(parent, { name: /^module/ })
        // 	// 	]
        // 	// })
        // 	// test name of variable
        // 	return vsc.tsMatchVariable(node, {
        // 		name: /^module/,
        // 		hasAncestors: [
        // 			ancestor => vsc.tsIsFunction(ancestor, { name: /^method/ }),
        // 			ancestor => ts.isIfStatement(ancestor)
        // 		]
        // 	})
        // })
        // if (position) {
        // 	const realTextNode = source.substring(node.pos, node.end);
        // 	const realText = source.substring(position.start, position.end);
        // 	//insertAt('\n  newcontent: 12,', position.start - 10);
        // 	//const range = new vscode.Range(position.startPosition, position.startPosition);
        // 	vsc.setSelection(position.start, position.end)
        // 	//insertAtRange('\n  newcontent: 12,', range);
        // 	//vsc.showMessage(realText)
        // 	//vsc.showMessage('RE: ' + realTextNode)
        // 	//vsc.appendLineToActiveDocument(vsc.toJSONString(position))
        // } else {
        // 	vsc.showMessage('Not found!')
        // }
        const positions = vsc.tsFindAllNodePositionsFromContent(source, node => vsc.tsIsIdentifier(node, { name: /^module/ }));
        vsc.setSelectionsFromRanges(positions.map(([, p]) => p.range));
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
        const moduleNumber3Path = true; // <-- Find this
        const moduleNumber2Path = 45; // <-- Find this
        const moduleNumber4Path = [1, 2]; // <-- Find this
        const moduleNumber5Path = () => { }; // <-- Find this
        return moduleNumber1Path;
    }
}
exports.method1 = method1;
var foo;
(function (foo) {
    foo[foo["foo1"] = 1] = "foo1"; //<-- FIND this
})(foo || (foo = {}));

return exports})()

