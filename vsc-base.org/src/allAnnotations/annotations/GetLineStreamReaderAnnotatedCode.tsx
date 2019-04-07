import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base'



const GetLineStreamReaderAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'getLineStreamReader'}
         annotation={
            <>
               <p>
                  Create a LineReader (generator method) for a ReadStream
               </p>
            </>
         }
         
         codeEx={`const lineReader = getLineStreamReader(readStream)`}
         code={`export const getLineStreamReader = (readStream: fs.ReadStream) =>
   async function* () {
      let read = ''
      for await (const chunk of readStream) {
         read += chunk
         let lineLength: number
         while ((lineLength = read.indexOf('\n')) >= 0) {
            const line = read.slice(0, lineLength + 1)
            yield line
            read = read.slice(lineLength + 1)
         }
      }
      if (read.length > 0) {
         yield read
      }
   }
`}
      />
   )
}

export default GetLineStreamReaderAnnotatedCode

