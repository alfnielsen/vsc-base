import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'


import * as vsc from '../vsc-base-raw'

import MethodTest from 'components/MethodTest/MethodTest'


const InsertBeforeAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'insertBefore'}
         title={'insertBefore'}
         open={open}
         annotation={
            <>
               <p>
                  
Insert before the match of a string or regExp.
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
         const res = vsc.insertBefore(args.source, reg, args.content)
         setResult(res)
      }catch(e){
         setResult('error: '+e)
      }
   }else{
      const res = vsc.insertBefore(args.source, args.match, args.content)
      setResult(res)
   }
}}
         />
      }
      
         codeOneLineEx={`source = vsc.insertBefore(source, regExp, content)`}
         codeEx={``}
         code={`/**
 * @vscType Raw
 * @returns boolean
 */
export const insertBefore = (
   source: string,
   match: string | RegExp,
   content: string
): string => \{
   const index = source.search(match)
   if (index >= 0) \{
      source = source.substring(0, index) + content + source.substring(index)
   }
   return source
}`}
      />
   )
}

export default InsertBeforeAnnotatedCode

