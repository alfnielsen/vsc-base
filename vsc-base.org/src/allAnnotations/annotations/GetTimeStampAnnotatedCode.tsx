import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base'



const GetTimeStampAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'getTimeStamp'}
         annotation={
            <>
               <p>
                  return ISO timestamp
               </p>
            </>
         }
         
         codeEx={`const timestamp = vsc.getTimeStamp()`}
         code={`export const getTimeStamp = (): string => {
   return new Date().toISOString()
}`}
      />
   )
}

export default GetTimeStampAnnotatedCode

