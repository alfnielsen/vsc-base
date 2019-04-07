import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base'



const RewriteTstranpiledCodeWithVscBaseModulesAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'rewriteTstranpiledCodeWithVscBaseModules'}
         annotation={
            <>
               <p>
                  Replace ts traspiles code's require for vsc, ts, fs and vscode.
               </p>
            </>
         }
         
         codeEx={`sourceJs = vsc.rewriteTstranpiledCodeWithVscBaseModules(sourceJs)`}
         code={`export const rewriteTstranpiledCodeWithVscBaseModules = (
   sourceJs: string,
): string => {
   const modulesMap = vsc.getVscDefaultModuleMap()
   modulesMap.forEach(obj => {
      const reg = new RegExp(\`\\bconst (\\w+) = require\\(\\"${obj.name}\\"\\)\`, 'g')
      sourceJs = sourceJs.replace(reg, (str: string) =>
         \`/* ${str} // vsc-base has change the ts transpiled code here. */\`
      )
   })
   return sourceJs
}
`}
      />
   )
}

export default RewriteTstranpiledCodeWithVscBaseModulesAnnotatedCode

