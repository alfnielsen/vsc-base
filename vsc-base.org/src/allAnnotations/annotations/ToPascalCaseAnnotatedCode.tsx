import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'


import * as vsc from '../vsc-base-raw'

import MethodTest from 'components/MethodTest/MethodTest'


const ToPascalCaseAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'toPascalCase'}
         title={'toPascalCase'}
         annotation={
            <>
               <p>
                  
 Format a string to camal-case. Commonly used to define js/ts variable names. 
               </p>
               <p>
                Ex: 'Some-Name' => 'SomeName', 'some_name' => 'SomeName', 'some.name' => 'SomeName' 
               </p>
               <p>
                All non word seperators will be removed and the word charector after will be transforms to upper case
               </p>
            </>
         }
         
      test={
         <MethodTest
            initialArgs={
{
   str: 'some-name'
}}
            onClickCall={(args, printResult) => {
   const result = vsc.toPascalCase(args.str)
   printResult(result)
}}
         />
      }
      
         codeOneLineEx={`const name = vsc.toPascalCase(inputName)`}
         codeEx={``}
         code={`/**
 * @description 
 * Format a string to camal-case. Commonly used to define js/ts variable names. \\
 * Ex: 'Some-Name' => 'SomeName', 'some_name' => 'SomeName', 'some.name' => 'SomeName' \\
 * All non word seperators will be removed and the word charector after will be transforms to upper case
 * @see http://vsc-base.org/#toPascalCase
 * @param str
 * @vscType Raw
 * @testPrinterArgument 
\{
   str: 'some-name'
}
 * @testPrinter (args, printResult) => \{
   const result = vsc.toPascalCase(args.str)
   printResult(result)
}
 * @oneLineEx const name = vsc.toPascalCase(inputName)
 * @returns string
 */
export const toPascalCase = (str: string): string =>
   str[0].toUpperCase() +
   str.substr(1).replace(/[^a-zA-Z]+(.)/g, (_match, chr) => chr.toUpperCase())

`}
      />
   )
}

export default ToPascalCaseAnnotatedCode

