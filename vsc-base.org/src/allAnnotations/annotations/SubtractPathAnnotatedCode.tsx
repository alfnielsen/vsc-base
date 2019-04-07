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
 * Remove parent-path from a path
 * @see http://vsc-base.org/#subtractPath
 * @param path
 * @param parentPath
 * @param trimDashes default true
 * @dependencyInternal trimDashes
 * @oneLineEx const newPath = vsc.subtractPath(path, parentPath)
 * @returns string
 */
export const subtractPath = (
   path: string,
   parentPath: string,
   _trimDashes = true
): string => {
   const regexp = new RegExp(\`^\${parentPath}\`)
   let newPath = path.replace(regexp, '')
   if (trimDashes) {
      newPath = vsc.trimDashes(newPath)
   }
   return newPath
}
`}
      />
   )
}

export default SubtractPathAnnotatedCode

