import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const GetRootPathAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'getRootPath'}
         title={'getRootPath'}
         annotation={
            <>
               <p>
                  
 Get project root for a path or undefined if no project was found.
               </p>
            </>
         }
         
         codeOneLineEx={`const rootPath = vsc.getRootPath()`}
         codeEx={``}
         code={`/**
 * @description 
 * Get project root for a path or undefined if no project was found.
 * @see http://vsc-base.org/#getRootPath
 * @param path
 * @dependencyExternal vscode
 * @dependencyInternal pathAsUnix
 * @vscType Vscode
 * @oneLineEx const rootPath = vsc.getRootPath()
 * @returns string | undefined
 */
export const getRootPath = (path: string): string | undefined => \{
   const uri = vscode.Uri.file(path)
   const workspaceFolder = vscode.workspace.getWorkspaceFolder(uri)
   if (!workspaceFolder) \{
      return undefined
   }
   let rootPath = workspaceFolder.uri.fsPath
   rootPath = vsc.pathAsUnix(rootPath)
   return rootPath
}
`}
      />
   )
}

export default GetRootPathAnnotatedCode

