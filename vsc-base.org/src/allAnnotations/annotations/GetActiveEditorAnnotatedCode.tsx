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
 * Get vscode.activeTextEditor
 * @see http://vsc-base.org/#getActiveEditor
 * @dependencyExternal vscode
 * @oneLineEx const editor = vsc.getActiveEditor()
 * @returns vscode.TextEditor | undefined
 */
export const getActiveEditor = (): vscode.TextEditor | undefined => {
   return vscode.window.activeTextEditor
}`}
      />
   )
}

export default GetActiveEditorAnnotatedCode

