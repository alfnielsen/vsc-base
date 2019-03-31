'use strict';
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
const ts = require("typescript");
const vscode = require("vscode");
const vsc_base_1 = require("vsc-base");
class Script {
    /**
     * Return a list of all project script files.
     * (async return a list of all files in current project that ends with .vsc-tempate.js)
     */
    getScriptFiles() {
        return __awaiter(this, void 0, void 0, function* () {
            const files = yield vscode.workspace.findFiles('**/*.vsc-script.ts', '**/node_modules/**', 100000);
            return files;
        });
    }
    /**
     * Get the path to the current active file in vscode
     */
    getCurrentPath() {
        const activeEditor = vscode.window.activeTextEditor;
        const document = activeEditor && activeEditor.document;
        return (document && document.fileName) || '';
    }
    /**
     * The main method that runs
     * @todo Code split!!! :-P
     */
    run(uri) {
        return __awaiter(this, void 0, void 0, function* () {
            if (uri === undefined) {
                vsc_base_1.default.showErrorMessage('Must be run from context menu!');
                return;
            }
            const path = vsc_base_1.default.pathAsUnix(uri.fsPath);
            /**
             * Collect all project scripts:
             * This scans all files for .vsc-script.js to make a list of scripts
             * @todo Maybe move this code, so it do not scan all file every times it run
             */
            const scriptFiles = yield this.getScriptFiles();
            const scripts = [];
            scriptFiles.forEach(file => {
                const match = file.fsPath.match(/([\w\-]+)\.vsc\-script\.ts$/);
                if (match) {
                    const name = match[1];
                    scripts.push({ name, name_lower: name.toLocaleLowerCase(), path: file.fsPath });
                }
            });
            if (scripts.length === 0) {
                vsc_base_1.default.showErrorMessage(`NOTE: vsc-script didn't find any script files. A script file name can be place anywhere in the project, but it must end with '.vsc-script.js'`);
                return;
            }
            const scriptName = yield vsc_base_1.default.ask('What Script will you run? (Name of script)', scripts[0].name);
            if (!scriptName) {
                return;
            }
            const scriptName_lower = scriptName.toLocaleLowerCase();
            const selectedScript = scripts.find(t => t.name_lower === scriptName_lower);
            if (!selectedScript) {
                vsc_base_1.default.showErrorMessage(`NOTE: vsc-script didn't find your script '${scriptName}'. The script must be in a file called '${scriptName}.vsc-script.js'`);
                return;
            }
            //
            const scriptFileTs = yield vsc_base_1.default.getFileContent(selectedScript.path);
            const scriptFileJs = ts.transpile(scriptFileTs);
            const scriptFileExport = eval(scriptFileJs);
            try {
                const r = scriptFileExport(uri, { vsc: vsc_base_1.default, vscode, path, ts, fs });
                if (r instanceof Promise) {
                    r.then(() => {
                        vsc_base_1.default.showMessage('Script done.');
                    });
                }
                else {
                    vsc_base_1.default.showMessage('Script done.');
                }
            }
            catch (e) {
                vsc_base_1.default.showErrorMessage('Error: ' + e);
            }
        });
    }
}
exports.default = Script;
//# sourceMappingURL=Script.js.map