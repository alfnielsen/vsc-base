import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base'



const GetActiveDocumentPathAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'getActiveDocumentPath'}
         annotation={
            <>
               <p>
                  Get current open file path or undefined if nothing is open.
               </p>
            </>
         }
         
         codeEx={`const path = vsc.getActivegetActiveDocumentPath()`}
         code={`export const getActiveDocumentPath = (): string | undefined => {
   const document = vsc.getActiveDocument()
   return (document && document.fileName) || undefined
}
`}
      />
   )
}

export default GetActiveDocumentPathAnnotatedCode

