import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'


import * as vsc from '../vsc-base-raw'

import MethodTest from 'components/MethodTest/MethodTest'


const ToSnakeCaseAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'toSnakeCase'}
         title={'toSnakeCase'}
         annotation={
            <>
               <p>
                  
               </p>
               <p>
                Format a string from camel-case to snake-case \
 Ex: 'SomeName' => 'some_name', 'Some_Other.name' => 'some_other_name'
               </p>
            </>
         }
         
      test={
         <MethodTest
            initialArgs={
{
   str: 'SomeName'
}}
            onClickCall={(args, printResult) => {
   const result = vsc.toSnakeCase(args.str)
   printResult(result)
 }}
         />
      }
      
         codeOneLineEx={`const cssName = vsc.toSnakeCase(inputName)`}
         codeEx={``}
         code={`/**
 * @description 
 * Format a string from camel-case to snake-case \\
 * Ex: 'SomeName' => 'some_name', 'Some_Other.name' => 'some_other_name'
 * @see http://vsc-base.org/#toSnakeCase
 * @param str
 * @param uppercase
 * @vscType Raw
 * @testPrinterArgument 
\{
   str: 'SomeName'
}
 * @testPrinter (args, printResult) => \{
   const result = vsc.toSnakeCase(args.str)
   printResult(result)
 }
 * @oneLineEx const cssName = vsc.toSnakeCase(inputName)
 * @returns string
 */
export const toSnakeCase = (str: string, upperCase = false): string => \{
   str = str[0].toLowerCase() +
      str.substr(1)
         .replace(/([A-Z])/g, (_match, chr) => \`_\$\{chr.toLowerCase()}\`)
         .replace(/[^a-zA-Z]+(.)/g, (_match, chr) => \`_\$\{chr.toLowerCase()}\`)
   if (upperCase) \{
      str = str.toUpperCase()
   }
   return str
}

`}
      />
   )
}

export default ToSnakeCaseAnnotatedCode

