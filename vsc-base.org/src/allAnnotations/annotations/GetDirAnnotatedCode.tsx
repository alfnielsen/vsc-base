import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const GetDirAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'getDir'}
         title={'getDir'}
         annotation={
            <>
               <p>
                  
 Get dir from path 
               </p>
               <p>
                (If path is a dir return it)
               </p>
            </>
         }
         
         codeOneLineEx={`const dir = vsc.getDir(path)`}
         codeEx={``}
         code={`/**
 * @param path
 * @dependencyInternal isDir, splitPath
 * @vscType System
 * @returns string
 */
export const getDir = (path: string) => \{
   const _isDir = vsc.isDir(path)
   if (_isDir) \{
      return path
   }
   const [dir] = vsc.splitPath(path)
   return dir
}
`}
      />
   )
}

export default GetDirAnnotatedCode

