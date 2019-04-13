import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const AwaitResultAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'awaitResult'}
         title={'awaitResult'}
         annotation={
            <>
               <p>
                  
               </p>
               <p>
                Ensure that a method result that optional can be a promise is awaited. \
 (Responses from methods loaded with vsc.loadTsModule can be optional async!)
               </p>
            </>
         }
         
         codeOneLineEx={`await vsc.awaitResult(result)`}
         codeEx={`
 const varifiedModule = vsc.varifyModuleMethods(_module, \\['run'])
 const result = varifiedModule.run()
 await vsc.awaitResult(result)`}
         code={`/**
 * @description 
 * Ensure that a method result that optional can be a promise is awaited. \\
 * (Responses from methods loaded with vsc.loadTsModule can be optional async!)
 * @see http://vsc-base.org/#awaitResult
 * @vscType ts
 * @oneLineEx await vsc.awaitResult(result)
 * @ex 
 const varifiedModule = vsc.varifyModuleMethods(_module, \\['run'])
 const result = varifiedModule.run()
 await vsc.awaitResult(result)
 * @returns Promise<any>
 */
export const awaitResult = async (result: any): Promise<any> => \{
   if (result instanceof Promise) \{
      return result
   } else \{
      return new Promise(resolve => \{
         resolve(result)
      })
   }
}

`}
      />
   )
}

export default AwaitResultAnnotatedCode

