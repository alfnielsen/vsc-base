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
 * Save All files
 * @see http://vsc-base.org/#saveAll
 * @dependencyExternal vscode
 * @vscType Vscode
 * @oneLineEx await vsc.saveAll()
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

