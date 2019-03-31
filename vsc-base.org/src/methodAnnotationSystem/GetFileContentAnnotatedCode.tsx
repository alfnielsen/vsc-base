import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'

const GetFileContentAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'getFileContent'}
         annotation={
            <>
               <p>Get file source</p>
            </>
         }
         codeEx={`const source = await getFileContent(doesExists)`}
         code={`/**
 * Get file source
 * @param path
 */
const getFileContent = async (path: string): Promise<string> => await fs.readFile(path, 'utf8')

`}
      />
   )
}

export default GetFileContentAnnotatedCode
