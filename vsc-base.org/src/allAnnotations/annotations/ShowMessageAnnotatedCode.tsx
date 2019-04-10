import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const ShowMessageAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'showMessage'}
         title={'showMessage'}
         annotation={
            <>
               <p>
                  Show message to user
               </p>
            </>
         }
         
         codeOneLineEx={`vsc.showMessage(message)`}
         codeEx={``}
         code={`/**
 * Show message to user
 * @see http://vsc-base.org/#showMessage
 * @param message
 * @dependencyExternal vscode
 * @vscType Vscode
 * @oneLineEx vsc.showMessage(message)
 * @returns Promise<void>
 */
export const showMessage = async (message: string): Promise<void> => \{
   await vscode.window.showInformationMessage(message)
}
`}
      />
   )
}

export default ShowMessageAnnotatedCode

