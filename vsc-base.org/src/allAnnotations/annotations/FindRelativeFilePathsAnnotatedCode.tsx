import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const FindRelativeFilePathsAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'findRelativeFilePaths'}
         title={'findRelativeFilePaths'}
         open={open}
         annotation={
            <>
               <p>
                  
Find files based from a relative to a path
               </p>
            </>
         }
         
         codeOneLineEx={`const files = await vsc.findRelativeFilePaths(path, relativePath, includePattern)`}
         codeEx={`
const moduleFileInParentFolder = await vsc.findRelativeFilePaths(path, '../', '*Module.ts')
if(moduleFileInParentFolder.length===0)\{
  vsc.showErrorMessage('Module file was not found in parent folder')
  return
}
if(moduleFileInParentFolder.length>1)\{
  vsc.showErrorMessage('More than one Module file was found in parent folder')
  return
}
const modulePath = moduleFileInParentFolder[0];
// Do something with modulePath..`}
         code={`/**
 * @param path,relativePath,includePattern,exclude,maxResults
 * @dependencyExternal vscode
 * @dependencyInternal getDir, joinPath, cleanPath, trimDashes, findFilePathsFromBase
 * @vscType Vscode
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
}`}
      />
   )
}

export default FindRelativeFilePathsAnnotatedCode

