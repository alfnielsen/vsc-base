import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base/vsc-base-raw'

import MethodTest from 'components/MethodTest/MethodTest'

const SleepAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'sleep'}
         annotation={
            <>
               <p>This method creates a timeoute.</p>
               <p>Commonly used in debugging and test code.</p>
            </>
         }
         test={
            <MethodTest
               initialArgs={{
                  ms: '2000'
               }}
               onClickCall={(args, setResult) => {
                  setResult(`Waiting ${args.ms} miliseconds..`)
                  const time = parseInt(args.ms)
                  vsc.sleep(time).then(() => {
                     setResult('Finished')
                  })
               }}
            />
         }
         codeEx={`await sleep(2000)`}
         code={`/**
 * await wrap for setTimeout. Mostly used for debug asyc.
 * @param ms
 */
const sleep = async (ms: number): Promise<void> => {
   return new Promise(resolve => setTimeout(resolve, ms))
}

`}
      />
   )
}

export default SleepAnnotatedCode
