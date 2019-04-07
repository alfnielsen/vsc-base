import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base'



const SleepAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'sleep'}
         annotation={
            <>
               <p>
                  await wrap for setTimeout. Mostly used for debug asyc.
               </p>
            </>
         }
         
         codeEx={`await vs.sleep(2000)`}
         code={`export const sleep = async (ms: number): Promise<void> => {
   return new Promise(resolve => setTimeout(resolve, ms))
}
`}
      />
   )
}

export default SleepAnnotatedCode

