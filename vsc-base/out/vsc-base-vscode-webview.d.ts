import * as vscode from 'vscode';
import * as vsc from './vsc-base';
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
export declare const WebviewHTMLTemplate: ({ body, onMessageScript, onCommandScript, style, script }: {
    body?: string | undefined;
    onMessageScript?: string | undefined;
    onCommandScript?: string | undefined;
    style?: string | undefined;
    script?: string | undefined;
}) => string;
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
export declare const initWebview: ({ viewType, title, html, body, style, script, onMessage: onMessageCode, onCommand: onCommandCode, showOptions, options, htmlTemplateMethod }: vsc.IStartWebviewOptions) => vscode.WebviewPanel;
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
export declare const setupWebviewConnection: (context: vscode.ExtensionContext, webviewPanel: vscode.WebviewPanel) => vsc.WebviewConnectionReturnType;
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
 * @example const [postMessage, onMessage, dispose] = vsc.startWebview(context, startOptions)
 * @example
 * const [postMessage, onMessage, dispose] = vsc.startWebview(context, {
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
 *    onWebviewMessage: (message: any) => {
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
export declare const startWebview: (context: vscode.ExtensionContext, startOptions: vsc.IStartWebviewOptions) => vsc.WebviewConnectionReturnType;
export interface IStartWebviewOptions {
    viewType?: string;
    title?: string;
    html?: string;
    body?: string;
    style?: string;
    script?: string;
    onMessage?: string | ((message: any) => void);
    onCommand?: string | ((command: string, value: any) => void);
    htmlTemplateMethod?: WebviewHTMLTemplateMethod;
    showOptions?: vscode.ViewColumn | {
        viewColumn: vscode.ViewColumn;
        preserveFocus?: boolean | undefined;
    };
    options?: vscode.WebviewPanelOptions & vscode.WebviewOptions;
}
export declare type WebviewConnectionReturnType = {
    sendSetHTML: (querySelector: string, html: string) => Promise<boolean>;
    postMessage: (message: any) => Promise<boolean>;
    onMessage: (callback: WebviewOnMessageCallBack) => Promise<void>;
    sendCommand: (command: string, value: any) => Promise<boolean>;
    onCommand: (callback: WebviewOnCommandCallBack) => Promise<void>;
    dispose: () => void;
    webviewPanel: vscode.WebviewPanel;
};
export declare type WebviewOnMessageCallBack = (message: any, resolve: () => void) => void;
export declare type WebviewOnCommandCallBack = (command: any, value: any, resolve: () => void) => void;
export declare type WebviewHTMLTemplateMethod = (options: {
    body?: string;
    onMessageScript?: string;
    onCommandScript?: string;
    style?: string;
    script?: string;
}) => string;
