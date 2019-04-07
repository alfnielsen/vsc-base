import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base'



const GetAbsolutePathFromRelatrivePathAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'getAbsolutePathFromRelatrivePath'}
         annotation={
            <>
               <p>
                  Transform a relative path to an abspolute path.
               </p>
            </>
         }
         
         codeEx={`const absolutePath = vsc.getAbsolutePathFromRelatrivePath(path, pathRelatriveToPath, rootPath)`}
         code={`export const getAbsolutePathFromRelatrivePath = (
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

