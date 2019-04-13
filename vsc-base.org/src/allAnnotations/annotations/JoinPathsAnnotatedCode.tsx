import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const JoinPathsAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'joinPaths'}
         title={'joinPaths'}
         annotation={
            <>
               <p>
                  
 Joins to paths.
               </p>
            </>
         }
         
         codeOneLineEx={`const newPath = vsc.joinPaths(path1, path2)`}
         codeEx={``}
         code={`/**
 * @description 
 * Joins to paths.
 * @see http://vsc-base.org/#joinPaths
 * @param path1
 * @param path2
 * @dependencyInternal trimDashes
 * @vscType Raw
 * @oneLineEx const newPath = vsc.joinPaths(path1, path2)
 * @returns string
 */
export const joinPaths = (path1: string, path2: string): string => \{
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

