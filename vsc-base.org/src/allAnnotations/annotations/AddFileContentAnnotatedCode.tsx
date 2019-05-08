import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const AddFileContentAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'addFileContent'}
         title={'addFileContent'}
         open={open}
         annotation={
            <>
               <p>
                  
 Append content to a file 
               </p>
               <p>
                See <a href='https://nodejs.org/api/fs.html#fs_fs_appendfile_path_data_options_callback'>fs docs for appendFile</a>
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
export const addFileContent = async (
   path: string,
   content: string,
   options?: fs.WriteFileOptions
): Promise<void> => \{
   await fs.appendFile(path, content, options)
}

`}
      />
   )
}

export default AddFileContentAnnotatedCode

