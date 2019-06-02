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
const vsc = require("vsc-base");
//import * as vsc from '../src/vsc-base-development/vsc-base'
const ts = require("typescript");
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
//# sourceMappingURL=rangeFinderTest.vsc-script.js.map