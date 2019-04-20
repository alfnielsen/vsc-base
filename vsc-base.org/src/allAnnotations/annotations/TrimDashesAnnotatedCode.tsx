import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'


import * as vsc from '../vsc-base-raw'

import MethodTest from 'components/MethodTest/MethodTest'


const TrimDashesAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'trimDashes'}
         title={'trimDashes'}
         open={open}
         annotation={
            <>
               <p>
                  
 Remove '/' from start and end of path
               </p>
            </>
         }
         
      test={
         <MethodTest
            initialArgs={{
   path: '/root/area/module/'
}}
            onClickCall={(args, setResult) => {
     const res = vsc.trimDashes(args.path)
     setResult(res)
}}
         />
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

