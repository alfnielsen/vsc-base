"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tsReplaceAll = exports.tsReplace = exports.tsFindAllNodePositionsFromContent = exports.tsFindNodePositionFromContent = exports.tsCreateNodeVisitor = exports.tsCreateRemoveNodesTransformer = exports.tsCreateTransformer = exports.tsVisitWithTransformers = exports.tsTransform = exports.tsCreateProgram = void 0;
const ts = require("typescript");
const vsc = require("./vsc-base");
/** vsc-base method
 * @description
 * Creates a ts program with one file and a compiler host. \
 * This is needed for getting a real program with typeChecker.
 * @see [tsCreateProgram](http://vsc-base.org/#tsCreateProgram)
 * @param source
 * @param transformers
 * @param compilerOptions
 * @param printer
 * @internal
 * @experimental This method can easily change, because ts api is in experimental state.
 * @vscType ts
 * @example
 * const [program, sourceFile] = vsc.tsCreateProgram(code)
 */
const tsCreateProgram = (code, sourceFileName = 'sourceFile.ts', compilerOptions = vsc.TsDefaultCompilerOptions, compilerHost = ts.createCompilerHost(compilerOptions)) => {
    let innerSourceFile;
    compilerHost.getSourceFile = (fileName) => {
        innerSourceFile = innerSourceFile || ts.createSourceFile(fileName, code, ts.ScriptTarget.ES2015, true);
        return sourceFile;
    };
    const program = ts.createProgram([sourceFileName], vsc.TsDefaultCompilerOptions, compilerHost);
    let emitResult = program.emit();
    const sourceFile = program.getSourceFile(sourceFileName);
    return [program, sourceFile];
};
exports.tsCreateProgram = tsCreateProgram;
/** vsc-base method
 * @description
 * Transform source code using custom transformers \
 * See [tsCreateTransformer](http://vsc-base.org/#tsCreateTransformer)
 * and [tsCreateRemoveNodesTransformer](http://vsc-base.org/#tsCreateRemoveNodesTransformer)
 * for creating transformer
 * @see [tsTransform](http://vsc-base.org/#tsTransform)
 * @param source
 * @param transformers
 * @param compilerOptions
 * @param printer
 * @internal
 * @experimental This method can easily change, because ts api is in experimental state.
 * @vscType ts
 * @example
 * const updatedCode = vsc.tsTransform(code, [transformer1, transformer2])
 */
const tsTransform = (source, transformers, compilerOptions = vsc.TsDefaultCompilerOptions, printer = ts.createPrinter()) => {
    const sourceFile = vsc.tsCreateSourceFile(source);
    const result = vsc.tsTransformNode(sourceFile, transformers, compilerOptions);
    const transformedSourceFile = result.transformed[0];
    if (!transformedSourceFile) {
        throw new Error('Transformer did not return correct SourceFile');
    }
    const print = printer.printFile(transformedSourceFile);
    result.dispose();
    return print;
};
exports.tsTransform = tsTransform;
/** vsc-base method
 * @description
 * This is like a [tsTransform](http://vsc-base.org/#tsTransform), but it doesn't transform or print content. \
 * Used for walking a ts-ast tree. \
 * Used by [tsFindNodePositionFromContent](http://vsc-base.org/#tsFindNodePositionFromContent)
 * @see [tsVisitWithTransformers](http://vsc-base.org/#tsVisitWithTransformers)
 * @param source
 * @param transformers
 * @param compilerOptions
 * @param printer
 * @internal
 * @experimental This method can easily change, because ts api is in experimental state.
 * @vscType ts
 * @example
 * vsc.tsVisitWithTransformers(code, [visitor, transformer])
 */
const tsVisitWithTransformers = (source, transformers, compilerOptions = vsc.TsDefaultCompilerOptions) => {
    const sourceFile = vsc.tsCreateSourceFile(source);
    vsc.tsTransformNode(sourceFile, transformers, compilerOptions);
};
exports.tsVisitWithTransformers = tsVisitWithTransformers;
/** vsc-base method
 * @description
 * Create a Ts Transformer factory \
 * Normally used in vsc.tsTransform \
 * You can use https://ts-ast-viewer.com/ or https://astexplorer.net/ \
 * to generate the new ts nodes or node type.
 * @see [tsCreateTransformer](http://vsc-base.org/#tsCreateTransformer)
 * @param callback
 * @param program
 * @vscType ts
 * @experimental This method can easily change, because ts api is in experimental state.
 * @example
 * const transformer = vsc.tsCreateTransformer(transformerCallback)
 * @example
 * // transforms arrowFunction with one return statement to lambda function
 * const transformer = vsc.tsCreateTransformer((node) => {
 *   if (!ts.isArrowFunction(node)) { // is not an arrow function
 *     return
 *   }
 *   const children = vsc.tsGetParsedChildren(node.body)
 *   if (children.length !== 1) { // don't have one statement
 *     return
 *   }
 *   const child = children[0]
 *   if (!ts.isReturnStatement(child)) { // statement is not a return statement
 *     return
 *   }
 *   const returnNode = child
 *   const returnExpression = returnNode.expression
 *   if (returnExpression === undefined) { // return statement is undefined
 *     return
 *   }
 *   //Replace body-node with return-node
 *   node.body = returnExpression
 *   return node
 * });
 * //Run transformer:
 * const updatedCode = vsc.tsTransform(code, [transformer]);
 *
 * @returns ts.TransformerFactory<T>
 */
const tsCreateTransformer = (callback, program) => {
    let typeChecker;
    if (program) {
        typeChecker = program.getTypeChecker();
    }
    return (context) => {
        const visit = (node) => {
            const replaceNode = callback(node, typeChecker, program);
            if (replaceNode === undefined) {
                return ts.visitEachChild(node, (child) => visit(child), context);
            }
            return replaceNode;
        };
        return (node) => ts.visitNode(node, visit);
    };
};
exports.tsCreateTransformer = tsCreateTransformer;
/** vsc-base method
 * @description
 * Create a Ts Transformer for removing nodes \
 * Normally used in vsc.tsTransform \
 * You can use https://ts-ast-viewer.com/ or https://astexplorer.net/ \
 * to generate the new ts nodes or node type.
 * @see [tsCreateRemoveNodesTransformer](http://vsc-base.org/#tsCreateRemoveNodesTransformer)
 * @vscType ts
 * @example
 * const transformer = vsc.tsCreateRemoveNodesTransformer(transformerCallback)
 * @example
 * // Remove all 'debugger' statements
 * const removeDebuggerTransformer = vsc.tsCreateRemoveNodesTransformer(
 *   (node) => {
 *     if (ts.isDebuggerStatement(node)) {
 *       return true
 *     }
 *     return false
 *   }
 * );
 * //Run transformer:
 * const updatedCode = vsc.tsTransform(code, [removeDebuggerTransformer]);
 *
 * @returns ts.TransformerFactory<T>
 */
const tsCreateRemoveNodesTransformer = (callback, program) => {
    let typeChecker;
    if (program) {
        typeChecker = program.getTypeChecker();
    }
    return (context) => {
        const visit = (node) => {
            const shouldRemove = callback(node, typeChecker, program);
            if (!shouldRemove) {
                return ts.visitEachChild(node, (child) => visit(child), context);
            }
            return undefined; // This will remove the node
        };
        return (node) => ts.visitNode(node, visit);
    };
};
exports.tsCreateRemoveNodesTransformer = tsCreateRemoveNodesTransformer;
/** vsc-base method
 * @description
 * Create a Ts Visitor Transformer for collecting data (Will not remove or replace any nodes) \
 * Normally used in vsc.tsTransform \
 * You can use https://ts-ast-viewer.com/ or https://astexplorer.net/ \
 * to generate the new ts nodes or node type.
 * @see [tsCreateNodeVisitor](http://vsc-base.org/#tsCreateNodeVisitor)
 * @vscType ts
 * @example
 * const transformer = vsc.tsCreateNodeVisitor(transformerCallback)
 * @example
 * // The vsc-method to collect dependencies from:
 * const vscMethod = `
 * export const getRelativePath = (fromPath: string, toPath: string): string => {
 *    const _sharedPath = vsc.sharedPath(fromPath, toPath)
 *    const [fromDir] = vsc.splitPath(fromPath)
 *    const [toDir] = vsc.splitPath(toPath)
 *    const fromPathDownToShared = vsc.subtractPath(fromDir, _sharedPath)
 *    let toPathDownToShared = vsc.subtractPath(toDir, _sharedPath)
 *    const backPath = fromPathDownToShared
 *       .split(/\//)
 *       .map(_ => '../')
 *       .join('')
 *    const relativePath = backPath + toPathDownToShared
 *    return relativePath
 * }
 *    `
 * // The data we want to collect:
 * const dependencyList = {
 *    vsc: new Set<string>(),
 *    ts: new Set<string>(),
 *    fs: new Set<string>(),
 *    vscode: new Set<string>(),
 * }
 * // Find all Call Expressions, test if they use any of: vsc, ts, fs or vscode
 * const collectDefs = vsc.tsCreateNodeVisitor((node) => {
 *    if (!ts.isCallExpression(node)) { // is call expression
 *       return
 *    }
 *    const expression = node.expression;
 *    const content = expression.getText();
 *    for (const [key, list] of Object.entries(dependencyList)) {
 *       const matcher = `${key}.`;
 *       if (content.indexOf(matcher) === 0) { // <-- Collect data if it match
 *          const val = content.substr(matcher.length)
 *          list.add(val) // <-- Use Set to avoid duplicates
 *       }
 *    }
 * });
 * //Run transformer:
 * vsc.tsTransform(vscMethod, [collectDefs]);
 *
 * // -- dependencyList --
 * // {
 * //   vsc: [
 * //     "sharedPath",
 * //     "splitPath",
 * //     "subtractPath"
 * //   ],
 * //   ts: [],
 * //   fs: [],
 * //   vscode: []
 * // }

 * @returns ts.TransformerFactory<T>
 */
const tsCreateNodeVisitor = (callback, program) => {
    let typeChecker;
    if (program) {
        typeChecker = program.getTypeChecker();
    }
    return (context) => {
        const visit = (node) => {
            callback(node, typeChecker, program);
            return ts.visitEachChild(node, (child) => visit(child), context);
        };
        return (node) => ts.visitNode(node, visit);
    };
};
exports.tsCreateNodeVisitor = tsCreateNodeVisitor;
/** vsc-base method
 * @description
 * Create a Ts Visitor Transformer for finding a node and it position.
 * @see [tsFindNodePositionFromContent](http://vsc-base.org/#tsFindNodePositionFromContent)
 * @vscType ts
 * @example
 * const [node, position] = vsc.tsFindNodePositionFromContent(source, findNodePositionCallback)
 * @example
 * const source = `
 *    const method2 = () => {
 *       const moduleNumber1Path = '/module/area/file1'
 *       return moduleNumber1Path
 *    }
 *    function method1(doIt){
 *       if(doIt){
 *          const moduleNumber1Path = '/module/area/file1' // <-- Find this
 *          return moduleNumber1Path
 *       }
 *    }
 * `
 * // Find a constant with name starting with 'module' within a function but not in an if statement
 * const [_node, position] = vsc.tsFindNodePositionFromContent(source, node =>
 *  vsc.tsMatchVariable(node, {
 *       // test name of variable
 *       name: /^module/,
 *       // test if is in function
 *       hasAncestors: [
 *          ancestor => vsc.tsIsFunction(ancestor, { name: /^method/ }),
 *          ancestor => ts.isIfStatement(ancestor)
 *       ]
 *    })
 * )
 * if (position) {
 *    const realText = source.substring(position.start, position.end);
 *    // Select the source (assuming the source is from the open document)
 *    vsc.setSelection(position.start, position.end)
 * }
 * @returns [ts.Node | undefined, vsc.VscodePosition | undefined]
 */
const tsFindNodePositionFromContent = (source, callback, program, fromPosition = 0, trimSpaces = true) => {
    let position;
    let foundNode;
    let typeChecker;
    if (program) {
        typeChecker = program.getTypeChecker();
    }
    const visitor = (context) => {
        const visit = (node) => {
            if (node.pos < fromPosition) {
                return ts.visitEachChild(node, (child) => visit(child), context);
            }
            const _foundNode = callback(node, typeChecker, program);
            if (!_foundNode) {
                return ts.visitEachChild(node, (child) => visit(child), context);
            }
            if (node === undefined) {
                throw new Error('Node is undefined!!!');
            }
            position = vsc.createVscodeRangeAndPosition(source, node.pos, node.end, trimSpaces);
            foundNode = _foundNode;
            return node;
        };
        return (node) => ts.visitNode(node, visit);
    };
    vsc.tsVisitWithTransformers(source, [visitor]);
    return [foundNode, position];
};
exports.tsFindNodePositionFromContent = tsFindNodePositionFromContent;
/** vsc-base method
 * @description
 * Create a Ts Visitor Transformer for finding a nodes and their position.
 * @see [tsFindAllNodePositionsFromContent](http://vsc-base.org/#tsFindAllNodePositionsFromContent)
 * @vscType ts
 * @example
 * const nodePositionArray = vsc.tsFindAllNodePositionsFromContent(source, findNodePositionCallback)
 * @example
 * const source = `
 *    const method2 = () => {
 *       const moduleNumber1Path = '/module/area/file1' // <-- Find this
 *       return moduleNumber1Path // <-- Find this
 *    }
 *    function method1(doIt){
 *       if(doIt){
 *          const moduleNumber1Path = '/module/area/file1' // <-- Find this
 *          return moduleNumber1Path // <-- Find this
 *       }
 *    }
 * `
 * // Find a constant with name starting with 'module' within a function but not in an if statement
 * const nodePositionArray = vsc.tsFindAllNodePositionsFromContent(source, node =>
 *  vsc.tsMatchVariable(node, {
 *       // test name of variable
 *       name: /^module/,
 *       // test if is in function
 *       hasAncestors: [
 *          ancestor => vsc.tsIsFunction(ancestor, { name: /^method/ }),
 *          ancestor => ts.isIfStatement(ancestor)
 *       ]
 *    })
 * )
 * nodePositionArray.forEach([node, position] => {
 *    vsc.addSelection(position.start, position.end)
 * })
 * @returns [ts.Node, vsc.VscodePosition][]
 */
const tsFindAllNodePositionsFromContent = (source, callback, program, fromPosition = 0, trimSpaces = true) => {
    let positions = [];
    let typeChecker;
    if (program) {
        typeChecker = program.getTypeChecker();
    }
    const visitor = (context) => {
        const visit = (node) => {
            if (node.pos < fromPosition) {
                return ts.visitEachChild(node, (child) => visit(child), context);
            }
            const _foundNode = callback(node, typeChecker, program);
            if (!_foundNode) {
                return ts.visitEachChild(node, (child) => visit(child), context);
            }
            if (node === undefined) {
                throw new Error('Node is undefined!!!');
            }
            const position = vsc.createVscodeRangeAndPosition(source, node.pos, node.end, trimSpaces);
            positions.push([_foundNode, position]);
            return ts.visitEachChild(node, (child) => visit(child), context);
        };
        return (node) => ts.visitNode(node, visit);
    };
    vsc.tsVisitWithTransformers(source, [visitor]);
    return positions;
};
exports.tsFindAllNodePositionsFromContent = tsFindAllNodePositionsFromContent;
/** vsc-base method
 * @description
 * tsReplace is a smart search and replace that take the source, a replaceString and a callback for finding the node to replace. \
 * It uses [tsFindNodePositionFromContent](http://vsc-base.org/#tsFindNodePositionFromContent) to find the node.
 * See also [tsReplaceAll](http://vsc-base.org/#tsReplaceAll)
 * @see [tsReplace](http://vsc-base.org/#tsReplace)
 * @vscType ts
 * @example
 * source = vsc.tsReplace(source, replaceString, findNodePositionCallback)
 * @example
 * let source = `
 *    const method2 = () => {
 *       const moduleNumber1Path = '/module/area/file1' // <-- replace this
 *       return moduleNumber1Path
 *    }
 * `
 * // Find a constant with name starting with 'module' within a function but not in an if statement
 * source = vsc.tsReplace(source, '/module/area/file2', node => vsc.tsMatchValue(node, /\/area\/file1/, {
 *    hasAncestors: [
 *       ancestor => vsc.tsIsFunction(ancestor, { name: /^method/ }),
 *       ancestor => vsc.tsIsVariable(ancestor, { name: /^module.*Path/ })
 *    ]
 * }))
 *
 * @returns string
 */
const tsReplace = (source, replaceString, callback, program, fromPosition = 0, trimSpaces = true) => {
    const [node, position] = vsc.tsFindNodePositionFromContent(source, callback, program, fromPosition, trimSpaces);
    if (position) {
        //replace
        source = source.substring(0, position.start) + replaceString + source.substring(position.end);
    }
    return source;
};
exports.tsReplace = tsReplace;
/** vsc-base method
 * @description
 * tsReplace is a smart search and replace that take the source, a replaceString and a callback for finding the node to replace. \
 * It uses [tsFindNodePositionFromContent](http://vsc-base.org/#tsFindNodePositionFromContent) to find the node.
 * @see [tsReplace](http://vsc-base.org/#tsReplace)
 * @vscType ts
 * @example
 * source = vsc.tsReplace(source, replaceString, findNodePositionCallback)
 * @example
 * let source = `
 *    const method2 = () => {
 *       const moduleNumber1Path = '/module/area/file1' // <-- replace moduleNumber1Path
 *       return moduleNumber1Path // <-- replace moduleNumber1Path
 *    }
 * `
 * // Find a constant with name starting with 'module' within a function but not in an if statement
 * source = vsc.tsReplaceAll(source, 'moduleNumber2', node => vsc.tsMatchIdentifier(node, {
 *    name: 'moduleNumber1Path'
 * }))
 *
 * @returns string
 */
const tsReplaceAll = (source, replaceString, callback, program, fromPosition = 0, trimSpaces = true) => {
    const positions = vsc.tsFindAllNodePositionsFromContent(source, callback, program, fromPosition, trimSpaces);
    positions.sort(([, positionA], [, positionB]) => positionA.start - positionB.start);
    let diff = 0;
    positions.forEach(([, position]) => {
        const start = position.start - diff;
        const end = position.end - diff;
        const length = end - start;
        diff -= replaceString.length - length;
        source = source.substring(0, start) + replaceString + source.substring(end);
    });
    return source;
};
exports.tsReplaceAll = tsReplaceAll;
//# sourceMappingURL=vsc-base-typescript-transform.js.map