import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base/vsc-base-raw'

import MethodTest from 'components/MethodTest/MethodTest'

const PathAsUnixAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'pathAsUnix'}
         annotation={
            <>
               <p>Reaplve all '\\' with '/'</p>
               <p>
                  Use for all system file path (from libs like fs and path and vscode), to ensure that working with the
                  path will be woring on both unix systems and windows systems.
               </p>
            </>
         }
         test={
            <MethodTest
               initialArgs={{
                  path: 'c:\\somefolder\\someFile.js'
               }}
               onClickCall={(args, setResult) => {
                  const res = vsc.pathAsUnix(args.path)
                  setResult(res)
               }}
            />
         }
         codeEx={`const path = pathAsUnix(systemPath)`}
         code={`/**
 * Reaplve all '\\'  with '/'
 * @param path
 */
const pathAsUnix = (path: string): string => {
   return path.replace(/\\/g, '/')
}
`}
      />
   )
}

export default PathAsUnixAnnotatedCode
