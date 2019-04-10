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
 * Remove '/' from start and end of path
 * @see http://vsc-base.org/#trimDashes
 * @param path
 * @vscType Raw
 * @oneLineEx const path = vsc.trimDashes(foundPath)
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

