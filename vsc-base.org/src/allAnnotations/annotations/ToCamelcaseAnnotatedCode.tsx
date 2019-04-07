import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base'



const ToCamelcaseAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'toCamelcase'}
         annotation={
            <>
               <p>
                  Format a string to camal-case. Commonly used to define js/ts variable names.
               </p>
               <p>
                (Some-Name => someName, some_name => someName, some.name => someName )
 All non word seperators will be removed and the word charector after will be transforms to upper case
               </p>
            </>
         }
         
         codeEx={`const name = vsc.toCamelcase(kebabName)`}
         code={`export const toCamelcase = (str: string): string =>
   str[0].toLowerCase() +
   str.substr(1).replace(/[^a-zA-Z]+(.)/g, (_match, chr) => chr.toUpperCase())
`}
      />
   )
}

export default ToCamelcaseAnnotatedCode

