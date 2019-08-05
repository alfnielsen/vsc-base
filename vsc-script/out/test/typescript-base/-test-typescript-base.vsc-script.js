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
//vsc-script-name: -test-typescript-base.vsc-script
const ts = require("typescript");
const vsc = require("vsc-base");
function run(path) {
    return __awaiter(this, void 0, void 0, function* () {
        const testResults = [];
        tsTransformNode(testResults);
    });
}
exports.run = run;
const addSuccess = (testResults) => {
    testResults.push({
        success: true
    });
};
const addError = (testResults, method, expect, result) => {
    testResults.push({
        success: false,
        errorMessage: `Failed in tsTranspile. --- expected: ${JSON.stringify(expect)} --- got: ${JSON.stringify(result)}`
    });
};
const tsTransformNode = (testResults) => {
    const source = `const foo: string = 'test1'`;
    const expect = `const foo = 'test1'`;
    const node = ts.createSourceFile('tsTransformNodeFile', source, ts.ScriptTarget.ES2015);
    const result = vsc.tsTransformNode(node, []);
    // if (resultgetText() === expect) {
    //    addSuccess(testResults)
    // } else {
    //    addError(testResults, 'tsTranspile', expect, result)
    // }
};
//# sourceMappingURL=-test-typescript-base.vsc-script.js.map