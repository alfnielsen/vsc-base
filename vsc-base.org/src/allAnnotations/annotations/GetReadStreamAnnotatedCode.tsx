import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const GetReadStreamAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'getReadStream'}
         title={'getReadStream'}
         open={open}
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
 * @param path
 * @dependencyExternal fs
 * @vscType System
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

