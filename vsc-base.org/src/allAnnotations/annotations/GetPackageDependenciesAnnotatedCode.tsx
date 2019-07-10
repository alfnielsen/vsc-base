import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const GetPackageDependenciesAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'getPackageDependencies'}
         title={'getPackageDependencies'}
         open={open}
         annotation={
            <>
               <p>
                  
Find package.json files and collect the dependencies and devDependencies.
Take an optional 'exclude' which is an exclude pattern for the underlying <a href='http://vsc-base.org/#findFilePaths'>findFilePaths</a> / <a href='http://vsc-base.org/#getPackageFilePaths'>getPackageFilePaths</a> 
               </p>
               <p>
               It can be used to control which package.json files should be included.
               </p>
            </>
         }
         
         codeOneLineEx={`const [dependencies, devDependencies] = await vsc.getPackageDependencies()`}
         codeEx={``}
         code={`/**
 * @dependencyInternal getPackageFilePaths, getJsonContent, getJsonParts
 * @vscType System
 * @todo Use unknown guard check instead of any casting
 * @returns Promise<\{ [key: string]: string }[]
 */
export const getPackageDependencies = async (
   exclude = '**/\{node_modules,.vscode-test}/**'
): Promise<
   \{ [key: string]: string }[]
> => \{
   let dependencies: \{ [k: string]: string } = \{}
   let devDependencies: \{ [k: string]: string } = \{}
   const packageFilePaths = await vsc.getPackageFilePaths(exclude)
   for (let i = 0; i < packageFilePaths.length; i++) \{
      const packageFile = packageFilePaths[i]
      const packageJson = await vsc.getJsonContent<\{
         dependencies: \{ [key: string]: string },
         devDependencies: \{ [key: string]: string }
      }>(packageFile)
      if (!packageJson) \{
         continue
      }
      const packageDependencies = vsc.getJsonParts<\{ [k: string]: string }>(packageJson, 'dependencies')
      const packageDevDependencies = vsc.getJsonParts<\{ [k: string]: string }>(packageJson, 'devDependencies')
      if (packageDependencies) \{
         dependencies = \{ ...dependencies, ...packageDependencies }
      }
      if (packageDevDependencies) \{
         devDependencies = \{ ...devDependencies, ...packageDevDependencies }
      }
   }
   return [dependencies, devDependencies]
}`}
      />
   )
}

export default GetPackageDependenciesAnnotatedCode

