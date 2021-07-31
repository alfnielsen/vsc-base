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
Object.defineProperty(exports, "__esModule", { value: true });
exports.startWebview = exports.setupWebviewConnection = exports.initWebview = exports.WebviewHTMLTemplate = exports.WebviewStyleTemplate = void 0;
const vscode = require("vscode");
const vsc = require("./vsc-base");
/** vsc-base method
 * @description
 * vsc-base's internal default style for htmlTemplate for webviews.
 * This style uses vscode color variables to make form elements look like the user selected theme.
 * @see [WebviewStyleTemplate](http://vsc-base.org/#WebviewStyleTemplate)
 * @internal
 * @vscType webview
 * @returns string
 * @example
 * const style = vsc.WebviewStyleTemplate
 */
exports.WebviewStyleTemplate = `
   * {
      line-height: 20px;
   }
   a:focus,
   input:focus,
   select:focus,
   textarea:focus {
      outline: none;
   }
   body {
      margin: 10px 20px;
   }
   button {
      background: var(--vscode-button-background);
      color: var(--vscode-button-foreground);
      border: 0;
      padding: 7px;
      cursor: pointer;
      outline: 0;
   }
   button:hover {
      background: var(--vscode-button-hoverBackground);
   }
   textarea {
      font-size: 1em;
      padding: 10px;
      background: var(--vscode-input-background);
      border: 1px solid var(--vscode-dropdown-border);
      color: var(--vscode-input-foreground);
      width: 300px;
      height: 120px;
   }
   input {
      font-size: 1em;
      background: var(--vscode-input-background);
      border: 1px solid var(--vscode-dropdown-border);
      color: var(--vscode-input-foreground);
      outline: 0;
   }
   input::placeholder {
      color: var(--vscode-input-placeholderForeground);
   }
   input[type="text"] {
      width: 300px;
   }
   input[type="checkbox"] {
      background: var(--vscode-input-background);
      border-radius: 2px;
      border: 1px solid var(--vscode-dropdown-border);
      width: 17px;
      height: 17px;
      cursor: pointer;
      position: relative;
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
   }
   input[type="checkbox"]:checked:after {
      position: absolute;
      content: " ";
      display: block;
      left: 6px;
      top: 3px;
      width: 4px;
      height: 10px;
      border: solid var(--vscode-input-foreground);
      border-width: 0 3px 3px 0;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
   }
   select {
      background: var(--vscode-dropdown-background);
      color: var(--vscode-input-foreground);
      border: 1px solid var(--vscode-dropdown-border);
      padding: 7px;
      font-size: 1em;
      height: 35px;
   }
   option {
      background: var(--vscode-dropdown-listBackground);
   }
`;
/** vsc-base method
 * @description
 * vsc-base's internal default htmlTemplate for webviews.
 * It provides an html template with:
 * An addEventListener for 'postMessage' that sets the body on message:
 * { command: 'setBody', content: 'myBodyHTML' }
 * And a 'postMessage' that will send messages back to the extension that created the web view.
 * @see [WebviewHTMLTemplate](http://vsc-base.org/#WebviewHTMLTemplate)
 * @internal
 * @vscType webview
 * @returns (body: string, script?: string) => string
 * @example
 * const WebviewHTMLTemplate = vsc.WebviewHTMLTemplate(body, script, style)
 */
const WebviewHTMLTemplate = ({ body = '', onMessageScript = '', onCommandScript = '', style = '', script = '', includeBaseStyle = true }) => {
    onMessageScript = onMessageScript || 'undefined;';
    onCommandScript = onCommandScript || 'undefined;';
    return (`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
    ${includeBaseStyle ? `<style>${vsc.WebviewStyleTemplate}</style>` : ``}
    <style>${style}</style>
    <script>
    (function() {
      const vscode = acquireVsCodeApi();
      window.postMessage = vscode.postMessage;
      window.sendCommand = (command, value) => {
         vscode.postMessage({command, value})
      }
      const onMessageCode = (event) => {
         const onMessageCallback = ${onMessageScript}
         const onCommandCallback = ${onCommandScript}
         const data = event.data;
         if(data && data.__vscCommand__){
            switch (data.__vscCommand__) {
               case "setHTML":
                  var elm = document.querySelector(data.querySelector)
                  if(elm){
                     elm.innerHTML = data.html;
                  }
                  break;
            }
         }else{
            if(onCommandCallback && data && typeof data.command === 'string'){
               onCommandCallback(data.command, data.value, event)
            }
            if(onMessageCallback){
               onMessageCallback(data, event)
            }
         }
      }
      window.addEventListener('message', onMessageCode);
    }())
    </script>
    <script>${script}</script>
</head>
<body>${body}</body>
</html>`);
};
exports.WebviewHTMLTemplate = WebviewHTMLTemplate;
/** vsc-base method
 * @description
 * Creates an WebviewPanel. \
 * It can take the html for the webview, \
 * or 'body' (html) and 'onWebviewMessage' and optional 'style'. \
 * They will be used together the htmlTemplateMethod to create a webview \
 * (by default [WebviewHTMLTemplate](http://vsc-base.org/#WebviewHTMLTemplate))
 * with code for message passing between the extension and the webview. \
 * onWebviewMessage can be s string (The function code that will be written in the webview), \
 * or a function (It will call toString on it to render it in the webview template). \
 * Normally this init method wil be used from [startWebview](http://vsc-base.org/#startWebview)
 * which uses this and [setupWebviewConnection](http://vsc-base.org/#setupWebviewConnection) to create a webview \
 * and return the message passing methods
 * @see [initWebview](http://vsc-base.org/#initWebview)
 * @internal
 * @vscType webview
 * @returns (body: string, script?: string) => string
 * @example
 * const webviewPanel = vsc.initWebview(startOptions)
 */
const initWebview = ({ viewType = 'vscScript', title = 'Script', html, body, style, script, onMessage: onMessageCode = '', onCommand: onCommandCode = '', showOptions = vscode.ViewColumn.One, options = { enableScripts: true }, htmlTemplateMethod = vsc.WebviewHTMLTemplate }) => {
    const webviewPanel = vscode.window.createWebviewPanel(viewType, title, showOptions, options);
    if (html) {
        webviewPanel.webview.html = html;
    }
    else {
        let onMessageCodeString = '';
        if (onMessageCode instanceof Function) {
            onMessageCodeString = onMessageCode.toString();
        }
        else {
            onMessageCodeString = onMessageCode;
        }
        const onMessageCodeJs = vsc.tsTranspile(onMessageCodeString);
        let onCommandCodeString = '';
        if (onCommandCode instanceof Function) {
            onCommandCodeString = onCommandCode.toString();
        }
        else {
            onCommandCodeString = onCommandCode;
        }
        const onCommandCodeJs = vsc.tsTranspile(onCommandCodeString);
        webviewPanel.webview.html = htmlTemplateMethod({
            body,
            onMessageScript: onMessageCodeJs,
            onCommandScript: onCommandCodeJs,
            style,
            script
        });
    }
    return webviewPanel;
};
exports.initWebview = initWebview;
/** vsc-base method
 * @description
 * Setup message passing methods between a webview and the extension. \
 * This is normally used in [startWebview](http://vsc-base.org/#startWebview) together with [initWebview](http://vsc-base.org/#initWebview) \
 * This method returns two async methods:\
 * 'postMessage' which post a message from the extension to the webview \
 * and 'createdOnMessage' which creates a awaited receiver for messages send from the webview. \
 * 'createdOnMessage' take a onMessage call back with two arguments: (message: any) and (resolve: ()=>void) \
 * The 'createdOnMessage' will await until the resolve method is called, \
 * and continue code after. (Normally it will end the execution of the extension there) \
 * See [startWebview](http://vsc-base.org/#startWebview) for full detail and example.
 * @see [setupWebviewConnection](http://vsc-base.org/#setupWebviewConnection)
 * @internal
 * @vscType webview
 * @returns vsc.WebviewConnectionReturnType (See [startWebview](http://vsc-base.org/#startWebview))
 * @example
 * const [postMessage, createdOnMessage] = vsc.setupWebviewConnection(context, webviewPanel)
 */
const setupWebviewConnection = (context, webviewPanel) => {
    if (!webviewPanel) {
        throw new Error("Failed to initialize Webview!");
    }
    const postMessage = (message) => __awaiter(void 0, void 0, void 0, function* () {
        if (webviewPanel) {
            return yield webviewPanel.webview.postMessage(message);
        }
        return false;
    });
    const sendCommand = (command, value) => __awaiter(void 0, void 0, void 0, function* () {
        if (webviewPanel) {
            return yield webviewPanel.webview.postMessage({ command, value });
        }
        return false;
    });
    const sendSetHTML = (querySelector, html) => __awaiter(void 0, void 0, void 0, function* () {
        if (webviewPanel) {
            return yield webviewPanel.webview.postMessage({ __vscCommand__: 'setHTML', querySelector, html });
        }
        return false;
    });
    const proxy = {};
    webviewPanel.webview.onDidReceiveMessage(message => {
        if (proxy.resolve) {
            if (proxy.onMessage) {
                proxy.onMessage(message, proxy.resolve);
            }
            if (proxy.onCommand && message && typeof message.command === 'string') {
                proxy.onCommand(message.command, message.value, proxy.resolve);
            }
        }
    }, undefined, context.subscriptions);
    const dispose = () => {
        if (webviewPanel) {
            webviewPanel.dispose();
        }
    };
    const createdOnMessage = (onMessage) => __awaiter(void 0, void 0, void 0, function* () {
        proxy.onMessage = onMessage;
        return new Promise((resolve) => {
            proxy.resolve = () => {
                resolve();
            };
        });
    });
    const createdOnCommand = (onCommand) => __awaiter(void 0, void 0, void 0, function* () {
        proxy.onCommand = onCommand;
        return new Promise((resolve) => {
            proxy.resolve = () => {
                resolve();
            };
        });
    });
    return {
        sendSetHTML,
        postMessage,
        onMessage: createdOnMessage,
        dispose,
        webviewPanel,
        sendCommand,
        onCommand: createdOnCommand
    };
};
exports.setupWebviewConnection = setupWebviewConnection;
/** vsc-base method
 * @description
 * Start up a webview with message passing between it and the extension. \
 * It uses [setupWebviewConnection](http://vsc-base.org/#setupWebviewConnection) together with [initWebview](http://vsc-base.org/#initWebview) and [WebviewHTMLTemplate](http://vsc-base.org/#WebviewHTMLTemplate) \
 * to create an easy model for using webview in an extension or script. \
 * WebviewHTMLTemplate will setup a global 'postMessage' that can be used directly in the applied body html or in the onWebviewMessage.
 * @see [startWebview](http://vsc-base.org/#startWebview)
 * @internal
 * @vscType webview
 * @returns
 * @example const {postMessage, onMessage, dispose} = vsc.startWebview(context, startOptions)
 * @example
 * const {postMessage, onMessage, dispose} = vsc.startWebview(context, {
 *    title: "Rename",
 *    body: `
 *        <div class='container'>
 *            <h2>Test 1: Search for file path with glob</h2>
 *           <div class="row">
 *              <button onClick="postMessage({command:'show',value:'1'})">Show '1'</button>
 *              <button onClick="postMessage({command:'end'})">END</button><br/>
 *           </div>
 *           <br><br>
 *           Search: <input type='text' id='s' onkeyup="postMessage({command:'search',value:this.value})" >
 *           <br><br>
 *           <div id='info'>info</div>
 *        </div>
 *     `,
 *    onMessage: (message: any) => {
 *      switch (message.command) {
 *        case "info":
 *        case "find":
 *          document.getElementById("info")!.innerHTML = message.content;
 *          break;
 *      }
 *    }
 *  });
 *  await onMessage(async (message, resolve) => {
 *    switch (message.command) {
 *      case "show":
 *        vsc.showMessage(message.value);
 *        break;
 *      case "end":
 *        resolve();
 *        break;
 *      case "search":
 *        const files = await vsc.findFilePaths(message.value);
 *        postMessage({ command: "find", content: files.length });
 *        break;
 *    }
 *  });
 *  dispose();
 *  vsc.showMessage('Done!')
 */
const startWebview = (context, startOptions) => {
    const webviewPanel = vsc.initWebview(startOptions);
    const options = vsc.setupWebviewConnection(context, webviewPanel);
    options.webviewPanel = webviewPanel;
    return options;
};
exports.startWebview = startWebview;
//# sourceMappingURL=vsc-base-vscode-webview.js.map