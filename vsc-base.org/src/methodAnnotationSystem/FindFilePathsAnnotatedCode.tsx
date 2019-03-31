import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'

const FindFilePathsAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'findFilePaths'}
         annotation={
            <>
               <p>Get a list off all filePaths in project the matches a glob pattern.</p>
            </>
         }
         codeEx={`const files = await findFilePaths('**/*.js')`}
         code={`/**
 * Get a list off all filePaths in project the matches a glob pattern.
 * (system save returns)
 * @param include glob
 * @param exclude glob
 * @param maxResults
 */
const findFilePaths = async (
   include: vscode.GlobPattern,
   exclude: vscode.GlobPattern = '**/node_modules/**',
   maxResults: number = 100000
): Promise<string[]> => {
   const uriFiles = await vscode.workspace.findFiles(include, exclude, maxResults)
   const files = uriFiles.map(uri => vsc.pathAsUnix(uri.fsPath))
   return files
}

`}
      />
   )
}

export default FindFilePathsAnnotatedCode
