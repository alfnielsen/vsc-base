import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base'



const FindFilePathsAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'findFilePaths'}
         annotation={
            <>
               <p>
                  Get a list off all filePaths in project the matches a glob pattern
               </p>
            </>
         }
         
         codeEx={`const files = await vsc.findFilePaths(includePattern)`}
         code={`export const findFilePaths = async (
   include: vscode.GlobPattern = '**/*.{js,jsx,ts,tsx}',
   exclude: vscode.GlobPattern = '**/node_modules/**',
   maxResults: number = 100000
): Promise<string[]> => {
   const uriFiles = await vscode.workspace.findFiles(
      include,
      exclude,
      maxResults
   )
   const files = uriFiles.map((uri: vscode.Uri) => vsc.pathAsUnix(uri.fsPath))
   return files
}
`}
      />
   )
}

export default FindFilePathsAnnotatedCode

