import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base/vsc-base-raw'

import MethodTest from 'components/MethodTest/MethodTest'

const SubtractPathAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'subtractPath'}
         annotation={
            <>
               <p>Subtract a a path from another.</p>
            </>
         }
         test={
            <MethodTest
               initialArgs={{
                  path: 'c:/root/module/file.ts',
                  parentPath: 'c:/root/module',
                  trimDashes: 'true'
               }}
               onClickCall={(args, setResult) => {
                  const res = vsc.subtractPath(args.path, args.parentPath, args.trimDashes === 'true')
                  setResult(res)
               }}
            />
         }
         codeEx={`const subPath = subtractPath(path, parentPath)`}
         code={`/**
 * Remove parent-path from a path
 * @param path
 * @param parentPath
 * @param trimDashes default true
 */
const subtractPath = (path: string, parentPath: string, trimDashes = true): string => {
   const regexp = new RegExp(\`^\${parentPath}\`)
   let newPath = path.replace(regexp, '')
   if (trimDashes) {
      vsc.trimDashes(newPath)
   }
   return newPath
}
`}
      />
   )
}

export default SubtractPathAnnotatedCode
