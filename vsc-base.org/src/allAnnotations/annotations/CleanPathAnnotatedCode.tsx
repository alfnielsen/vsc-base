import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const CleanPathAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'cleanPath'}
         title={'cleanPath'}
         annotation={
            <>
               <p>
                  Get clean path. folder/../folder/file => folder/file, folder/./file => file
               </p>
            </>
         }
         
         codeOneLineEx={`const newPath = vsc.cleanPath(concatenatedPath)`}
         codeEx={``}
         code={`/**
 * Get clean path. folder/../folder/file => folder/file, folder/./file => file
 * @see http://vsc-base.org/#cleanPath
 * @param path
 * @oneLineEx const newPath = vsc.cleanPath(concatenatedPath)
 * @returns string
 */
export const cleanPath = (path: string): string => {
   path = path.replace(/\/.\//g, '/')
   const reg = /\/\w+\/\.\.\//
   while (reg.test(path)) {
      path = path.replace(reg, '/')
   }
   return path
}
`}
      />
   )
}

export default CleanPathAnnotatedCode

