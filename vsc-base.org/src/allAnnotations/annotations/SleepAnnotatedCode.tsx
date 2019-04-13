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
                  
               </p>
               <p>
                await wrap for setTimeout. \
 Mostly used for debug asyc.
               </p>
            </>
         }
         
         codeOneLineEx={`await vsc.sleep(2000)`}
         codeEx={``}
         code={`/**
 * @description 
 * await wrap for setTimeout. \\
 * Mostly used for debug asyc.
 * @see http://vsc-base.org/#sleep
 * @param ms
 * @oneLineEx await vsc.sleep(2000)
 * @vscType Raw
 * @async
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

