import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'


import * as vsc from '../vsc-base-raw'

import MethodTest from 'components/MethodTest/MethodTest'


const CleanPathAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'cleanPath'}
         title={'cleanPath'}
         annotation={
            <>
               <p>
                  
               </p>
               <p>
                Get clean path. \
 Ex: 'folder/../folder/file' => 'folder/file', 'folder/./file' => 'file'
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
 * @description 
 * Get clean path. \\
 * Ex: 'folder/../folder/file' => 'folder/file', 'folder/./file' => 'file'
 * @see http://vsc-base.org/#cleanPath
 * @param path
 * @vscType Raw
 * @testPrinterArgument 
\{
   path: 'folder/../folder/file'
}
 * @testPrinter (args, printResult) => \{
   const result = vsc.cleanPath(args.path)
   printResult(result)
}
 * @oneLineEx const newPath = vsc.cleanPath(concatenatedPath)
 * @returns string
 */
export const cleanPath = (path: string): string => \{
   path = path.replace(/\\/.\\//g, '/')
   const reg = /\\b\\w+\\/\\.\\.\\//
   while (reg.test(path)) \{
      path = path.replace(reg, '')
   }
   return path
}
`}
      />
   )
}

export default CleanPathAnnotatedCode

