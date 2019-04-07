import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base'



const PathAsUnixAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'pathAsUnix'}
         annotation={
            <>
               <p>
                  Reaplve all '\\'  with '/'
               </p>
            </>
         }
         
         codeEx={`const path = vsc.joinPaths(path1, path2)`}
         code={`export const pathAsUnix = (path: string): string => {
   return path.replace(/\\/g, '/')
}
`}
      />
   )
}

export default PathAsUnixAnnotatedCode

