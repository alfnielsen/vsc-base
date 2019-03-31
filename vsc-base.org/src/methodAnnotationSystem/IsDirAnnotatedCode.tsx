import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'

const IsDirAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'isDir'}
         annotation={
            <>
               <p> Test is a path is directory</p>
            </>
         }
         codeEx={`const _isDir = isDir(path)`}
         code={`/**
 * Test is a path is directory
 * @param path
 */
const isDir = (path: string): boolean => {
   return fs.statSync(path).isDirectory()
}

`}
      />
   )
}

export default IsDirAnnotatedCode
