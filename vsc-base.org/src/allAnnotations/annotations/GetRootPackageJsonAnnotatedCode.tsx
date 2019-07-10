import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const GetRootPackageJsonAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'getRootPackageJson'}
         title={'getRootPackageJson'}
         open={open}
         annotation={
            <>
               <p>
                  
Get json from package.json in the project root.
               </p>
            </>
         }
         
         codeOneLineEx={`const packageJson = await vsc.getRootPackageJson(rootPath)`}
         codeEx={``}
         code={`/**
 * @dependencyInternal findFilePaths
 * @vscType System
 * @returns Promise<T = any>
 */
export const getRootPackageJson = async <T = any>(
   rootPath: string
): Promise<T> => \{
   const packageJsonPath = vsc.joinPaths(rootPath, 'package.json')
   const packageJson = await vsc.getJsonContent<T>(packageJsonPath)
   return packageJson
}`}
      />
   )
}

export default GetRootPackageJsonAnnotatedCode

