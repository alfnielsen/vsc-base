import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'

const MakeDirAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'makeDir'}
         annotation={
            <>
               <p>Make a folder</p>
            </>
         }
         codeEx={`await move(path)`}
         code={`/**
 * Make a folder
 * dependensies: { fs.move(File access) }
 * @param path
 * @param newPathstring
 */
const makeDir = async (folderPath: string): Promise<void> => {
   await fs.mkdir(folderPath)
}

`}
      />
   )
}

export default MakeDirAnnotatedCode
