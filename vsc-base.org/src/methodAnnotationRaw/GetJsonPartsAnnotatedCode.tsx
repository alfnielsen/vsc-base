import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base/vsc-base-raw'

import MethodTest from 'components/MethodTest/MethodTest'

const GetJsonPartsAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'getJsonParts'}
         annotation={
            <>
               <p>This method is used to get a value from a json object.</p>
               <p>Commonly used to extract parts of json config files ect.</p>
            </>
         }
         test={
            <MethodTest
               initialArgs={{
                  json: '{ "f": { "t": true }}',
                  keyPath: 'f.t'
               }}
               onClickCall={(args, setResult) => {
                  try {
                     const json = JSON.parse(args.json)
                     const res = vsc.getJsonParts(json, args.keyPath)
                     setResult(res.toString())
                  } catch (e) {
                     setResult(e.toString())
                  }
               }}
            />
         }
         codeEx={`const startScript = getJsonParts(packageJson, 'scripts.start')`}
         code={`/**
 * Get part of a json object.
 * @param json
 * @param keyPath Ex sub.sub.name >> {sub:{sub:{name:'Foo'}}} >> Foo
 */
const getJsonParts = (json: { [name: string]: any }, keyPath: string): any => {
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
