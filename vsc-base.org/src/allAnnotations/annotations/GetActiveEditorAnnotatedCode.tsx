import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const GetActiveEditorAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'getActiveEditor'}
         title={'getActiveEditor'}
         open={open}
         annotation={
            <>
               <p>
                  
Get vscode.window.activeTextEditor
               </p>
            </>
         }
         
         codeOneLineEx={`const editor = vsc.getActiveEditor()`}
         codeEx={``}
         code={`/**
 * @dependencyExternal vscode
 * @vscType Vscode
 * @returns vscode.TextEditor | undefined
 */
export const getActiveEditor = (): vscode.TextEditor | undefined => \{
   return vscode.window.activeTextEditor
}`}
      />
   )
}

export default GetActiveEditorAnnotatedCode

