import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base'



const GetFileContentAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'getFileContent'}
         annotation={
            <>
               <p>
                  Get file source
               </p>
            </>
         }
         
         codeEx={`const source = vsc.getFileContent(path)`}
         code={`export const getFileContent = async (path: string): Promise<string> =>
   await fs.readFile(path, 'utf8')
`}
      />
   )
}

export default GetFileContentAnnotatedCode

