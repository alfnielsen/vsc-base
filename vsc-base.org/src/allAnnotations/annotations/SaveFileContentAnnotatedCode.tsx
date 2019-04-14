import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const SaveFileContentAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'saveFileContent'}
         title={'saveFileContent'}
         annotation={
            <>
               <p>
                  
 Save file
               </p>
            </>
         }
         
         codeOneLineEx={`await vsc.saveFileContent(path, source)`}
         codeEx={``}
         code={`/**
 * @param path, content
 * @vscType System
 * @dependencyExternal fs
 * @returns Promise<void>
 */
export const saveFileContent = async (
   path: string,
   content: string
): Promise<void> => \{
   await fs.writeFile(path, content)
}
`}
      />
   )
}

export default SaveFileContentAnnotatedCode

