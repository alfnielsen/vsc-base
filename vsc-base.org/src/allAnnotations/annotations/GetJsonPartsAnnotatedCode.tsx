import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const GetJsonPartsAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'getJsonParts'}
         title={'getJsonParts'}
         annotation={
            <>
               <p>
                  Get part of a json object.
               </p>
            </>
         }
         
         codeOneLineEx={`const startScript = vsc.getJsonParts(packageJson, 'scripts.start')`}
         codeEx={``}
         code={`/**
 * Get part of a json object.
 * @see http://vsc-base.org/#getJsonParts
 * @param json
 * @param keyPath Ex sub.sub.name >> {sub:{sub:{name:'Foo'}}} >> Foo
 * @oneLineEx const startScript = vsc.getJsonParts(packageJson, 'scripts.start')
 * @returns any
 */
export const getJsonParts = <TStructure = any>(
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

