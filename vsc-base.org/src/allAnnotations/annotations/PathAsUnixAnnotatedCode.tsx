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
               <p>
                (Convert all path this way to make them system safe - wotk both on unix/linux/mac and windows)
               </p>
            </>
         }
         
         codeOneLineEx={`const path = vsc.joinPaths(path1, path2)`}
         codeEx={``}
         code={`/**
 * @param path
 * @vscType Raw
 * @returns string
 */
export const pathAsUnix = (path: string): string => \{
   return path.replace(/\\\\/g, '/')
}
`}
      />
   )
}

export default PathAsUnixAnnotatedCode

