import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base'



const SaveAllAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'saveAll'}
         annotation={
            <>
               <p>
                  Save All files
               </p>
            </>
         }
         
         codeEx={`await vsc.saveAll()`}
         code={`export const saveAll = async (): Promise<void> => {
   await vscode.workspace.saveAll(false)
}
`}
      />
   )
}

export default SaveAllAnnotatedCode

