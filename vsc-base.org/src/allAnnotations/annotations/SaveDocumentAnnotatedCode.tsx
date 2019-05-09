import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const SaveDocumentAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'saveDocument'}
         title={'saveDocument'}
         open={open}
         annotation={
            <>
               <p>
                  
 Save active open file. 
               </p>
               <p>
                Return true for succes, and false if there was no open document
               </p>
            </>
         }
         
         codeOneLineEx={`const success = await vsc.saveDocument(content)`}
         codeEx={``}
         code={`/**
 * @dependencyInternal getActiveDocument
 * @vscType Vscode
 * @returns Promise<boolean>
 */
export const saveDocument = async (
   document?: vscode.TextDocument,
): Promise<boolean> => \{
   if (!document) \{
      document = vsc.getActiveDocument()
   }
   if (document) \{
      await document.save()
      return true
   }
   return Promise.resolve(false)
}


`}
      />
   )
}

export default SaveDocumentAnnotatedCode

