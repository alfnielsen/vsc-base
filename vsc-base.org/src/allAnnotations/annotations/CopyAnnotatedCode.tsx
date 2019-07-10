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
                  
Copy file/folder 
               </p>
               <p>
               See <a href='https://github.com/jprichardson/node-fs-extra/blob/master/docs/copy.md'>fs-extra docs for copy</a>
               </p>
            </>
         }
         
         codeOneLineEx={`await vsc.copy(oldPath, newPath)`}
         codeEx={``}
         code={`/**
 * @vscType System
 * @dependencyExternal fs
 * @returns Promise<void>
 */
export const copy = async (
   path: string,
   newPath: string,
   options?: fs.CopyOptions
): Promise<void> => \{
   await fs.copy(path, newPath, options)
}`}
      />
   )
}

export default CopyAnnotatedCode

