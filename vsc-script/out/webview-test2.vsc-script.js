"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
//import * as vsc from "./vsc-base-development/vsc-base";
const vsc = __importStar(require("vsc-base"));
const vscode = __importStar(require("vscode"));
function run(path, context) {
    return __awaiter(this, void 0, void 0, function* () {
        yield startFindWebview(context);
        vsc.showMessage("Script Done");
    });
}
exports.run = run;
const startFindWebview = (context) => __awaiter(void 0, void 0, void 0, function* () {
    const docs = vscode.workspace.textDocuments;
    const [postMessage, onMessage, dispose] = vsc.startWebview(context, {
        title: "Rename",
        showOptions: { viewColumn: 2 },
        style: `pre { background: var(--vscode-input-background); padding: 10px; }`,
        body: `
        <div class='container'>
              <h2>Test 1: Search in open file</h2>
           <br><br>
          <div class="row">
              <button onClick="postMessage({command:'show',value:'1'})">Show '1'</button>
              <button onClick="postMessage({command:'end'})">END</button><br/>
           </div>
           <br><br>
           line of text<br>
           line of text<br>
           line of text<br>
           <br><br>
           <div>
           <select onChange="postMessage({command:'select',value:this.value})">
           ${docs
            .map(x => `<option value='${x.fileName}'>${x.fileName}</option>`)
            .join("\n")}

           </select>
           <br><br>
           Text:<br>
           <textarea></textarea>
           <br><br>
           Include: <input type='checkbox'>
           <br><br>
           <div>
           Search: <input type='text' id='s' onkeyup="postMessage({command:'search',value:this.value})" >
           <br><br>
           <div id='info'>info</div>
        </div>
     `,
        onWebviewMessage: (message) => {
            switch (message.command) {
                case "info":
                case "find":
                    document.getElementById("info").innerHTML = message.content;
                    break;
            }
        }
    });
    let file = "";
    yield onMessage((message, resolve) => __awaiter(void 0, void 0, void 0, function* () {
        //vsc.showMessage(message.command);
        switch (message.command) {
            case "select":
                file = message.value;
                break;
            case "show":
                vsc.showMessage(message.value);
                break;
            case "end":
                resolve();
                break;
            case "search":
                if (!file) {
                    postMessage({ command: "info", content: "Please select file" });
                    break;
                }
                postMessage({
                    command: "info",
                    content: `Begin search...`
                });
                const res = yield search(file, message.value);
                postMessage({
                    command: "info",
                    content: `Found ${res.length} <br><br>${res.join("<br><br>")}`
                });
                break;
        }
    }));
    dispose();
});
const search = (file, value) => __awaiter(void 0, void 0, void 0, function* () {
    if (value === "") {
        return [];
    }
    const content = yield vsc.getFileContent(file);
    const res = [];
    const r = new RegExp(value, "g");
    var match;
    while ((match = r.exec(content)) !== null) {
        const s1 = content.substring(0, match.index).match(/(\n[^\n]*){0,3}$/);
        const s2 = match[0];
        const s3 = content
            .substring(match.index + s2.length)
            .match(/^([^\n]*\n){0,3}/);
        if (s1 && s3) {
            const s = escapeHtml(s1[0]) +
                '<span style="color:red">' +
                escapeHtml(s2) +
                "</span>" +
                escapeHtml(s3[0]);
            res.push(`<pre>${s}</pre>`);
        }
    }
    return res;
});
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
//# sourceMappingURL=webview-test2.vsc-script.js.map