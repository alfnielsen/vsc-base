import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const SaveActiveDocumentAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'saveActiveDocument'}
         title={'saveActiveDocument'}
         annotation={
            <>
               <p>
                  
               </p>
               <p>
                Save active open file. \
 Return true for succes, and false if there was no open document
               </p>
            </>
         }
         
         codeOneLineEx={`const success = await vsc.saveActiveDocument(content)`}
         codeEx={``}
         code={`/**
 * @description 
 * Save active open file. \\
 * Return true for succes, and false if there was no open document
 * @see http://vsc-base.org/#saveActiveDocument
 * @dependencyInternal getActiveDocument
 * @vscType Vscode
 * @oneLineEx const success = await vsc.saveActiveDocument(content)
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

