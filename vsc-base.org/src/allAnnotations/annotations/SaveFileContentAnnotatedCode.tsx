import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base'



const SaveFileContentAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'saveFileContent'}
         annotation={
            <>
               <p>
                  Save file
               </p>
            </>
         }
         
         codeEx={`await vsc.saveFileContent(path, source)`}
         code={`export const saveFileContent = async (
   path: string,
   content: string
): Promise<void> => {
   await fs.writeFile(path, content)
}
`}
      />
   )
}

export default SaveFileContentAnnotatedCode

