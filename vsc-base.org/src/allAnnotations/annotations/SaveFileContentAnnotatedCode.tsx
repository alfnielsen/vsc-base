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
 * Save file
 * @see http://vsc-base.org/#saveFileContent
 * @param path
 * @param content
 * @vscType System
 * @dependencyExternal fs
 * @oneLineEx await vsc.saveFileContent(path, source)
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

