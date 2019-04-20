import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TsTransformNodeAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'tsTransformNode'}
         title={'tsTransformNode'}
         open={open}
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
         
         codeOneLineEx={`const result = vsc.tsTransformNode(sourceFile, transformers, compilerOptions)`}
         codeEx={``}
         code={`/**
 * @param sourceFile, transformers, compilerOptions
 * @internal internal
 * @experimental This method can easily change, because ts api is in experimental state.
 * @vscType ts
 */
export const tsTransformNode = <T extends ts.Node = ts.SourceFile>(
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

export default TsTransformNodeAnnotatedCode

