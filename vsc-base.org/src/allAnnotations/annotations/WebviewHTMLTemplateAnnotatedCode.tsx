import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const WebviewHTMLTemplateAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'WebviewHTMLTemplate'}
         title={'WebviewHTMLTemplate'}
         open={open}
         annotation={
            <>
               <p>
                  
vsc-base&#039;s internal default htmlTemplate for webviews.
It provides an html template with:
An addEventListener for &#039;postMessage&#039; that sets the body on message: 
&#123; command: &#039;setBody&#039;, content: &#039;myBodyHTML&#039; &#125;
And a &#039;postMessage&#039; that will send messages back to the extension that created the web view.
               </p>
            </>
         }
         
         codeOneLineEx={`const WebviewHTMLTemplate = vsc.WebviewHTMLTemplate(body, script, style)`}
         codeEx={``}
         code={`/**
 * @internal internal
 * @vscType webview
 * @returns (body: string, script?: string) => string
 */
export const WebviewHTMLTemplate: WebviewHTMLTemplateMethod = (\{
   body = '',
   onMessageScript = '',
   onCommandScript = '',
   style = '',
   script = '',
   includeBaseStyle = true
}): string => \{
   onMessageScript = onMessageScript || 'undefined;'
   onCommandScript = onCommandScript || 'undefined;'
   return (\`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
    \$\{includeBaseStyle && \`<style>\$\{vsc.WebviewStyleTemplate}</style>\`}
    <style>\$\{style}</style>
    <script>
    (function() \{
      const vscode = acquireVsCodeApi();
      window.postMessage = vscode.postMessage;
      window.sendCommand = (command, value) => \{
         vscode.postMessage(\{command, value})
      }
      const onMessageCode = (event) => \{
         const onMessageCallback = \$\{onMessageScript}
         const onCommandCallback = \$\{onCommandScript}
         const data = event.data;
         if(data && data.__vscCommand__)\{
            switch (data.__vscCommand__) \{
               case "setHTML":
                  var elm = document.querySelector(data.querySelector)
                  if(elm)\{
                     elm.innerHTML = data.html;
                  }
                  break;
            }
         }else\{
            if(onCommandCallback && data && typeof data.command === 'string')\{
               onCommandCallback(data.command, data.value, event)
            }
            if(onMessageCallback)\{
               onMessageCallback(data, event)
            }
         }
      }
      window.addEventListener('message', onMessageCode);
    }())
    </script>
    <script>\$\{script}</script>
</head>
<body>\$\{body}</body>
</html>\`);
}`}
      />
   )
}

export default WebviewHTMLTemplateAnnotatedCode

