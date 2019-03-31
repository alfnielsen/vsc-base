import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'

const ShowErrorMessageAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'showErrorMessage'}
         annotation={
            <>
               <p>Show error message to user.</p>
            </>
         }
         codeEx={`showErrorMessage(message)`}
         code={`/**
 * Show error message to user
 * @param message
 */
const showErrorMessage = async (message: string): Promise<void> => {
   await vscode.window.showErrorMessage(message)
}


`}
      />
   )
}

export default ShowErrorMessageAnnotatedCode
