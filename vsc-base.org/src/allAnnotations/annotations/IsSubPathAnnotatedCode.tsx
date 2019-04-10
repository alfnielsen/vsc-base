import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const IsSubPathAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'isSubPath'}
         title={'isSubPath'}
         annotation={
            <>
               <p>
                  Does subpath start with parentPath
               </p>
            </>
         }
         
         codeOneLineEx={`const isSubPath = vsc.isSubPath(path)`}
         codeEx={``}
         code={`/**
 * Does subpath start with parentPath
 * @see http://vsc-base.org/#isSubPath
 * @param path
 * @param parentPath
 * @dependencyInternal trimDashes
 * @vscType Raw
 * @oneLineEx const isSubPath = vsc.isSubPath(path)
 * @returns boolean
 */
export const isSubPath = (subPath: string, parentPath: string): boolean => \{
   parentPath = vsc.trimDashes(parentPath)
   const result = subPath.indexOf(parentPath + '/') === 0
   return result
}
`}
      />
   )
}

export default IsSubPathAnnotatedCode

