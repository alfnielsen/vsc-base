import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'

const MoveAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'move'}
         annotation={
            <>
               <p>Move file or dir</p>
            </>
         }
         codeEx={`await move(path)`}
         code={`/**
 * Move file or dir
 * @param path
 * @param newPathstring
 */
const move = async (path: string, newPath: string): Promise<void> => {
   await fs.move(path, newPath)
}


`}
      />
   )
}

export default MoveAnnotatedCode
