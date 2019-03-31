import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'

const GetRootPathAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'getRootPath'}
         annotation={
            <>
               <p>Check is a path exists.</p>
            </>
         }
         codeEx={`const rootPath = getRootPath(path)`}
         code={`/**
 * Get project root for a path or undefined if no project was found.
 * @param path
 */
const getRootPath = (uri: vscode.Uri): string | undefined => {
   //const uri = vscode.Uri.parse(path)
   const workspaceFolder = vscode.workspace.getWorkspaceFolder(uri)
   if (!workspaceFolder) {
      return undefined
   }
   let rootPath = workspaceFolder.uri.fsPath
   rootPath = vsc.pathAsUnix(rottPath)
   return rootPath
}

`}
      />
   )
}

export default GetRootPathAnnotatedCode
