import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const MoveAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'move'}
         title={'move'}
         annotation={
            <>
               <p>
                  
 Move file/fodler
               </p>
            </>
         }
         
         codeOneLineEx={`await vsc.move(oldPath, newPath)`}
         codeEx={``}
         code={`/**
 * @param path, newPathstring
 * @vscType System
 * @dependencyExternal fs
 * @returns Promise<void>
 */
export const move = async (path: string, newPath: string): Promise<void> => \{
   await fs.move(path, newPath)
}
`}
      />
   )
}

export default MoveAnnotatedCode

