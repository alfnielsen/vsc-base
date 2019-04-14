import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const SharedPathAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'sharedPath'}
         title={'sharedPath'}
         annotation={
            <>
               <p>
                  
 Return the path that are shared. 
               </p>
               <p>
                (Return '' if no path are shared).
               </p>
            </>
         }
         
         codeOneLineEx={`const sharedPath = vsc.sharedPath(path1, path2)`}
         codeEx={``}
         code={`/**
 * @param path1, path2
 * @vscType Raw
 * @returns string
 */
export const sharedPath = (path1: string, path2: string): string => \{
   const path1Parts = path1.split(/\\//)
   const path2Parts = path2.split(/\\//)
   const shared = []
   for (let i = 0; i < path1Parts.length; i++) \{
      if (!path2Parts[i] || path1Parts[i] !== path2Parts[i]) \{
         break
      }
      shared.push(path1Parts[i])
   }
   const sharedPath = shared.join('/')
   return sharedPath
}
`}
      />
   )
}

export default SharedPathAnnotatedCode

