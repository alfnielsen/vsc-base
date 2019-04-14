import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const VarifyModuleMethodsAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'varifyModuleMethods'}
         title={'varifyModuleMethods'}
         annotation={
            <>
               <p>
                  
 Test if a loaded module has methods (Loaded with vsc.loadTsModule) 
               </p>
               <p>
                return undefined if a method didnt exist.
               </p>
            </>
         }
         
         codeOneLineEx={`const varifyModuleMethods = vsc.varifyModuleMethods(_module, methodName)`}
         codeEx={`
const varifiedModule = vsc.varifyModuleMethods(_module, ['run', 'getId'])
const result = varifiedModule.run()`}
         code={`/**
 * @vscType System
 * @returns \{ [key: string]: any } | undefined
 */
export const varifyModuleMethods = (
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
}
`}
      />
   )
}

export default VarifyModuleMethodsAnnotatedCode

