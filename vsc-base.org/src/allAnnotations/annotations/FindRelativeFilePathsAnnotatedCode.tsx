import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base'



const FindRelativeFilePathsAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'findRelativeFilePaths'}
         annotation={
            <>
               <p>
                  Find files based from a releative to a path
               </p>
            </>
         }
         
         codeEx={`const files = await vsc.findRelativeFilePaths(path, relativePath, includePattern)`}
         code={`export const findRelativeFilePaths = async (
   path: string,
   relativePath: string,
   includePattern: string = '**/*.{js,jsx,ts,tsx}',
   exclude: vscode.GlobPattern = '**/node_modules/**',
   maxResults: number = 100000
): Promise<string[]> => {
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

