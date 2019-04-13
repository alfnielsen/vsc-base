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
                  
               </p>
               <p>
                Get file source
               </p>
            </>
         }
         
         codeOneLineEx={`const source = vsc.getFileContent(path)`}
         codeEx={``}
         code={`/**
 * @description 
 * Get file source
 * @see http://vsc-base.org/#getFileContent
 * @param path
 * @dependencyExternal fs
 * @vscType System
 * @oneLineEx const source = vsc.getFileContent(path)
 * @returns Promise<string>
 */
export const getFileContent = async (path: string): Promise<string> =>
   await fs.readFile(path, 'utf8')
`}
      />
   )
}

export default GetFileContentAnnotatedCode

