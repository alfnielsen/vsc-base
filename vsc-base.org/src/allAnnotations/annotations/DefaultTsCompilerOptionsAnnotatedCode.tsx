import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const DefaultTsCompilerOptionsAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'DefaultTsCompilerOptions'}
         title={'DefaultTsCompilerOptions'}
         annotation={
            <>
               <p>
                  
               </p>
               <p>
                vsc-base's internal default ts compiler options
               </p>
            </>
         }
         
         codeOneLineEx={`const compilerOptions = vsc.DefaultTsCompilerOptions`}
         codeEx={``}
         code={`/**
 * @description 
 * vsc-base's internal default ts compiler options
 * @see http://vsc-base.org/#DefaultTsCompilerOptions
 * @internal
 * @experimental This method can easily change, because ts api is in experimental state.
 * @vscType ts
 * @oneLineEx const compilerOptions = vsc.DefaultTsCompilerOptions
 */
export const DefaultTsCompilerOptions: Readonly<ts.CompilerOptions> = (\{
   module: ts.ModuleKind.CommonJS,
   target: ts.ScriptTarget.ES2015,
   libs: ['es6']
})

`}
      />
   )
}

export default DefaultTsCompilerOptionsAnnotatedCode

