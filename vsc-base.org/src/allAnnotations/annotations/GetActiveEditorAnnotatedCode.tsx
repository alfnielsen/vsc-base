import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const GetActiveEditorAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'getActiveEditor'}
         title={'getActiveEditor'}
         annotation={
            <>
               <p>
                  
 Get vscode.activeTextEditor
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

