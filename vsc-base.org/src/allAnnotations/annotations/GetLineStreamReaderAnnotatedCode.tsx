import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const GetLineStreamReaderAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'getLineStreamReader'}
         title={'getLineStreamReader'}
         annotation={
            <>
               <p>
                  
 Create a LineReader (generator method) for a ReadStream
               </p>
            </>
         }
         
         codeOneLineEx={`const lineReader = vsc.getLineStreamReader(readStream)`}
         codeEx={` const readStream = vsc.getReadStream(path)
 const lineReader = vsc.getLineStreamReader(readStream)
 for await (line of lineReader) \{
    //do something with the line
 }`}
         code={`/**
 * @description 
 * Create a LineReader (generator method) for a ReadStream
 * @see http://vsc-base.org/#getLineStreamReader
 * @param readStream
 * @dependencyExternal fs
 * @vscType System
 * @oneLineEx const lineReader = vsc.getLineStreamReader(readStream)
 * @ex
 const readStream = vsc.getReadStream(path)
 const lineReader = vsc.getLineStreamReader(readStream)
 for await (line of lineReader) \{
    //do something with the line
 }
 * @returns () => AsyncIterableIterator<string>
 */
export const getLineStreamReader = (readStream: fs.ReadStream) =>
   async function* () \{
      let read = ''
      for await (const chunk of readStream) \{
         read += chunk
         let lineLength: number
         while ((lineLength = read.indexOf('\\n')) >= 0) \{
            const line = read.slice(0, lineLength + 1)
            yield line
            read = read.slice(lineLength + 1)
         }
      }
      if (read.length > 0) \{
         yield read
      }
   }
`}
      />
   )
}

export default GetLineStreamReaderAnnotatedCode

