import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base'



const GetActiveEditorAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'getActiveEditor'}
         annotation={
            <>
               <p>
                  Get vscode.activeTextEditor
               </p>
            </>
         }
         
         codeEx={`const editor = vsc.getActiveEditor()`}
         code={`export const getActiveEditor = (): vscode.TextEditor | undefined => {
   return vscode.window.activeTextEditor
}`}
      />
   )
}

export default GetActiveEditorAnnotatedCode

