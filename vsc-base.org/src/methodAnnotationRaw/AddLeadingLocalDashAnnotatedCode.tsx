import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base/vsc-base-raw'

import MethodTest from 'components/MethodTest/MethodTest'

const AddLeadingLocalDashAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'addLeadingLocalDash'}
         annotation={
            <>
               <p>This method add local ref './' start to a path.</p>
            </>
         }
         test={
            <MethodTest
               initialArgs={{
                  path: 'file.ts'
               }}
               onClickCall={(args, setResult) => {
                  const res = vsc.addLeadingLocalDash(args.path)
                  setResult(res)
               }}
            />
         }
         codeEx={`const subPath = addLeadingLocalDash(path)`}
         code={`/**
 * Add './' to start of path
 * @param path
 */
const addLeadingLocalDash = (path: string): string => {
   return './' + path
}
`}
      />
   )
}

export default AddLeadingLocalDashAnnotatedCode
