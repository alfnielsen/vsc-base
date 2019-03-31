import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base/vsc-base-raw'

import MethodTest from 'components/MethodTest/MethodTest'

const IsSubPathAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'isSubPath'}
         annotation={
            <>
               <p>This method test if a path is a subpath of another path.</p>
            </>
         }
         test={
            <MethodTest
               initialArgs={{
                  subPath: 'c:/root/sub/sub2/files',
                  parentPath: 'c:/root'
               }}
               onClickCall={(args, setResult) => {
                  const res = vsc.isSubPath(args.subPath, args.parentPath)
                  setResult(res.toString())
               }}
            />
         }
         codeEx={`const isUnderParent = isSubPath(subPath, parentPath)`}
         code={`/**
 * Does subpath start with parentPath
 * @param path
 * @param parentPath
 */
const isSubPath = (subPath: string, parentPath: string): boolean => {
   parentPath = trimDashes(parentPath)
   const result = subPath.indexOf(parentPath + '/') === 0
   return result
}
`}
      />
   )
}

export default IsSubPathAnnotatedCode
