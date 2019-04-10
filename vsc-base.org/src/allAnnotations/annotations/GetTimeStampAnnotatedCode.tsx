import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const GetTimestampAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'getTimestamp'}
         title={'getTimestamp'}
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
 * @vscType Raw
 * @oneLineEx const timestamp = vsc.getTimeStamp()
 * @returns string
 */
export const getTimestamp = (): string => \{
   return new Date().toISOString()
}`}
      />
   )
}

export default GetTimestampAnnotatedCode

