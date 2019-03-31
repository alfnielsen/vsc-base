import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'

const ShowMessageAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'doesExists'}
         annotation={
            <>
               <p>Show message to user</p>
            </>
         }
         codeEx={`showMessage(message)`}
         code={`/**
 * Show message to user
 * @param message
 */
const showMessage = async (message: string): Promise<void> => {
   await vscode.window.showInformationMessage(message)
}

`}
      />
   )
}

export default ShowMessageAnnotatedCode
