import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const SaveAllAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'saveAll'}
         title={'saveAll'}
         annotation={
            <>
               <p>
                  
 Save All files
               </p>
            </>
         }
         
         codeOneLineEx={`await vsc.saveAll()`}
         codeEx={``}
         code={`/**
 * @dependencyExternal vscode
 * @vscType Vscode
 * @returns Promise<void>
 */
export const saveAll = async (): Promise<void> => \{
   await vscode.workspace.saveAll(false)
}
`}
      />
   )
}

export default SaveAllAnnotatedCode

