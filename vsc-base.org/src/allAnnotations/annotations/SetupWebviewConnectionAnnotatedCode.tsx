import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const SetupWebviewConnectionAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'setupWebviewConnection'}
         title={'setupWebviewConnection'}
         open={open}
         annotation={
            <>
               <p>
                  
Setup message passing methods between a webview and the extension. 
               </p>
               <p>
               This is normally used in <a href='http://vsc-base.org/#startWebview'>startWebview</a> together with <a href='http://vsc-base.org/#initWebview'>initWebview</a> 
               </p>
               <p>
               This method returns two async methods:
               </p>
               <p>
               &#039;postMessage&#039; which post a message from the extension to the webview 
               </p>
               <p>
               and &#039;createdOnMessage&#039; which creates a awaited receiver for messages send from the webview. 
               </p>
               <p>
               &#039;createdOnMessage&#039; take a onMessage call back with two arguments: (message: any) and (dispose: ()=&gt;void) 
               </p>
               <p>
               The &#039;createdOnMessage&#039; will await until the dispose method is called, which will stop the webview, 
               </p>
               <p>
               and continue code after. (Normally it will end the execution of the extension there) 
               </p>
               <p>
               See <a href='http://vsc-base.org/#startWebview'>startWebview</a> for full detail and example.
               </p>
            </>
         }
         
         codeOneLineEx={`const [postMessage, createdOnMessage] = vsc.setupWebviewConnection(context, webviewPanel)`}
         codeEx={``}
         code={`/**
 * @internal internal
 * @vscType webview
 * @returns [postMessage, createdOnMessage],[(message: any) => Promise<boolean>, (callback: (message: any, dispose: () => void) => void) => Promise<void>]
 */
export const setupWebviewConnection = (
   context: vscode.ExtensionContext,
   webviewPanel: vscode.WebviewPanel
): WebviewConnectionReturnType => \{
   if (!webviewPanel) \{
      throw new Error("Failed to initialize Webview!")
   }
   const postMessage = async (message: any) => \{
      if (webviewPanel) \{
         return await webviewPanel.webview.postMessage(message);
      }
      return false
   }
   const proxy: \{
      onMessage: (message: any, dispose: () => void) => void
      dispose: (value?: unknown) => void
   } = \{
      onMessage: (message, dispose) => \{ },
      dispose: (value) => \{ }
   }
   webviewPanel.webview.onDidReceiveMessage(
      message =>
         proxy.onMessage &&
         proxy.onMessage(message, proxy.dispose)
      ,
      undefined,
      context.subscriptions
   );
   const createdOnMessage = async (onMessage: (message: any, dispose: () => void) => void): Promise<void> => \{
      proxy.onMessage = onMessage;
      return new Promise((resolve) => \{
         proxy.dispose = () => \{
            if (webviewPanel) \{
               webviewPanel.dispose();
            }
            resolve()
         }
      })
   }
   return [postMessage, createdOnMessage, webviewPanel.dispose, webviewPanel]
}`}
      />
   )
}

export default SetupWebviewConnectionAnnotatedCode

