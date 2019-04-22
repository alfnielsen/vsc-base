
// ------------------ Error log from script -------------- //
// type: 105: Running compiled 'run' method. The error is in the 'run' method.
// time: 2019-04-20T18:24:29.516Z
// selectedScript.path: /Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-base.org/.vsc-script/ys.vsc-script.ts
// path: [object Object]
// error 
var info = {
   "isError": true,
   "type": "TypeError",
   "stack": "TypeError: Cannot read property '0' of undefined\n\tat Function.file (/Applications/Visual Studio Code.app/Contents/Resources/app/out/vs/workbench/services/extensions/node/extensionHostProcess.js:116:488)\n\tat Object.module.exports.exports.getRootPath (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:131902:28)\n\tat Object.eval (eval at <anonymous> (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:134917:9), <anonymous>:15:30)\n\tat Generator.next (<anonymous>)\n\tat __awaiter (eval at <anonymous> (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:134917:9), <anonymous>:8:71)\n\tat new Promise (<anonymous>)\n\tat __awaiter (eval at <anonymous> (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:134917:9), <anonymous>:4:12)\n\tat Object.run (eval at <anonymous> (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:134917:9), <anonymous>:14:12)\n\tat Script.<anonymous> (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:222:47)\n\tat Generator.next (<anonymous>)\n\tat fulfilled (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:138:58)",
   "message": "Cannot read property '0' of undefined"
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
function run(path) {
    return __awaiter(this, void 0, void 0, function* () {
        const rootPath = vsc.getRootPath();
        vsc.showMessage(rootPath);
        yield vsc.cpExec('cd ' + rootPath);
        //await vsc.fsExec('yarn start')
    });
}
exports.run = run;


