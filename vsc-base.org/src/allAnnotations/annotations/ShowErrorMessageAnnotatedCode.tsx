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
 * @param message
 * @dependencyExternal vscode
 * @vscType Vscode
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

