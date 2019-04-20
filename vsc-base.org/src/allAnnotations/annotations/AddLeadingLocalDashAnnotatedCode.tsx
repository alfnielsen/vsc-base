import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'


import * as vsc from '../vsc-base-raw'

import MethodTest from 'components/MethodTest/MethodTest'


const AddLeadingLocalDashAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'addLeadingLocalDash'}
         title={'addLeadingLocalDash'}
         open={open}
         annotation={
            <>
               <p>
                  
 Add './' to start of path
               </p>
            </>
         }
         
      test={
         <MethodTest
            initialArgs={{
   path: 'file.ts',
}}
            onClickCall={(args, setResult) => {
   const res = vsc.addLeadingLocalDash(args.path)
   setResult(res)
}}
         />
      }
      
         codeOneLineEx={`const path = vsc.addLeadingLocalDash(path)`}
         codeEx={``}
         code={`/**
 * @param path
 * @vscType Raw
 * @returns string
 */
export const addLeadingLocalDash = (path: string): string => \{
   return './' + path
}


`}
      />
   )
}

export default AddLeadingLocalDashAnnotatedCode

