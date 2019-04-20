import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const DoesExistsAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'doesExists'}
         title={'doesExists'}
         open={open}
         annotation={
            <>
               <p>
                  
 Does the folder/file exist
               </p>
            </>
         }
         
         codeOneLineEx={`const exist = vsc.doesExists(path)`}
         codeEx={``}
         code={`/**
 * @param path string
 * @dependencyExternal fs
 * @vscType System
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

