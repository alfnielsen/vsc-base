import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TsTranspileAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'tsTranspile'}
         title={'tsTranspile'}
         annotation={
            <>
               <p>
                  
 Transpile ts source to js
               </p>
            </>
         }
         
         codeOneLineEx={`const sourceJs = vsc.tsTranspile(sourceTs)`}
         codeEx={``}
         code={`/**
 * @description 
 * Transpile ts source to js
 * @see http://vsc-base.org/#tsTranspile
 * @param sourceTs 
 * @param compilerOptions 
 * @vscType System
 * @oneLineEx const sourceJs = vsc.tsTranspile(sourceTs)
 * @returns string
 */
export const tsTranspile = (sourceTs: string,
   compilerOptions: ts.CompilerOptions = \{
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2015,
      libs: ['es6']
   }) => \{
   const transpiledOutput = ts.transpileModule(sourceTs, \{ compilerOptions })
   let sourceJs = transpiledOutput.outputText
   return sourceJs;
}

`}
      />
   )
}

export default TsTranspileAnnotatedCode

