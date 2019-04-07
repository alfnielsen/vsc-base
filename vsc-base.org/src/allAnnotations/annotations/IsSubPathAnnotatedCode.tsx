import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base'



const IsSubPathAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'isSubPath'}
         annotation={
            <>
               <p>
                  Does subpath start with parentPath
               </p>
            </>
         }
         
         codeEx={`const isSubPath = vsc.isSubPath(path)`}
         code={`export const isSubPath = (subPath: string, parentPath: string): boolean => {
   parentPath = vsc.trimDashes(parentPath)
   const result = subPath.indexOf(parentPath + '/') === 0
   return result
}
`}
      />
   )
}

export default IsSubPathAnnotatedCode

