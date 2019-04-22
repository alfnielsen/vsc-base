import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TsTransformAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'tsTransform'}
         title={'tsTransform'}
         open={open}
         annotation={
            <>
               <p>
                  
 Tranform source code using custom transformers 
               </p>
               <p>
                See tsCreateTransformer and tsCreateRemoveNodesTransformer for creating transformer 
               </p>
               <p>
                
               </p>
               <p>
                See also <a href='http://vsc-base.org/#tsCreateTransformer'>tsCreateTransformer</a> and <a href='http://vsc-base.org/#tsCreateRemoveNodesTransformer'>tsCreateRemoveNodesTransformer</a>
               </p>
            </>
         }
         
         codeOneLineEx={`const updatedCode = vsc.tsTransform(code, [tranformer1, tranformer2])`}
         codeEx={``}
         code={`/**
 * @param source, transformers, compilerOptions, printer
 * @internal internal
 * @experimental This method can easily change, because ts api is in experimental state.
 * @vscType ts
 */
export const tsTransform = (
   source: string,
   transformers: ts.TransformerFactory<ts.SourceFile>[],
   compilerOptions: ts.CompilerOptions = vsc.TsDefaultCompilerOptions,
   printer: ts.Printer = ts.createPrinter()
): string => \{
   const sourceFile = vsc.tsCreateSourceFile(source)
   const result = vsc.tsTransformNode(sourceFile, transformers, compilerOptions)
   const transformedSourceFile = result.transformed[0];
   if (!transformedSourceFile) \{
      throw new Error('Transformer did not return correct SourceFile')
   }
   const print = printer.printFile(transformedSourceFile)
   result.dispose()
   return print
}


`}
      />
   )
}

export default TsTransformAnnotatedCode

