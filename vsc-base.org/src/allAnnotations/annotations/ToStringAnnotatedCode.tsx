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
         
         codeOneLineEx={`const objString = vsc.toString(soneObject);`}
         codeEx={``}
         code={`/**
 * @param obj, replacer, space
 * @vscType Raw
 * @returns string
 */
export const toString = (obj: any, replacer = vsc.getJSONCircularReplacer(), space = 2) =>
   JSON.stringify(obj, replacer, space)
`}
      />
   )
}

export default ToStringAnnotatedCode

