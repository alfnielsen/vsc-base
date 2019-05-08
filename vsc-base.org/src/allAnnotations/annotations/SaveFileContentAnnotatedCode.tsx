import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const SaveFileContentAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'saveFileContent'}
         title={'saveFileContent'}
         open={open}
         annotation={
            <>
               <p>
                  
 Save file 
               </p>
               <p>
                See <a href='https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback'>fs docs for writeFile</a>
               </p>
            </>
         }
         
         codeOneLineEx={`await vsc.saveFileContent(path, source)`}
         codeEx={``}
         code={`/**
 * @param path, content
 * @vscType System
 * @dependencyExternal fs
 * @returns Promise<void>
 */
export const saveFileContent = async (
   path: string,
   content: string,
   options?: fs.WriteFileOptions
): Promise<void> => \{
   await fs.writeFile(path, content, options)
}

`}
      />
   )
}

export default SaveFileContentAnnotatedCode

