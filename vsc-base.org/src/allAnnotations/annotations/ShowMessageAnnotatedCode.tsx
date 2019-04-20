import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const ShowMessageAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'showMessage'}
         title={'showMessage'}
         open={open}
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
 * @param message
 * @dependencyExternal vscode
 * @vscType Vscode
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

