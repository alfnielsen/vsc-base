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
                  Get file source as json (return null on invalid json)
               </p>
            </>
         }
         
         codeOneLineEx={`const json = await vsc.getJsonContent(path)`}
         codeEx={``}
         code={`/**
 * Get file source as json (return null on invalid json)
 * @see http://vsc-base.org/#getJsonContent
 * @param path
 * @dependencyExternal fs
 * @oneLineEx const json = await vsc.getJsonContent(path)
 * @returns unknown
 */
export const getJsonContent = async <TStructure = unknown>(
   path: string,
   throws = false
): Promise<TStructure> => await fs.readJson(path, { throws })
`}
      />
   )
}

export default GetJsonContentAnnotatedCode

