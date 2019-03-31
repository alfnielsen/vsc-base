import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base/vsc-base-raw'

import MethodTest from 'components/MethodTest/MethodTest'

const IsAbsolutePathAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'isAbsolutePath'}
         annotation={
            <>
               <p>This method test if a path is an absolute path.</p>
               <p>Test if the path start with charactor or @</p>
               <p />
               <p>startWithRegExp can be overwritten, if there is another definition of an absolute path.</p>
            </>
         }
         test={
            <MethodTest
               initialArgs={{
                  path: 'file.ts',
                  startWithRegExp: '^[a-zA-Z@]'
               }}
               onClickCall={(args, setResult) => {
                  const regexp = new RegExp(args.startWithRegExp)
                  const res = vsc.isAbsolutePath(args.path, regexp)
                  setResult(res.toString())
               }}
            />
         }
         codeEx={`const _isAbsolutePath = isAbsolutePath(path)`}
         code={`
/**
 * Does path start with charactor [a-zA-Z@] (not '/' or './' or '../')
 * @param path
 * @param startWithRegExp? If your project defines another definition of absolute path then overwrite this.
 */
const isAbsolutePath = (path: string, startWithRegExp = /^[a-zA-Z@]/): boolean => {
   return startWithRegExp.test(path)
}`}
      />
   )
}

export default IsAbsolutePathAnnotatedCode
