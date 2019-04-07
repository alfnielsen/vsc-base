import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base'



const IsAbsolutePathAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'isAbsolutePath'}
         annotation={
            <>
               <p>
                  Does path start with charactor [a-zA-Z@] (not '/' or './' or '../')
               </p>
            </>
         }
         
         codeEx={`const isAbsolutePath = vsc.isAbsolutePath(path)`}
         code={`export const isAbsolutePath = (
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

