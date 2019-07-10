import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'


import * as vsc from '../vsc-base-raw'

import MethodTest from 'components/MethodTest/MethodTest'


const ToCamelCaseAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'toCamelCase'}
         title={'toCamelCase'}
         open={open}
         annotation={
            <>
               <p>
                  
Format a string to camel-case. 
               </p>
               <p>
               Commonly used to define js/ts variable names. 
               </p>
               <p>
               Ex: 'Some-Name' => 'someName', 'some_name' => 'someName', 'some.name' => 'someName' 
               </p>
               <p>
               All non word separators will be removed and the word character after will be transforms to upper case.
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
      .replace(/[^a-zA-Z]+(.)/g, (_match, chr) => chr.toUpperCase())`}
      />
   )
}

export default ToCamelCaseAnnotatedCode

