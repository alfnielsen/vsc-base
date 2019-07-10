"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
const vsc = require("./vsc-base");
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
 * @oneLineEx const updatedCode = vsc.tsTransform(code, [transformer1, transformer2])
 */
exports.tsTransform = (source, transformers, compilerOptions = vsc.TsDefaultCompilerOptions, printer = ts.createPrinter()) => {
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
 * @oneLineEx vsc.tsVisitWithTransformers(code, [visitor, transformer])
 */
exports.tsVisitWithTransformers = (source, transformers, compilerOptions = vsc.TsDefaultCompilerOptions) => {
    const sourceFile = vsc.tsCreateSourceFile(source);
    vsc.tsTransformNode(sourceFile, transformers, compilerOptions);
};
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
 * @oneLineEx const transformer = vsc.tsCreateTransformer(transformerCallback)
 * @ex
// transforms arrowFunction with one return statement to lambda function
const transformer = vsc.tsCreateTransformer((node) => {
   if (!ts.isArrowFunction(node)) { // is not an arrow function
      return
   }
   const children = vsc.tsGetParsedChildren(node.body)
   if (children.length !== 1) { // don't have one statement
      return
   }
   const child = children[0]
   if (!ts.isReturnStatement(child)) { // statement is not a return statement
      return
   }
   const returnNode = child
   const returnExpression = returnNode.expression
   if (returnExpression === undefined) { // return statement is undefined
      return
   }
   //Replace body-node with return-node
   node.body = returnExpression
   return node
});
//Run transformer:
const updatedCode = vsc.tsTransform(code, [transformer]);

 * @returns ts.TransformerFactory<T>
 */
exports.tsCreateTransformer = (callback, program) => {
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
/** vsc-base method
 * @description
 * Create a Ts Transformer for removing nodes \
 * Normally used in vsc.tsTransform \
 * You can use https://ts-ast-viewer.com/ or https://astexplorer.net/ \
 * to generate the new ts nodes or node type.
 * @see [tsCreateRemoveNodesTransformer](http://vsc-base.org/#tsCreateRemoveNodesTransformer)
 * @vscType ts
 * @oneLineEx const transformer = vsc.tsCreateRemoveNodesTransformer(transformerCallback)
 * @ex
// Remove all 'debugger' statements
const removeDebuggerTransformer = vsc.tsCreateRemoveNodesTransformer((node) => {
   if (ts.isDebuggerStatement(node)) {
      return true
   }
   return false
});
//Run transformer:
const updatedCode = vsc.tsTransform(code, [removeDebuggerTransformer]);

 * @returns ts.TransformerFactory<T>
 */
exports.tsCreateRemoveNodesTransformer = (callback, program) => {
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
/** vsc-base method
 * @description
 * Create a Ts Visitor Transformer for collecting data (Will not remove or replace any nodes) \
 * Normally used in vsc.tsTransform \
 * You can use https://ts-ast-viewer.com/ or https://astexplorer.net/ \
 * to generate the new ts nodes or node type.
 * @see [tsCreateNodeVisitor](http://vsc-base.org/#tsCreateNodeVisitor)
 * @vscType ts
 * @oneLineEx const transformer = vsc.tsCreateNodeVisitor(transformerCallback)
 * @ex
// The vsc-method to collect dependencies from:
const vscMethod = `
export const getRelativePath = (fromPath: string, toPath: string): string => {
   const _sharedPath = vsc.sharedPath(fromPath, toPath)
   const [fromDir] = vsc.splitPath(fromPath)
   const [toDir] = vsc.splitPath(toPath)
   const fromPathDownToShared = vsc.subtractPath(fromDir, _sharedPath)
   let toPathDownToShared = vsc.subtractPath(toDir, _sharedPath)
   const backPath = fromPathDownToShared
      .split(/\//)
      .map(_ => '../')
      .join('')
   const relativePath = backPath + toPathDownToShared
   return relativePath
}
   `
// The data we want to collect:
const dependencyList = {
   vsc: new Set<string>(),
   ts: new Set<string>(),
   fs: new Set<string>(),
   vscode: new Set<string>(),
}
// Find all Call Expressions, test if they use any of: vsc, ts, fs or vscode
const collectDefs = vsc.tsCreateNodeVisitor((node) => {
   if (!ts.isCallExpression(node)) { // is call expression
      return
   }
   const expression = node.expression;
   const content = expression.getText();
   for (const [key, list] of Object.entries(dependencyList)) {
      const matcher = `${key}.`;
      if (content.indexOf(matcher) === 0) { // <-- Collect data if it match
         const val = content.substr(matcher.length)
         list.add(val) // <-- Use Set to avoid duplicates
      }
   }
});
//Run transformer:
vsc.tsTransform(vscMethod, [collectDefs]);

// -- dependencyList --
// {
//   vsc: [
//     "sharedPath",
//     "splitPath",
//     "subtractPath"
//   ],
//   ts: [],
//   fs: [],
//   vscode: []
// }

 * @returns ts.TransformerFactory<T>
 */
exports.tsCreateNodeVisitor = (callback, program) => {
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
/** vsc-base method
 * @description
 * Create a Ts Visitor Transformer for finding a node and it position.
 * @see [tsFindNodePositionFromContent](http://vsc-base.org/#tsFindNodePositionFromContent)
 * @vscType ts
 * @oneLineEx const [node, position] = vsc.tsFindNodePositionFromContent(source, findNodePositionCallback)
 * @ex
 const source = `
   const method2 = () => {
      const moduleNumber1Path = '/module/area/file1'
      return moduleNumber1Path
   }
   function method1(doIt){
      if(doIt){
         const moduleNumber1Path = '/module/area/file1' // <-- Find this
         return moduleNumber1Path
      }
   }
`
// Find a constant with name starting with 'module' within a function but not in an if statement
const [_node, position] = vsc.tsFindNodePositionFromContent(source, node =>
 vsc.tsMatchVariable(node, {
      // test name of variable
      name: /^module/,
      // test if is in function
      hasAncestors: [
         ancestor => vsc.tsIsFunction(ancestor, { name: /^method/ }),
         ancestor => ts.isIfStatement(ancestor)
      ]
   })
)
if (position) {
   const realText = source.substring(position.start, position.end);
   // Select the source (assuming the source is from the open document)
   vsc.setSelection(position.start, position.end)
}
 * @returns [ts.Node | undefined, vsc.VscodePosition | undefined]
 */
exports.tsFindNodePositionFromContent = (source, callback, program, fromPosition = 0, trimSpaces = true) => {
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
/** vsc-base method
 * @description
 * Create a Ts Visitor Transformer for finding a nodes and their position.
 * @see [tsFindAllNodePositionsFromContent](http://vsc-base.org/#tsFindAllNodePositionsFromContent)
 * @vscType ts
 * @oneLineEx const nodePositionArray = vsc.tsFindAllNodePositionsFromContent(source, findNodePositionCallback)
 * @ex
 const source = `
   const method2 = () => {
      const moduleNumber1Path = '/module/area/file1' // <-- Find this
      return moduleNumber1Path // <-- Find this
   }
   function method1(doIt){
      if(doIt){
         const moduleNumber1Path = '/module/area/file1' // <-- Find this
         return moduleNumber1Path // <-- Find this
      }
   }
`
// Find a constant with name starting with 'module' within a function but not in an if statement
const nodePositionArray = vsc.tsFindAllNodePositionsFromContent(source, node =>
 vsc.tsMatchVariable(node, {
      // test name of variable
      name: /^module/,
      // test if is in function
      hasAncestors: [
         ancestor => vsc.tsIsFunction(ancestor, { name: /^method/ }),
         ancestor => ts.isIfStatement(ancestor)
      ]
   })
)
nodePositionArray.forEach([node, position] => {
   vsc.addSelection(position.start, position.end)
})
 * @returns [ts.Node, vsc.VscodePosition][]
 */
exports.tsFindAllNodePositionsFromContent = (source, callback, program, fromPosition = 0, trimSpaces = true) => {
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
/** vsc-base method
 * @description
 * tsReplace is a smart search and replace that take the source, a replaceString and a callback for finding the node to replace. \
 * It uses [tsFindNodePositionFromContent](http://vsc-base.org/#tsFindNodePositionFromContent) to find the node.
 * See also [tsReplaceAll](http://vsc-base.org/#tsReplaceAll)
 * @see [tsReplace](http://vsc-base.org/#tsReplace)
 * @vscType ts
 * @oneLineEx source = vsc.tsReplace(source, replaceString, findNodePositionCallback)
 * @ex
let source = `
   const method2 = () => {
      const moduleNumber1Path = '/module/area/file1' // <-- replace this
      return moduleNumber1Path
   }
`
// Find a constant with name starting with 'module' within a function but not in an if statement
source = vsc.tsReplace(source, '/module/area/file2', node => vsc.tsMatchValue(node, /\/area\/file1/, {
   hasAncestors: [
      ancestor => vsc.tsIsFunction(ancestor, { name: /^method/ }),
      ancestor => vsc.tsIsVariable(ancestor, { name: /^module.*Path/ })
   ]
}))
 *
 * @returns string
 */
exports.tsReplace = (source, replaceString, callback, program, fromPosition = 0, trimSpaces = true) => {
    const [node, position] = vsc.tsFindNodePositionFromContent(source, callback, program, fromPosition, trimSpaces);
    if (position) {
        //replace
        source = source.substring(0, position.start) + replaceString + source.substring(position.end);
    }
    return source;
};
/** vsc-base method
 * @description
 * tsReplace is a smart search and replace that take the source, a replaceString and a callback for finding the node to replace. \
 * It uses [tsFindNodePositionFromContent](http://vsc-base.org/#tsFindNodePositionFromContent) to find the node.
 * @see [tsReplace](http://vsc-base.org/#tsReplace)
 * @vscType ts
 * @oneLineEx source = vsc.tsReplace(source, replaceString, findNodePositionCallback)
 * @ex
let source = `
   const method2 = () => {
      const moduleNumber1Path = '/module/area/file1' // <-- replace moduleNumber1Path
      return moduleNumber1Path // <-- replace moduleNumber1Path
   }
`
// Find a constant with name starting with 'module' within a function but not in an if statement
source = vsc.tsReplaceAll(source, 'moduleNumber2', node => vsc.tsMatchIdentifier(node, {
   name: 'moduleNumber1Path'
}))
 *
 * @returns string
 */
exports.tsReplaceAll = (source, replaceString, callback, program, fromPosition = 0, trimSpaces = true) => {
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
/** vsc-base method
 * @description
 * Insert an import if its not already imported. \
 * It will add it to an existing import that has the same path or add a new import after the last import.
 * @see [tsInsetImport](http://vsc-base.org/#tsInsetImport)
 * @vscType ts
 * @oneLineEx source = vsc.tsInsetImport(source, 'useCallback', 'react')
 * @returns string
 */
exports.tsInsetImport = (source, importName, importPath, isDefault = false, useDoubleQuotation = false, addSemicolon = false) => {
    const [matchImport] = vsc.tsFindNodePositionFromContent(source, node => vsc.tsMatchImport(node, {
        nameSpace: importName
    })
        ||
            vsc.tsMatchImport(node, {
                defaultName: importName
            }));
    if (matchImport) {
        return source;
    }
    const [matchImportPath] = vsc.tsFindNodePositionFromContent(source, node => vsc.tsMatchImport(node, {
        path: importPath
    }));
    if (matchImportPath) {
        let importContent = matchImportPath.getText();
        importContent = isDefault
            ? importContent.replace('import ', `import ${importName}, `)
            : importContent.replace('import {', `import { ${importName},`);
        source = source.substring(0, matchImportPath.pos) + importContent + source.substring(matchImportPath.end);
        return source;
    }
    const allImports = vsc.tsFindAllNodePositionsFromContent(source, node => vsc.tsMatchImport(node)).map(([imp, pos]) => imp);
    let importPos = 0;
    if (allImports.length > 0) {
        allImports.sort((a, b) => a.end - b.end);
        const lastImport = allImports[allImports.length - 1];
        importPos = lastImport.end + 1;
    }
    const quotation = useDoubleQuotation ? '"' : "'";
    const semiColon = addSemicolon ? ';' : '';
    const importContent = isDefault
        ? `import ${importName} from ${quotation}${importPath}${quotation}${semiColon}\n`
        : `import { ${importName} } from ${quotation}${importPath}${quotation}${semiColon}\n`;
    source = source.substring(0, importPos) + importContent + source.substring(importPos);
    return source;
};
//# sourceMappingURL=vsc-base-typescript-transform.js.map