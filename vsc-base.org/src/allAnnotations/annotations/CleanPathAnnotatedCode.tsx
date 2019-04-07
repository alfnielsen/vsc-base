import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base'



const CleanPathAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'cleanPath'}
         annotation={
            <>
               <p>
                  Get clean path. folder/../folder/file => folder/file, folder/./file => file
               </p>
            </>
         }
         
         codeEx={`const newPath = vsc.cleanPath(concatenatedPath)`}
         code={`export const cleanPath = (path: string): string => {
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

