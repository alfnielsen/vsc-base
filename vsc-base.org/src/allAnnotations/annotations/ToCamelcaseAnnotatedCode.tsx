import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'


import * as vsc from '../vsc-base-raw'

import MethodTest from 'components/MethodTest/MethodTest'


const ToCamelCaseAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'toCamelCase'}
         title={'toCamelCase'}
         annotation={
            <>
               <p>
                  
 Format a string to camal-case. 
               </p>
               <p>
                Commonly used to define js/ts variable names. 
               </p>
               <p>
                Ex: 'Some-Name' => 'someName', 'some_name' => 'someName', 'some.name' => 'someName' 
               </p>
               <p>
                All non word seperators will be removed and the word charector after will be transforms to upper case.
               </p>
            </>
         }
         
      test={
         <MethodTest
            initialArgs={
{
   str: 'Some-name'
}}
            onClickCall={(args, printResult) => {
   const result = vsc.toCamelCase(args.str)
   printResult(result)
}}
         />
      }
      
         codeOneLineEx={`const name = vsc.toCamelCase(inputName)`}
         codeEx={``}
         code={`/**
 * @param str
 * @vscType Raw
 * @returns string
 */
export const toCamelCase = (str: string): string =>
   str[0].toLowerCase() +
   str.substr(1)
      .replace(/[^a-zA-Z]+(.)/g, (_match, chr) => chr.toUpperCase())
`}
      />
   )
}

export default ToCamelCaseAnnotatedCode

