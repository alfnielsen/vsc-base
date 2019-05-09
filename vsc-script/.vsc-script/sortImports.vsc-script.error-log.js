
// ------------------ Error log from script -------------- //
// type: 105: Running compiled 'run' method. The error is in the 'run' method.
// time: 2019-05-09T18:41:39.774Z
// selectedScript.path: /Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/.vsc-script/sortImports.vsc-script.ts
// path: [object Object]
// error:
// Error handler did not find the extension.js!
var info = {
   "isError": true,
   "type": "TypeError",
   "stack": "TypeError: Cannot read property 'pos' of undefined\n\tat Object.eval (eval at <anonymous> (/Users/alfnielsen/.vscode/extensions/alfnielsen.vsc-script-0.3.11/dist/extension.js:22:2210549), <anonymous>:48:60)\n\tat Generator.next (<anonymous>)\n\tat fulfilled (eval at <anonymous> (/Users/alfnielsen/.vscode/extensions/alfnielsen.vsc-script-0.3.11/dist/extension.js:22:2210549), <anonymous>:5:58)",
   "message": "Cannot read property 'pos' of undefined"
}
// ts transpiled js code:
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
/* const vsc = require("vsc-base") // vsc-base has change the ts transpiled code here. */;
/* const ts = require("typescript") // vsc-base has change the ts transpiled code here. */;
function run(path) {
    return __awaiter(this, void 0, void 0, function* () {
        const content = vsc.getDocumentContent();
        if (!content) {
            return;
        }
        const [dependencies, devDependencies] = yield vsc.getPackageDependencies();
        const dependencyNames = Object.keys(Object.assign({}, dependencies, devDependencies));
        const [, firstPos] = vsc.tsFindNodePositionFromContent(content, node => true);
        // All imports before first statement, mapped with import path
        const imports = vsc.tsFindAllNodePositionsFromContent(content, node => ts.isImportDeclaration(node) && (!firstPos || node.end < firstPos.start))
            .map(([node, pos]) => ({ node, pos, path: node.moduleSpecifier.getText() }));
        //find last inport
        const lastImport = imports.sort((a, b) => b.pos.end - a.pos.end)[0];
        vsc.showMessage('' + lastImport);
        //sort
        imports.sort((a, b) => a.path.localeCompare(b.path));
        //split into global / local
        const globalImports = [];
        const localImports = [];
        imports.forEach(_import => {
            //is path in json package dependencies:
            const global = !!dependencyNames.find(name => name.indexOf(_import.path) === 0);
            if (global) {
                globalImports.push(_import);
            }
            else {
                localImports.push(_import);
            }
        });
        const newImportContent = globalImports.map(i => i.node.getText()).join('\n')
            + '\n\n'
            + localImports.map(i => i.node.getText()).join('\n')
            + '\n\n';
        yield vsc.insertAt(newImportContent, 0, lastImport.pos.end);
    });
}
exports.run = run;



// ------------------ Error log from script -------------- //
// type: 105: Running compiled 'run' method. The error is in the 'run' method.
// time: 2019-05-09T18:42:08.038Z
// selectedScript.path: /Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/.vsc-script/sortImports.vsc-script.ts
// path: [object Object]
// error:
// Error handler did not find the extension.js!
var info = {
   "isError": true,
   "type": "TypeError",
   "stack": "TypeError: Cannot read property 'pos' of undefined\n\tat Object.eval (eval at <anonymous> (/Users/alfnielsen/.vscode/extensions/alfnielsen.vsc-script-0.3.11/dist/extension.js:22:2210549), <anonymous>:48:60)\n\tat Generator.next (<anonymous>)\n\tat fulfilled (eval at <anonymous> (/Users/alfnielsen/.vscode/extensions/alfnielsen.vsc-script-0.3.11/dist/extension.js:22:2210549), <anonymous>:5:58)",
   "message": "Cannot read property 'pos' of undefined"
}
// ts transpiled js code:
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
/* const vsc = require("vsc-base") // vsc-base has change the ts transpiled code here. */;
/* const ts = require("typescript") // vsc-base has change the ts transpiled code here. */;
function run(path) {
    return __awaiter(this, void 0, void 0, function* () {
        const content = vsc.getDocumentContent();
        if (!content) {
            return;
        }
        const [dependencies, devDependencies] = yield vsc.getPackageDependencies();
        const dependencyNames = Object.keys(Object.assign({}, dependencies, devDependencies));
        const [, firstPos] = vsc.tsFindNodePositionFromContent(content, node => true);
        // All imports before first statement, mapped with import path
        const imports = vsc.tsFindAllNodePositionsFromContent(content, node => ts.isImportDeclaration(node) && (!firstPos || node.end < firstPos.start))
            .map(([node, pos]) => ({ node, pos, path: node.moduleSpecifier.getText() }));
        //find last inport
        const lastImport = imports.sort((a, b) => b.pos.end - a.pos.end)[0];
        vsc.showMessage('' + imports.length);
        //sort
        imports.sort((a, b) => a.path.localeCompare(b.path));
        //split into global / local
        const globalImports = [];
        const localImports = [];
        imports.forEach(_import => {
            //is path in json package dependencies:
            const global = !!dependencyNames.find(name => name.indexOf(_import.path) === 0);
            if (global) {
                globalImports.push(_import);
            }
            else {
                localImports.push(_import);
            }
        });
        const newImportContent = globalImports.map(i => i.node.getText()).join('\n')
            + '\n\n'
            + localImports.map(i => i.node.getText()).join('\n')
            + '\n\n';
        yield vsc.insertAt(newImportContent, 0, lastImport.pos.end);
    });
}
exports.run = run;



// ------------------ Error log from script -------------- //
// type: 105: Running compiled 'run' method. The error is in the 'run' method.
// time: 2019-05-09T18:43:16.119Z
// selectedScript.path: /Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/.vsc-script/sortImports.vsc-script.ts
// path: [object Object]
// error:
// Error handler did not find the extension.js!
var info = {
   "isError": true,
   "type": "TypeError",
   "stack": "TypeError: Cannot read property 'pos' of undefined\n\tat Object.eval (eval at <anonymous> (/Users/alfnielsen/.vscode/extensions/alfnielsen.vsc-script-0.3.11/dist/extension.js:22:2210549), <anonymous>:51:60)\n\tat Generator.next (<anonymous>)\n\tat fulfilled (eval at <anonymous> (/Users/alfnielsen/.vscode/extensions/alfnielsen.vsc-script-0.3.11/dist/extension.js:22:2210549), <anonymous>:5:58)",
   "message": "Cannot read property 'pos' of undefined"
}
// ts transpiled js code:
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
/* const vsc = require("vsc-base") // vsc-base has change the ts transpiled code here. */;
/* const ts = require("typescript") // vsc-base has change the ts transpiled code here. */;
function run(path) {
    return __awaiter(this, void 0, void 0, function* () {
        const content = vsc.getDocumentContent();
        if (!content) {
            return;
        }
        const [dependencies, devDependencies] = yield vsc.getPackageDependencies();
        const dependencyNames = Object.keys(Object.assign({}, dependencies, devDependencies));
        const [, firstPos] = vsc.tsFindNodePositionFromContent(content, node => !ts.isImportDeclaration(node));
        // All imports before first statement, mapped with import path
        const imports = vsc.tsFindAllNodePositionsFromContent(content, node => ts.isImportDeclaration(node) && (!firstPos || node.end < firstPos.start))
            .map(([node, pos]) => ({ node, pos, path: node.moduleSpecifier.getText() }));
        if (!imports) {
            return;
        }
        //find last inport
        const lastImport = imports.sort((a, b) => b.pos.end - a.pos.end)[0];
        vsc.showMessage('' + imports.length);
        //sort
        imports.sort((a, b) => a.path.localeCompare(b.path));
        //split into global / local
        const globalImports = [];
        const localImports = [];
        imports.forEach(_import => {
            //is path in json package dependencies:
            const global = !!dependencyNames.find(name => name.indexOf(_import.path) === 0);
            if (global) {
                globalImports.push(_import);
            }
            else {
                localImports.push(_import);
            }
        });
        const newImportContent = globalImports.map(i => i.node.getText()).join('\n')
            + '\n\n'
            + localImports.map(i => i.node.getText()).join('\n')
            + '\n\n';
        yield vsc.insertAt(newImportContent, 0, lastImport.pos.end);
    });
}
exports.run = run;



// ------------------ Error log from script -------------- //
// type: 105: Running compiled 'run' method. The error is in the 'run' method.
// time: 2019-05-09T18:43:34.311Z
// selectedScript.path: /Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/.vsc-script/sortImports.vsc-script.ts
// path: [object Object]
// error:
// Error handler did not find the extension.js!
var info = {
   "isError": true,
   "type": "TypeError",
   "stack": "TypeError: Cannot read property 'pos' of undefined\n\tat Object.eval (eval at <anonymous> (/Users/alfnielsen/.vscode/extensions/alfnielsen.vsc-script-0.3.11/dist/extension.js:22:2210549), <anonymous>:52:60)\n\tat Generator.next (<anonymous>)\n\tat fulfilled (eval at <anonymous> (/Users/alfnielsen/.vscode/extensions/alfnielsen.vsc-script-0.3.11/dist/extension.js:22:2210549), <anonymous>:5:58)",
   "message": "Cannot read property 'pos' of undefined"
}
// ts transpiled js code:
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
/* const vsc = require("vsc-base") // vsc-base has change the ts transpiled code here. */;
/* const ts = require("typescript") // vsc-base has change the ts transpiled code here. */;
function run(path) {
    return __awaiter(this, void 0, void 0, function* () {
        const content = vsc.getDocumentContent();
        if (!content) {
            return;
        }
        const [dependencies, devDependencies] = yield vsc.getPackageDependencies();
        const dependencyNames = Object.keys(Object.assign({}, dependencies, devDependencies));
        const [, firstPos] = vsc.tsFindNodePositionFromContent(content, node => !ts.isImportDeclaration(node));
        // All imports before first statement, mapped with import path
        const imports = vsc.tsFindAllNodePositionsFromContent(content, node => ts.isImportDeclaration(node) && (!firstPos || node.end < firstPos.start))
            .map(([node, pos]) => ({ node, pos, path: node.moduleSpecifier.getText() }));
        if (!imports) {
            return;
        }
        //find last inport
        const lastImport = imports.sort((a, b) => b.pos.end - a.pos.end)[0];
        vsc.showMessage('' + firstPos.end);
        vsc.showMessage('' + imports.length);
        //sort
        imports.sort((a, b) => a.path.localeCompare(b.path));
        //split into global / local
        const globalImports = [];
        const localImports = [];
        imports.forEach(_import => {
            //is path in json package dependencies:
            const global = !!dependencyNames.find(name => name.indexOf(_import.path) === 0);
            if (global) {
                globalImports.push(_import);
            }
            else {
                localImports.push(_import);
            }
        });
        const newImportContent = globalImports.map(i => i.node.getText()).join('\n')
            + '\n\n'
            + localImports.map(i => i.node.getText()).join('\n')
            + '\n\n';
        yield vsc.insertAt(newImportContent, 0, lastImport.pos.end);
    });
}
exports.run = run;



// ------------------ Error log from script -------------- //
// type: 105: Running compiled 'run' method. The error is in the 'run' method.
// time: 2019-05-09T18:44:07.578Z
// selectedScript.path: /Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/.vsc-script/sortImports.vsc-script.ts
// path: [object Object]
// error:
// Error handler did not find the extension.js!
var info = {
   "isError": true,
   "type": "TypeError",
   "stack": "TypeError: Cannot read property 'pos' of undefined\n\tat Object.eval (eval at <anonymous> (/Users/alfnielsen/.vscode/extensions/alfnielsen.vsc-script-0.3.11/dist/extension.js:22:2210549), <anonymous>:52:60)\n\tat Generator.next (<anonymous>)\n\tat fulfilled (eval at <anonymous> (/Users/alfnielsen/.vscode/extensions/alfnielsen.vsc-script-0.3.11/dist/extension.js:22:2210549), <anonymous>:5:58)",
   "message": "Cannot read property 'pos' of undefined"
}
// ts transpiled js code:
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
/* const vsc = require("vsc-base") // vsc-base has change the ts transpiled code here. */;
/* const ts = require("typescript") // vsc-base has change the ts transpiled code here. */;
function run(path) {
    return __awaiter(this, void 0, void 0, function* () {
        const content = vsc.getDocumentContent();
        if (!content) {
            return;
        }
        const [dependencies, devDependencies] = yield vsc.getPackageDependencies();
        const dependencyNames = Object.keys(Object.assign({}, dependencies, devDependencies));
        const [, firstPos] = vsc.tsFindNodePositionFromContent(content, node => !ts.isImportDeclaration(node));
        // All imports before first statement, mapped with import path
        const imports = vsc.tsFindAllNodePositionsFromContent(content, node => ts.isImportDeclaration(node) && (!firstPos || node.end < firstPos.start))
            .map(([node, pos]) => ({ node, pos, path: node.moduleSpecifier.getText() }));
        if (!imports) {
            return;
        }
        //find last inport
        const lastImport = imports.sort((a, b) => b.pos.end - a.pos.end)[0];
        vsc.showMessage('' + firstPos.start);
        vsc.showMessage('' + imports.length);
        //sort
        imports.sort((a, b) => a.path.localeCompare(b.path));
        //split into global / local
        const globalImports = [];
        const localImports = [];
        imports.forEach(_import => {
            //is path in json package dependencies:
            const global = !!dependencyNames.find(name => name.indexOf(_import.path) === 0);
            if (global) {
                globalImports.push(_import);
            }
            else {
                localImports.push(_import);
            }
        });
        const newImportContent = globalImports.map(i => i.node.getText()).join('\n')
            + '\n\n'
            + localImports.map(i => i.node.getText()).join('\n')
            + '\n\n';
        yield vsc.insertAt(newImportContent, 0, lastImport.pos.end);
    });
}
exports.run = run;



// ------------------ Error log from script -------------- //
// type: 105: Running compiled 'run' method. The error is in the 'run' method.
// time: 2019-05-09T18:44:32.355Z
// selectedScript.path: /Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/.vsc-script/sortImports.vsc-script.ts
// path: [object Object]
// error:
// Error handler did not find the extension.js!
var info = {
   "isError": true,
   "type": "TypeError",
   "stack": "TypeError: Cannot read property 'pos' of undefined\n\tat Object.eval (eval at <anonymous> (/Users/alfnielsen/.vscode/extensions/alfnielsen.vsc-script-0.3.11/dist/extension.js:22:2210549), <anonymous>:52:60)\n\tat Generator.next (<anonymous>)\n\tat fulfilled (eval at <anonymous> (/Users/alfnielsen/.vscode/extensions/alfnielsen.vsc-script-0.3.11/dist/extension.js:22:2210549), <anonymous>:5:58)",
   "message": "Cannot read property 'pos' of undefined"
}
// ts transpiled js code:
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
/* const vsc = require("vsc-base") // vsc-base has change the ts transpiled code here. */;
/* const ts = require("typescript") // vsc-base has change the ts transpiled code here. */;
function run(path) {
    return __awaiter(this, void 0, void 0, function* () {
        const content = vsc.getDocumentContent();
        if (!content) {
            return;
        }
        const [dependencies, devDependencies] = yield vsc.getPackageDependencies();
        const dependencyNames = Object.keys(Object.assign({}, dependencies, devDependencies));
        const [, firstPos] = vsc.tsFindNodePositionFromContent(content, node => !ts.isImportDeclaration(node));
        // All imports before first statement, mapped with import path
        const imports = vsc.tsFindAllNodePositionsFromContent(content, node => ts.isImportDeclaration(node) && (!firstPos || node.end < firstPos.start))
            .map(([node, pos]) => ({ node, pos, path: node.moduleSpecifier.getText() }));
        if (!imports) {
            return;
        }
        //find last inport
        const lastImport = imports.sort((a, b) => b.pos.end - a.pos.end)[0];
        vsc.showMessage('' + firstPos.start);
        vsc.showMessage('' + imports.length);
        //sort
        imports.sort((a, b) => a.path.localeCompare(b.path));
        //split into global / local
        const globalImports = [];
        const localImports = [];
        imports.forEach(_import => {
            //is path in json package dependencies:
            const global = !!dependencyNames.find(name => name.indexOf(_import.path) === 0);
            if (global) {
                globalImports.push(_import);
            }
            else {
                localImports.push(_import);
            }
        });
        const newImportContent = globalImports.map(i => i.node.getText()).join('\n')
            + '\n\n'
            + localImports.map(i => i.node.getText()).join('\n')
            + '\n\n';
        yield vsc.insertAt(newImportContent, 0, lastImport.pos.end);
    });
}
exports.run = run;



// ------------------ Error log from script -------------- //
// type: 105: Running compiled 'run' method. The error is in the 'run' method.
// time: 2019-05-09T18:44:48.379Z
// selectedScript.path: /Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/.vsc-script/sortImports.vsc-script.ts
// path: [object Object]
// error:
// Error handler did not find the extension.js!
var info = {
   "isError": true,
   "type": "TypeError",
   "stack": "TypeError: Cannot read property 'pos' of undefined\n\tat Object.eval (eval at <anonymous> (/Users/alfnielsen/.vscode/extensions/alfnielsen.vsc-script-0.3.11/dist/extension.js:22:2210549), <anonymous>:52:60)\n\tat Generator.next (<anonymous>)\n\tat fulfilled (eval at <anonymous> (/Users/alfnielsen/.vscode/extensions/alfnielsen.vsc-script-0.3.11/dist/extension.js:22:2210549), <anonymous>:5:58)",
   "message": "Cannot read property 'pos' of undefined"
}
// ts transpiled js code:
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
/* const vsc = require("vsc-base") // vsc-base has change the ts transpiled code here. */;
/* const ts = require("typescript") // vsc-base has change the ts transpiled code here. */;
function run(path) {
    return __awaiter(this, void 0, void 0, function* () {
        const content = vsc.getDocumentContent();
        if (!content) {
            return;
        }
        const [dependencies, devDependencies] = yield vsc.getPackageDependencies();
        const dependencyNames = Object.keys(Object.assign({}, dependencies, devDependencies));
        const [, firstPos] = vsc.tsFindNodePositionFromContent(content, node => !ts.isImportDeclaration(node));
        // All imports before first statement, mapped with import path
        const imports = vsc.tsFindAllNodePositionsFromContent(content, node => ts.isImportDeclaration(node) && (!firstPos || node.end < firstPos.start))
            .map(([node, pos]) => ({ node, pos, path: node.moduleSpecifier.getText() }));
        if (!imports) {
            return;
        }
        //find last inport
        const lastImport = imports.sort((a, b) => b.pos.end - a.pos.end)[0];
        vsc.showMessage('START POS::' + firstPos.start);
        vsc.showMessage('' + imports.length);
        //sort
        imports.sort((a, b) => a.path.localeCompare(b.path));
        //split into global / local
        const globalImports = [];
        const localImports = [];
        imports.forEach(_import => {
            //is path in json package dependencies:
            const global = !!dependencyNames.find(name => name.indexOf(_import.path) === 0);
            if (global) {
                globalImports.push(_import);
            }
            else {
                localImports.push(_import);
            }
        });
        const newImportContent = globalImports.map(i => i.node.getText()).join('\n')
            + '\n\n'
            + localImports.map(i => i.node.getText()).join('\n')
            + '\n\n';
        yield vsc.insertAt(newImportContent, 0, lastImport.pos.end);
    });
}
exports.run = run;



// ------------------ Error log from script -------------- //
// type: 105: Running compiled 'run' method. The error is in the 'run' method.
// time: 2019-05-09T18:55:12.585Z
// selectedScript.path: /Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/.vsc-script/sortImports.vsc-script.ts
// path: [object Object]
// error:
// Error handler did not find the extension.js!
var info = {
   "isError": true,
   "type": "TypeError",
   "stack": "TypeError: Cannot read property 'pos' of undefined\n\tat Object.eval (eval at <anonymous> (/Users/alfnielsen/.vscode/extensions/alfnielsen.vsc-script-0.3.11/dist/extension.js:22:2210549), <anonymous>:53:60)\n\tat Generator.next (<anonymous>)\n\tat fulfilled (eval at <anonymous> (/Users/alfnielsen/.vscode/extensions/alfnielsen.vsc-script-0.3.11/dist/extension.js:22:2210549), <anonymous>:5:58)",
   "message": "Cannot read property 'pos' of undefined"
}
// ts transpiled js code:
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
/* const vsc = require("vsc-base") // vsc-base has change the ts transpiled code here. */;
/* const ts = require("typescript") // vsc-base has change the ts transpiled code here. */;
function run(path) {
    return __awaiter(this, void 0, void 0, function* () {
        const content = vsc.getDocumentContent();
        if (!content) {
            return;
        }
        const [dependencies, devDependencies] = yield vsc.getPackageDependencies();
        const dependencyNames = Object.keys(Object.assign({}, dependencies, devDependencies));
        const [node, firstPos] = vsc.tsFindNodePositionFromContent(content, node => !ts.isImportDeclaration(node));
        // All imports before first statement, mapped with import path
        const imports = vsc.tsFindAllNodePositionsFromContent(content, node => ts.isImportDeclaration(node) && (!firstPos || node.end < firstPos.start))
            .map(([node, pos]) => ({ node, pos, path: node.moduleSpecifier.getText() }));
        if (!imports) {
            return;
        }
        //find last inport
        const lastImport = imports.sort((a, b) => b.pos.end - a.pos.end)[0];
        vsc.showMessage('START NODE' + node.getText());
        vsc.showMessage('START POS::' + firstPos.start);
        vsc.showMessage('' + imports.length);
        //sort
        imports.sort((a, b) => a.path.localeCompare(b.path));
        //split into global / local
        const globalImports = [];
        const localImports = [];
        imports.forEach(_import => {
            //is path in json package dependencies:
            const global = !!dependencyNames.find(name => name.indexOf(_import.path) === 0);
            if (global) {
                globalImports.push(_import);
            }
            else {
                localImports.push(_import);
            }
        });
        const newImportContent = globalImports.map(i => i.node.getText()).join('\n')
            + '\n\n'
            + localImports.map(i => i.node.getText()).join('\n')
            + '\n\n';
        yield vsc.insertAt(newImportContent, 0, lastImport.pos.end);
    });
}
exports.run = run;


