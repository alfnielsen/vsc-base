import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'


import * as vsc from '../vsc-base-raw'

import MethodTest from 'components/MethodTest/MethodTest'


const PathAsUnixAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'pathAsUnix'}
         title={'pathAsUnix'}
         open={open}
         annotation={
            <>
               <p>
                  
 Replace all '\\'  with '/' 
               </p>
               <p>
                (Convert all path this way to make them system safe - work both on unix/linux/mac and windows)
               </p>
            </>
         }
         
      test={
         <MethodTest
            initialArgs={{
   path: 'root\\area\\module1\\file.ts'
}}
            onClickCall={(args, setResult) => {
     const res = vsc.pathAsUnix(args.path)
     setResult(res)
}}
         />
      }
      
         codeOneLineEx={`const safePath = vsc.pathAsUnix(path)`}
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

