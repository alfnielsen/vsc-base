import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base'



const GetJsonPartsAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'getJsonParts'}
         annotation={
            <>
               <p>
                  Get part of a json object.
               </p>
            </>
         }
         
         codeEx={`const startScript = vsc.getJsonParts(packageJson, 'scripts.start')`}
         code={`export const getJsonParts = <TStructure = any>(
   json: { [name: string]: unknown },
   keyPath: string
): TStructure | undefined => {
   let current: any = json
   const keySplit = keyPath.split(/\./)
   for (let i = 0; i < keySplit.length; i++) {
      const key = keySplit[i]
      if (current[key] === undefined) {
         return undefined
      }
      current = current[key]
   }
   return current
}
`}
      />
   )
}

export default GetJsonPartsAnnotatedCode

