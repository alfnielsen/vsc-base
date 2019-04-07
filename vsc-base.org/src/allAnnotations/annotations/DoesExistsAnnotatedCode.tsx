import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base'



const DoesExistsAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'doesExists'}
         annotation={
            <>
               <p>
                  Does the folder/file exist
               </p>
            </>
         }
         
         codeEx={`const exist = vsc.doesExists(path)`}
         code={`export const doesExists = (path: string): boolean => {
   return fs.existsSync(path)
}
`}
      />
   )
}

export default DoesExistsAnnotatedCode

