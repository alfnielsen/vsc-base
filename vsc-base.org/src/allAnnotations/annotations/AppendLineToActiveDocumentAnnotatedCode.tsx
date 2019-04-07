import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base'



const AppendLineToActiveDocumentAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'appendLineToActiveDocument'}
         annotation={
            <>
               <p>
                  Append new line content in the end of the open document
               </p>
            </>
         }
         
         codeEx={`const success = await vsc.appendLineToActiveDocument(content)`}
         code={`export const appendLineToActiveDocument = async (
   content: string
): Promise<boolean> => {
   return await vsc.appendToActiveDocument('\n' + content)
}
`}
      />
   )
}

export default AppendLineToActiveDocumentAnnotatedCode

