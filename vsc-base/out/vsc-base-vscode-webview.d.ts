import * as vscode from 'vscode';
import * as vsc from './vsc-base';
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
export declare const WebviewStyleTemplate = "\n   * {\n      line-height: 20px;\n   }\n   a:focus,\n   input:focus,\n   select:focus,\n   textarea:focus {\n      outline: none;\n   }\n   body {\n      margin: 10px 20px;\n   }\n   button {\n      background: var(--vscode-button-background);\n      color: var(--vscode-button-foreground);\n      border: 0;\n      padding: 7px;\n      cursor: pointer;\n      outline: 0;\n   }\n   button:hover {\n      background: var(--vscode-button-hoverBackground);\n   }\n   textarea {\n      font-size: 1em;\n      padding: 10px;\n      background: var(--vscode-input-background);\n      border: 1px solid var(--vscode-dropdown-border);\n      color: var(--vscode-input-foreground);\n      width: 300px;\n      height: 120px;\n   }\n   input {\n      font-size: 1em;\n      background: var(--vscode-input-background);\n      border: 1px solid var(--vscode-dropdown-border);\n      color: var(--vscode-input-foreground);\n      outline: 0;\n   }\n   input::placeholder {\n      color: var(--vscode-input-placeholderForeground);\n   }\n   input[type=\"text\"] {\n      width: 300px;\n   }\n   input[type=\"checkbox\"] {\n      background: var(--vscode-input-background);\n      border-radius: 2px;\n      border: 1px solid var(--vscode-dropdown-border);\n      width: 17px;\n      height: 17px;\n      cursor: pointer;\n      position: relative;\n      appearance: none;\n      -webkit-appearance: none;\n      -moz-appearance: none;\n   }\n   input[type=\"checkbox\"]:checked:after {\n      position: absolute;\n      content: \" \";\n      display: block;\n      left: 6px;\n      top: 3px;\n      width: 4px;\n      height: 10px;\n      border: solid var(--vscode-input-foreground);\n      border-width: 0 3px 3px 0;\n      -webkit-transform: rotate(45deg);\n      -ms-transform: rotate(45deg);\n      transform: rotate(45deg);\n   }\n   select {\n      background: var(--vscode-dropdown-background);\n      color: var(--vscode-input-foreground);\n      border: 1px solid var(--vscode-dropdown-border);\n      padding: 7px;\n      font-size: 1em;\n      height: 35px;\n   }\n   option {\n      background: var(--vscode-dropdown-listBackground);\n   }\n";
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
export declare const WebviewHTMLTemplate: WebviewHTMLTemplateMethod;
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
export declare const initWebview: ({ viewType, title, html, body, style, script, onMessage: onMessageCode, onCommand: onCommandCode, showOptions, options, htmlTemplateMethod }: IStartWebviewOptions) => vscode.WebviewPanel;
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
export declare const setupWebviewConnection: (context: vscode.ExtensionContext, webviewPanel: vscode.WebviewPanel) => WebviewConnectionReturnType;
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
    includeBaseStyle?: boolean;
}) => string;
