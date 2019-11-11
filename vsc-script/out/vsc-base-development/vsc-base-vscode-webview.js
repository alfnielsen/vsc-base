"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = __importStar(require("vscode"));
const vsc = __importStar(require("./vsc-base"));
/** vsc-base method
* @description
* vsc-base's internal default htmlTemplate for webviews.
* It provides an html template with:
* An addEventListener for 'postMessage' that sets the body on message:
* { command: 'setBody', content: 'myBodyHTML' }
* And a 'postMessage' that will send messages back to the extension that created the web view.
* @see [WebViewHTMLTemplate](http://vsc-base.org/#WebViewHTMLTemplate)
* @internal
* @vscType ts
* @returns (body: string, script?: string) => string
* @example
* const WebViewHTMLTemplate = vsc.WebViewHTMLTemplate()
*/
exports.WebViewHTMLTemplate = (body, script) => (`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <script>
    (function() {
      const vscode = acquireVsCodeApi();
      window.postMessage = vscode.postMessage;
      window.addEventListener('message', ${script});
      const domContainer = document.querySelector('#like_button_container');
      ReactDOM.render(e(LikeButton), domContainer);
    }())
    </script>
</head>
<body>${body}</body>
</html>`);
/** vsc-base method
* @description
* vsc-base's internal default htmlTemplate for webviews.
* It provides an html template with:
* An addEventListener for 'postMessage' that sets the body on message:
* { command: 'setBody', content: 'myBodyHTML' }
* And a 'postMessage' that will send messages back to the extension that created the web view.
* @see [WebViewHTMLTemplate](http://vsc-base.org/#WebViewHTMLTemplate)
* @internal
* @vscType ts
* @returns (body: string, script?: string) => string
* @example
* const WebViewHTMLTemplate = vsc.WebViewHTMLTemplate()
*/
exports.WebViewReactTemplate = (body, script) => (`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
    <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
    <script>
    (function() {
      const vscode = acquireVsCodeApi();
      window.postMessage = vscode.postMessage;
      window.addEventListener('message', ${script});
      const domContainer = document.querySelector('#like_button_container');
      ReactDOM.render(e(LikeButton), domContainer);
    }())
    </script>
</head>
<body>${body}</body>
</html>`);
/** vsc-base method
* @description
* vsc-base's internal default htmlTemplate for webviews.
* It provides an html template with:
* An addEventListener for 'postMessage' that sets the body on message:
* { command: 'setBody', content: 'myBodyHTML' }
* And a 'postMessage' that will send messages back to the extension that created the web view.
* @see [WebViewHTMLTemplate](http://vsc-base.org/#WebViewHTMLTemplate)
* @internal
* @vscType ts
* @returns (body: string, script?: string) => string
* @example
* const WebViewHTMLTemplate = vsc.WebViewHTMLTemplate()
*/
exports.InitWebView = (context, { body, html, reactApp, onMessageCode, showOptions = vscode.ViewColumn.One, options = { enableScripts: true } }) => {
    const panel = vscode.window.createWebviewPanel('vscScript', 'Script', showOptions, options);
    if (html) {
        panel.webview.html = html;
    }
    else if (body) {
        panel.webview.html = vsc.WebViewHTMLTemplate(body, onMessageCode);
    }
    else if (reactApp) {
        panel.webview.html = vsc.WebViewHTMLTemplate(reactApp, onMessageCode);
    }
    // Send a message to webview.
    //vsc.showMessage("JSON:" + JSON.stringify(json))
    const sendMessage = panel.webview.postMessage;
    // Handle messages from webview
    const onMessage = (message) => {
    };
    panel.webview.onDidReceiveMessage(message => onMessage(message), undefined, context.subscriptions);
    return { panel, sendMessage, onMessage };
};
//# sourceMappingURL=vsc-base-vscode-webview.js.map