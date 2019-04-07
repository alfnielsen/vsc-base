import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base'



const SplitPathAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'splitPath'}
         annotation={
            <>
               <p>
                  Split filePath into dir and file
               </p>
            </>
         }
         
         codeEx={`const [dir, file] = vsc.splitPath(filePath)`}
         code={`export const splitPath = (path: string): [string, string] => {
   path = vsc.pathAsUnix(path)
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

