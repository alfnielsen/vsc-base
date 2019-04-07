import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base'

import MethodTest from 'components/MethodTest/MethodTest'

const GetRelativePathAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'getRelativePath'}
         annotation={
            <>
               <p>
                  Generate relative path between two paths.
               </p>
            </>
         }
         
         codeEx={`const relativePath = vsc.getRelativePath(fromPath, toPath)`}
         code={`export const getRelativePath = (fromPath: string, toPath: string): string => {
   const _sharedPath = vsc.sharedPath(fromPath, toPath)
   const [fromDir] = vsc.splitPath(fromPath)
   const [toDir] = vsc.splitPath(toPath)
   const fromPathDownToShared = vsc.subtractPath(fromDir, _sharedPath)
   let toPathDownToShared = vsc.subtractPath(toDir, _sharedPath)
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

export default GetRelativePathAnnotatedCode

