import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const SleepAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'sleep'}
         title={'sleep'}
         annotation={
            <>
               <p>
                  
 await wrap for setTimeout. 
               </p>
               <p>
                Mostly used for debug asyc.
               </p>
            </>
         }
         
         codeOneLineEx={`await vsc.sleep(2000)`}
         codeEx={``}
         code={`/**
 * @param ms
 * @vscType Raw
 * @async async
 * @returns Promise<void>
 */
export const sleep = async (ms: number): Promise<void> => \{
   return new Promise(resolve => setTimeout(resolve, ms))
}
`}
      />
   )
}

export default SleepAnnotatedCode

