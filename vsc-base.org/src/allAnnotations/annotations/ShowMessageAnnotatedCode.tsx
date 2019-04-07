import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base'



const ShowMessageAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'showMessage'}
         annotation={
            <>
               <p>
                  Show message to user
               </p>
            </>
         }
         
         codeEx={`vsc.showMessage(message)`}
         code={`export const showMessage = async (message: string): Promise<void> => {
   await vscode.window.showInformationMessage(message)
}
`}
      />
   )
}

export default ShowMessageAnnotatedCode

