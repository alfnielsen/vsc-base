import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'


import * as vsc from '../vsc-base-raw'

import MethodTest from 'components/MethodTest/MethodTest'


const ToSnakeCaseAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'toSnakeCase'}
         title={'toSnakeCase'}
         open={open}
         annotation={
            <>
               <p>
                  
Format a string from camel-case to snake-case 
               </p>
               <p>
               Ex: &#039;SomeName&#039; =&gt; &#039;some_name&#039;, &#039;Some_Other.name&#039; =&gt; &#039;some_other_name&#039;
               </p>
            </>
         }
         
      test={
         <MethodTest
            initialArgs={
{
   str: 'SomeName',
   upperCase: 'false'
}}
            onClickCall={(args, printResult) => {
   const result = vsc.toSnakeCase(args.str, args.upperCase!=='false')
   printResult(result)
 }}
         />
      }
      
         codeOneLineEx={`const cssName = vsc.toSnakeCase(inputName)`}
         codeEx={``}
         code={`/**
 * @param str,uppercase
 * @vscType Raw
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
}`}
      />
   )
}

export default ToSnakeCaseAnnotatedCode

