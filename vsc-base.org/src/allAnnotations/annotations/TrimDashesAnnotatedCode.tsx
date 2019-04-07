import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base'



const TrimDashesAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'trimDashes'}
         annotation={
            <>
               <p>
                  Remove '/' from start and end of path
               </p>
            </>
         }
         
         codeEx={`const path = trimDashes(foundPath)`}
         code={`export const trimDashes = (path: string): string => {
   return path.replace(/(^\/|\/$)/g, '')
}
`}
      />
   )
}

export default TrimDashesAnnotatedCode

