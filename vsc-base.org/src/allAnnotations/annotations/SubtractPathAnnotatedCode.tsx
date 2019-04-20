import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'


import * as vsc from '../vsc-base-raw'

import MethodTest from 'components/MethodTest/MethodTest'


const SubtractPathAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'subtractPath'}
         title={'subtractPath'}
         open={open}
         annotation={
            <>
               <p>
                  
 Remove parent-path from a path
               </p>
            </>
         }
         
      test={
         <MethodTest
            initialArgs={{
   path: 'root/area/module/file1.ts',
   parentPath: 'root/area',
   trimDashes: 'true'
}}
            onClickCall={(args, setResult) => {
     const res = vsc.subtractPath(args.path, args.parentPath, args.trimDashes==='true')
     setResult(res)
}}
         />
      }
      
         codeOneLineEx={`const newPath = vsc.subtractPath(path, parentPath)`}
         codeEx={``}
         code={`/**
 * @param path, parentPath, trimDashes default true
 * @dependencyInternal trimDashes
 * @vscType Raw
 * @returns string
 */
export const subtractPath = (
   path: string,
   parentPath: string,
   trimDashes = true
): string => \{
   const regexp = new RegExp(\`^\$\{parentPath}\`)
   let newPath = path.replace(regexp, '')
   if (trimDashes) \{
      newPath = vsc.trimDashes(newPath)
   }
   return newPath
}
`}
      />
   )
}

export default SubtractPathAnnotatedCode

