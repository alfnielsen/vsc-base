import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const WebviewStyleTemplateAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'WebviewStyleTemplate'}
         title={'WebviewStyleTemplate'}
         open={open}
         annotation={
            <>
               <p>
                  
vsc-base&#039;s internal default style for htmlTemplate for webviews.
This style uses vscode color variables to make form elements look like the user selected theme.
               </p>
            </>
         }
         
         codeOneLineEx={`const style = vsc.WebviewStyleTemplate`}
         codeEx={``}
         code={`/**
 * @internal internal
 * @vscType webview
 * @returns string
 */
export const WebviewStyleTemplate = \`
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
\``}
      />
   )
}

export default WebviewStyleTemplateAnnotatedCode

