import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TsCreateProgramAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'tsCreateProgram'}
         title={'tsCreateProgram'}
         open={open}
         annotation={
            <>
               <p>
                  
Creates a ts program with one file and a compiler host. 
               </p>
               <p>
               This is needed for getting a real program with typeChecker.
               </p>
            </>
         }
         
         codeOneLineEx={`const [program, sourceFile] = vsc.tsCreateProgram(code)`}
         codeEx={``}
         code={`/**
 * @param source,transformers,compilerOptions,printer
 * @internal internal
 * @experimental This method can easily change, because ts api is in experimental state.
 * @vscType ts
 */
export const tsCreateProgram = (
   code: string,
   sourceFileName = 'sourceFile.ts',
   compilerOptions = vsc.TsDefaultCompilerOptions,
   compilerHost = ts.createCompilerHost(compilerOptions)
) => \{
   let innerSourceFile: ts.SourceFile | undefined
   compilerHost.getSourceFile = (fileName) => \{
      innerSourceFile = innerSourceFile || ts.createSourceFile(fileName, code, ts.ScriptTarget.ES2015, true);
      return sourceFile;
   };
   const program = ts.createProgram([sourceFileName], vsc.TsDefaultCompilerOptions, compilerHost);
   let emitResult = program.emit();
   const sourceFile = program.getSourceFile(sourceFileName)
   return [program, sourceFile]
}`}
      />
   )
}

export default TsCreateProgramAnnotatedCode

