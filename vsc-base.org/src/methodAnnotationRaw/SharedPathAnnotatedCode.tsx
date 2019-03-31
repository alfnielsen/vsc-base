import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base/vsc-base-raw'

import MethodTest from 'components/MethodTest/MethodTest'

const SharedPathAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'sharedPath'}
         annotation={
            <>
               <p>Return the path that are shared.</p>
            </>
         }
         test={
            <MethodTest
               initialArgs={{
                  path1: 'c:/root/sub1/sub2/file1.ts',
                  path2: 'c:/root/sub1/file2.ts'
               }}
               onClickCall={(args, setResult) => {
                  const res = vsc.sharedPath(args.path1, args.path2)
                  setResult(res)
               }}
            />
         }
         codeEx={`const _sharedPath = sharedPath(path1, path2)`}
         code={`/**
 * Return the path that are shared. (Return '' if no path are shared).
 * @param path1
 * @param path2
 */
const sharedPath = (path1: string, path2: string) => {
   const path1Parts = path1.split(/\//)
   const path2Parts = path2.split(/\//)
   const shared = []
   for (let i = 0; i < path1Parts.length; i++) {
      if (!path2Parts[i] || path1Parts[i] !== path2Parts[i]) {
         break
      }
      shared.push(path1Parts[i])
   }
   const finalShared = shared.join('/')
   return finalShared
}
`}
      />
   )
}

export default SharedPathAnnotatedCode
