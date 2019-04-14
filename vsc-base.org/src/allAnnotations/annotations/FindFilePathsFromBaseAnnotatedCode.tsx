import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const FindFilePathsFromBaseAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'findFilePathsFromBase'}
         title={'findFilePathsFromBase'}
         annotation={
            <>
               <p>
                  
 Get a list off all filePaths from a basePath, in project the matches a glob pattern
               </p>
            </>
         }
         
         codeOneLineEx={`const files = await vsc.findFilePathsFromBase(dir, includePattern)`}
         codeEx={`
const storyFilesInModule1 = await vsc.findFilePathsFromBase('c:/root/src/module1', '*.story.\{ts,tsx}')
for (const filePath of storyFilesInModule1)\{
   const source = await vsc.getFileContent()
   // Do something with filePath..
}`}
         code={`/**
 * @param include glob, exclude glob, maxResults
 * @dependencyExternal vscode
 * @dependencyInternal getDir, findFilePaths
 * @vscType Vscode
 * @returns Promise<string[]>
 */
export const findFilePathsFromBase = async (
   basePath: string,
   includePattern: string = '**/*.\{js,jsx,ts,tsx}',
   exclude: vscode.GlobPattern = '**/node_modules/**',
   maxResults: number = 100000
): Promise<string[]> => \{
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

