import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'

const GetPackageDependenciesAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'getPackageDependencies'}
         annotation={
            <>
               <p>Find roots packages and collect the dependencies and devDependencies</p>
            </>
         }
         codeEx={`const packageDependencies = await getPackageDependencies()`}
         code={`/**
 * Find roots packages and collect the dependencies and devDependencies.
 * Return as: {dependencies:{names:version}[], devDependencies:{names:version}[]}
 */
const getPackageDependencies = async (): Promise<{
   dependencies: { [key: string]: string }[]
   devDependencies: { [key: string]: string }[]
}> => {
   const packageFiles = await vscode.workspace.findFiles('**/package.json', '**/node_modules/**', 1000)
   const res = { dependencies: [], devDependencies: [] }
   for (let i = 0; i < packageFiles.length; i++) {
      const packageFile = packageFiles[i]
      const packageFileSource = await vsc.getFileContent(packageFile.fsPath)
      const packageJsonRoot = JSON.parse(packageFileSource)
      if (!packageJsonRoot) {
         continue
      }
      const dependencies = vsc.getJsonParts(packageJsonRoot, 'dependencies')
      const devDependencies = vsc.getJsonParts(packageJsonRoot, 'devDependencies')
      if (dependencies) {
         res.dependencies = { ...res.dependencies, ...dependencies }
      }
      if (devDependencies) {
         packageJsonRoot.devDependencies = { ...res.devDependencies, ...devDependencies }
      }
   }
   return res
}
`}
      />
   )
}

export default GetPackageDependenciesAnnotatedCode
