import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base'



const JoinPathsAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'joinPaths'}
         annotation={
            <>
               <p>
                  Joins to paths.
               </p>
            </>
         }
         
         codeEx={`const newPath = vsc.joinPaths(path1, path2)`}
         code={`export const joinPaths = (path1: string, path2: string): string => {
   path1 = vsc.trimDashes(path1)
   path2 = vsc.trimDashes(path2)
   const result = path1 + '/' + path2
   return result
}
`}
      />
   )
}

export default JoinPathsAnnotatedCode

