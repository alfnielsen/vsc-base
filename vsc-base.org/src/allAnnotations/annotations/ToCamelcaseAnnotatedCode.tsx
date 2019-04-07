import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const ToCamelcaseAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'toCamelcase'}
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
         
         codeOneLineEx={`const name = vsc.toCamelcase(kebabName)`}
         codeEx={``}
         code={`/**
 * Format a string to camal-case. Commonly used to define js/ts variable names.
 * (Some-Name => someName, some_name => someName, some.name => someName )
 * All non word seperators will be removed and the word charector after will be transforms to upper case
 * @see http://vsc-base.org/#toCamelcase
 * @param str
 * @oneLineEx const name = vsc.toCamelcase(kebabName)
 * @returns string
 */
export const toCamelcase = (str: string): string =>
   str[0].toLowerCase() +
   str.substr(1).replace(/[^a-zA-Z]+(.)/g, (_match, chr) => chr.toUpperCase())
`}
      />
   )
}

export default ToCamelcaseAnnotatedCode

