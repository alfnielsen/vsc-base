import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base'



const GetReadStreamAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'getReadStream'}
         annotation={
            <>
               <p>
                  Get a file ReadStream
               </p>
            </>
         }
         
         codeEx={`const readStream = getReadStream(path)`}
         code={`export const getReadStream = (path: string) => {
   const stream = fs.createReadStream(path, {
      flags: 'r',
      encoding: 'utf-8',
      fd: undefined,
      mode: 438, // 0666 in Octal
      autoClose: false,
      highWaterMark: 64 * 1024
   })
   return stream
}
`}
      />
   )
}

export default GetReadStreamAnnotatedCode

