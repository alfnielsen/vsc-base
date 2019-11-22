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
export const WebviewHTMLTemplate = (\{
   body = '',
   onMessageScript = '',
   onCommandScript = '',
   style = '',
   script = ''
}): string => \{
   onMessageScript = onMessageScript || 'undefined;'
   onCommandScript = onCommandScript || 'undefined;'
   return (\`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
    <style>
      * \{
         line-height: 20px;
      }
      a:focus,
      input:focus,
      select:focus,
      textarea:focus \{
         outline: none;
      }
      body \{
         margin: 10px 20px;
      }
      button \{
         background: var(--vscode-button-background);
         color: var(--vscode-button-foreground);
         border: 0;
         padding: 7px;
         cursor: pointer;
         outline: 0;
      }
      button:hover \{
         background: var(--vscode-button-hoverBackground);
      }
      textarea \{
         font-size: 1em;
         padding: 10px;
         background: var(--vscode-input-background);
         border: 1px solid var(--vscode-dropdown-border);
         color: var(--vscode-input-foreground);
         width: 300px;
         height: 120px;
      }
      input \{
         font-size: 1em;
         background: var(--vscode-input-background);
         border: 1px solid var(--vscode-dropdown-border);
         color: var(--vscode-input-foreground);
         outline: 0;
      }
      input::placeholder \{
         color: var(--vscode-input-placeholderForeground);
      }
      input[type="text"] \{
         width: 300px;
      }
      input[type="checkbox"] \{
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
      input[type="checkbox"]:checked:after \{
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
      select \{
         background: var(--vscode-dropdown-background);
         color: var(--vscode-input-foreground);
         border: 1px solid var(--vscode-dropdown-border);
         padding: 7px;
         font-size: 1em;
         height: 35px;
      }
      option \{
         background: var(--vscode-dropdown-listBackground);
      }
    </style>
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

