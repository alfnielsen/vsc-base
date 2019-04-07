import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base'



const GetRootPathAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'getRootPath'}
         annotation={
            <>
               <p>
                  Get project root for a path or undefined if no project was found.
               </p>
            </>
         }
         
         codeEx={`const rootPath = vsc.getRootPath()`}
         code={`export const getRootPath = (path: string): string | undefined => {
   const uri = vscode.Uri.file(path)
   const workspaceFolder = vscode.workspace.getWorkspaceFolder(uri)
   if (!workspaceFolder) {
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

