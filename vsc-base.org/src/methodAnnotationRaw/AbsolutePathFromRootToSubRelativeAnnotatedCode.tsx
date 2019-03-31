import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base/vsc-base-raw'

import MethodTest from 'components/MethodTest/MethodTest'

const AbsolutePathFromRootToSubRelativeAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'absolutePathFromRootToSubRelative'}
         annotation={
            <>
               <p>Create sub relative path.</p>
               <p>
                  Meaning it will give an absolute path, if the relative path is not in the same folder or sub-folder.
               </p>
            </>
         }
         test={
            <MethodTest
               initialArgs={{
                  path: 'c:/root/modules/test/file1.ts',
                  absolutePathFromRoot: 'modules/test/file2.ts',
                  rootPath: 'c:/root'
               }}
               onClickCall={(args, setResult) => {
                  const res = vsc.absolutePathToSubRalative(args.path, args.absolutePathFromRoot, args.rootPath)
                  setResult(res)
               }}
            />
         }
         codeEx={`const subRelativePath = absolutePathFromRootToSubRelative(path, absolutePathFromRoot, rootPath)`}
         code={`/**
 * Transform an absolute path from root, to a sub-relative path.
 * @param path
 * @param rootPath
 * @param absolutePathFromRoot
 */
const absolutePathFromRootToSubRelative = (path: string, absolutePathFromRoot: string, rootPath: string): string => {
   const [sourceDirPath] = vsc.splitPath(path)
   let sourceDirPathFromRoot = vsc.subtractPath(sourceDirPath, rootPath)
   sourceDirPathFromRoot = sourceDirPathFromRoot + '/'
   let absolutePathFromSourceDir = vsc.subtractPath(absolutePathFromRoot, sourceDirPathFromRoot)
   if (absolutePathFromSourceDir !== absolutePathFromRoot) {
      absolutePathFromSourceDir = vsc.addLeadingLocalDash(absolutePathFromSourceDir)
   }
   return absolutePathFromSourceDir
}
`}
      />
   )
}

export default AbsolutePathFromRootToSubRelativeAnnotatedCode
