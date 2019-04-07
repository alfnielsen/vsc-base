import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const PathAsUnixAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'pathAsUnix'}
         title={'pathAsUnix'}
         annotation={
            <>
               <p>
                  Reaplve all '\\'  with '/'
               </p>
            </>
         }
         
         codeOneLineEx={`const path = vsc.joinPaths(path1, path2)`}
         codeEx={``}
         code={`/**
 * Reaplve all '\\'  with '/'
 * @see http://vsc-base.org/#pathAsUnix
 * @param path
 * @oneLineEx const path = vsc.joinPaths(path1, path2)
 * @returns string
 */
export const pathAsUnix = (path: string): string => {
   return path.replace(/\\/g, '/')
}
`}
      />
   )
}

export default PathAsUnixAnnotatedCode

