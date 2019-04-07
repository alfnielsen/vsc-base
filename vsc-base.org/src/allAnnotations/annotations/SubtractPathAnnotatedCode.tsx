import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base'



const SubtractPathAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'subtractPath'}
         annotation={
            <>
               <p>
                  Remove parent-path from a path
               </p>
            </>
         }
         
         codeEx={`const newPath = vsc.subtractPath(path, parentPath)`}
         code={`export const subtractPath = (
   path: string,
   parentPath: string,
   _trimDashes = true
): string => {
   const regexp = new RegExp(\`^${parentPath}\`)
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

