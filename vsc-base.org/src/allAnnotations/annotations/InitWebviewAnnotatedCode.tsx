import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const InitWebviewAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'initWebview'}
         title={'initWebview'}
         open={open}
         annotation={
            <>
               <p>
                  
Creates an WebviewPanel. 
               </p>
               <p>
               * It can take the html for the webview, 
               </p>
               <p>
               * or &#039;body&#039; (html) and &#039;onWebviewMessage&#039; and optional &#039;style&#039;. 
               </p>
               <p>
               * They will be used together the htmlTemplateMethod to create a webview 
               </p>
               <p>
               * (by default <a href='http://vsc-base.org/#WebviewHTMLTemplate)'>WebviewHTMLTemplate</a>
* with code for message passing between the extension and the webview. 
               </p>
               <p>
               * onWebviewMessage can be s string (The function code that will be written in the webview), 
               </p>
               <p>
               * or a function (It will call toString on it to render it in the webview template). 
               </p>
               <p>
               * Normally this init method wil be used from <a href='http://vsc-base.org/#startWebview'>startWebview</a>
* which uses this and <a href='http://vsc-base.org/#setupWebviewConnection'>setupWebviewConnection</a> to create a webview 
               </p>
               <p>
               * and return the message passing methods
               </p>
            </>
         }
         
         codeOneLineEx={`* const webviewPanel = vsc.initWebview(startOptions)`}
         codeEx={``}
         code={`/**
 * @internal internal
 * @vscType webview
 * @returns (body: string, script?: string) => string
 */
export const initWebview = (\{
   viewType = 'vscScript',
   title = 'Script',
   html,
   body,
   style,
   onWebviewMessage: onMessageCode,
   showOptions = vscode.ViewColumn.One,
   options = \{ enableScripts: true },
   htmlTemplateMethod = vsc.WebviewHTMLTemplate
}: IStartWebviewOptions): vscode.WebviewPanel => \{
   const webviewPanel = vscode.window.createWebviewPanel(
      viewType,
      title,
      showOptions,
      options
   );
   if (html) \{
      webviewPanel.webview.html = html;
   } else if (body && onMessageCode) \{
      const onMessageCodeString = (onMessageCode instanceof Function) ?
         onMessageCode.toString() : onMessageCode
      const onMessageCodeJs = vsc.tsTranspile(onMessageCodeString)
      webviewPanel.webview.html = htmlTemplateMethod(body, onMessageCodeJs, style)
   }
   return webviewPanel
}`}
      />
   )
}

export default InitWebviewAnnotatedCode

