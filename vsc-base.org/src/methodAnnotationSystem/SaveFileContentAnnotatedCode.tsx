import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'

const SaveFileContentAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'saveFileContent'}
         annotation={
            <>
               <p>Save file</p>
            </>
         }
         codeEx={`await saveFileContent(path, source)`}
         code={`/**
 * Save file
 * @param path
 * @param content
 */
const saveFileContent = async (path: string, content: string): Promise<void> => {
   await fs.writeFile(path, content)
}


`}
      />
   )
}

export default SaveFileContentAnnotatedCode
