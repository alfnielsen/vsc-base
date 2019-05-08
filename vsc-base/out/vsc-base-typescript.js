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
const fs = require("fs-extra");
const vscode = require("vscode");
const ts = require("typescript");
const cp = require("child-process-promise");
const vsc = require("./vsc-base");
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
exports.tsTranspile = (sourceTs, compilerOptions = vsc.TsDefaultCompilerOptions) => {
    const transpiledOutput = ts.transpileModule(sourceTs, { compilerOptions });
    let sourceJs = transpiledOutput.outputText;
    return sourceJs;
};
/** vsc-base method
 * @description
 * Pre method for tsLoadModule. \
 * (This methods load the ts source, transpile it to js and replace all 'require' instance)
 * @see [tsLoadModuleSourceCode](http://vsc-base.org/#tsLoadModuleSourceCode)
 * @param path
 * @param compilerOptions
 * @param moduleMap default = vsc.getVscDefaultModuleMap()
 * @vscType System
 * @oneLineEx const sourceJs = await vsc.tsLoadModuleSourceCode(path)
 * @returns Promise<string>
 */
exports.tsLoadModuleSourceCode = (path, compilerOptions = vsc.TsDefaultCompilerOptions) => __awaiter(this, void 0, void 0, function* () {
    const scriptFileTs = yield vsc.getFileContent(path);
    let sourceJs = vsc.tsTranspile(scriptFileTs, compilerOptions);
    sourceJs = vsc.tsRewriteTranpiledCodeWithVscBaseModules(sourceJs);
    return sourceJs;
});
/** vsc-base method
 * @description
 * Return the default module map of vsc-base \
 * (Used for ts compiling, module load ect)
 * @see [getVscDefaultModuleMap](http://vsc-base.org/#getVscDefaultModuleMap)
 * @internal this method is primary used by vsc.loadTsModule
 * @vscType System
 * @oneLineEx const moduleMap = vsc.getVscDefaultModuleMap()
 * @returns \{ [key: string]: \{ name: string, module: any \} \}
 */
exports.getVscDefaultModuleMap = () => {
    return [
        { key: 'vsc', name: 'vsc-base', module: vsc },
        { key: 'ts', name: 'typescript', module: ts },
        { key: 'fs', name: 'fs-extra', module: fs },
        { key: 'vscode', name: 'vscode', module: vscode },
        { key: 'cp', name: 'child-process-promise', module: cp }
    ];
};
/** vsc-base method
 * @description
 * Replace ts traspiles code's require for vsc, ts, fs and vscode.
 * @see [tsRewriteTranpiledCodeWithVscBaseModules](http://vsc-base.org/#tsRewriteTranpiledCodeWithVscBaseModules)
 * @internal this method is primary used by vsc.tsLoadModule
 * @notes
 * ts.transpile as follows:
 * const vsc_base_1 = require("vsc-base");
 * const fs = require("fs-extra");
 * const typescript_1 = require("typescript");
 * const vscode = require("vscode");
 * @vscType System
 * @oneLineEx const sourceJs = vsc.tsRewriteTranpiledCodeWithVscBaseModules(sourceJs)
 * @param sourceJs
 * @returns string
 */
exports.tsRewriteTranpiledCodeWithVscBaseModules = (sourceJs) => {
    const modulesMap = vsc.getVscDefaultModuleMap();
    modulesMap.forEach(obj => {
        const reg = new RegExp(`\\bconst (\\w+) = require\\(\\"${obj.name}\\"\\)`, 'g');
        sourceJs = sourceJs.replace(reg, (str) => `/* ${str} // vsc-base has change the ts transpiled code here. */`);
    });
    return sourceJs;
};
/** vsc-base method
 * @description
 * Load a ts file. \
 * Transpile it to js (run time) add wrap code and execute it (using eval)! \
 * Returning an plainObject with the scripts exports. \
 * export default xxx transpile's to export.default \
 * IMPORTANT Dont just run code you dont now, this can cause injection! \
 * IMPORTANT Be carefull when running scripts that also uses tsLoadModule, this can break down entire systems! \
 * (If you start a recursive change that dont stop..)
 * @see [tsLoadModule](http://vsc-base.org/#tsLoadModule)
 * @param path
 * @dependencyExternal ts
 * @dependencyInternal getFileContent, showErrorMessage
 * @vscType System
 * @oneLineEx const moduleObj = await vsc.tsLoadModule(path)
 * @ex
let moduleObj
try {
   moduleObj = await vsc.tsLoadModule(path)
} catch (e){
   vsc.showErrorMessage(`Loadeding module coused an error: ${e}`)
   return
}
const varifiedModule = vsc.varifyModuleMethods(moduleObj, ['run'])
if (!varifiedModule) {
   vsc.showErrorMessage(`Module didnt have 'run' :: ${JSON.stringify(moduleObj)}`)
   return
}
try {
   const result = varifiedModule.run()
   await vsc.awaitResult(result)
   vsc.showMessage(`Loaded Run resulted with value: ${result}`)
} catch (e) {
   vsc.showErrorMessage('Error: ' + e)
}
 * @returns Promise<{ [key: string]: unknown; }>
 */
exports.tsLoadModule = (path, compilerOptions = vsc.TsDefaultCompilerOptions) => __awaiter(this, void 0, void 0, function* () {
    const sourceJs = yield vsc.tsLoadModuleSourceCode(path, compilerOptions);
    let _exports = {};
    try {
        _exports = loadTsModule_Eval(sourceJs);
    }
    catch (e) {
        if (e instanceof TSLoadModuleError) {
            throw e;
        }
        else {
            throw new TSLoadModuleError(e, sourceJs);
        }
    }
    return _exports;
});
class TSLoadModuleError extends Error {
    constructor(message, transpiledCode) {
        super(message);
        this.transpiledCode = transpiledCode;
    }
}
exports.TSLoadModuleError = TSLoadModuleError;
const loadTsModule_Eval = (sourceJs) => __awaiter(this, void 0, void 0, function* () {
    //Wrap code in enclosed function. Add vsc as only dependency.
    const wrapExports = `_exports = (function(){var exports = {};\n${sourceJs}\nreturn exports})()`;
    let _exports = {};
    try {
        eval(wrapExports);
    }
    catch (e) {
        throw new TSLoadModuleError(e, wrapExports);
    }
    return _exports;
});
/** vsc-base method
 * @description
 * Test if a loaded module has methods (Loaded with vsc.loadTsModule) \
 * return undefined if a method didnt exist.
 * @see [varifyModuleMethods](http://vsc-base.org/#varifyModuleMethods)
 * @vscType System
 * @oneLineEx const varifyModuleMethods = vsc.varifyModuleMethods(_module, methodName)
 * @ex
const varifiedModule = vsc.varifyModuleMethods(_module, ['run', 'getId'])
const result = varifiedModule.run()
 * @returns { [key: string]: any } | undefined
 */
exports.varifyModuleMethods = (_module, methods) => {
    const map = {};
    for (const key of methods) {
        if (_module.hasOwnProperty(key) && _module[key] instanceof Function) {
            map[key] = _module[key];
        }
        else {
            return undefined;
        }
    }
    return map;
};
/** vsc-base method
 * @description
 * Ensure that a method result that optional can be a promise is awaited. \
 * (Responses from methods loaded with vsc.tsLoadModule can be optional async!)
 * @see [awaitResult](http://vsc-base.org/#awaitResult)
 * @vscType ts
 * @oneLineEx await vsc.awaitResult(result)
 * @ex
 const varifiedModule = vsc.varifyModuleMethods(_module, ['run'])
 let result = varifiedModule.run()
 result = await vsc.awaitResult(result)
 * @returns Promise<any>
 */
exports.awaitResult = (result) => __awaiter(this, void 0, void 0, function* () {
    if (result instanceof Promise) {
        return result;
    }
    else {
        return Promise.resolve(result);
    }
});
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
 * This is like a [tsTransform](http://vsc-base.org/#tsTransform), but it doenst transform or print content. \
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
 * @oneLineEx vsc.tsVisitWithTransformers(code, [visitor1, trandsformer1])
 */
exports.tsVisitWithTransformers = (source, transformers, compilerOptions = vsc.TsDefaultCompilerOptions) => {
    const sourceFile = vsc.tsCreateSourceFile(source);
    vsc.tsTransformNode(sourceFile, transformers, compilerOptions);
};
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
exports.tsTransformNode = (sourceFile, transformers, compilerOptions = vsc.TsDefaultCompilerOptions) => {
    return ts.transform(sourceFile, transformers, compilerOptions);
};
/** vsc-base method
 * @description
 * vsc-base's internal default ts compiler options
 * @see [TsDefaultCompilerOptions](http://vsc-base.org/#TsDefaultCompilerOptions)
 * @internal
 * @experimental This method can easily change, because ts api is in experimental state.
 * @vscType ts
 * @oneLineEx const compilerOptions = vsc.TsDefaultCompilerOptions
 */
exports.TsDefaultCompilerOptions = ({
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2015,
    libs: ['es6']
});
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
exports.tsCreateSourceFile = (content, sourceFileName = `sourcefile_${(new Date().getTime())}`) => {
    let sourceFile = ts.createSourceFile(sourceFileName, content, ts.ScriptTarget.ES2015, 
    /*setParentNodes */ true);
    return sourceFile;
};
/** vsc-base method
 * @description
 * ts.Node's getChildren and getChildrenCount uses tokens not parsed nodes. \
 * So to this method uses ts's forEachChild to colloct the parsed nodes. \
 * Normally used in custom transformer methods (vsc.tsCreateTransformer)
 * @see [tsGetParsedChildren](http://vsc-base.org/#tsGetParsedChildren)
 * @params node
 * @experimental This method can easily change, because ts api is in experimental state.
 * @vscType ts
 * @oneLineEx const children = vsc.tsGetParsedChildren(node)
 */
exports.tsGetParsedChildren = (node) => {
    let chrindren = [];
    node.forEachChild(c => { chrindren.push(c); });
    return chrindren;
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
   if (!ts.isArrowFunction(node)) { // is not an arrow funcion
      return
   }
   const children = vsc.tsGetParsedChildren(node.body)
   if (children.length !== 1) { // dont have one statement
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
const removeDebuggerTransformner = vsc.tsCreateRemoveNodesTransformer((node) => {
   if (ts.isDebuggerStatement(node)) {
      return true
   }
   return false
});
//Run transformer:
const updatedCode = vsc.tsTransform(code, [removeDebuggerTransformner]);

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
 * Create a Ts Visitor Transformer for collecting data (Will not remove or reaplce any nodes) \
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
   function method1(doit){
      if(doit){
         const moduleNumber1Path = '/module/area/file1' // <-- Find this
         return moduleNumber1Path
      }
   }
`
// Find a constant with name starting with 'module' witin a function but not in an if statement
const [_node, position] = vsc.tsFindNodePositionFromContent(source, node =>
 vsc.tsIsVariable(node, {
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
   // Select the source (asuming the source is from the open document)
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
            const found = callback(node, typeChecker, program);
            if (!found) {
                return ts.visitEachChild(node, (child) => visit(child), context);
            }
            if (node === undefined) {
                throw new Error('Node is undefined!!!');
            }
            position = vsc.createVscodeRangeAndPosition(source, node.pos, node.end, trimSpaces);
            foundNode = node;
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
   function method1(doit){
      if(doit){
         const moduleNumber1Path = '/module/area/file1' // <-- Find this
         return moduleNumber1Path // <-- Find this
      }
   }
`
// Find a constant with name starting with 'module' witin a function but not in an if statement
const nodePositionArray = vsc.tsFindAllNodePositionsFromContent(source, node =>
 vsc.tsIsVariable(node, {
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
            const found = callback(node, typeChecker, program);
            if (!found) {
                return ts.visitEachChild(node, (child) => visit(child), context);
            }
            if (node === undefined) {
                throw new Error('Node is undefined!!!');
            }
            position = vsc.createVscodeRangeAndPosition(source, node.pos, node.end, trimSpaces);
            foundNode = node;
            positions.push([foundNode, position]);
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
// Find a constant with name starting with 'module' witin a function but not in an if statement
source = vsc.tsReplace(source, '/module/area/file2', node => vsc.tsIsValue(node, /\/area\/file1/, {
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
// Find a constant with name starting with 'module' witin a function but not in an if statement
source = vsc.tsReplaceAll(source, 'moduleNumber2', node => vsc.tsIsIdentifier(node, {
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
 * Find is a direct parsedChild that matches conditions in a callback\
 * See also [tsHasChild](http://vsc-base.org/#tsHasChild) \
 * See also [tsFindGrandChild](http://vsc-base.org/#tsFindGrandChildNode)
 * @see [tsFindChildNode](http://vsc-base.org/#tsFindChildNode)
 * @vscType ts
 * @oneLineEx const childNode = vsc.tsFindChild(node, childNodeTestCallback })
 * @ex
const childNode = vsc.tsFindChild(node, (childNode)=> vsc.tsIdVariable(childNode, {
   name:/^varName$/,
   isConst: true
}))
 * @returns ts.Node | undefined
 */
exports.tsFindChild = (node, callback) => {
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
/** vsc-base method
 * @description
 * Test if direct parsedChild that matches conditions in a callback \
 * Using [tsFind](http://vsc-base.org/#tsFind) \
 * See also [tsHasGrandChild](http://vsc-base.org/#tsHasGrandChild)
 * @see [tsHasChild](http://vsc-base.org/#tsHasChild)
 * @vscType ts
 * @oneLineEx const child = vsc.tsHasChild(node, childNodeTestCallback })
 * @ex
const hasChild = vsc.tsHasChild(node, (childNode) => vsc.tsIsVariable(childNode, {
   name:/^varName$/,
   isConst: true
}))
 * @returns boolean
 */
exports.tsHasChild = (node, callback) => {
    return !!vsc.tsFindChild(node, callback);
};
/** vsc-base method
 * @description
 * Test if it has all children or grandChildren (child's child) that matches conditions in a callback \
 * Using [tsHasChild](http://vsc-base.org/#tsHasChild)
 * @see [tsHasChildren](http://vsc-base.org/#tsHasChildren)
 * @vscType ts
 * @oneLineEx const childNode = vsc.tsHasChildren(node, [childNodeTestCallback1, childNodeTestCallback2])
 * @ex
// find a variable any where within the parent node, that is a const and has a staring name of: varName
const hasGrandChilddNode = vsc.tsHasChildren(node, [
   childNode => vsc.tsIsVariable(childNode, { name:/^varName1/ }),
   childNode => vsc.tsIsVariable(childNode, { name:/^varName2/ })
})
 * @returns ts.Node | undefined
 */
exports.tsHasChildren = (node, callbacks) => {
    for (let index = 0; index < callbacks.length; index++) {
        const callback = callbacks[index];
        if (!vsc.tsHasGrandChild(node, callback)) {
            return false;
        }
    }
    return true;
};
/** vsc-base method
 * @description
 * Find a child or grandChild (child's child) that matches conditions in a callback\
 * @see [tsFindGrandChild](http://vsc-base.org/#tsFindGrandChild)
 * @vscType ts
 * @oneLineEx const childNode = vsc.tsFindGrandChild(node, childNodeTestCallback)
 * @ex
// find a variable any where within the parent node, that is a const and has a staring name of: varName
const childNode = vsc.tsFindGrandChild(node, (childNode) => vsc.tsIsVariable(childNode, {
   name:/^varName/,
   isConst: true
}))
 * @returns ts.Node | undefined
 */
exports.tsFindGrandChild = (node, callback) => {
    let found;
    const mathChild = (node, depth) => {
        if (found) {
            return;
        }
        const children = vsc.tsGetParsedChildren(node);
        for (let index = 0; index < children.length; index++) {
            const child = children[index];
            const result = callback(child, depth);
            if (result) {
                found = child;
            }
            else {
                mathChild(child, depth + 1);
            }
        }
    };
    mathChild(node, 0);
    return found;
};
/** vsc-base method
 * @description
 * Test if it has  a child or grandChild (child's child) that matches conditions in a callback \
 * Using [tsFindGrandchild](http://vsc-base.org/#tsFindGrandchild)
 * @see [tsHasGrandChild](http://vsc-base.org/#tsHasGrandChild)
 * @vscType ts
 * @oneLineEx const found = vsc.tsFindGrandChild(node, childNodeTestCallback)
 * @ex
// find a variable any where within the parent node, that is a const and has a staring name of: varName
const found = vsc.tsHasGrandChild(node, (childNode) => vsc.tsIsVariable(childNode, {
   name:/^varName/,
   isConst: true
}))
 * @returns boolean
 */
exports.tsHasGrandChild = (node, callback) => {
    return !!vsc.tsFindGrandChild(node, callback);
};
/** vsc-base method
 * @description
 * Test if it has all Children or grandChildren (child's child) that matches conditions in a callback \
 * Using [tsFindGrandchild](http://vsc-base.org/#tsFindGrandchild)
 * @see [tsHasGrandChildren](http://vsc-base.org/#tsHasGrandChildren)
 * @vscType ts
 * @oneLineEx const found = vsc.tsHasGrandChildrend(node, [childNodeTestCallback1, childNodeTestCallback2])
 * @ex
// find a variable any where within the parent node, that is a const and has a staring name of: varName
const found = vsc.tsHasGrandChildren(node, [
   childNode => return vsc.tsIsVariable(childNode, { name:/^varName1/ }),
   childNode => return vsc.tsIsVariable(childNode, { name:/^varName2/ })
})
 * @returns boolean
 */
exports.tsHasGrandChildren = (node, callbacks) => {
    for (let index = 0; index < callbacks.length; index++) {
        const callback = callbacks[index];
        if (!vsc.tsHasGrandChild(node, callback)) {
            return false;
        }
    }
    return true;
};
/** vsc-base method
 * @description
 * Find a parent or ancestor (parent's parent) that matches conditions in a callback
 * @see [tsFindAncestor](http://vsc-base.org/#tsFindAncestor)
 * @vscType ts
 * @oneLineEx const ancestor = vsc.tsFindAncestor(node, ancestorNodeTestCallback)
 * @ex
// find a function with name 'someCaller'
const ancestor = vsc.tsFindAncestor(node, (childNode) => vsc.tsIsFunction(childNode, {
   name:/^someCaller$/
}))
 * @returns ts.Node | undefined
 */
exports.tsFindAncestor = (node, callback) => {
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
/** vsc-base method
 * @description
 * Test if it has a parent or ancestor (parent's parent) that matches conditions in a callback \
 * Using [tsFindAncestor](http://vsc-base.org/#tsFindAncestor)
 * @see [tsHasAncestor](http://vsc-base.org/#tsHasAncestor)
 * @vscType ts
 * @oneLineEx const hasAncestor = vsc.tsHasAncestor(node, ancestorNodeTestCallback)
 * @ex
// find a function with name 'someCaller'
const hasAncestor = vsc.tsHasAncestor(node, (childNode) => vsc.tsIsFunction(childNode, {
   name:/^someCaller$/
}))
 * @returns boolean
 */
exports.tsHasAncestor = (node, callback) => {
    return !!vsc.tsFindAncestor(node, callback);
};
/** vsc-base method
 * @description
 * Test is it has all ancestors (parent's parent) that matches conditions in a callback \
 * Using [tsFindAncestor](http://vsc-base.org/#tsFindAncestor)
 * @see [tsHasAncestors](http://vsc-base.org/#tsHasAncestors)
 * @vscType ts
 * @oneLineEx const hasAncestor = vsc.tsHasAncestor(node, ancestorNodeTestCallback)
 * @ex
// find a function with name 'someCaller'
const hasAncestor = vsc.tsHasAncestor(node, (childNode) => vsc.tsIsFunction(childNode, {
   name:/^someCaller$/
}))
 * @returns boolean
 */
exports.tsHasAncestors = (node, callbacks) => {
    for (let index = 0; index < callbacks.length; index++) {
        const callback = callbacks[index];
        if (!vsc.tsHasAncestor(node, callback)) {
            return false;
        }
    }
    return true;
};
/** vsc-base method
 * @description
 * Test is a node is a object property (node: ts.PropertyAssignment) \
 * Optional test for its name with a string or regexp. \
 * Optional test for tsHasAncestor and hasGrandChild \
 * See [tsMacthNode](http://vsc-base.org/#tsMacthNode) \
 * Optional value can be tested against a string, a number (with a string, number or regexp). \
 * See [tsMacthValue](http://vsc-base.org/#tsMacthValue)
 * @see [tsMatchObjectProperty](http://vsc-base.org/#tsMatchObjectProperty)
 * @vscType ts
 * @oneLineEx const objNode = vsc.tsMatchObjectProperty(node, options)
 * @ex
const objNode = vsc.tsMatchObjectProperty(node, { name: /^keyName$/ })
 * @returns ts.PropertyAssignment | undefined
 */
exports.tsMatchObjectProperty = (node, options) => {
    if (!node || !ts.isPropertyAssignment(node)) {
        return;
    }
    if (!options) {
        return node;
    }
    const { variableName, parentObjectPropertyName, } = options;
    if (!vsc.tsIsNode(node, options)) {
        return;
    }
    if (variableName !== undefined) {
        const variable = node.parent.parent;
        if (!vsc.tsIsVariable(variable, { name: variableName })) {
            return;
        }
    }
    if (parentObjectPropertyName !== undefined) {
        const parentObjectProperty = node.parent.parent;
        if (!vsc.tsIsObjectProperty(parentObjectProperty, { name: variableName })) {
            return;
        }
    }
    return node;
};
/** vsc-base method
 * @description
 * Test if a node is a function \
 * (node: ts.isArrowFunction, ts.isFunctionExpression or ts.isFunctionDeclaration) \
 * Optional test for its name with a string or regxep. \
 * (For ArrowFunction's and FunctionExpression's it will test for a variable declaration that points to the function) \
 * Optional test for tsHasAncestor and hasGrandChild \
 * See [tsMacthNode](http://vsc-base.org/#tsMacthNode) \
 * @see [tsMatchFunction](http://vsc-base.org/#tsMatchFunction)
 * @vscType ts
 * @oneLineEx const funcNone = vsc.tsMatchFunction(node, options)
 * @ex
const funcNone = vsc.tsMatchFunction(node, { name: /^myCaller$/ })
 * @returns ts.ArrowFunction | ts.FunctionExpression | ts.FunctionDeclaration | undefined
 */
exports.tsMatchFunction = (node, options) => {
    if (!node || !(ts.isArrowFunction(node) || ts.isFunctionExpression(node) || ts.isFunctionDeclaration(node))) {
        return;
    }
    if (!options) {
        return node;
    }
    const { name } = options;
    delete options.name; //leave name
    if (!vsc.tsIsNode(node, options)) {
        return;
    }
    if (name !== undefined) {
        let funcName;
        if ((ts.isArrowFunction(node) || ts.isFunctionExpression(node)) && ts.isVariableDeclaration(node.parent)) {
            funcName = node.parent.name.getText();
        }
        if (ts.isFunctionDeclaration(node) && node.name) {
            funcName = node.name.getText();
        }
        if (!funcName) {
            return;
        }
        if (name instanceof RegExp && !name.test(funcName)) {
            return;
        }
        if (typeof name === 'string' && name !== funcName) {
            return;
        }
    }
    return node;
};
/** vsc-base method
 * @description
 * Test is a node is a variable declaration (node: ts.VariableDeclaration) \
 * Optional test for its name with a string or regexp, \
 * Optional test if its a const, let or var. \
 * Optional test for tsHasAncestor and hasGrandChild \
 * See [tsMacthNode](http://vsc-base.org/#tsMacthNode) \
 * Optional value can be tested against a string, a number (with a string, number or regexp). \
 * See [tsMacthValue](http://vsc-base.org/#tsMacthValue)
 * @see [tsMatchVariable](http://vsc-base.org/#tsMatchVariable)
 * @vscType ts
 * @oneLineEx const varNode = vsc.tsMatchVariable(node, options)
 * @ex
const varNode = vsc.tsMatchVariable(node, { name: /^myCaller$/ })
 * @returns ts.VariableDeclaration | undefined
 */
exports.tsMatchVariable = (node, options) => {
    if (!node || !ts.isVariableDeclaration(node)) {
        return;
    }
    if (!options) {
        return node;
    }
    const { isConst, isLet, isVar, } = options;
    if (!vsc.tsIsNode(node, options)) {
        return;
    }
    if (isConst !== undefined && (!node.parent || isConst !== (node.parent.flags === 2))) {
        return;
    }
    if (isLet !== undefined && (!node.parent || isLet !== (node.parent.flags === 1))) {
        return;
    }
    if (isVar !== undefined && (!node.parent || isVar !== (node.parent.flags === 0))) {
        return;
    }
    return node;
};
/** vsc-base method
 * @description
 * Test is a node is a variable declaration (node: ts.VariableDeclaration) \
 * Optional test for its name with a string or regexp, \
 * Optional test if its a const, let or var. \
 * Optional test for tsHasAncestor and hasGrandChild \
 * See [tsMacthNode](http://vsc-base.org/#tsMacthNode) \
 * Optional value can be tested against a string, a number (with a string, number or regexp). \
 * @see [tsMatchIdentifier](http://vsc-base.org/#tsMatchIdentifier)
 * @vscType ts
 * @oneLineEx const identifierNode = vsc.tsMatchIdentifier(node, options)
 * @ex
const identifierNode = vsc.tsMatchIdentifier(node, { name: /^myCaller$/ })
 * @returns ts.Identifier | undefined
 */
exports.tsMatchIdentifier = (node, options) => {
    if (!node || !ts.isIdentifier(node)) {
        return;
    }
    if (!options) {
        return node;
    }
    const { name } = options;
    if (name) {
        if (name instanceof RegExp && !name.test(node.getText())) {
            return;
        }
        if (typeof name === 'string' && name !== node.getText()) {
            return;
        }
    }
    delete options.name; // leave name
    if (!vsc.tsIsNode(node, options)) {
        return;
    }
    return node;
};
/** vsc-base method
 * @description
 * Test is a node is an interface (node: ts.InterfaceDeclaration) \
 * and optional test for its name with a string or regexp. \
 * Optional test for hasAncestor and hasGrandhild. \
 * See [tsMacthNode](http://vsc-base.org/#tsMacthNode) \
 * @see [tsMatchEnum](http://vsc-base.org/#tsMatchEnum)
 * @vscType ts
 * @oneLineEx const interfaceNode = vsc.tsMatchInterface(node, options)
 * @ex
const interfaceNode = vsc.tsMatchInterface(node, { name: /^myCaller$/ })
 * @returns ts.EnumDeclaration | undefined
 */
exports.tsMatchInterface = (node, options) => {
    if (!node || !ts.isInterfaceDeclaration(node)) {
        return;
    }
    if (!options) {
        return node;
    }
    if (!vsc.tsIsNode(node, options)) {
        return;
    }
    return node;
};
/** vsc-base method
 * @description
 * Test is a node is an type reference (node: ts.TypeReferenceNode) \
 * and optional test for its name with a string or regexp. \
 * Optional test for hasAncestor and hasGrandhild. \
 * See [tsMacthNode](http://vsc-base.org/#tsMacthNode) \
 * @see [tsMatchEnum](http://vsc-base.org/#tsMatchEnum)
 * @vscType ts
 * @oneLineEx const typeRefNode = vsc.tsMatchTypeRef(node, options)
 * @ex
const typeRefNode = vsc.tsMatchTypeRef(node, { name: /^myCaller$/ })
 * @returns ts.TypeReferenceNode | undefined
 */
exports.tsMatchTypeRef = (node, options) => {
    if (!node || !ts.isTypeReferenceNode(node)) {
        return;
    }
    if (!options) {
        return node;
    }
    const { name } = options;
    if (name instanceof RegExp && !name.test(node.typeName.getText())) {
        return;
    }
    if (typeof name === 'string' && name !== node.typeName.getText()) {
        return;
    }
    delete options.name; //leave name
    if (!vsc.tsIsNode(node, options)) {
        return;
    }
    return node;
};
/** vsc-base method
 * @description
 * Test is a node is an enum  declaration (node: ts.EnumDeclaration) \
 * and optional test for its name with a string or regexp. \
 * Optional test for hasAncestor and hasGrandhild. \
 * See [tsMacthNode](http://vsc-base.org/#tsMacthNode) \
 * @see [tsMatchEnum](http://vsc-base.org/#tsMatchEnum)
 * @vscType ts
 * @oneLineEx const enumNode = vsc.tsMatchEnum(node, options)
 * @ex
const enumNode = vsc.tsMatchEnum(node, { name: /^myCaller$/ })
 * @returns ts.EnumDeclaration | undefined
 */
exports.tsMatchEnum = (node, options) => {
    if (!node || !ts.isEnumDeclaration(node)) {
        return;
    }
    if (!options) {
        return node;
    }
    if (!vsc.tsIsNode(node, options)) {
        return;
    }
    return node;
};
/** vsc-base method
 * @description
 * Test is a node is a enum member (node: ts.EnumMember) \
 * and optional test for its name, the enum's name (it parant) \
 * it value, hasAncestor and hasGrandchild \
 * See [tsMacthNode](http://vsc-base.org/#tsMacthNode) \
 * Value can be tested against a string, a number (with a string, number or regexp). \
 * See [tsMacthValue](http://vsc-base.org/#tsMacthValue)
 * @see [tsMatchEnumMember](http://vsc-base.org/#tsMatchEnumMember)
 * @vscType ts
 * @oneLineEx const enumMemberNode = vsc.tsMatchEnumMember(node, options)
 * @ex
const enumMemberNode = vsc.tsMatchEnumMember(node, { name: /^myCaller$/ })
 * @returns ts.EnumMember | undefined
 */
exports.tsMatchEnumMember = (node, options) => {
    if (!node || !ts.isEnumMember(node)) {
        return;
    }
    if (!options) {
        return node;
    }
    const { enumName } = options;
    if (!vsc.tsIsNode(node, options)) {
        return;
    }
    if (enumName) {
        const parentEnumName = node.parent.name;
        if (enumName instanceof RegExp && !enumName.test(parentEnumName.getText())) {
            return;
        }
        if (typeof enumName === 'string' && enumName !== parentEnumName.getText()) {
            return;
        }
    }
    return node;
};
/** vsc-base method
 * @description
 * Test is a node is a object property (node: ts.PropertyAssignment) \
 * Uses [tsMatchObjectProperty](http://vsc-base.org/#tsMatchObjectProperty)
 * @see [tsIsObjectProperty](http://vsc-base.org/#tsIsObjectProperty)
 * @vscType ts
 * @oneLineEx const isObjNode = vsc.tsIsObjectProperty(node, options)
 * @ex
const isObjNode = vsc.tsIsObjectProperty(node, { name: /^keyName$/ })
 * @returns boolean
 */
exports.tsIsObjectProperty = (node, options) => {
    return !!vsc.tsMatchObjectProperty(node, options);
};
/** vsc-base method
 * @description
 * Test if a node is a function \
 * (node: ts.isArrowFunction, ts.isFunctionExpression or ts.isFunctionDeclaration) \
 * Uses [tsMatchFunction](http://vsc-base.org/#tsMatchFunction)
 * @see [tsIsFunction](http://vsc-base.org/#tsIsFunction)
 * @vscType ts
 * @oneLineEx const isFunctionNone = vsc.tsIsFunction(node, options)
 * @ex
const isFunctionNone = vsc.tsIsFunction(node, { name: /^myCaller$/ })
 * @returns boolean
 */
exports.tsIsFunction = (node, options) => {
    return !!exports.tsMatchFunction(node, options);
};
/** vsc-base method
 * @description
 * Test is a node is a variable declaration (node: ts.VariableDeclaration) \
 * Uses [tsMatchVariable](http://vsc-base.org/#tsMatchVariable)
 * @see [tsIsVariable](http://vsc-base.org/#tsIsVariable)
 * @vscType ts
 * @oneLineEx const isVariableNode = vsc.tsIsVariable(node, options)
 * @ex
const isVariableNode = vsc.tsIsVariable(node, { name: /^myCaller$/ })
 * @returns boolean
 */
exports.tsIsVariable = (node, options) => {
    return !!vsc.tsMatchVariable(node, options);
};
/** vsc-base method
 * @description
 * Test is a node is a variable declaration (node: ts.VariableDeclaration) \
 * Uses [tsMatchIdentifier](http://vsc-base.org/#tsMatchIdentifier)
 * @see [tsIsIdentifier](http://vsc-base.org/#tsIsIdentifier)
 * @vscType ts
 * @oneLineEx const isIdentifierNode = vsc.tsIsIdentifier(node, options)
 * @ex
const isIdentifierNode = vsc.tsIsIdentifier(node, { name: /^myCaller$/ })
 * @returns boolean
 */
exports.tsIsIdentifier = (node, options) => {
    return !!vsc.tsMatchIdentifier(node, options);
};
/** vsc-base method
 * @description
 * Test is a node is an interface (node: ts.InterfaceDeclaration) \
 * Uses [tsMatchInterface](http://vsc-base.org/#tsMatchInterface)
 * @see [tsIsEnum](http://vsc-base.org/#tsIsEnum)
 * @vscType ts
 * @oneLineEx const isInterfaceNode = vsc.tsIsInterface(node, options)
 * @ex
const isInterfaceNode = vsc.tsIsInterface(node, { name: /^myCaller$/ })
 * @returns boolean
 */
exports.tsIsInterface = (node, options) => {
    return !!vsc.tsMatchInterface(node, options);
};
/** vsc-base method
 * @description
 * Test is a node is an type reference (node: ts.TypeReferenceNode) \
 * Uses [tsMatchTypeRef](http://vsc-base.org/#tsMatchTypeRef)
 * @see [tsIsEnum](http://vsc-base.org/#tsIsEnum)
 * @vscType ts
 * @oneLineEx const isTypeRefNode = vsc.tsIsTypeRef(node, options)
 * @ex
const isTypeRefNode = vsc.tsIsTypeRef(node, { name: /^myCaller$/ })
 * @returns boolean
 */
exports.tsIsTypeRef = (node, options) => {
    return !!vsc.tsMatchTypeRef(node, options);
};
/** vsc-base method
 * @description
 * Test is a node is an enum  declaration (node: ts.EnumDeclaration) \
 * Uses [tsMatchEnum](http://vsc-base.org/#tsMatchEnum)
 * @see [tsIsEnum](http://vsc-base.org/#tsIsEnum)
 * @vscType ts
 * @oneLineEx const isEnumNode = vsc.tsIsEnum(node, options)
 * @ex
const isEnumNode = vsc.tsIsEnum(node, { name: /^myCaller$/ })
 * @returns boolean
 */
exports.tsIsEnum = (node, options) => {
    return !!vsc.tsMatchEnum(node, options);
};
/** vsc-base method
 * @description
 * Test is a node is a enum member (node: ts.EnumMember) \
 * Uses [tsMatchEnumMember](http://vsc-base.org/#tsMatchEnumMember)
 * @see [tsIsEnumMember](http://vsc-base.org/#tsIsEnumMember)
 * @vscType ts
 * @oneLineEx const isEnumMember = vsc.tsIsEnumMember(node, options)
 * @ex
const isEnumMember = vsc.tsIsEnumMember(node, { name: /^myCaller$/ })
 * @returns boolean
 */
exports.tsIsEnumMember = (node, options) => {
    return !!vsc.tsMatchEnumMember(node, options);
};
/** vsc-base method
 * @description
 * Base test for node properties. \
 * Optional test for its name with a string or regexp. \
 * (return false for node that dont have name property)\
 * Optional test for tsHasAncestor and hasGrandChild \
 * See [tsHasAncestor](http://vsc-base.org/#tsHasAncestor), [tsHasAncestors](http://vsc-base.org/#tsHasAncestors), [hasGrandChild](http://vsc-base.org/#hasGrandChild) and [hasGrandChildren](http://vsc-base.org/#hasGrandChildren) \
 * Optional value can be tested against a string, a number (with a string, number or regexp). \
 * (return false for node that dont have initializer)\
 * See [tsMacthValue](http://vsc-base.org/#tsMacthValue) \
 * @see [tsIsNode](http://vsc-base.org/#tsIsNode)
 * @vscType ts
 * @oneLineEx const found = vsc.tsIsNode(node, options)
 * @ex
const found = vsc.tsIsNode(node, { name: /^keyName$/ })
 * @returns ts.PropertyAssignment | undefined
 */
exports.tsIsNode = (node, options) => {
    if (!node) {
        return false;
    }
    if (!options) {
        return true;
    }
    const { name, value, hasAncestor, hasGrandChild, hasAncestors, hasGrandChildren } = options;
    const nameNode = node.name;
    if (name !== undefined) {
        if (!nameNode) {
            return false;
        }
        if (name instanceof RegExp && !name.test(nameNode.getText())) {
            return false;
        }
        if (typeof name === 'string' && name !== nameNode.getText()) {
            return false;
        }
    }
    const initializerNode = node.initializer;
    if (value !== undefined && (!initializerNode || !vsc.tsIsValue(initializerNode, value))) {
        return false;
    }
    if (hasAncestor && !vsc.tsHasAncestor(node, hasAncestor)) {
        return false;
    }
    if (hasAncestors && !vsc.tsHasAncestors(node, hasAncestors)) {
        return false;
    }
    if (hasGrandChild && !vsc.tsHasGrandChild(node, hasGrandChild)) {
        return false;
    }
    if (hasGrandChildren && !vsc.tsHasGrandChildren(node, hasGrandChildren)) {
        return false;
    }
    return true;
};
/** vsc-base method
 * @description
 * Test if node is an value: string expression, number expression or boolean (true or false) \
 * and match the value: true, false, a number, a string, \
 * A RegExp can be applied for string/number search. \
 * Optional test hasAncestor. \
 * See [tsHasAncestor](http://vsc-base.org/#tsHasAncestor) and [tsHasAncestors](http://vsc-base.org/#tsHasAncestors)
 * @see [tsIsValue](http://vsc-base.org/#tsIsValue)
 * @vscType ts
 * @oneLineEx const found = vsc.tsIsValue(node, value)
 * @ex
// Found a NumberExpression with value 12
const foundNumberExpression = vsc.tsIsValue(node, 12)
// Found a NumberExpression with value 12, with a parant EnumValue
const foundNumberExpression = vsc.tsIsValue(node, 12, {
   hasParent: parent => vsc.matchEnum(parent)
})

 * @returns boolean
 */
exports.tsIsValue = (node, matchValue, options) => {
    if (node === undefined) {
        return false;
    }
    if (matchValue === null && node.kind !== ts.SyntaxKind.NullKeyword) {
        return false;
    }
    if (matchValue === true && node.kind !== ts.SyntaxKind.TrueKeyword) {
        return false;
    }
    if (matchValue === false && node.kind !== ts.SyntaxKind.FalseKeyword) {
        return false;
    }
    if (typeof matchValue === 'string'
        &&
            (!ts.isStringLiteral(node) || matchValue !== node.text)) {
        return false;
    }
    //ts's NumericLiteral has prop text that is s string, so we cast the matchValue.
    if (typeof matchValue === 'number'
        &&
            (!ts.isNumericLiteral(node) || '' + matchValue !== node.text)) {
        return false;
    }
    if (matchValue instanceof RegExp
        &&
            (!(ts.isNumericLiteral(node) || ts.isStringLiteral(node))
                || !matchValue.test(node.text))) {
        return false;
    }
    if (!options) {
        return true;
    }
    const { hasAncestor, hasAncestors, } = options;
    if (hasAncestor && !vsc.tsHasAncestor(node, hasAncestor)) {
        return false;
    }
    if (hasAncestors && !vsc.tsHasAncestors(node, hasAncestors)) {
        return false;
    }
    return true;
};
//# sourceMappingURL=vsc-base-typescript.js.map