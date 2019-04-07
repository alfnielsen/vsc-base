import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base'



const SaveActiveDocumentAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'saveActiveDocument'}
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
         
         codeEx={`const success = await vsc.saveActiveDocument(content)`}
         code={`export const saveActiveDocument = async (): Promise<boolean> => {
   const doc = vsc.getActiveDocument()
   if (doc) {
      await doc.save()
      return true
   }
   return new Promise(resolve => {
      resolve(false)
   })
}
`}
      />
   )
}

export default SaveActiveDocumentAnnotatedCode

