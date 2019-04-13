import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TrimLeadingDashAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'trimLeadingDash'}
         title={'trimLeadingDash'}
         annotation={
            <>
               <p>
                  
               </p>
               <p>
                Remove '/' from start of path
               </p>
            </>
         }
         
         codeOneLineEx={`const path = vsc.trimLeadingDash(foundPath)`}
         codeEx={``}
         code={`/**
 * @description 
 * Remove '/' from start of path
 * @see http://vsc-base.org/#trimLeadingDash
 * @param path
 * @vscType Raw
 * @oneLineEx const path = vsc.trimLeadingDash(foundPath)
 * @returns string
 */
export const trimLeadingDash = (path: string): string => \{
   return path.replace(/^\\//, '')
}`}
      />
   )
}

export default TrimLeadingDashAnnotatedCode

