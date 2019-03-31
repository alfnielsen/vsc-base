import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'

const DoesExistsAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'doesExists'}
         annotation={
            <>
               <p>Check is a path exists.</p>
            </>
         }
         codeEx={`const exists = doesExists(doesExists)`}
         code={`/**
 * Does the folder/file exist
 * @param path string
 */
const doesExists = (path: string): boolean => {
   return fs.existsSync(path)
}

`}
      />
   )
}

export default DoesExistsAnnotatedCode
