import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base'



const AwaitResultAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'awaitResult'}
         annotation={
            <>
               <p>
                  Ensure that a method result that optional can be a promise is awaited.
               </p>
               <p>
                (Responses from methods loaded with vsc.loadTsModule can be optional async!)
               </p>
            </>
         }
         
         codeEx={`await awaitResult(result)`}
         code={`export const awaitResult = async (result: any): Promise<any> => {
   if (result instanceof Promise) {
      return result
   } else {
      return new Promise(resolve => {
         resolve(result)
      })
   }
}
`}
      />
   )
}

export default AwaitResultAnnotatedCode

