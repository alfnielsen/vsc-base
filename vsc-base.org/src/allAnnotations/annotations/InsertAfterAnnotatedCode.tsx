import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'


import * as vsc from '../vsc-base-raw'

import MethodTest from 'components/MethodTest/MethodTest'


const InsertAfterAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'insertAfter'}
         title={'insertAfter'}
         open={open}
         annotation={
            <>
               <p>
                  
Insert after the match of a string or regExp.
               </p>
            </>
         }
         
      test={
         <MethodTest
            initialArgs={{
   source: '1 2 3 4 5',
   match: '/3/',
   content: 'T'
}}
            onClickCall={(args, setResult) => {
   const matchRegExp = args.match.match(/^\/(.*)\/(i?)/)
   if(matchRegExp){
      try{
         const reg = new RegExp(matchRegExp[1], matchRegExp[2])
         const res = vsc.insertAfter(args.source, reg, args.content)
         setResult(res)
      }catch(e){
         setResult('error: '+e)
      }
   }else{
      const res = vsc.insertAfter(args.source, args.match, args.content)
      setResult(res)
   }
}}
         />
      }
      
         codeOneLineEx={`source = vsc.insertAfter(source, regExp, content)`}
         codeEx={``}
         code={`/**
 * @vscType Raw
 * @returns boolean
 */
export const insertAfter = (
   source: string,
   match: string | RegExp,
   content: string
): string => \{
   const stringMatch = source.match(match)
   if (stringMatch && stringMatch.index && stringMatch.index >= 0) \{
      const index = stringMatch.index + stringMatch[0].length
      source = source.substring(0, index) + content + source.substring(index)
   }
   return source
}`}
      />
   )
}

export default InsertAfterAnnotatedCode

