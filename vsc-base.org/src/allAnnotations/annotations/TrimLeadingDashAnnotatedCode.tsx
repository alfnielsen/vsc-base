import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base'



const TrimLeadingDashAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'trimLeadingDash'}
         annotation={
            <>
               <p>
                  Remove '/' from start of path
               </p>
            </>
         }
         
         codeEx={`const path = vsc.trimLeadingDash(foundPath)`}
         code={`export const trimLeadingDash = (path: string): string => {
   return path.replace(/^\//, '')
}`}
      />
   )
}

export default TrimLeadingDashAnnotatedCode

