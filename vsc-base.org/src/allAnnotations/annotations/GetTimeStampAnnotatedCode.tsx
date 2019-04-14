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
         
         codeOneLineEx={`const timestamp = vsc.getTimestamp()`}
         codeEx={``}
         code={`/**
 * @vscType Raw
 * @returns string
 */
export const getTimestamp = (): string => \{
   return new Date().toISOString()
}
`}
      />
   )
}

export default GetTimestampAnnotatedCode

