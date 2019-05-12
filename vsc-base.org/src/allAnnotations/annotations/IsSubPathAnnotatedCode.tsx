import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'


import * as vsc from '../vsc-base-raw'

import MethodTest from 'components/MethodTest/MethodTest'


const IsSubPathAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'isSubPath'}
         title={'isSubPath'}
         open={open}
         annotation={
            <>
               <p>
                  
 Does sub-path start with parentPath
               </p>
            </>
         }
         
      test={
         <MethodTest
            initialArgs={{
   subPath: 'c:/root/area/module1/file.ts',
   parentPath: 'c:/root/area'
}}
            onClickCall={(args, setResult) => {
     const res = vsc.isSubPath(args.subPath, args.parentPath)
   setResult(res?'true':'false')
}}
         />
      }
      
         codeOneLineEx={`const isSubPath = vsc.isSubPath(path)`}
         codeEx={``}
         code={`/**
 * @param path, parentPath
 * @dependencyInternal trimDashes
 * @vscType Raw
 * @returns boolean
 */
export const isSubPath = (subPath: string, parentPath: string): boolean => \{
   parentPath = vsc.trimDashes(parentPath)
   const result = subPath.indexOf(parentPath + '/') === 0
   return result
}
`}
      />
   )
}

export default IsSubPathAnnotatedCode

