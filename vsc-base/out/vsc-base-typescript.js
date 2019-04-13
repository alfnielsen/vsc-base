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
const vsc = require("./vsc-base");
/**
 * @description
 * Transpile ts source to js
 * @see http://vsc-base.org/#transpileTs
 * @param sourceTs
 * @param compilerOptions
 * @vscType System
 * @oneLineEx const sourceJs = vsc.transpileTs(sourceTs)
 * @returns string
 */
exports.transpileTs = (sourceTs, compilerOptions = {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2015,
    libs: ['es6']
}) => {
    const transpiledOutput = ts.transpileModule(sourceTs, { compilerOptions });
    let sourceJs = transpiledOutput.outputText;
    return sourceJs;
};
/**
 * @description
 * Pre method for loadTsModule. \
 * (This methods load the ts source, transpile it to js and replace all 'require' instance)
 * @see http://vsc-base.org/#loadTsModuleSourceCode
 * @param path
 * @param compilerOptions
 * @param moduleMap default = vsc.getVscDefaultModuleMap()
 * @vscType System
 * @oneLineEx const sourceJs = await vsc.loadTsModuleSourceCode(path)
 * @returns Promise<string>
 */
exports.loadTsModuleSourceCode = (path, compilerOptions = {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2015,
    libs: ['es6']
}) => __awaiter(this, void 0, void 0, function* () {
    const scriptFileTs = yield vsc.getFileContent(path);
    let sourceJs = vsc.transpileTs(scriptFileTs, compilerOptions);
    sourceJs = vsc.rewriteTsTranpiledCodeWithVscBaseModules(sourceJs);
    return sourceJs;
});
/**
 * @description
 * Return the default module map of vsc-base \
 * (Used for ts compiling, module load ect)
 * @see http://vsc-base.org/#getVscDefaultModuleMap
 * @internal this method is primary used by vsc.loadTsModule
 * @vscType System
 * @oneLineEx const moduleMap = vsc.getVscDefaultModuleMap
 * @returns \{ [key: string]: \{ name: string, module: any \} \}
 */
exports.getVscDefaultModuleMap = () => {
    return [
        { key: 'vsc', name: 'vsc-base', module: vsc },
        { key: 'ts', name: 'typescript', module: ts },
        { key: 'fs', name: 'fs-extra', module: fs },
        { key: 'vscode', name: 'vscode', module: vscode }
    ];
};
/**
 * @description
 * Replace ts traspiles code's require for vsc, ts, fs and vscode.
 * @see http://vsc-base.org/#rewriteTsTranpiledCodeWithVscBaseModules
 * @internal this method is primary used by vsc.loadTsModule
 * @notes
 * ts.transpile as follows:
 * const vsc_base_1 = require("vsc-base");
 * const fs = require("fs-extra");
 * const typescript_1 = require("typescript");
 * const vscode = require("vscode");
 * @vscType System
 * @oneLineEx sourceJs = vsc.rewriteTsTranpiledCodeWithVscBaseModules(sourceJs)
 * @param sourceJs
 * @returns string
 */
exports.rewriteTsTranpiledCodeWithVscBaseModules = (sourceJs) => {
    const modulesMap = vsc.getVscDefaultModuleMap();
    modulesMap.forEach(obj => {
        const reg = new RegExp(`\\bconst (\\w+) = require\\(\\"${obj.name}\\"\\)`, 'g');
        sourceJs = sourceJs.replace(reg, (str) => `/* ${str} // vsc-base has change the ts transpiled code here. */`);
    });
    return sourceJs;
};
/**
 * @description
 * Load a ts file. \
 * Transpile it to js (run time) add wrap code and execute it (using eval)! \
 * Returning an plainObject with the scripts exports. \
 * export default xxx transpile s to export.default \
 * IMPORTANT Dont just run code you dont now, this can cause injection! \
 * IMPORTANT Be carefull when running scripts that also uses loadTsModule, this can break down entire systems! \
 * (If you start a recursive change that dont stop..)
 * @see http://vsc-base.org/#loadTsModule
 * @param path
 * @dependencyExternal ts
 * @dependencyInternal getFileContent, showErrorMessage
 * @vscType System
 * @oneLineEx const module = await vsc.loadTsModule(path)
 * @ex
let _module
try {
   _module = await vsc.loadTsModule(path)
} catch (e){
   vsc.showErrorMessage(`Loadeding module coused an error: ${e}`)
   return
}
const varifiedModule = vsc.varifyModuleMethods(_module, ['run'])
if (!varifiedModule) {
   vsc.showErrorMessage(`Module didnt have 'run' :: ${JSON.stringify(_module)}`)
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
exports.loadTsModule = (path, compilerOptions = {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2015,
    libs: ['es6']
}) => __awaiter(this, void 0, void 0, function* () {
    const sourceJs = yield vsc.loadTsModuleSourceCode(path, compilerOptions);
    let _exports = {};
    try {
        _exports = loadTsModule_Eval(sourceJs);
    }
    catch (e) {
        if (e instanceof LoadTsModuleError) {
            throw e;
        }
        else {
            throw new LoadTsModuleError(e, sourceJs);
        }
    }
    return _exports;
});
class LoadTsModuleError extends Error {
    constructor(message, transpiledCode) {
        super(message);
        this.transpiledCode = transpiledCode;
    }
}
exports.LoadTsModuleError = LoadTsModuleError;
const loadTsModule_Eval = (sourceJs) => __awaiter(this, void 0, void 0, function* () {
    //Wrap code in enclosed function. Add vsc as only dependency.
    const wrapExports = `_exports = (function(){var exports = {};\n${sourceJs}\nreturn exports})()`;
    let _exports = {};
    try {
        eval(wrapExports);
    }
    catch (e) {
        throw new LoadTsModuleError(e, wrapExports);
    }
    return _exports;
});
/**
 * @description
 * Test if a loaded module has methods (Loaded with vsc.loadTsModule) \
 * return undefined if a method didnt exist.
 * @see http://vsc-base.org/#varifyModuleMethods
 * @vscType System
 * @oneLineEx const varifyModuleMethods = vsc.varifyModuleMethods(_module, methodName)
 * @ex
const varifiedModule = vsc.varifyModuleMethods(_module, \['run', 'getId'\])
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
/**
 * @description
 * Ensure that a method result that optional can be a promise is awaited. \
 * (Responses from methods loaded with vsc.loadTsModule can be optional async!)
 * @see http://vsc-base.org/#awaitResult
 * @vscType ts
 * @oneLineEx await vsc.awaitResult(result)
 * @ex
 const varifiedModule = vsc.varifyModuleMethods(_module, \['run'])
 const result = varifiedModule.run()
 await vsc.awaitResult(result)
 * @returns Promise<any>
 */
exports.awaitResult = (result) => __awaiter(this, void 0, void 0, function* () {
    if (result instanceof Promise) {
        return result;
    }
    else {
        return new Promise(resolve => {
            resolve(result);
        });
    }
});
/**
 * @description
 * Tranform source code using custom transformers \
 * See createTsTransformerFactory and createTsRemoveTransformerFactory for creating transformer \
 * (See http://vsc-base.org/#createTsTransformerFactory, http://vsc-base.org/#createTsRemoveTransformerFactory)
 * @see http://vsc-base.org/#tsTransform
 * @param source
 * @param transformers
 * @param compilerOptions
 * @param printer
 * @internal
 * @experimental This method can easily change, because ts api is in experimental state.
 * @vscType ts
 * @oneLineEx const updatedCode = vsc.tsTransform(code, \[tranformer1, tranformer2\])
 */
exports.tsTransform = (source, transformers, compilerOptions = vsc.DefaultTsCompilerOptions, printer = ts.createPrinter()) => {
    const sourceFile = exports.createTsSourceFile(source);
    const result = exports.tsTransformSourceFile(sourceFile, transformers, compilerOptions);
    const transformedSourceFile = result.transformed[0];
    const print = printer.printFile(transformedSourceFile);
    result.dispose();
    return print;
};
/**
 * @description
 * Tranform a ts.Node \
 * (default node-type is ts.Sourcefile)
 * @see http://vsc-base.org/#tsTransformSourceFile
 * @param sourceFile
 * @param transformers
 * @param compilerOptions
 * @internal
 * @experimental This method can easily change, because ts api is in experimental state.
 * @vscType ts
 * @oneLineEx const result = tsTransformSourceFile(sourceFile, transformers, compilerOptions)
 */
exports.tsTransformSourceFile = (sourceFile, transformers, compilerOptions = vsc.DefaultTsCompilerOptions) => {
    return ts.transform(sourceFile, transformers, compilerOptions);
};
/**
 * @description
 * vsc-base's internal default ts compiler options
 * @see http://vsc-base.org/#DefaultTsCompilerOptions
 * @internal
 * @experimental This method can easily change, because ts api is in experimental state.
 * @vscType ts
 * @oneLineEx const compilerOptions = vsc.DefaultTsCompilerOptions
 */
exports.DefaultTsCompilerOptions = ({
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2015,
    libs: ['es6']
});
/**
 * @description
 * Create a ts.SourceFile
 * @see http://vsc-base.org/#createTsSourceFile
 * @param content
 * @param sourceFileName
 * @experimental This method can easily change, because ts api is in experimental state.
 * @vscType ts
 * @oneLineEx const sourceFile = vsc.createTsSourceFile(code)
 */
exports.createTsSourceFile = (content, sourceFileName = `sourcefile_${(new Date().getTime())}`) => {
    let sourceFile = ts.createSourceFile(sourceFileName, content, ts.ScriptTarget.ES2015, 
    /*setParentNodes */ true);
    return sourceFile;
};
/**
 * @description
 * ts.Node's getChildren and getChildrenCount uses tokens not parsed nodes. \
 * So to this method uses ts's forEachChild to colloct the parsed nodes. \
 * Mostly used in custom transformer method
 * @see http://vsc-base.org/#tsParsedNodeChildrenCount
 * @params node
 * @experimental This method can easily change, because ts api is in experimental state.
 * @vscType ts
 * @oneLineEx const children = vsc.tsGetParsedChildrenNodes(node)
 */
exports.tsGetParsedChildrenNodes = (node) => {
    let chrindren = [];
    node.forEachChild(c => { chrindren.push(c); });
    return chrindren;
};
/**
 * @description
 * Create a Ts Transformer factory \
 * You can use: \
 * https://ts-ast-viewer.com/ \
 * or \
 * https://astexplorer.net/ \
 * to generate the new node or node type.
 * @see http://vsc-base.org/#createTsTransformerFactory
 * @param callback
 * @param program
 * @vscType ts
 * @experimental This method can easily change, because ts api is in experimental state.
 * @oneLineEx const transformer = vsc.createTranformer(transformerCallback)
 * @ex
// tranforms arrowFunction with one return statement to lambda function
const transformer = vsc.createTsTransformerFactory((node) => {
   if (!ts.isArrowFunction(node)) { // is not an arrow funcion
      return
   }
   const children = vsc.tsGetParsedChildrenNodes(node.body)
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
   node.body = returnExpression
   return [true, node]
});

const updatedCode = tsTransform(code, [transformer]);

 * @returns ts.TransformerFactory<T>
 */
exports.createTsTransformerFactory = (callback, program) => {
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
/**
 * @description
 * Create Basic Ts Transformer for removing nodes \
 * You can use https://ts-ast-viewer.com/ to generate the new node or node type.
 * @see http://vsc-base.org/#createTsRemoveNodesTransformerFactory
 * @vscType ts
 * @oneLineEx const transformer = vsc.createTranformer(transformerCallback)
 * @ex
// Remove all 'debugger' statements
const removeDebuggerTransformner = createTsRemoveNodesTransformerFactory((node) => {
   if (ts.isDebuggerStatement(node)) {
      return true
   }
   return false
});

 * @returns ts.TransformerFactory<T>
 */
exports.createTsRemoveNodesTransformerFactory = (callback, program) => {
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
//# sourceMappingURL=vsc-base-typescript.js.map