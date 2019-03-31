import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base/vsc-base-raw'

import MethodTest from 'components/MethodTest/MethodTest'

const TrimDashesAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'trimDashes'}
         annotation={
            <>
               <p>Trim dashes '/' from start and end of path.</p>
            </>
         }
         test={
            <MethodTest
               initialArgs={{
                  path: '/folder/subfolder/'
               }}
               onClickCall={(args, setResult) => {
                  const res = vsc.trimDashes(args.path)
                  setResult(res)
               }}
            />
         }
         codeEx={`const path = trimDashes(foundPath)`}
         code={`/**
 * Remove '/' from start and end of path
 * @param path
 */
const trimDashes = (path: string): string => {
   return path.replace(/(^\/|\/$)/g, '')
}

`}
      />
   )
}

export default TrimDashesAnnotatedCode
