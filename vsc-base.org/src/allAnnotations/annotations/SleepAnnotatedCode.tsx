import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'


import * as vsc from '../vsc-base-raw'

import MethodTest from 'components/MethodTest/MethodTest'


const SleepAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'sleep'}
         title={'sleep'}
         open={open}
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
         
      test={
         <MethodTest
            initialArgs={{
   ms: '2000'
}}
            onClickCall={(args, setResult) => {
    setResult('Start sleep...'+args.ms)
    const ms = parseInt(args.ms)
    vsc.sleep(ms).then(()=>{
      setResult('Done sleeping')
    })
}}
         />
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

