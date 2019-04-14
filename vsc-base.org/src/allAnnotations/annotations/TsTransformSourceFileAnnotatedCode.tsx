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
                  
 Tranform a ts.Node 
               </p>
               <p>
                (default node-type is ts.Sourcefile)
               </p>
            </>
         }
         
         codeOneLineEx={`const result = tsTransformSourceFile(sourceFile, transformers, compilerOptions)`}
         codeEx={``}
         code={`/**
 * @param sourceFile, transformers, compilerOptions
 * @internal internal
 * @experimental This method can easily change, because ts api is in experimental state.
 * @vscType ts
 */
export const tsTransformSourceFile = <T extends ts.Node = ts.SourceFile>(
   sourceFile: T,
   transformers: ts.TransformerFactory<T>[],
   compilerOptions: ts.CompilerOptions = vsc.TsDefaultCompilerOptions
) => \{
   return ts.transform<T>(sourceFile, transformers, compilerOptions)
}
`}
      />
   )
}

export default TsTransformSourceFileAnnotatedCode

