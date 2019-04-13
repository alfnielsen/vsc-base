import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TsTransformAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'tsTransform'}
         title={'tsTransform'}
         annotation={
            <>
               <p>
                  
               </p>
               <p>
                Tranform source code using custom transformers \
 See createTsTransformerFactory and createTsRemoveTransformerFactory for creating transformer \
 (See http://vsc-base.org/#createTsTransformerFactory, http://vsc-base.org/#createTsRemoveTransformerFactory)
               </p>
            </>
         }
         
         codeOneLineEx={`const updatedCode = vsc.tsTransform(code, \\[tranformer1, tranformer2\\])`}
         codeEx={``}
         code={`/**
 * @description 
 * Tranform source code using custom transformers \\
 * See createTsTransformerFactory and createTsRemoveTransformerFactory for creating transformer \\
 * (See http://vsc-base.org/#createTsTransformerFactory, http://vsc-base.org/#createTsRemoveTransformerFactory)
 * @see http://vsc-base.org/#tsTransform
 * @param source 
 * @param transformers 
 * @param compilerOptions 
 * @param printer 
 * @internal
 * @experimental This method can easily change, because ts api is in experimental state.
 * @vscType ts
 * @oneLineEx const updatedCode = vsc.tsTransform(code, \\[tranformer1, tranformer2\\])
 */
export const tsTransform = (
   source: string,
   transformers: ts.TransformerFactory<ts.SourceFile>[],
   compilerOptions: ts.CompilerOptions = vsc.DefaultTsCompilerOptions,
   printer: ts.Printer = ts.createPrinter()
): string => \{
   const sourceFile = createTsSourceFile(source)
   const result = tsTransformSourceFile(sourceFile, transformers, compilerOptions)
   const transformedSourceFile = result.transformed[0];
   const print = printer.printFile(transformedSourceFile)
   result.dispose()
   return print
}

`}
      />
   )
}

export default TsTransformAnnotatedCode

