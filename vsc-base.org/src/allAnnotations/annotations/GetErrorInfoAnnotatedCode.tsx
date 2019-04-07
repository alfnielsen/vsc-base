import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base'



const GetErrorInfoAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'getErrorInfo'}
         annotation={
            <>
               <p>
                  Test if it an error. Return type (if one of es6 basic error type) return stack
               </p>
            </>
         }
         
         codeEx={`const info = vsc.getErrorInfo(e)`}
         code={`export const getErrorInfo = (e: any): {
   isError: boolean;
   type: string;
   stack: string;
   message: string;
} => {
   let info = { isError: false, type: '', stack: '', message: '' }
   if (e instanceof Error) {
      info.isError = true
      info.stack = e.stack || ''
      info.message = e.message
   } else if (typeof e === 'string') {
      info.message = e
   }
   if (e instanceof EvalError) {
      info.type = "EvalError"
   }
   if (e instanceof RangeError) {
      info.type = "RangeError"
   }
   if (e instanceof ReferenceError) {
      info.type = "ReferenceError"
   }
   if (e instanceof SyntaxError) {
      info.type = "SyntaxError"
   }
   if (e instanceof TypeError) {
      info.type = "TypeError"
   }
   if (e instanceof URIError) {
      info.type = "URIError"
   }
   return info
}
`}
      />
   )
}

export default GetErrorInfoAnnotatedCode

