import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'


import * as vsc from '../vsc-base-raw'

import MethodTest from 'components/MethodTest/MethodTest'


const TrimLeadingDashAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'trimLeadingDash'}
         title={'trimLeadingDash'}
         open={open}
         annotation={
            <>
               <p>
                  
 Remove '/' from start of path
               </p>
            </>
         }
         
      test={
         <MethodTest
            initialArgs={{
   path: '/root/area/module1/file1.ts'
}}
            onClickCall={(args, setResult) => {
     const res = vsc.trimLeadingDash(args.path)
     setResult(res)
}}
         />
      }
      
         codeOneLineEx={`const path = vsc.trimLeadingDash(foundPath)`}
         codeEx={``}
         code={`/**
 * @param path
 * @vscType Raw
 * @returns string
 */
export const trimLeadingDash = (path: string): string => \{
   return path.replace(/^\\//, '')
}`}
      />
   )
}

export default TrimLeadingDashAnnotatedCode

