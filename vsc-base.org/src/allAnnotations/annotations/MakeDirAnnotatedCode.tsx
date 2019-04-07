import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base'



const MakeDirAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'makeDir'}
         annotation={
            <>
               <p>
                  Make a folder
               </p>
            </>
         }
         
         codeEx={`await vsc.makeDir(path)`}
         code={`export const makeDir = async (folderPath: string): Promise<void> => {
   try {
      await fs.mkdir(folderPath)
   } catch (e) {
      throw e
   }
}
`}
      />
   )
}

export default MakeDirAnnotatedCode

