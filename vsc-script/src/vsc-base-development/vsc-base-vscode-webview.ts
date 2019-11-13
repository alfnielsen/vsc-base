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
export const WebViewHTMLTemplate = (body: string, script = '()=>{}', style = ''): string => (`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
    <style>
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
    </style>
    <style>${style}</style>
    <script>
    (function() {
      const vscode = acquireVsCodeApi();
      window.postMessage = vscode.postMessage;
      const onMessageCode = (event) => {
         const messageCallback = ${script}
         messageCallback(event.data)
      } 
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
export const initWebView = ({
   viewType = 'vscScript',
   title = 'Script',
   html,
   body,
   style,
   onWebViewMessage: onMessageCode,
   showOptions = vscode.ViewColumn.One,
   options = { enableScripts: true }
}: IStartWebViewOptions): vscode.WebviewPanel => {
   const webViewPanel = vscode.window.createWebviewPanel(
      viewType,
      title,
      showOptions,
      options
   );
   if (html) {
      webViewPanel.webview.html = html;
   } else if (body && onMessageCode) {
      const onMessageCodeString = (onMessageCode instanceof Function) ?
         onMessageCode.toString() : onMessageCode
      const onMessageCodeJs = vsc.tsTranspile(onMessageCodeString)
      webViewPanel.webview.html = vsc.WebViewHTMLTemplate(body, onMessageCodeJs, style)
   }
   return webViewPanel
}


/** vsc-base method
* @description 
* Starts a webview. (uses vsc.initWebView)
* It returns [postMessage, createdOnMessage]
* @see [WebViewHTMLTemplate](http://vsc-base.org/#WebViewHTMLTemplate)
* @internal
* @vscType ts
* @returns (body: string, script?: string) => string
* @example
* const WebViewHTMLTemplate = vsc.WebViewHTMLTemplate()
*/
export const setupWebViewConnection = (
   context: vscode.ExtensionContext,
   webViewPanel: vscode.WebviewPanel
): WebViewConnectionReturnType => {
   if (!webViewPanel) {
      throw new Error("Failed to initialize WebView!")
   }
   const postMessage = async (message: any) => {
      if (webViewPanel) {
         return await webViewPanel.webview.postMessage(message);
      }
      return false
   }
   const proxy: {
      onMessage: (message: any, dispose: () => void) => void
      dispose: (value?: unknown) => void
   } = {
      onMessage: (message, dispose) => { },
      dispose: (value) => { }
   }
   webViewPanel.webview.onDidReceiveMessage(
      message =>
         proxy.onMessage &&
         proxy.onMessage(message, proxy.dispose)
      ,
      undefined,
      context.subscriptions
   );
   const createdOnMessage = (onMessage: (message: any, dispose: () => void) => void): Promise<void> => {
      proxy.onMessage = onMessage;
      return new Promise((resolve) => {
         proxy.dispose = () => {
            if (webViewPanel) {
               webViewPanel.dispose();
            }
            resolve()
         }
      })
   }
   return [postMessage, createdOnMessage]
}

export interface IStartWebViewOptions {
   viewType?: string,
   title?: string,
   html?: string,
   body?: string,
   style?: string,
   onWebViewMessage?: string | ((message: any) => void),
   webViewCommands?: any,
   commands?: any,
   showOptions?: vscode.ViewColumn | {
      viewColumn: vscode.ViewColumn;
      preserveFocus?: boolean | undefined;
   },
   options?: vscode.WebviewPanelOptions & vscode.WebviewOptions
}

export type WebViewConnectionReturnType = [(message: any) => Promise<boolean>, (callback: (message: any, stopWebView: () => void) => void) => Promise<void>]


export const webviewStartUp = (context: vscode.ExtensionContext, startOptions: vsc.IStartWebViewOptions): vsc.WebViewConnectionReturnType => {
   const webViewPanel = vsc.initWebView(startOptions);
   const [sendMessage, createdOnMessage] = vsc.setupWebViewConnection(context, webViewPanel)
   return [sendMessage, createdOnMessage]
}