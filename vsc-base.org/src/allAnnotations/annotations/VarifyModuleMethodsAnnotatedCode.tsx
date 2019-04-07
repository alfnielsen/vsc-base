import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base'



const VarifyModuleMethodsAnnotatedCode = () => {
   return (
      <AnnotatedCode
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
         
         codeEx={`const varifyModuleMethods = vsc.hasModuleFunction(_module, methodName)`}
         code={`export const varifyModuleMethods = (
   _module: { [key: string]: unknown },
   methods: string[]
): { [key: string]: any } | undefined => {
   const map: { [key: string]: any } = {}
   for (const key of methods) {
      if (_module.hasOwnProperty(key) && _module[key] instanceof Function) {
         map[key] = _module[key]
      } else {
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

