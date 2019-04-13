import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TsTransformSourceFileAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'tsTransformSourceFile'}
         title={'tsTransformSourceFile'}
         annotation={
            <>
               <p>
                  
               </p>
               <p>
                Tranform a ts.Node \
 (default node-type is ts.Sourcefile)
               </p>
            </>
         }
         
         codeOneLineEx={`const result = tsTransformSourceFile(sourceFile, transformers, compilerOptions)`}
         codeEx={``}
         code={`/**
 * @description 
 * Tranform a ts.Node \\
 * (default node-type is ts.Sourcefile)
 * @see http://vsc-base.org/#tsTransformSourceFile
 * @param sourceFile 
 * @param transformers 
 * @param compilerOptions 
 * @internal
 * @experimental This method can easily change, because ts api is in experimental state.
 * @vscType ts
 * @oneLineEx const result = tsTransformSourceFile(sourceFile, transformers, compilerOptions)
 */
export const tsTransformSourceFile = <T extends ts.Node = ts.SourceFile>(
   sourceFile: T,
   transformers: ts.TransformerFactory<T>[],
   compilerOptions: ts.CompilerOptions = vsc.DefaultTsCompilerOptions
) => \{
   return ts.transform<T>(sourceFile, transformers, compilerOptions)
}
`}
      />
   )
}

export default TsTransformSourceFileAnnotatedCode

