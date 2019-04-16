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
 * @param sourceTs, compilerOptions
 * @vscType System
 * @returns string
 */
export const tsTranspile = (sourceTs: string,
   compilerOptions: ts.CompilerOptions = vsc.TsDefaultCompilerOptions
) => \{
   const transpiledOutput = ts.transpileModule(sourceTs, \{ compilerOptions })
   let sourceJs = transpiledOutput.outputText
   return sourceJs;
}

`}
      />
   )
}

export default TsTranspileAnnotatedCode

