import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'


import * as vsc from '../vsc-base-raw'

import MethodTest from 'components/MethodTest/MethodTest'


const KeyValueReplacerAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'keyValueReplacer'}
         title={'keyValueReplacer'}
         open={open}
         annotation={
            <>
               <p>
                  
 Clone an JSON Object (any type) and reaplce all properties with the given name with a new value. 
               </p>
               <p>
                This method goes through the object structure and replace children that has the given name/key
               </p>
            </>
         }
         
      test={
         <MethodTest
            initialArgs={{
   obj: '{"a":{"b":{"c":{"d":12}}}}',
   key: 'c',
   value: 'foo'
}}
            onClickCall={(args, setResult) => {
    try{
       const json = JSON.parse(args.obj)
       const res = vsc.keyValueReplacer(json, args.key, args.value)
       const resString = JSON.stringify(res)
       setResult(resString)
    }catch(e){
       setResult(''+e)
    }
}}
         />
      }
      
         codeOneLineEx={`const newObj = vsc.keyValueReplacer(obj, key, newValue);`}
         codeEx={``}
         code={`/**
 * @param obj, maxDepth, currentLevel
 * @debugTool Primary a debugging method.
 * @vscType Raw
 * @returns string
 */
export const keyValueReplacer = (obj: unknown, key: string, newValue: any): any => \{
   const walkedObj = vsc.objectWalker(obj, (state) => \{
      if (state.key === key) \{
         state.replace(newValue)
      }
   })
   return walkedObj
}

`}
      />
   )
}

export default KeyValueReplacerAnnotatedCode

