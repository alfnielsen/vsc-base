import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base'



const CopyAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'copy'}
         annotation={
            <>
               <p>
                  Copy file/fodler
               </p>
            </>
         }
         
         codeEx={`await vsc.copy(oldPath, newPath)`}
         code={`export const copy = async (path: string, newPath: string): Promise<void> => {
   await fs.copy(path, newPath)
}

`}
      />
   )
}

export default CopyAnnotatedCode

