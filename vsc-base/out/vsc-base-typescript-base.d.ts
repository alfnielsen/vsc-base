import * as ts from 'typescript';
/** vsc-base method
 * @description
 * Transpile ts source to js
 * @see [tsTranspile](http://vsc-base.org/#tsTranspile)
 * @param sourceTs
 * @param compilerOptions
 * @vscType System
 * @oneLineEx const sourceJs = vsc.tsTranspile(sourceTs)
 * @returns string
 */
export declare const tsTranspile: (sourceTs: string, compilerOptions?: ts.CompilerOptions) => string;
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
 * @oneLineEx const result = vsc.tsTransformNode(sourceFile, transformers, compilerOptions)
 */
export declare const tsTransformNode: <T extends ts.Node = ts.SourceFile>(sourceFile: T, transformers: ts.TransformerFactory<T>[], compilerOptions?: ts.CompilerOptions) => ts.TransformationResult<T>;
/** vsc-base method
 * @description
 * vsc-base's internal default ts compiler options
 * @see [TsDefaultCompilerOptions](http://vsc-base.org/#TsDefaultCompilerOptions)
 * @internal
 * @experimental This method can easily change, because ts api is in experimental state.
 * @vscType ts
 * @oneLineEx const compilerOptions = vsc.TsDefaultCompilerOptions
 */
export declare const TsDefaultCompilerOptions: Readonly<ts.CompilerOptions>;
/** vsc-base method
 * @description
 * Create a ts.SourceFile
 * @see [tsCreateSourceFile](http://vsc-base.org/#tsCreateSourceFile)
 * @param content
 * @param sourceFileName
 * @experimental This method can easily change, because ts api is in experimental state.
 * @vscType ts
 * @oneLineEx const sourceFile = vsc.tsCreateSourceFile(code)
 */
export declare const tsCreateSourceFile: (content: string, sourceFileName?: string) => ts.SourceFile;
/** vsc-base method
 * @description
 * ts.Node's getChildren and getChildrenCount uses tokens not parsed nodes. \
 * So to this method uses ts' forEachChild to collect the parsed nodes. \
 * Normally used in custom transformer methods (vsc.tsCreateTransformer)
 * @see [tsGetParsedChildren](http://vsc-base.org/#tsGetParsedChildren)
 * @params node
 * @experimental This method can easily change, because ts api is in experimental state.
 * @vscType ts
 * @oneLineEx const children = vsc.tsGetParsedChildren(node)
 */
export declare const tsGetParsedChildren: (node: ts.Node) => ts.Node[];
