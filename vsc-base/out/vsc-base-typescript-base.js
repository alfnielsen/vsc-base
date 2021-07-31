"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tsGetParsedChildren = exports.tsCreateSourceFile = exports.TsDefaultCompilerOptions = exports.tsTransformNode = exports.tsTranspile = void 0;
const ts = require("typescript");
const vsc = require("./vsc-base");
/** vsc-base method
 * @description
 * Transpile ts source to js
 * @see [tsTranspile](http://vsc-base.org/#tsTranspile)
 * @param sourceTs
 * @param compilerOptions
 * @vscType System
 * @example
 * const sourceJs = vsc.tsTranspile(sourceTs)
 * @returns string
 */
const tsTranspile = (sourceTs, compilerOptions = vsc.TsDefaultCompilerOptions) => {
    const transpiledOutput = ts.transpileModule(sourceTs, { compilerOptions });
    let sourceJs = transpiledOutput.outputText;
    return sourceJs;
};
exports.tsTranspile = tsTranspile;
/** vsc-base method
 * @description
 * Transform a ts.Node \
 * (default node-type is ts.Sourcefile)
 * @see [tsTransformNode](http://vsc-base.org/#tsTransformNode)
 * @param sourceFile
 * @param transformers
 * @param compilerOptions
 * @internal
 * @experimental This method can easily change, because ts api is in experimental state.
 * @vscType ts
 * @example
 * const result = vsc.tsTransformNode(sourceFile, transformers, compilerOptions)
 */
const tsTransformNode = (sourceFile, transformers, compilerOptions = vsc.TsDefaultCompilerOptions) => {
    return ts.transform(sourceFile, transformers, compilerOptions);
};
exports.tsTransformNode = tsTransformNode;
/** vsc-base method
 * @description
 * vsc-base's internal default ts compiler options
 * @see [TsDefaultCompilerOptions](http://vsc-base.org/#TsDefaultCompilerOptions)
 * @internal
 * @experimental This method can easily change, because ts api is in experimental state.
 * @vscType ts
 * @example
 * const compilerOptions = vsc.TsDefaultCompilerOptions
 */
exports.TsDefaultCompilerOptions = ({
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2016,
    libs: ['es6', "esnext", "dom"],
    jsx: ts.JsxEmit.React
});
/** vsc-base method
 * @description
 * Create a ts.SourceFile
 * @see [tsCreateSourceFile](http://vsc-base.org/#tsCreateSourceFile)
 * @param content
 * @param sourceFileName
 * @experimental This method can easily change, because ts api is in experimental state.
 * @vscType ts
 * @example
 * const sourceFile = vsc.tsCreateSourceFile(code)
 */
const tsCreateSourceFile = (content, sourceFileName = `sourcefile_${(new Date().getTime())}`) => {
    let sourceFile = ts.createSourceFile(sourceFileName, content, ts.ScriptTarget.ES2015, 
    /*setParentNodes */ true);
    return sourceFile;
};
exports.tsCreateSourceFile = tsCreateSourceFile;
/** vsc-base method
 * @description
 * ts.Node's getChildren and getChildrenCount uses tokens not parsed nodes. \
 * So this method uses ts' forEachChild to collect the parsed nodes. \
 * Normally used in custom transformer methods (vsc.tsCreateTransformer)
 * @see [tsGetParsedChildren](http://vsc-base.org/#tsGetParsedChildren)
 * @params node
 * @experimental This method can easily change, because ts api is in experimental state.
 * @vscType ts
 * @example
 * const children = vsc.tsGetParsedChildren(node)
 */
const tsGetParsedChildren = (node) => {
    let children = [];
    node.forEachChild(c => { children.push(c); });
    return children;
};
exports.tsGetParsedChildren = tsGetParsedChildren;
//# sourceMappingURL=vsc-base-typescript-base.js.map