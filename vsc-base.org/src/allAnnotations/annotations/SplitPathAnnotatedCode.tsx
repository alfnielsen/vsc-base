import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const SplitPathAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'splitPath'}
         title={'splitPath'}
         annotation={
            <>
               <p>
                  
 Split filePath into dir and file
               </p>
            </>
         }
         
         codeOneLineEx={`const [dir, file] = vsc.splitPath(filePath)`}
         codeEx={``}
         code={`/**
 * @param path
 * @dependencyInternal pathAsUnix
 * @vscType Raw
 * @returns [string, string]
 */
export const splitPath = (path: string): [string, string] => \{
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

