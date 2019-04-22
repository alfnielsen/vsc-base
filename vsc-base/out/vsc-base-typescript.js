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
 const result = varifiedModule.run()
 await vsc.awaitResult(result)
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
 * Tranform source code using custom transformers \
 * See tsCreateTransformer and tsCreateRemoveNodesTransformer for creating transformer \
 * \
 * See also [tsCreateTransformer](http://vsc-base.org/#tsCreateTransformer) and [tsCreateRemoveNodesTransformer](http://vsc-base.org/#tsCreateRemoveNodesTransformer)
 * @see [tsTransform](http://vsc-base.org/#tsTransform)
 * @param source
 * @param transformers
 * @param compilerOptions
 * @param printer
 * @internal
 * @experimental This method can easily change, because ts api is in experimental state.
 * @vscType ts
 * @oneLineEx const updatedCode = vsc.tsTransform(code, [tranformer1, tranformer2])
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
 * This is like a tsTranform, but it doenst transform or print content.\
 * \
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
 * Tranform a ts.Node \
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
 * You can use  https://ts-ast-viewer.com/  or  https://astexplorer.net/ \
 * to generate the new ts nodes or node type.
 * @see [tsCreateTransformer](http://vsc-base.org/#tsCreateTransformer)
 * @param callback
 * @param program
 * @vscType ts
 * @experimental This method can easily change, because ts api is in experimental state.
 * @oneLineEx const transformer = vsc.tsCreateTransformer(transformerCallback)
 * @ex
// tranforms arrowFunction with one return statement to lambda function
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
 * Normally used in vsc.tsTransform
 * You can use: \
 * https://ts-ast-viewer.com/ \
 * or \
 * https://astexplorer.net/ \
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
 * Normally used in vsc.tsTransform
 * You can use: \
 * https://ts-ast-viewer.com/ \
 * or \
 * https://astexplorer.net/ \
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
 * Create a Ts Visitor Transformer for finding a node and it position. \
 * @see [tsFindNodePosition](http://vsc-base.org/#tsFindNodePosition)
 * @vscType ts
 * @oneLineEx const [node, position] = vsc.tsFindNodePosition(source, findNodePositionCallback)
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
const [_node, position] = vsc.tsFindNodePosition(source, node => {
   // test name of variable
   const nameIsCorrect = vsc.tsMatchVariable(node, { matchName: /^module/ })
   if (!nameIsCorrect) {
      return false
   }
   // test if is in function
   const funcAncestor = vsc.tsFindAncestor(node, (ancestor) => vsc.tsMatchFunction(ancestor, { matchName: /^method/ }))
   if (!funcAncestor) {
      return false
   }
   // test if is in if statement
   const ifAncestor = vsc.tsFindAncestor(node, (ancestor) => ts.isIfStatement(ancestor))
   if (!ifAncestor) {
      return false
   }
   // fund the correct node
   return true
})
if (position) {
   const realText = source.substring(position.start, position.end);
   // Select the source (asuming the source is from the open document)
   vsc.setSelection(position.start, position.end)
}
 * @returns [ts.Node | undefined, vsc.VscodePosition | undefined]
 */
exports.tsFindNodePosition = (source, callback, program) => {
    let position;
    let foundNode;
    let typeChecker;
    if (program) {
        typeChecker = program.getTypeChecker();
    }
    const visitor = (context) => {
        const visit = (node) => {
            const found = callback(node, typeChecker, program);
            if (!found) {
                return ts.visitEachChild(node, (child) => visit(child), context);
            }
            if (node === undefined) {
                throw new Error('Node is undefined!!!');
            }
            position = vsc.createVscodeRangeAndPosition(source, node.pos, node.end);
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
 * Find is a direct parsedChild that matches conditions in a callback\
 * See also [tsFindGrandChildNode](http://vsc-base.org/#tsFindGrandChildNode) \
 * @see [tsFindChildNode](http://vsc-base.org/#tsFindChildNode)
 * @vscType ts
 * @oneLineEx const childNode = vsc.tsFindChildNode(node, childNodeTestCallback })
 * @ex
const childNode = vsc.tsFindChildNode(node, (childNode)=>{
   return vsc.tsMatchVariable(childNode, {
      matchName:/^varName$/,
      isConst: true
   })
})
 * @returns ts.Node | undefined
 */
exports.tsFindChildNode = (node, callback) => {
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
 * Find a child or grandChild (child's child) that matches conditions in a callback\
 * @see [tsFindGrandChildNode](http://vsc-base.org/#tsFindGrandChildNode)
 * @vscType ts
 * @oneLineEx const childNode = vsc.tsFindGrandChildNode(node, childNodeTestCallback)
 * @ex
// find a variable any where within the parent node, that is a const and has a staring name of: varName
const childNode = vsc.tsFindGrandChildNode(node, (childNode)=>{
   return vsc.tsMatchVariable(childNode, {
      matchName:/^varName/,
      isConst: true
   })
})
 * @returns ts.Node | undefined
 */
exports.tsFindGrandChildNode = (node, callback) => {
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
 * Find a parent or ancestor (parent's parent) that matches conditions in a callback\
 * @see [tsMatchAncestor](http://vsc-base.org/#tsMatchAncestor)
 * @vscType ts
 * @oneLineEx const ancestor = vsc.tsFindAncestor(node, ancestorNodeTestCallback)
 * @ex
// find a function with name 'someCaller'
const ancestor = vsc.tsFindAncestor(node, (childNode)=>{
   return vsc.tsMatchFunction(childNode, {
      matchName:/^someCaller$/
   })
})
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
 * Test is a node is a object property (node: ts.PropertyAssignment) \
 * and optional test for its name
 * @see [tsMatchObjectProperty](http://vsc-base.org/#tsMatchObjectProperty)
 * @vscType ts
 * @oneLineEx const found = vsc.tsMatchObjectProperty(node, options)
 * @ex
const found = vsc.tsMatchObjectProperty(node, { matchName: /^keyName$/ })
 * @returns boolean
 */
exports.tsMatchObjectProperty = (node, options) => {
    if (!ts.isPropertyAssignment(node)) {
        return false;
    }
    if (options) {
        const { matchName } = options;
        if (matchName !== undefined && !matchName.test(node.name.getText())) {
            return false;
        }
    }
    return true;
};
/** vsc-base method
 * @description
 * Test is a node is a function \
 * (node: ts.SignatureDeclaration, Like FunctionDeclaration, FunctionExpression and ArrowFunction ect.. ) \
 * and optional test for its name. \
 * (For ArrowFunction's and FunctionExpression's it will test for a variable declaration that points to the function)
 * @see [tsMatchFunction](http://vsc-base.org/#tsMatchFunction)
 * @vscType ts
 * @oneLineEx const found = vsc.tsMatchFunction(node, options)
 * @ex
const found = vsc.tsMatchFunction(node, { matchName: /^myCaller$/ })
 * @returns boolean
 */
exports.tsMatchFunction = (node, options) => {
    if (!ts.isFunctionLike(node)) {
        return false;
    }
    if (options) {
        const { matchName } = options;
        if (matchName !== undefined) {
            let name;
            if ((ts.isArrowFunction(node) || ts.isFunctionExpression(node)) && ts.isVariableDeclaration(node.parent)) {
                name = node.parent.name.getText();
            }
            if (ts.isFunctionDeclaration(node) && node.name) {
                name = node.name.getText();
            }
            if (!name || !matchName.test(name)) {
                return false;
            }
        }
    }
    return true;
};
/** vsc-base method
 * @description
 * Test is a node is a variable declaration (node: ts.VariableDeclaration) \
 * and optional test for its name, \
 * and is its a const, let or var.
 * @see [tsMatchFunction](http://vsc-base.org/#tsMatchFunction)
 * @vscType ts
 * @oneLineEx const found = vsc.tsMatchFunction(node, options)
 * @ex
const found = vsc.tsMatchFunction(node, { matchName: /^myCaller$/ })
 * @returns boolean
 */
exports.tsMatchVariable = (node, options) => {
    if (!ts.isVariableDeclaration(node)) {
        return false;
    }
    if (options) {
        const { matchName, isConst, isLet, isVar } = options;
        if (matchName !== undefined && !matchName.test(node.name.getText())) {
            return false;
        }
        if (isConst !== undefined && (!node.parent || node.parent.flags !== 2)) {
            return false;
        }
        if (isLet !== undefined && (!node.parent || node.parent.flags !== 1)) {
            return false;
        }
        if (isVar !== undefined && (!node.parent || node.parent.flags !== 0)) {
            return false;
        }
    }
    return true;
};
//# sourceMappingURL=vsc-base-typescript.js.map