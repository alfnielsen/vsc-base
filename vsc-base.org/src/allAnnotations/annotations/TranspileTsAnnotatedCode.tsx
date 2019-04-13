import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TranspileTsAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'transpileTs'}
         title={'transpileTs'}
         annotation={
            <>
               <p>
                  
               </p>
               <p>
                Transpile ts source to js
               </p>
            </>
         }
         
         codeOneLineEx={`const sourceJs = vsc.transpileTs(sourceTs)`}
         codeEx={``}
         code={`/**
 * @description 
 * Transpile ts source to js
 * @see http://vsc-base.org/#transpileTs
 * @param sourceTs 
 * @param compilerOptions 
 * @vscType System
 * @oneLineEx const sourceJs = vsc.transpileTs(sourceTs)
 * @returns string
 */
export const transpileTs = (sourceTs: string,
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

export default TranspileTsAnnotatedCode

