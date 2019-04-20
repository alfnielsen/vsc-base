import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TsDefaultCompilerOptionsAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'TsDefaultCompilerOptions'}
         title={'TsDefaultCompilerOptions'}
         open={open}
         annotation={
            <>
               <p>
                  
 vsc-base's internal default ts compiler options
               </p>
            </>
         }
         
         codeOneLineEx={`const compilerOptions = vsc.TsDefaultCompilerOptions`}
         codeEx={``}
         code={`/**
 * @internal internal
 * @experimental This method can easily change, because ts api is in experimental state.
 * @vscType ts
 */
export const TsDefaultCompilerOptions: Readonly<ts.CompilerOptions> = (\{
   module: ts.ModuleKind.CommonJS,
   target: ts.ScriptTarget.ES2015,
   libs: ['es6']
})
`}
      />
   )
}

export default TsDefaultCompilerOptionsAnnotatedCode

