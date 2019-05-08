import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const AwaitResultAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'awaitResult'}
         title={'awaitResult'}
         open={open}
         annotation={
            <>
               <p>
                  
 Ensure that a method result that optional can be a promise is awaited. 
               </p>
               <p>
                (Responses from methods loaded with vsc.tsLoadModule can be optional async!)
               </p>
            </>
         }
         
         codeOneLineEx={`await vsc.awaitResult(result)`}
         codeEx={`
 const varifiedModule = vsc.varifyModuleMethods(_module, ['run'])
 let result = varifiedModule.run()
 result = await vsc.awaitResult(result)`}
         code={`/**
 * @vscType ts
 * @returns Promise<any>
 */
export const awaitResult = async <T = any>(result: any): Promise<T> => \{
   if (result instanceof Promise) \{
      return result
   } else \{
      return Promise.resolve(result)
   }
}

`}
      />
   )
}

export default AwaitResultAnnotatedCode

