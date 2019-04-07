import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base'



const FindFilePathsFromBaseAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'findFilePathsFromBase'}
         annotation={
            <>
               <p>
                  Get a list off all filePaths from a basePath, in project the matches a glob pattern
               </p>
            </>
         }
         
         codeEx={`const files = await vsc.findFilePathsFromBase(dir, includePattern)`}
         code={`export const findFilePathsFromBase = async (
   basePath: string,
   includePattern: string = '**/*.{js,jsx,ts,tsx}',
   exclude: vscode.GlobPattern = '**/node_modules/**',
   maxResults: number = 100000
): Promise<string[]> => {
   let baseDir = vsc.getDir(basePath)
   const include = new vscode.RelativePattern(baseDir, includePattern)
   const filePaths = await vsc.findFilePaths(include, exclude, maxResults)
   return filePaths
}
`}
      />
   )
}

export default FindFilePathsFromBaseAnnotatedCode

