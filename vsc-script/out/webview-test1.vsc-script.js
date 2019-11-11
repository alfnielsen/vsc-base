"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
//vsc-script-name: Test > WebView test
const react_1 = __importDefault(require("react"));
const vsc = __importStar(require("vsc-base"));
function run(path, script) {
    return __awaiter(this, void 0, void 0, function* () {
        const [sendMessage, onMessage] = script.webview({
            reactApp: WebViewApp.toString(),
            onMessageCode: webViewOnMessage.toString(),
            body: `
      <button onClick="postMessage({command:'show',value:'1'})">Show '1'</button>
      <button onClick="postMessage({command:'end'})">END</button>
   `
        });
        yield onMessage((message, stopWebView) => {
            //sendMessage: (message: any) => void,
            if (message.command === 'show') {
                vsc.showMessage(message.value);
            }
            if (message.command === 'end') {
                stopWebView();
            }
        });
        vsc.showMessage('Script Done');
    });
}
exports.run = run;
exports.postMessage = (code) => { };
function WebViewApp() {
    return __awaiter(this, void 0, void 0, function* () {
        return (react_1.default.createElement("div", { className: 'App' },
            react_1.default.createElement("button", { onClick: () => {
                    exports.postMessage({ command: 'show', value: '1' });
                } }, "Show '1'"),
            react_1.default.createElement("button", { onClick: () => {
                    exports.postMessage({ command: 'end', value: '1' });
                } }, "END")));
    });
}
exports.WebViewApp = WebViewApp;
const webViewOnMessage = (event) => {
    const message = event.data;
    if (message.command === 'setBody') {
        document.getElementsByTagName('body')[0].innerHTML = message.content;
    }
};
//# sourceMappingURL=webview-test1.vsc-script.js.map