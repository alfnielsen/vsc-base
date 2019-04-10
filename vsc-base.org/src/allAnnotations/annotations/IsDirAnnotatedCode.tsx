import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const IsDirAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'isDir'}
         title={'isDir'}
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
 * Test is a path is directory
 * @param path
 * @dependencyExternal fs
 * @vscType System
 * @oneLineEx const isDir = vsc.isDir(path)
 * @see http://vsc-base.org/#isDir
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

