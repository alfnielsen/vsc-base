import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'


import * as vsc from '../vsc-base-raw'

import MethodTest from 'components/MethodTest/MethodTest'


const JoinPathsAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'joinPaths'}
         title={'joinPaths'}
         open={open}
         annotation={
            <>
               <p>
                  
Joins to paths.
               </p>
            </>
         }
         
      test={
         <MethodTest
            initialArgs={{
   path1: 'root/area/',
   path2: '/module2/file.ts'
}}
            onClickCall={(args, setResult) => {
     const res = vsc.joinPaths(args.path1, args.path2)
     setResult(res)
}}
         />
      }
      
         codeOneLineEx={`const newPath = vsc.joinPaths(path1, path2)`}
         codeEx={``}
         code={`/**
 * @param path1,path2
 * @dependencyInternal trimDashes
 * @vscType Raw
 * @returns string
 */
export const joinPaths = (path1: string, path2: string): string => \{
   path1 = vsc.trimDashes(path1)
   path2 = vsc.trimDashes(path2)
   const result = path1 + '/' + path2
   return result
}`}
      />
   )
}

export default JoinPathsAnnotatedCode

