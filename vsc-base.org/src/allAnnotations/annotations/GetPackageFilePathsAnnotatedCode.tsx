import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const GetPackageFilePathsAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'getPackageFilePaths'}
         title={'getPackageFilePaths'}
         annotation={
            <>
               <p>
                  
               </p>
               <p>
                Find packages file paths in project.
               </p>
            </>
         }
         
         codeOneLineEx={`const packageFilePaths = await vsc.getPackageFilePaths()`}
         codeEx={``}
         code={`/**
 * @description 
 * Find packages file paths in project.
 * @see http://vsc-base.org/#getPackageFilePaths
 * @dependencyInternal findFilePaths
 * @oneLineEx const packageFilePaths = await vsc.getPackageFilePaths()
 * @returns Promise<string[]>
 */
export const getPackageFilePaths = async (): Promise<string[]> => \{
   const packageFiles = await vsc.findFilePaths('**/package.json')
   return packageFiles
}
`}
      />
   )
}

export default GetPackageFilePathsAnnotatedCode

