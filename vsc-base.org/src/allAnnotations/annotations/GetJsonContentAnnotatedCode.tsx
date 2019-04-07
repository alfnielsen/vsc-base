import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base'



const GetJsonContentAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'getJsonContent'}
         annotation={
            <>
               <p>
                  Get file source as json (return null on invalid json)
               </p>
            </>
         }
         
         codeEx={`const json = await vsc.getJsonContent(path)`}
         code={`export const getJsonContent = async <TStructure = unknown>(
   path: string,
   throws = false
): Promise<TStructure> => await fs.readJson(path, { throws })
`}
      />
   )
}

export default GetJsonContentAnnotatedCode

