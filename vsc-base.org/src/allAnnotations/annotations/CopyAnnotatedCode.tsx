import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const CopyAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'copy'}
         title={'copy'}
         open={open}
         annotation={
            <>
               <p>
                  
 Copy file/fodler
               </p>
            </>
         }
         
         codeOneLineEx={`await vsc.copy(oldPath, newPath)`}
         codeEx={``}
         code={`/**
 * @param path, newPathstring
 * @vscType System
 * @dependencyExternal fs
 * @returns Promise<void>
 */
export const copy = async (path: string, newPath: string): Promise<void> => \{
   await fs.copy(path, newPath)
}
`}
      />
   )
}

export default CopyAnnotatedCode

