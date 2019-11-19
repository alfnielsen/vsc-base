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
                  
Find package.json file paths in project. /
Take an optional &#039;exclude&#039; which is an exclude pattern for the underlying <a href='http://vsc-base.org/#findFilePaths'>findFilePaths</a> 
               </p>
               <p>
               It can be used to control which package.json files should be included.
               </p>
            </>
         }
         
         codeOneLineEx={`const packageFilePaths = await vsc.getPackageFilePaths()`}
         codeEx={``}
         code={`/**
 * @dependencyInternal findFilePaths
 * @vscType System
 * @returns Promise<string[]>
 */
export const getPackageFilePaths = async (
   exclude = '**/\{node_modules,.vscode-test}/**'
): Promise<string[]> => \{
   const packageFiles = await vsc.findFilePaths('**/package.json', exclude)
   return packageFiles
}`}
      />
   )
}

export default GetPackageFilePathsAnnotatedCode

