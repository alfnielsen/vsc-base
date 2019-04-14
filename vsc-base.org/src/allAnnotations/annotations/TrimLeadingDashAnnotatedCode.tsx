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
                  
 Remove '/' from start of path
               </p>
            </>
         }
         
         codeOneLineEx={`const path = vsc.trimLeadingDash(foundPath)`}
         codeEx={``}
         code={`/**
 * @param path
 * @vscType Raw
 * @returns string
 */
export const trimLeadingDash = (path: string): string => \{
   return path.replace(/^\\//, '')
}`}
      />
   )
}

export default TrimLeadingDashAnnotatedCode

