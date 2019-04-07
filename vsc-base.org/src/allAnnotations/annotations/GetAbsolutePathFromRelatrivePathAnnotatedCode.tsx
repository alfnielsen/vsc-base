import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const GetAbsolutePathFromRelatrivePathAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'getAbsolutePathFromRelatrivePath'}
         title={'getAbsolutePathFromRelatrivePath'}
         annotation={
            <>
               <p>
                  Transform a relative path to an abspolute path.
               </p>
            </>
         }
         
         codeOneLineEx={`const absolutePath = vsc.getAbsolutePathFromRelatrivePath(path, pathRelatriveToPath, rootPath)`}
         codeEx={``}
         code={`/**
 * Transform a relative path to an abspolute path.
 * @see http://vsc-base.org/#relatrivePathToAbsolutePath
 * @param path File from where the relative path begins
 * @param pathRelatriveToPath The relative path
 * @param rootPath The root path
 * @param realPathTest Test if the real  The root path
 * @dependencyInternal isAbsolutePath, splitPath, cleanPath, subtractPath, trimLeadingDash
 * @oneLineEx const absolutePath = vsc.getAbsolutePathFromRelatrivePath(path, pathRelatriveToPath, rootPath)
 * @returns string
 */
export const getAbsolutePathFromRelatrivePath = (
   path: string,
   pathRelatriveToPath: string,
   rootPath: string
): string => {
   if (vsc.isAbsolutePath(pathRelatriveToPath)) {
      return pathRelatriveToPath
   }
   let [dir] = vsc.splitPath(path)
   dir += '/'
   const relativePath = dir + pathRelatriveToPath
   let cleanRelativePath = vsc.cleanPath(relativePath)
   let absolutePathToRelative = vsc.subtractPath(cleanRelativePath, rootPath)
   absolutePathToRelative = vsc.trimLeadingDash(absolutePathToRelative)
   return absolutePathToRelative
}
`}
      />
   )
}

export default GetAbsolutePathFromRelatrivePathAnnotatedCode

