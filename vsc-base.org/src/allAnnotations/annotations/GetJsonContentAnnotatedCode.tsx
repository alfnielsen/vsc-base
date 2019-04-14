import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const GetJsonContentAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'getJsonContent'}
         title={'getJsonContent'}
         annotation={
            <>
               <p>
                  
 Get file source as json 
               </p>
               <p>
                (return null on invalid json)
               </p>
            </>
         }
         
         codeOneLineEx={`const json = await vsc.getJsonContent(path)`}
         codeEx={``}
         code={`/**
 * @param path
 * @dependencyExternal fs
 * @vscType System
 * @returns unknown
 */
export const getJsonContent = async <TStructure = unknown>(
   path: string,
   throws = false
): Promise<TStructure> => await fs.readJson(path, \{ throws })
`}
      />
   )
}

export default GetJsonContentAnnotatedCode

