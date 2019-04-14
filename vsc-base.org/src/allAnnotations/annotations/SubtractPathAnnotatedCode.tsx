import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const SubtractPathAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'subtractPath'}
         title={'subtractPath'}
         annotation={
            <>
               <p>
                  
 Remove parent-path from a path
               </p>
            </>
         }
         
         codeOneLineEx={`const newPath = vsc.subtractPath(path, parentPath)`}
         codeEx={``}
         code={`/**
 * @param path, parentPath, trimDashes default true
 * @dependencyInternal trimDashes
 * @vscType Raw
 * @returns string
 */
export const subtractPath = (
   path: string,
   parentPath: string,
   _trimDashes = true
): string => \{
   const regexp = new RegExp(\`^\$\{parentPath}\`)
   let newPath = path.replace(regexp, '')
   if (trimDashes) \{
      newPath = vsc.trimDashes(newPath)
   }
   return newPath
}
`}
      />
   )
}

export default SubtractPathAnnotatedCode

