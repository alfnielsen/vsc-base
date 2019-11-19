import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'


import * as vsc from '../vsc-base-raw'

import MethodTest from 'components/MethodTest/MethodTest'


const CleanPathAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'cleanPath'}
         title={'cleanPath'}
         open={open}
         annotation={
            <>
               <p>
                  
Get clean path. 
               </p>
               <p>
               Ex: &#039;folder/../folder/file&#039; =&gt; &#039;folder/file&#039;, &#039;folder/./file&#039; =&gt; &#039;file&#039;
               </p>
            </>
         }
         
      test={
         <MethodTest
            initialArgs={
{
   path: 'folder/../folder/file'
}}
            onClickCall={(args, printResult) => {
   const result = vsc.cleanPath(args.path)
   printResult(result)
}}
         />
      }
      
         codeOneLineEx={`const newPath = vsc.cleanPath(concatenatedPath)`}
         codeEx={``}
         code={`/**
 * @param path
 * @vscType Raw
 * @returns string
 */
export const cleanPath = (path: string): string => \{
   path = path.replace(/\\/.\\//g, '/')
   const reg = /\\b\\w+\\/\\.\\.\\//
   while (reg.test(path)) \{
      path = path.replace(reg, '')
   }
   return path
}`}
      />
   )
}

export default CleanPathAnnotatedCode

