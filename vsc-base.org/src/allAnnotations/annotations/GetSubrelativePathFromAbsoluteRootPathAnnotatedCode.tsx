import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'


import * as vsc from '../vsc-base-raw'

import MethodTest from 'components/MethodTest/MethodTest'


const GetSubrelativePathFromAbsoluteRootPathAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'getSubrelativePathFromAbsoluteRootPath'}
         title={'getSubrelativePathFromAbsoluteRootPath'}
         annotation={
            <>
               <p>
                  
               </p>
               <p>
                Transform an absolute path from root, to a sub-relative path.
               </p>
            </>
         }
         
      test={
         <MethodTest
            initialArgs={{
   path: 'c:/root/module/file.ts',
   absolutePathFromRoot: 'module/submodule/file2',
   rootPath: 'c:/root'
}}
            onClickCall={(args, setResult) => {
   const res = vsc.getSubrelativePathFromAbsoluteRootPath(args.path, args.absolutePathFromRoot, args.rootPath)
   setResult(res)
}}
         />
      }
      
         codeOneLineEx={`const subrelativePath = vsc.getSubrelativePathFromAbsoluteRootPath(path, absolutePathFromRoot, rootPath)`}
         codeEx={``}
         code={`/**
 * @description 
 * Transform an absolute path from root, to a sub-relative path.
 * @see http://vsc-base.org/#getSubrelativePathFromAbsoluteRootPath
 * @param path
 * @param rootPath
 * @param absolutePathFromRoot
 * @vscType Raw
 * @dependencyInternal splitPath, subtractPath, addLeadingLocalDash
 * @oneLineEx const subrelativePath = vsc.getSubrelativePathFromAbsoluteRootPath(path, absolutePathFromRoot, rootPath)
 * @testPrinterArgument
\{
   path: 'c:/root/module/file.ts',
   absolutePathFromRoot: 'module/submodule/file2',
   rootPath: 'c:/root'
}
 * @testPrinter (args, setResult) => \{
   const res = vsc.getSubrelativePathFromAbsoluteRootPath(args.path, args.absolutePathFromRoot, args.rootPath)
   setResult(res)
}
 * @returns string
 */
export const getSubrelativePathFromAbsoluteRootPath = (
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
}
`}
      />
   )
}

export default GetSubrelativePathFromAbsoluteRootPathAnnotatedCode

