import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base'



const ShowErrorMessageAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'showErrorMessage'}
         annotation={
            <>
               <p>
                  Show error message to user
               </p>
            </>
         }
         
         codeEx={`vsc.showErrorMessage(message)`}
         code={`export const showErrorMessage = async (message: string): Promise<void> => {
   await vscode.window.showErrorMessage(message)
}
`}
      />
   )
}

export default ShowErrorMessageAnnotatedCode

