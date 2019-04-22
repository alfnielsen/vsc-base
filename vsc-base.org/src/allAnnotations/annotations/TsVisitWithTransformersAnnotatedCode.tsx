import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TsVisitWithTransformersAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'tsVisitWithTransformers'}
         title={'tsVisitWithTransformers'}
         open={open}
         annotation={
            <>
               <p>
                  
 This is like a tsTranform, but it doenst transform or print content.
               </p>
               <p>
                \
               </p>
            </>
         }
         
         codeOneLineEx={`vsc.tsVisitWithTransformers(code, [visitor1, trandsformer1])`}
         codeEx={``}
         code={`/**
 * @param source, transformers, compilerOptions, printer
 * @internal internal
 * @experimental This method can easily change, because ts api is in experimental state.
 * @vscType ts
 */
export const tsVisitWithTransformers = (
   source: string,
   transformers: ts.TransformerFactory<ts.SourceFile>[],
   compilerOptions: ts.CompilerOptions = vsc.TsDefaultCompilerOptions,
): void => \{
   const sourceFile = vsc.tsCreateSourceFile(source)
   vsc.tsTransformNode(sourceFile, transformers, compilerOptions)
}

`}
      />
   )
}

export default TsVisitWithTransformersAnnotatedCode

