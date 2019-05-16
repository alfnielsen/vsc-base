import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'


import * as vsc from '../vsc-base-raw'

import MethodTest from 'components/MethodTest/MethodTest'


const ToTitleCaseAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'toTitleCase'}
         title={'toTitleCase'}
         open={open}
         annotation={
            <>
               <p>
                  
 Format a string to a title string  
               </p>
               <p>
                Ex: 'Some-Name' => 'Some Name', 'some_name' => 'Some Name', 'some.name' => 'Some Name' 
               </p>
               <p>
                All non word separators will be removed and the word character after will be transforms to upper case, 
               </p>
               <p>
                if allWordUppercase is true only the first word will have uppercase.
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
   const result = vsc.toTitleCase(args.str)
   printResult(result)
}}
         />
      }
      
         codeOneLineEx={`const name = vsc.toTitleCase(inputName)`}
         codeEx={``}
         code={`/**
 * @param str
 * @vscType Raw
 * @returns string
 */
export const toTitleCase = (str: string, allWordUpperCase = true): string =>
   str[0].toUpperCase() +
   str.substr(1)
      .replace(/([A-Z])/g, (_match, chr) => \` \$\{allWordUpperCase ? chr.toUpperCase() : chr.toLowerCase()}\`)
      .replace(/[^a-zA-Z]+(.)/g, (_match, chr) => \` \$\{allWordUpperCase ? chr.toUpperCase() : chr.toLowerCase()}\`)

`}
      />
   )
}

export default ToTitleCaseAnnotatedCode

