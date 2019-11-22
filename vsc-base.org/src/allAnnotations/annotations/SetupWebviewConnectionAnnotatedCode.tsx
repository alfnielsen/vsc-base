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
               &#039;createdOnMessage&#039; take a onMessage call back with two arguments: (message: any) and (resolve: ()=&gt;void) 
               </p>
               <p>
               The &#039;createdOnMessage&#039; will await until the resolve method is called, 
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
 * @returns vsc.WebviewConnectionReturnType (See [startWebview](http://vsc-base.org/#startWebview))
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
   const sendCommand = async (command: string, value: any) => \{
      if (webviewPanel) \{
         return await webviewPanel.webview.postMessage(\{ command, value });
      }
      return false
   }
   const sendSetHTML = async (querySelector: string, html: string) => \{
      if (webviewPanel) \{
         return await webviewPanel.webview.postMessage(\{ __vscCommand__: 'setHTML', querySelector, html });
      }
      return false
   }
   const proxy: \{
      onMessage?: WebviewOnMessageCallBack
      onCommand?: WebviewOnCommandCallBack
      resolve?: (value?: unknown) => void
   } = \{}
   webviewPanel.webview.onDidReceiveMessage(
      message => \{
         if (proxy.resolve) \{
            if (proxy.onMessage) \{
               proxy.onMessage(message, proxy.resolve)
            }
            if (proxy.onCommand && message && typeof message.command === 'string') \{
               proxy.onCommand(message.command, message.value, proxy.resolve)
            }
         }
      }
      ,
      undefined,
      context.subscriptions
   );
   const dispose = () => \{
      if (webviewPanel) \{
         webviewPanel.dispose();
      }
   }
   const createdOnMessage = async (onMessage: WebviewOnMessageCallBack): Promise<void> => \{
      proxy.onMessage = onMessage;
      return new Promise((resolve) => \{
         proxy.resolve = () => \{
            resolve()
         }
      })
   }
   const createdOnCommand = async (onCommand: WebviewOnCommandCallBack): Promise<void> => \{
      proxy.onCommand = onCommand;
      return new Promise((resolve) => \{
         proxy.resolve = () => \{
            resolve()
         }
      })
   }
   return \{
      sendSetHTML,
      postMessage,
      onMessage: createdOnMessage,
      dispose,
      webviewPanel,
      sendCommand,
      onCommand: createdOnCommand
   }
}`}
      />
   )
}

export default SetupWebviewConnectionAnnotatedCode

