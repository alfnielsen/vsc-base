import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const SaveAllAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'saveAll'}
         title={'saveAll'}
         open={open}
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

