import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const DoesExistsAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'doesExists'}
         title={'doesExists'}
         annotation={
            <>
               <p>
                  
               </p>
               <p>
                Does the folder/file exist
               </p>
            </>
         }
         
         codeOneLineEx={`const exist = vsc.doesExists(path)`}
         codeEx={``}
         code={`/**
 * @description 
 * Does the folder/file exist
 * @see http://vsc-base.org/#doesExists
 * @param path string
 * @dependencyExternal fs
 * @vscType System
 * @oneLineEx const exist = vsc.doesExists(path)
 * @returns boolean
 */
export const doesExists = (path: string): boolean => \{
   return fs.existsSync(path)
}
`}
      />
   )
}

export default DoesExistsAnnotatedCode

