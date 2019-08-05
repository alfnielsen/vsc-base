import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const VerifyModuleMethodsAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'verifyModuleMethods'}
         title={'verifyModuleMethods'}
         open={open}
         annotation={
            <>
               <p>
                  
Test if a loaded module has methods (Loaded with vsc.loadTsModule) 
               </p>
               <p>
               return undefined if a method didn't exist.
               </p>
            </>
         }
         
         codeOneLineEx={`const verifyModuleMethods = vsc.verifyModuleMethods(_module, methodName)`}
         codeEx={`
const verifiedModule = vsc.verifyModuleMethods(
  _module, 
  ['run','getId']
)
const result = verifiedModule.run()`}
         code={`/**
 * @vscType System
 * @returns \{ [key: string]: any } | undefined
 */
export const verifyModuleMethods = (
   _module: \{ [key: string]: unknown },
   methods: string[]
): \{ [key: string]: any } | undefined => \{
   const map: \{ [key: string]: any } = \{}
   for (const key of methods) \{
      if (_module.hasOwnProperty(key) && _module[key] instanceof Function) \{
         map[key] = _module[key]
      } else \{
         return undefined
      }
   }
   return map
}`}
      />
   )
}

export default VerifyModuleMethodsAnnotatedCode

