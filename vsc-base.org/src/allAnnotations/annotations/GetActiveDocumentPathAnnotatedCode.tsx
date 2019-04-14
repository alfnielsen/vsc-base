import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const GetActiveDocumentPathAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'getActiveDocumentPath'}
         title={'getActiveDocumentPath'}
         annotation={
            <>
               <p>
                  
 Get current open file path or undefined if nothing is open.
               </p>
            </>
         }
         
         codeOneLineEx={`const path = vsc.getActivegetActiveDocumentPath()`}
         codeEx={``}
         code={`/**
 * @dependencyInternal getActiveDocument
 * @vscType Vscode
 * @returns string | undefined
 */
export const getActiveDocumentPath = (): string | undefined => \{
   const document = vsc.getActiveDocument()
   return (document && document.fileName) || undefined
}
`}
      />
   )
}

export default GetActiveDocumentPathAnnotatedCode

