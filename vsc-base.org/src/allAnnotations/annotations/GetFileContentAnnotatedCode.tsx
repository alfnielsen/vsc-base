import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const GetFileContentAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'getFileContent'}
         title={'getFileContent'}
         annotation={
            <>
               <p>
                  
 Get file source
               </p>
            </>
         }
         
         codeOneLineEx={`const source = vsc.getFileContent(path)`}
         codeEx={``}
         code={`/**
 * @param path
 * @dependencyExternal fs
 * @vscType System
 * @returns Promise<string>
 */
export const getFileContent = async (path: string): Promise<string> =>
   await fs.readFile(path, 'utf8')
`}
      />
   )
}

export default GetFileContentAnnotatedCode

