import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const FindRelativeFilePathsAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'findRelativeFilePaths'}
         title={'findRelativeFilePaths'}
         annotation={
            <>
               <p>
                  Find files based from a releative to a path
               </p>
            </>
         }
         
         codeOneLineEx={`const files = await vsc.findRelativeFilePaths(path, relativePath, includePattern)`}
         codeEx={`
const moduleFileInParentFolder = await vsc.findRelativeFilePaths(path, '../', '*Module.ts')
if(moduleFileInParentFolder.lenght===0)\{
   vsc.showErrorMessage('Module file was not found in parent folder')
   return
}
if(moduleFileInParentFolder.lenght>1)\{
   vsc.showErrorMessage('More than one Module file was found in parent folder')
   return
}
const modulePath = moduleFileInParentFolder[0];
// Do something with modulePath..`}
         code={`/**
 * Find files based from a releative to a path
 * @see http://vsc-base.org/#findRelativeFilePaths
 * @param path
 * @param relativePath
 * @param includePattern
 * @param exclude
 * @param maxResults
 * @dependencyExternal vscode
 * @dependencyInternal getDir, joinPath, cleanPath, trimDases, findFilePathsFromBase
 * @vscType Vscode
 * @oneLineEx const files = await vsc.findRelativeFilePaths(path, relativePath, includePattern)
 * @ex 
const moduleFileInParentFolder = await vsc.findRelativeFilePaths(path, '../', '*Module.ts')
if(moduleFileInParentFolder.lenght===0)\{
   vsc.showErrorMessage('Module file was not found in parent folder')
   return
}
if(moduleFileInParentFolder.lenght>1)\{
   vsc.showErrorMessage('More than one Module file was found in parent folder')
   return
}
const modulePath = moduleFileInParentFolder[0];
// Do something with modulePath..
 * @returns Promise<string[]>
 */
export const findRelativeFilePaths = async (
   path: string,
   relativePath: string,
   includePattern: string = '**/*.\{js,jsx,ts,tsx}',
   exclude: vscode.GlobPattern = '**/node_modules/**',
   maxResults: number = 100000
): Promise<string[]> => \{
   const dir = vsc.getDir(path)
   const joinPath = vsc.joinPaths(dir, relativePath)
   let base = vsc.cleanPath(joinPath + '/')
   base = vsc.trimDashes(base)
   const filePaths = await findFilePathsFromBase(
      base,
      includePattern,
      exclude,
      maxResults
   )
   return filePaths
}
`}
      />
   )
}

export default FindRelativeFilePathsAnnotatedCode

