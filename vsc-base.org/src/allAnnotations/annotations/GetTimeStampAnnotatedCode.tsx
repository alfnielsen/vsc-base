import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'


import * as vsc from '../vsc-base-raw'

import MethodTest from 'components/MethodTest/MethodTest'


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
         
      test={
         <MethodTest
            initialArgs={{
   trigger: 'write any!'
}}
            onClickCall={(args, setResult) => {
     const res = vsc.getTimestamp()
     setResult(res)
}}
         />
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

