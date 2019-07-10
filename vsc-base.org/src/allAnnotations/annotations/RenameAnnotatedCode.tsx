import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const RenameAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'rename'}
         title={'rename'}
         open={open}
         annotation={
            <>
               <p>
                  
Rename a file or folder 
               </p>
               <p>
               See <a href='https://nodejs.org/api/fs.html#fs_fs_rename_oldpath_newpath_callback'>fs docs for rename</a>
               </p>
            </>
         }
         
         codeOneLineEx={`await vsc.move(oldPath, newPath)`}
         codeEx={``}
         code={`/**
 * @vscType System
 * @dependencyExternal fs
 * @returns Promise<void>
 */
export const rename = async (
   path: string,
   newPath: string,
): Promise<void> => \{
   await fs.rename(path, newPath)
}`}
      />
   )
}

export default RenameAnnotatedCode

