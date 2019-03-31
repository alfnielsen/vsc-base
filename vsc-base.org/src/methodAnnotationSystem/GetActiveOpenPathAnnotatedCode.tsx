import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'

const GetActiveOpenPathAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'getActiveOpenPath'}
         annotation={
            <>
               <p>Get current open file path or undefined if nothing is open.</p>
            </>
         }
         codeEx={`const currentPath = getActiveOpenPath()`}
         code={`/**
 * Get current open file path or undefined if nothing is open.
 */
const getActiveOpenPath = (): string | undefined => {
   const activeEditor = vscode.window.activeTextEditor
   const document = activeEditor && activeEditor.document
   return (document && document.fileName) || undefined
}

`}
      />
   )
}

export default GetActiveOpenPathAnnotatedCode
