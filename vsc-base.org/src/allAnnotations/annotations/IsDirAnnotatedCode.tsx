import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const IsDirAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'isDir'}
         title={'isDir'}
         open={open}
         annotation={
            <>
               <p>
                  
 Test is a path is directory
               </p>
            </>
         }
         
         codeOneLineEx={`const isDir = vsc.isDir(path)`}
         codeEx={``}
         code={`/**
 * @param path
 * @dependencyExternal fs
 * @vscType System
 * @returns boolean
 */
export const isDir = (path: string): boolean => \{
   return fs.statSync(path).isDirectory()
}
`}
      />
   )
}

export default IsDirAnnotatedCode

