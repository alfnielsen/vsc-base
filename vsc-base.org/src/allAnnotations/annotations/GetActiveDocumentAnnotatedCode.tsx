import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base'



const GetActiveDocumentAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'getActiveDocument'}
         annotation={
            <>
               <p>
                  Get open vscode.TextDocument
               </p>
            </>
         }
         
         codeEx={`const document = vsc.getActiveDocument()`}
         code={`export const getActiveDocument = (): vscode.TextDocument | undefined => {
   const activeEditor = vsc.getActiveEditor()
   const document = activeEditor && activeEditor.document
   return document
}
`}
      />
   )
}

export default GetActiveDocumentAnnotatedCode

