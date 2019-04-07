import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base'



const IsDirAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'isDir'}
         annotation={
            <>
               <p>
                  Test is a path is directory
               </p>
            </>
         }
         
         codeEx={`const _isDir = vsc.isDir(path)`}
         code={`export const isDir = (path: string): boolean => {
   return fs.statSync(path).isDirectory()
}
`}
      />
   )
}

export default IsDirAnnotatedCode

