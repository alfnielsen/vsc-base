import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base'



const GetPackageFilePathsAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'getPackageFilePaths'}
         annotation={
            <>
               <p>
                  Find packages file paths in project.
               </p>
            </>
         }
         
         codeEx={`const packageFilePaths = await vsc.getPackageFilePaths()`}
         code={`export const getPackageFilePaths = async (): Promise<string[]> => {
   const packageFiles = await vsc.findFilePaths('**/package.json')
   return packageFiles
}
`}
      />
   )
}

export default GetPackageFilePathsAnnotatedCode

