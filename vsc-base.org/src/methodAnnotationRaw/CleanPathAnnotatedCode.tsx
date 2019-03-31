import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base/vsc-base-raw'

import MethodTest from 'components/MethodTest/MethodTest'

const CleanPathAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'cleanPath'}
         annotation={
            <>
               <p>This method cleans a path.</p>
               <p>Use after concatenating a root-path/parent-path with a relative sub path.</p>
            </>
         }
         test={
            <MethodTest
               initialArgs={{
                  path: 'root/subfolder/../subfolder/./file.ts'
               }}
               onClickCall={(args, setResult) => {
                  const res = vsc.cleanPath(args.path)
                  setResult(res)
               }}
            />
         }
         codeEx={`const newPath = cleanPath(concatenatedPath)`}
         code={`/**
 * Get clean path.
 * @param path
 */
const cleanPath = (path: string): string => {
   path = path.replace(/\\/.\\//g, '/')
   const reg = /\\/\\w+\\/\\.\\.\\//
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
