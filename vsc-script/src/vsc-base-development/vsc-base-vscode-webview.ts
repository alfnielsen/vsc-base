import * as ts from 'typescript'
import * as vscode from 'vscode'

import * as vsc from './vsc-base'

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
export const WebViewHTMLTemplate: (body: string, script?: string) => string = (body: string, script?: string) => (`<!DOCTYPE html>
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
      const onMessageCode = ${script}
      window.addEventListener('message', onMessageCode);
    }())
    </script>
</head>
<body>${body}</body>
</html>`)

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
export const WebViewReactTemplate: (body: string, script?: string) => string = (body: string, script?: string) => (`<!DOCTYPE html>
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
</html>`)

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
export const InitWebView = (
   context: vscode.ExtensionContext,
   startOptions: IStartWebViewOptions) => {
   const {
      html,
      body,
      reactApp,
      onMessageCode,
      showOptions = vscode.ViewColumn.One,
      options = { enableScripts: true }
   } = startOptions;
   const webViewPanel = vscode.window.createWebviewPanel(
      'vscScript',
      'Script',
      showOptions,
      options
   );
   if (html) {
      webViewPanel.webview.html = html;
   } else if (body) {
      const onMessageCodeString = (onMessageCode instanceof Function) ?
         onMessageCode.toString() : onMessageCode
      const onMessageCodeJs = vsc.tsTranspile(onMessageCodeString)
      webViewPanel.webview.html = vsc.WebViewHTMLTemplate(body, onMessageCodeJs)
   } else if (reactApp) {
      const onMessageCodeString = (onMessageCode instanceof Function) ?
         onMessageCode.toString() : onMessageCode
      const onMessageCodeJs = vsc.tsTranspile(onMessageCodeString)
      const reactAppJs = vsc.tsTranspile(reactApp, {
         module: ts.ModuleKind.CommonJS,
         target: ts.ScriptTarget.ES5,
         libs: ['es6', 'esnext', 'dom'],
      })
      webViewPanel.webview.html = vsc.WebViewReactTemplate(reactAppJs, onMessageCodeJs)
   }
   return webViewPanel
}
export interface IStartWebViewOptions {
   html?: string,
   body?: string,
   reactApp?: string,
   onMessageCode: string | ((event: any) => void),
   showOptions?: vscode.ViewColumn | {
      viewColumn: vscode.ViewColumn;
      preserveFocus?: boolean | undefined;
   },
   options?: vscode.WebviewPanelOptions & vscode.WebviewOptions
}