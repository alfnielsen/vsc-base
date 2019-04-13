import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const AddLeadingLocalDashAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'addLeadingLocalDash'}
         title={'addLeadingLocalDash'}
         annotation={
            <>
               <p>
                  
               </p>
               <p>
                Add './' to start of path
               </p>
            </>
         }
         
         codeOneLineEx={`const path = vsc.addLeadingLocalDash(path)`}
         codeEx={``}
         code={`/**
 * @description 
 * Add './' to start of path
 * @see http://vsc-base.org/#addLeadingLocalDash
 * @param path
 * @vscType Raw
 * @oneLineEx const path = vsc.addLeadingLocalDash(path)
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

