import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base/vsc-base-raw'

import MethodTest from 'components/MethodTest/MethodTest'

const TrimLeadingDashAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'trimLeadingDash'}
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
                  const res = vsc.trimLeadingDash(args.path)
                  setResult(res)
               }}
            />
         }
         codeEx={`const path = trimLeadingDash(foundPath)`}
         code={`/**
 * Remove '/' from start of path
 * @param path
 */
const trimLeadingDash = (path: string): string => {
   return path.replace(/^\//, '')
}
`}
      />
   )
}

export default TrimLeadingDashAnnotatedCode
