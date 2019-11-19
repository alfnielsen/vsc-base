import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'


import * as vsc from '../vsc-base-raw'

import MethodTest from 'components/MethodTest/MethodTest'


const SharedPathAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'sharedPath'}
         title={'sharedPath'}
         open={open}
         annotation={
            <>
               <p>
                  
Return the path that are shared. 
               </p>
               <p>
               (Return &#039;&#039; if no path are shared).
               </p>
            </>
         }
         
      test={
         <MethodTest
            initialArgs={{
   path1: 'root/area/module1/file1.ts',
   path2: 'root/area/module2/file2.ts'
}}
            onClickCall={(args, setResult) => {
     const res = vsc.sharedPath(args.path1, args.path2)
     setResult(res)
}}
         />
      }
      
         codeOneLineEx={`const sharedPath = vsc.sharedPath(path1, path2)`}
         codeEx={``}
         code={`/**
 * @param path1,path2
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
}`}
      />
   )
}

export default SharedPathAnnotatedCode

