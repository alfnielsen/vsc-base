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
                  
 Add './' to start of path
               </p>
            </>
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

