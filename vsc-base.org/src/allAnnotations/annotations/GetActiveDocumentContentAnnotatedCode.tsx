import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const GetActiveDocumentContentAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'getActiveDocumentContent'}
         title={'getActiveDocumentContent'}
         annotation={
            <>
               <p>
                  
               </p>
               <p>
                Get current open file's content.
               </p>
            </>
         }
         
         codeOneLineEx={`const content = vsc.getActiveDocumentContent()`}
         codeEx={``}
         code={`/**
 * @description 
 * Get current open file's content.
 * @see http://vsc-base.org/#getActiveDocumentContent
 * @dependencyInternal getActiveDocument
 * @vscType Vscode
 * @oneLineEx const content = vsc.getActiveDocumentContent()
 * @returns string | undefined
 */
export const getActiveDocumentContent = (): string | undefined => \{
   const document = vsc.getActiveDocument()
   return (document && document.getText()) || undefined
}
`}
      />
   )
}

export default GetActiveDocumentContentAnnotatedCode

