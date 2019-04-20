import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const MoveAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'move'}
         title={'move'}
         open={open}
         annotation={
            <>
               <p>
                  
 Move a file or folder
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

