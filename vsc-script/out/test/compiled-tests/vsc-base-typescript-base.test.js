"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert = __importStar(require("assert"));
const ts = __importStar(require("typescript"));
const vsc = __importStar(require("../../vsc-base-development/vsc-base"));
suite('ts_tsCreateSourceFile', () => {
    test(' 1', () => {
        const sf = vsc.tsCreateSourceFile("const foo = 1");
        assert.equal(ts.isSourceFile(sf), true);
    });
});
suite('ts_TsDefaultCompilerOptions', () => {
    test(' 1', () => {
        assert.equal(vsc.TsDefaultCompilerOptions.module, ts.ModuleKind.CommonJS);
        assert.equal(vsc.TsDefaultCompilerOptions.target, ts.ScriptTarget.ES2015);
    });
});
suite('ts_tsGetParsedChildren', () => {
    test(' 1', () => {
        const sf = vsc.tsCreateSourceFile("const foo = 1;const nee = 2");
        const r1 = vsc.tsGetParsedChildren(sf);
        assert.equal(r1[0].getText(), 'const foo = 1;');
        assert.equal(r1[1].getText(), 'const nee = 2');
    });
});
const transformer = vsc.tsCreateTransformer((node) => {
    if (!ts.isArrowFunction(node)) { // is not an arrow function
        return;
    }
    const children = vsc.tsGetParsedChildren(node.body);
    if (children.length !== 1) { // don't have one statement
        return;
    }
    const child = children[0];
    if (!ts.isReturnStatement(child)) { // statement is not a return statement
        return;
    }
    const returnNode = child;
    const returnExpression = returnNode.expression;
    if (returnExpression === undefined) { // return statement is undefined
        return;
    }
    //Replace body-node with return-node
    node.body = returnExpression;
    return node;
});
suite('ts_tsTransformNode', () => {
    test(' 1', () => {
        const sourceFile = vsc.tsCreateSourceFile(`const f = () => { return 1 }`);
        const res = vsc.tsTransformNode(sourceFile, [transformer]);
        const transformedSourceFile = res.transformed[0];
        const printer = ts.createPrinter();
        const print = printer.printFile(transformedSourceFile);
        res.dispose();
        assert.equal(print, 'const f = () => 1;\n');
    });
});
suite('System_tsTranspile', () => {
    test(' 1', () => {
        const source = `const f = (foo: string): number => { return 1 }`;
        const print = vsc.tsTranspile(source);
        assert.equal(print, 'const f = (foo) => { return 1; };\n');
    });
});
//# sourceMappingURL=vsc-base-typescript-base.test.js.map