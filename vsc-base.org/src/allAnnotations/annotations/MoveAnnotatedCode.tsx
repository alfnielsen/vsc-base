import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base'



const MoveAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'move'}
         annotation={
            <>
               <p>
                  Move file/fodler
               </p>
            </>
         }
         
         codeEx={`await vsc.move(oldPath, newPath)`}
         code={`export const move = async (path: string, newPath: string): Promise<void> => {
   await fs.move(path, newPath)
}
`}
      />
   )
}

export default MoveAnnotatedCode

