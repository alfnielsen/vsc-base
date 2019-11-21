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
//vsc-script-name: WebView Test > WebView test (test 1)
const vsc = __importStar(require("vsc-base"));
function run(path, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const [postMessage, onMessage, dispose] = vsc.startWebview(context, {
            title: "Rename",
            showOptions: 2,
            body: `
      <button onClick="postMessage({command:'show',value:'1'})">Show '1'</button>
      <button onClick="postMessage({command:'end'})">END</button><br/>
      <br><br>
      Search: <input type='text' id='s' onkeyup="postMessage({command:'search',value:this.value})" >
      <br><br>
      <div id='files'></div>
      <br><br>
      <div id='info'>info</div>
    `,
            onWebviewMessage: (message) => {
                switch (message.command) {
                    case "info":
                        document.getElementById("info").innerHTML = message.content;
                        break;
                    case "files":
                        document.getElementById("files").innerHTML = message.content;
                        break;
                }
            }
        });
        yield onMessage((message, resolve) => __awaiter(this, void 0, void 0, function* () {
            switch (message.command) {
                case "show":
                    vsc.showMessage(message.value);
                    break;
                case "end":
                    resolve();
                    break;
                case "search":
                    const files = yield vsc.findFilePaths(message.value);
                    postMessage({ command: "info", content: 'Found:' + files.length });
                    postMessage({ command: "files", content: files.slice(0, 5).map(x => `<a href='#' onClick="postMessage({command:'open',value:'${x}'})">${x}</a>`) });
                    break;
                case "open":
                    postMessage({ command: "info", content: `Will open: ${message.value}` });
                    yield vsc.open(message.value, 1);
                    break;
            }
        }));
        dispose();
        vsc.showMessage("Script Done!");
    });
}
exports.run = run;
//# sourceMappingURL=webview-test1.vsc-script.js.map