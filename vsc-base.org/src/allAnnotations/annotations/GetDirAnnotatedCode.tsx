import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base'



const GetDirAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'getDir'}
         annotation={
            <>
               <p>
                  Get dir from path (If path is a dir return it)
               </p>
            </>
         }
         
         codeEx={`const dir = vsc.getDir(path)`}
         code={`export const getDir = (path: string) => {
   const _isDir = vsc.isDir(path)
   if (_isDir) {
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

