import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'


import * as vsc from '../vsc-base-raw'

import MethodTest from 'components/MethodTest/MethodTest'


const GetAbsolutePathFromRelativePathAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'getAbsolutePathFromRelativePath'}
         title={'getAbsolutePathFromRelativePath'}
         open={open}
         annotation={
            <>
               <p>
                  
Transform a relative path to an absolute path.
               </p>
            </>
         }
         
      test={
         <MethodTest
            initialArgs={{
   path: 'c:/root/area/module1/file.ts',
   pathRelativeToPath: '../module2/file2.ts',
   rootPath: 'c:/root'
}}
            onClickCall={(args, setResult) => {
     const res = vsc.getAbsolutePathFromRelativePath(args.path, args.pathRelativeToPath, args.rootPath)
     setResult(res)
}}
         />
      }
      
         codeOneLineEx={`const absolutePath = vsc.getAbsolutePathFromRelativePath(path, pathRelativeToPath, rootPath)`}
         codeEx={``}
         code={`/**
 * @param path File from where the relative path begins,pathRelativeToPath The relative path,rootPath The root path,realPathTest Test if the real  The root path
 * @vscType Raw
 * @dependencyInternal isAbsolutePath, splitPath, cleanPath, subtractPath, trimLeadingDash
 * @returns string
 */
export const getAbsolutePathFromRelativePath = (
   path: string,
   pathRelativeToPath: string,
   rootPath: string
): string => \{
   if (vsc.isAbsolutePath(pathRelativeToPath)) \{
      return pathRelativeToPath
   }
   let [dir] = vsc.splitPath(path)
   dir += '/'
   const relativePath = dir + pathRelativeToPath
   let cleanRelativePath = vsc.cleanPath(relativePath)
   let absolutePathToRelative = vsc.subtractPath(cleanRelativePath, rootPath)
   absolutePathToRelative = vsc.trimLeadingDash(absolutePathToRelative)
   return absolutePathToRelative
}`}
      />
   )
}

export default GetAbsolutePathFromRelativePathAnnotatedCode

