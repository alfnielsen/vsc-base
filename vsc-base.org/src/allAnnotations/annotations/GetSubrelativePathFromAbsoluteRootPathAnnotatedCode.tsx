import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base'



const GetSubrelativePathFromAbsoluteRootPathAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'getSubrelativePathFromAbsoluteRootPath'}
         annotation={
            <>
               <p>
                  Transform an absolute path from root, to a sub-relative path.
               </p>
            </>
         }
         
         codeEx={`const subrelativePath = vsc.getSubrelativePathFromAbsoluteRootPath(path, absolutePathFromRoot, rootPath)`}
         code={`export const getSubrelativePathFromAbsoluteRootPath = (
   path: string,
   absolutePathFromRoot: string,
   rootPath: string
): string => {
   const [sourceDirPath] = vsc.splitPath(path)
   let sourceDirPathFromRoot = vsc.subtractPath(sourceDirPath, rootPath)
   sourceDirPathFromRoot = sourceDirPathFromRoot + '/'
   let absolutePathFromSourceDir = vsc.subtractPath(
      absolutePathFromRoot,
      sourceDirPathFromRoot
   )
   if (absolutePathFromSourceDir !== absolutePathFromRoot) {
      absolutePathFromSourceDir = vsc.addLeadingLocalDash(absolutePathFromSourceDir)
   }
   return absolutePathFromSourceDir
}
`}
      />
   )
}

export default GetSubrelativePathFromAbsoluteRootPathAnnotatedCode

