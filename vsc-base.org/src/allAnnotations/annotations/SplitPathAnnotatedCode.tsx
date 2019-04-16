import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'


import * as vsc from '../vsc-base-raw'

import MethodTest from 'components/MethodTest/MethodTest'


const SplitPathAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'splitPath'}
         title={'splitPath'}
         annotation={
            <>
               <p>
                  
 Split filePath into dir and file
               </p>
            </>
         }
         
      test={
         <MethodTest
            initialArgs={{
   path: 'root/area/module/file1.ts'
}}
            onClickCall={(args, setResult) => {
     const res = vsc.splitPath(args.path)
     setResult(JSON.stringify(res))
}}
         />
      }
      
         codeOneLineEx={`const [dir, file] = vsc.splitPath(filePath)`}
         codeEx={``}
         code={`/**
 * @param path
 * @dependencyInternal pathAsUnix
 * @vscType Raw
 * @returns [string, string]
 */
export const splitPath = (path: string): [string, string] => \{
   path = vsc.pathAsUnix(path)
   const splits = path.split('/')
   const name = splits.pop() || ''
   const dir = splits.join('/')
   return [dir, name]
}
`}
      />
   )
}

export default SplitPathAnnotatedCode

