import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const GetReadStreamAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'getReadStream'}
         title={'getReadStream'}
         annotation={
            <>
               <p>
                  Get a file ReadStream
               </p>
            </>
         }
         
         codeOneLineEx={`const readStream = vsc.getReadStream(path)`}
         codeEx={` const readStream = vsc.getReadStream(path)
 for await (chunk of readStream) \{
   //do something with chunk
 }`}
         code={`/**
 * Get a file ReadStream
 * @see http://vsc-base.org/#getReadStream
 * @param path
 * @dependencyExternal fs
 * @vscType System
 * @oneLineEx const readStream = vsc.getReadStream(path)
 * @ex
 const readStream = vsc.getReadStream(path)
 for await (chunk of readStream) \{
   //do something with chunk
 }
 * @returns fs.ReadStream
 */
export const getReadStream = (path: string) => \{
   const stream = fs.createReadStream(path, \{
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

