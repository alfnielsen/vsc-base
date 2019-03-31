import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base/vsc-base-raw'

import MethodTest from 'components/MethodTest/MethodTest'

const RelatrivePathToAbsolutePathAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'relatrivePathToAbsolutePath'}
         annotation={
            <>
               <p>This method add local ref './' start to a path.</p>
            </>
         }
         test={
            <MethodTest
               initialArgs={{
                  path: 'c:/root/modules/file1.js',
                  pathRelatriveToPath: '../other-folder/file2',
                  rootPath: 'c:/root/'
               }}
               onClickCall={(args, setResult) => {
                  const res = vsc.relatrivePathToAbsolutePath(args.path, args.pathRelatriveToPath, args.rootPath)
                  setResult(res)
               }}
            />
         }
         codeEx={`const absolutePath = relatrivePathToAbsolutePath(path, pathRelatriveToPath, rootPath)`}
         code={`/**
 * Transform a relative path to an abspolute path.
 * @param path File from where the relative path begins
 * @param pathRelatriveToPath The relative path
 * @param rootPath The root path
 * @param realPathTest Test if the real  The root path
 */
const relatrivePathToAbsolutePath = (path: string, pathRelatriveToPath: string, rootPath: string): string => {
   if (isAbsolutePath(pathRelatriveToPath)) {
      return pathRelatriveToPath
   }
   let [dir] = splitPath(path)
   dir += '/'
   const relativePath = dir + pathRelatriveToPath
   let cleanRelativePath = cleanPath(relativePath)
   let absolutePathToRelative = subtractPath(cleanRelativePath, rootPath)
   absolutePathToRelative = trimLeadingDash(absolutePathToRelative)
   return absolutePathToRelative
}
`}
      />
   )
}

export default RelatrivePathToAbsolutePathAnnotatedCode
