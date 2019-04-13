import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const ShowErrorMessageAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'showErrorMessage'}
         title={'showErrorMessage'}
         annotation={
            <>
               <p>
                  
 Show error message to user
               </p>
            </>
         }
         
         codeOneLineEx={`vsc.showErrorMessage(message)`}
         codeEx={``}
         code={`/**
 * @description 
 * Show error message to user
 * @see http://vsc-base.org/#showErrorMessage
 * @param message
 * @dependencyExternal vscode
 * @vscType Vscode
 * @oneLineEx vsc.showErrorMessage(message)
 * @returns Promise<void>
 */
export const showErrorMessage = async (message: string): Promise<void> => \{
   await vscode.window.showErrorMessage(message)
}
`}
      />
   )
}

export default ShowErrorMessageAnnotatedCode

