import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'


import * as vsc from '../vsc-base-raw'

import MethodTest from 'components/MethodTest/MethodTest'


const EscapeHtmlAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'escapeHtml'}
         title={'escapeHtml'}
         open={open}
         annotation={
            <>
               <p>
                  
Simple implementation of that escape: &amp; &lt; &gt; &quot; and &#039; 
               </p>
               <p>
               It will also encode curly bracket &#123; &#125; unless option is set to false (encodeCurlyBracket: default is true) \
               </p>
            </>
         }
         
      test={
         <MethodTest
            initialArgs={{
   html: ''
}}
            onClickCall={(args, setResult) => {
    try{
       const res = vsc.escapeHtml(args.html)
       const resString = JSON.stringify(res)
       setResult(resString)
    }catch(e){
       setResult(''+e)
    }
}}
         />
      }
      
         codeOneLineEx={`const safeHTML = vsc.escapeHtml(unsafeHTML);`}
         codeEx={``}
         code={`/**
 * @vscType Raw
 * @returns string
 */
export const escapeHtml = (unsafe: string, encodeCurlyBracket = true) => \{
   let save = unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
   if (encodeCurlyBracket) \{
      save = save
         .replace(/\{/g, "&#123;")
         .replace(/}/g, "&#125;")
   }
   return save
}`}
      />
   )
}

export default EscapeHtmlAnnotatedCode

