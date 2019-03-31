import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'

const SaveAllAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'saveAll'}
         annotation={
            <>
               <p>Save All files</p>
            </>
         }
         codeEx={`await saveAll()`}
         code={`/**
 * Save All files
 */
const saveAll = async (): Promise<void> => {
   await vscode.workspace.saveAll(false)
}

`}
      />
   )
}

export default SaveAllAnnotatedCode
