import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base'



const AddLeadingLocalDashAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'addLeadingLocalDash'}
         annotation={
            <>
               <p>
                  Add './' to start of path
               </p>
            </>
         }
         
         codeEx={`path = vsc.addLeadingLocalDash(path)`}
         code={`export const addLeadingLocalDash = (path: string): string => {
   return './' + path
}
`}
      />
   )
}

export default AddLeadingLocalDashAnnotatedCode

