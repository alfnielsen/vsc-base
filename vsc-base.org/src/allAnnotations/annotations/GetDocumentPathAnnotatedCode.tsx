import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const GetDocumentPathAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'getDocumentPath'}
         title={'getDocumentPath'}
         open={open}
         annotation={
            <>
               <p>
                  
Get current open file path or undefined if nothing is open.
               </p>
            </>
         }
         
         codeOneLineEx={`const path = vsc.getDocumentPath()`}
         codeEx={``}
         code={`/**
 * @dependencyInternal getActiveDocument
 * @vscType Vscode
 * @returns string | undefined
 */
export const getDocumentPath = (
   document?: vscode.TextDocument
): string | undefined => \{
   if (!document) \{
      document = vsc.getActiveDocument()
   }
   return (document && document.fileName) || undefined
}`}
      />
   )
}

export default GetDocumentPathAnnotatedCode

