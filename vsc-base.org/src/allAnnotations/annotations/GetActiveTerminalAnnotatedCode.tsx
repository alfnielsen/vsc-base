import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const GetActiveTerminalAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'getActiveTerminal'}
         title={'getActiveTerminal'}
         open={open}
         annotation={
            <>
               <p>
                  
Get vscode.window.activeTerminal
               </p>
            </>
         }
         
         codeOneLineEx={`const editor = vsc.getActiveTerminal()`}
         codeEx={``}
         code={`/**
 * @dependencyExternal vscode
 * @vscType Vscode
 * @returns vscode.TextEditor | undefined
 */
export const getActiveTerminal = (): vscode.Terminal | undefined => \{
   return vscode.window.activeTerminal
}`}
      />
   )
}

export default GetActiveTerminalAnnotatedCode

