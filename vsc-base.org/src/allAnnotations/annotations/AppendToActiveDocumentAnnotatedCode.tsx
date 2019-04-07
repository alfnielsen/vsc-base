import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base'



const AppendToActiveDocumentAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'appendToActiveDocument'}
         annotation={
            <>
               <p>
                  Append new content in the end of the open document.
               </p>
               <p>
                Return true for succes, and false if there was no active editor or open document
               </p>
            </>
         }
         
         codeEx={`const success = await vsc.appendToActiveDocument(content)`}
         code={`export const appendToActiveDocument = async (
   content: string
): Promise<boolean> => {
   const document = vsc.getActiveDocument()
   const editor = vsc.getActiveEditor()
   if (document && editor) {
      await vsc.appendToDocument(editor, document, content)
      return true
   }
   return false
}`}
      />
   )
}

export default AppendToActiveDocumentAnnotatedCode

