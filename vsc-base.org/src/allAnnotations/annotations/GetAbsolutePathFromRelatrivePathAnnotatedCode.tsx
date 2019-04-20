import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'


import * as vsc from '../vsc-base-raw'

import MethodTest from 'components/MethodTest/MethodTest'


const GetAbsolutePathFromRelatrivePathAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'getAbsolutePathFromRelatrivePath'}
         title={'getAbsolutePathFromRelatrivePath'}
         open={open}
         annotation={
            <>
               <p>
                  
 Transform a relative path to an abspolute path.
               </p>
            </>
         }
         
      test={
         <MethodTest
            initialArgs={{
   path: 'c:/root/area/module1/file.ts',
   pathRelatriveToPath: '../module2/file2.ts',
   rootPath: 'c:/root'
}}
            onClickCall={(args, setResult) => {
     const res = vsc.getAbsolutePathFromRelatrivePath(args.path, args.pathRelatriveToPath, args.rootPath)
     setResult(res)
}}
         />
      }
      
         codeOneLineEx={`const absolutePath = vsc.getAbsolutePathFromRelatrivePath(path, pathRelatriveToPath, rootPath)`}
         codeEx={``}
         code={`/**
 * @param path File from where the relative path begins, pathRelatriveToPath The relative path, rootPath The root path, realPathTest Test if the real  The root path
 * @vscType Raw
 * @dependencyInternal isAbsolutePath, splitPath, cleanPath, subtractPath, trimLeadingDash
 * @returns string
 */
export const getAbsolutePathFromRelatrivePath = (
   path: string,
   pathRelatriveToPath: string,
   rootPath: string
): string => \{
   if (vsc.isAbsolutePath(pathRelatriveToPath)) \{
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

