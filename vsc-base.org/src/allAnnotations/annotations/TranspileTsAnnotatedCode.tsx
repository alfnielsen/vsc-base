import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base'



const TranspileTsAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'transpileTs'}
         annotation={
            <>
               <p>
                  Transpile ts source to js
               </p>
            </>
         }
         
         codeEx={`const sourceJs = vsc.transpileTs(sourceTs)`}
         code={`export const transpileTs = (sourceTs: string,
   compilerOptions: ts.CompilerOptions = {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2015,
      libs: ['es6']
   }) => {
   const transpiledOutput = ts.transpileModule(sourceTs, { compilerOptions })
   let sourceJs = transpiledOutput.outputText
   return sourceJs;
}

`}
      />
   )
}

export default TranspileTsAnnotatedCode

