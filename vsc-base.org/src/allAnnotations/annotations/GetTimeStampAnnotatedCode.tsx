import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const GetTimeStampAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'getTimeStamp'}
         title={'getTimeStamp'}
         annotation={
            <>
               <p>
                  return ISO timestamp
               </p>
            </>
         }
         
         codeOneLineEx={`const timestamp = vsc.getTimeStamp()`}
         codeEx={``}
         code={`/**
 * return ISO timestamp
 * @see http://vsc-base.org/#getTimeStamp
 * @oneLineEx const timestamp = vsc.getTimeStamp()
 * @returns string
 */
export const getTimeStamp = (): string => {
   return new Date().toISOString()
}`}
      />
   )
}

export default GetTimeStampAnnotatedCode

