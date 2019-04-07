import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const IsAbsolutePathAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'isAbsolutePath'}
         title={'isAbsolutePath'}
         annotation={
            <>
               <p>
                  Does path start with charactor [a-zA-Z@] (not '/' or './' or '../')
               </p>
            </>
         }
         
         codeOneLineEx={`const isAbsolutePath = vsc.isAbsolutePath(path)`}
         codeEx={``}
         code={`/**
 * Does path start with charactor [a-zA-Z@] (not '/' or './' or '../')
 * @see http://vsc-base.org/#isAbsolutePath
 * @param path
 * @param startWithRegExp? If your project defines another definition of absolute path then overwrite this.
 * @oneLineEx const isAbsolutePath = vsc.isAbsolutePath(path)
 * @returns boolean
 */
export const isAbsolutePath = (
   path: string,
   startWithRegExp = /^[a-zA-Z@]/
): boolean => {
   return startWithRegExp.test(path)
}
`}
      />
   )
}

export default IsAbsolutePathAnnotatedCode

