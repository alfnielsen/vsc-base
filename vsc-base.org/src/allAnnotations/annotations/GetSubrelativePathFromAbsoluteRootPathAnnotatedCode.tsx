import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'


import * as vsc from '../vsc-base-raw'

import MethodTest from 'components/MethodTest/MethodTest'


const GetSubRelativePathFromAbsoluteRootPathAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'getSubRelativePathFromAbsoluteRootPath'}
         title={'getSubRelativePathFromAbsoluteRootPath'}
         open={open}
         annotation={
            <>
               <p>
                  
Transform an absolute path from root, to a sub-relative path.
               </p>
            </>
         }
         
      test={
         <MethodTest
            initialArgs={{
   path: 'c:/root/module/file.ts',
   absolutePathFromRoot: 'module/sub-module/file2',
   rootPath: 'c:/root'
}}
            onClickCall={(args, setResult) => {
   const res = vsc.getSubRelativePathFromAbsoluteRootPath(args.path, args.absolutePathFromRoot, args.rootPath)
   setResult(res)
}}
         />
      }
      
         codeOneLineEx={`const subRelativePath = vsc.getSubRelativePathFromAbsoluteRootPath(path, absolutePathFromRoot, rootPath)`}
         codeEx={``}
         code={`/**
 * @param path,rootPath,absolutePathFromRoot
 * @vscType Raw
 * @dependencyInternal splitPath, subtractPath, addLeadingLocalDash
 * @returns string
 */
export const getSubRelativePathFromAbsoluteRootPath = (
   path: string,
   absolutePathFromRoot: string,
   rootPath: string
): string => \{
   const [sourceDirPath] = vsc.splitPath(path)
   let sourceDirPathFromRoot = vsc.subtractPath(sourceDirPath, rootPath)
   sourceDirPathFromRoot = sourceDirPathFromRoot + '/'
   let absolutePathFromSourceDir = vsc.subtractPath(
      absolutePathFromRoot,
      sourceDirPathFromRoot
   )
   if (absolutePathFromSourceDir !== absolutePathFromRoot) \{
      absolutePathFromSourceDir = vsc.addLeadingLocalDash(absolutePathFromSourceDir)
   }
   return absolutePathFromSourceDir
}`}
      />
   )
}

export default GetSubRelativePathFromAbsoluteRootPathAnnotatedCode

