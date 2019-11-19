import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const GetDocumentContentAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'getDocumentContent'}
         title={'getDocumentContent'}
         open={open}
         annotation={
            <>
               <p>
                  
Get current open file&#039;s content.
               </p>
            </>
         }
         
         codeOneLineEx={`const content = vsc.getDocumentContent()`}
         codeEx={``}
         code={`/**
 * @dependencyInternal getActiveDocument
 * @vscType Vscode
 * @returns string | undefined
 */
export const getDocumentContent = (
   document?: vscode.TextDocument
): string | undefined => \{
   if (!document) \{
      document = vsc.getActiveDocument()
   }
   return (document && document.getText()) || undefined
}`}
      />
   )
}

export default GetDocumentContentAnnotatedCode

