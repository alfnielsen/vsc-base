import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TrimDashesAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'trimDashes'}
         title={'trimDashes'}
         annotation={
            <>
               <p>
                  
 Remove '/' from start and end of path
               </p>
            </>
         }
         
         codeOneLineEx={`const path = vsc.trimDashes(foundPath)`}
         codeEx={``}
         code={`/**
 * @param path
 * @vscType Raw
 * @returns string
 */
export const trimDashes = (path: string): string => \{
   return path.replace(/(^\\/|\\/\$)/g, '')
}
`}
      />
   )
}

export default TrimDashesAnnotatedCode

