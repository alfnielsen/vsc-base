import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const RewriteTstranpiledCodeWithVscBaseModulesAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'rewriteTstranpiledCodeWithVscBaseModules'}
         title={'rewriteTstranpiledCodeWithVscBaseModules'}
         annotation={
            <>
               <p>
                  Replace ts traspiles code's require for vsc, ts, fs and vscode.
               </p>
            </>
         }
         
         codeOneLineEx={`sourceJs = vsc.rewriteTstranpiledCodeWithVscBaseModules(sourceJs)`}
         codeEx={``}
         code={`/**
 * Replace ts traspiles code's require for vsc, ts, fs and vscode.
 * @see http://vsc-base.org/#rewriteTstranpiledCodeWithVscBaseModules
 * @internal this method is primary used by vsc.loadTsModule
 * @notes
 * ts.transpile as follows:
 * const vsc_base_1 = require("vsc-base");
 * const fs = require("fs-extra");
 * const typescript_1 = require("typescript");
 * const vscode = require("vscode");
 * @oneLineEx sourceJs = vsc.rewriteTstranpiledCodeWithVscBaseModules(sourceJs)
 * @param sourceJs 
 * @returns string
 */
export const rewriteTstranpiledCodeWithVscBaseModules = (
   sourceJs: string,
): string => {
   const modulesMap = vsc.getVscDefaultModuleMap()
   modulesMap.forEach(obj => {
      const reg = new RegExp(\`\\bconst (\\w+) = require\\(\\"\${obj.name}\\"\\)\`, 'g')
      sourceJs = sourceJs.replace(reg, (str: string) =>
         \`/* \${str} // vsc-base has change the ts transpiled code here. */\`
      )
   })
   return sourceJs
}
`}
      />
   )
}

export default RewriteTstranpiledCodeWithVscBaseModulesAnnotatedCode

