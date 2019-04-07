import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base'



const GetActiveDocumentContentAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'getActiveDocumentContent'}
         annotation={
            <>
               <p>
                  Get current open file's content.
               </p>
            </>
         }
         
         codeEx={`const content = vsc.getActiveDocumentContent()`}
         code={`export const getActiveDocumentContent = (): string | undefined => {
   const document = vsc.getActiveDocument()
   return (document && document.getText()) || undefined
}
`}
      />
   )
}

export default GetActiveDocumentContentAnnotatedCode

