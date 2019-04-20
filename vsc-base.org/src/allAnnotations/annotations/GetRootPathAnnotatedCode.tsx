import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const GetRootPathAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'getRootPath'}
         title={'getRootPath'}
         open={open}
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
 * @param path
 * @dependencyExternal vscode
 * @dependencyInternal pathAsUnix
 * @vscType Vscode
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

