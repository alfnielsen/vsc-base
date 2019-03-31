import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base/vsc-base-raw'

import MethodTest from 'components/MethodTest/MethodTest'

const SplitPathAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'splitPath'}
         annotation={
            <>
               <p>Split a path into dir and file.</p>
            </>
         }
         test={
            <MethodTest
               initialArgs={{
                  path: 'root/sub/file.ts'
               }}
               onClickCall={(args, setResult) => {
                  const res = vsc.splitPath(args.path)
                  setResult(`[ '${res[0]}', '${res[1]}' ]\n\ndir: '${res[0]}'\nfile: '${res[1]}'`)
               }}
            />
         }
         codeEx={`const [dir, file] = splitPath(path)`}
         code={`/**
 * Split path into dir and file
 * @param path string
 */
const splitPath = (path: string): [string, string] => {
   path = pathAsUnix(path)
   const splits = path.split('/')
   const name = splits.pop() || ''
   const dir = splits.join('/')
   return [dir, name]
}
`}
      />
   )
}

export default SplitPathAnnotatedCode
