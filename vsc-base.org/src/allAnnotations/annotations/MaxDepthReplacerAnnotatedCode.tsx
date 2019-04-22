import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'


import * as vsc from '../vsc-base-raw'

import MethodTest from 'components/MethodTest/MethodTest'


const MaxDepthReplacerAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'maxDepthReplacer'}
         title={'maxDepthReplacer'}
         open={open}
         annotation={
            <>
               <p>
                  
 Clone an JSON Object (any type) with max depth. 
               </p>
               <p>
                This method goes through the object structure and replace children that goes deeper then the max Depth
               </p>
            </>
         }
         
      test={
         <MethodTest
            initialArgs={{
   obj: '{"a":{"b":{"c":{"d":12}}}}',
   maxDepth: '2'
}}
            onClickCall={(args, setResult) => {
    try{
       const json = JSON.parse(args.obj)
       const maxDepth = parseInt(args.maxDepth)
       const res = vsc.maxDepthReplacer(json, maxDepth)
       const resString = JSON.stringify(res)
       setResult(resString)
    }catch(e){
       setResult(''+e)
    }
}}
         />
      }
      
         codeOneLineEx={`const newObj = vsc.maxDepthReplacer(obj, 3);`}
         codeEx={``}
         code={`/**
 * @param obj, maxDepth, currentLevel
 * @debugTool Primary a debugging method.
 * @vscType Raw
 * @returns string
 */
export const maxDepthReplacer = (obj: unknown, maxDepth: number): any => \{
   const walkedObj = vsc.objectWalker(obj, (state) => \{
      if (state.depth >= maxDepth) \{
         state.replace(
            Array.isArray(state.ancestors[0])
               ? \`[vsc: maxDepth \$\{maxDepth} reached - Array]\`
               : \`[vsc: maxDepth \$\{maxDepth} reached - Object]\`
         )
      }
   })
   return walkedObj
}
`}
      />
   )
}

export default MaxDepthReplacerAnnotatedCode

