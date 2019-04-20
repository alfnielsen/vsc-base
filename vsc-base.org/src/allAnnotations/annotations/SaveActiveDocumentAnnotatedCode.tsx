import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const SaveActiveDocumentAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'saveActiveDocument'}
         title={'saveActiveDocument'}
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
         
         codeOneLineEx={`const success = await vsc.saveActiveDocument(content)`}
         codeEx={``}
         code={`/**
 * @dependencyInternal getActiveDocument
 * @vscType Vscode
 * @returns Promise<boolean>
 */
export const saveActiveDocument = async (): Promise<boolean> => \{
   const doc = vsc.getActiveDocument()
   if (doc) \{
      await doc.save()
      return true
   }
   return new Promise(resolve => \{
      resolve(false)
   })
}
`}
      />
   )
}

export default SaveActiveDocumentAnnotatedCode

