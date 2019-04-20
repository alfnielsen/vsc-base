import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'


import * as vsc from '../vsc-base-raw'

import MethodTest from 'components/MethodTest/MethodTest'


const IsAbsolutePathAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'isAbsolutePath'}
         title={'isAbsolutePath'}
         open={open}
         annotation={
            <>
               <p>
                  
 Does path start with charactor [a-zA-Z@] 
               </p>
               <p>
                (not '/' or './' or '../')
               </p>
            </>
         }
         
      test={
         <MethodTest
            initialArgs={{
   path: 'some/path/to/file.ts'
}}
            onClickCall={(args, setResult) => {
   const res = vsc.isAbsolutePath(args.path)
   setResult(res?'true':'false')
}}
         />
      }
      
         codeOneLineEx={`const isAbsolutePath = vsc.isAbsolutePath(path)`}
         codeEx={``}
         code={`/**
 * @param path, startWithRegExp? If your project defines another definition of absolute path then overwrite this.
 * @vscType Raw
 * @returns boolean
 */
export const isAbsolutePath = (
   path: string,
   startWithRegExp = /^[a-zA-Z@]/
): boolean => \{
   return startWithRegExp.test(path)
}
`}
      />
   )
}

export default IsAbsolutePathAnnotatedCode

