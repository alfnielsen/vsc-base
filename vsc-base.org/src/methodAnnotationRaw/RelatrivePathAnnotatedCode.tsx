import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base/vsc-base-raw'

import MethodTest from 'components/MethodTest/MethodTest'

const RelatrivePathAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'relatrivePath'}
         annotation={
            <>
               <p>Generate relative path between two paths.</p>
            </>
         }
         test={
            <MethodTest
               initialArgs={{
                  fromPath: 'c:/somefolder/sub1/sub2/someFile.js',
                  toPath: 'c:/somefolder/other/someFile.js'
               }}
               onClickCall={(args, setResult) => {
                  const res = vsc.relatrivePath(args.fromPath, args.toPath)
                  setResult(res)
               }}
            />
         }
         codeEx={`const _relativePath = relatrivePath(fromPath, toPath)`}
         code={`/**
 * Generate relative path between two paths.
 * @param fromPath
 * @param toPath
 */
const relatrivePath = (fromPath: string, toPath: string): string => {
   const sharedPath = vsc.sharedPath(fromPath, toPath)
   const [fromDir] = vsc.splitPath(fromPath)
   const [toDir] = vsc.splitPath(toPath)
   const fromPathDownToShared = vsc.subtractPath(fromDir, sharedPath)
   let toPathDownToShared = vsc.subtractPath(toDir, sharedPath)
   const backPath = fromPathDownToShared
      .split(/\//)
      .map(_ => '../')
      .join('')
   const relativePath = backPath + toPathDownToShared
   return relativePath
}
`}
      />
   )
}

export default RelatrivePathAnnotatedCode
