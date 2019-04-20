import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const GetPackageFilePathsAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'getPackageFilePaths'}
         title={'getPackageFilePaths'}
         open={open}
         annotation={
            <>
               <p>
                  
 Find packages file paths in project.
               </p>
            </>
         }
         
         codeOneLineEx={`const packageFilePaths = await vsc.getPackageFilePaths()`}
         codeEx={``}
         code={`/**
 * @dependencyInternal findFilePaths
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

