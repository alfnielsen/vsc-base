import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const ToStringAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'toString'}
         title={'toString'}
         annotation={
            <>
               <p>
                  
 Stringify an object. 
               </p>
               <p>
                Uses JSON.stringify and the circular ref safe replacer (see vsc.getJSONCircularReplacer)
               </p>
            </>
         }
         
         codeOneLineEx={`const objString = vsc.toString(someObject);`}
         codeEx={``}
         code={`/**
 * @param obj, replacer, space
 * @vscType Raw
 * @debugTool Primary a debugging method.
 * @returns string
 */
export const toString = (obj: any, replacer = vsc.getJSONCircularReplacer(), space = 2, maxDepth: number = -1): string => \{
   if (maxDepth >= 0) \{
      let maxDepthObj = maxDepthReplacer(obj, maxDepth);
      return JSON.stringify(maxDepthObj, replacer, space)
   }
   return JSON.stringify(obj, replacer, space)
}

`}
      />
   )
}

export default ToStringAnnotatedCode

