import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const WriteToTerminalAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'writeToTerminal'}
         title={'writeToTerminal'}
         open={open}
         annotation={
            <>
               <p>
                  
Write text to a terminal 
               </p>
               <p>
               If addNewLine = true (it's the default value), the text written will be executed. 
               </p>
               <p>
               This will also happen if the text contains newline feeds (\n or \r\n) 
               </p>
               <p>
               <b>NOTE:</b> 
               </p>
               <p>
               if you use this method in an extension the end user need to be able to actually 
               </p>
               <p>
               execute the command! 
               </p>
               <p>
               This method is mostly design for vsc-script's, where you have control of the environment. 
               </p>
               <p>
               See also <a href='http://vsc-base.org/#execFromPath'>execFromPath</a>
               </p>
            </>
         }
         
         codeOneLineEx={`const editor = vsc.writeToTerminal()`}
         codeEx={``}
         code={`/**
 * @dependencyExternal vscode
 * @vscType Vscode
 * @returns vscode.TextEditor | undefined
 */
export const writeToTerminal = (
   content: string,
   showTerminal = true,
   addNewLine = true,
   terminal?: vscode.Terminal
): boolean => \{
   if (!terminal) \{
      terminal = vsc.getActiveTerminal();
   }
   if (!terminal) \{
      return false
   }
   terminal.sendText(content, addNewLine);
   if (showTerminal) \{
      terminal.show();
   }
   return true
}`}
      />
   )
}

export default WriteToTerminalAnnotatedCode

