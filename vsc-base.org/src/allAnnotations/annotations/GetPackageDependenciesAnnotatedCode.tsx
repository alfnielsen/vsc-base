import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const GetPackageDependenciesAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'getPackageDependencies'}
         title={'getPackageDependencies'}
         annotation={
            <>
               <p>
                  
 Find package.json files and collect the dependencies and devDependencies.
               </p>
            </>
         }
         
         codeOneLineEx={`const [dependencies, devDependencies] = await vsc.getPackageDependencies()`}
         codeEx={``}
         code={`/**
 * @dependencyInternal getPackageFilePaths, getJsonContent, getJsonParts
 * @vscType System
 * @todo Use unknow guard check instead of any casting
 * @returns Promise<\{ [key: string]: string }[]
 */
export const getPackageDependencies = async (): Promise<
   \{ [key: string]: string }[]
> => \{
   let dependencies: \{ [k: string]: string } = \{}
   let devDependencies: \{ [k: string]: string } = \{}
   const packageFilePaths = await vsc.getPackageFilePaths()
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
}
`}
      />
   )
}

export default GetPackageDependenciesAnnotatedCode

