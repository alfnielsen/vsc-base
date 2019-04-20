import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TsLoadModuleSourceCodeAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'tsLoadModuleSourceCode'}
         title={'tsLoadModuleSourceCode'}
         open={open}
         annotation={
            <>
               <p>
                  
 Pre method for tsLoadModule. 
               </p>
               <p>
                (This methods load the ts source, transpile it to js and replace all 'require' instance)
               </p>
            </>
         }
         
         codeOneLineEx={`const sourceJs = await vsc.tsLoadModuleSourceCode(path)`}
         codeEx={``}
         code={`/**
 * @param path, compilerOptions, moduleMap default = vsc.getVscDefaultModuleMap()
 * @vscType System
 * @returns Promise<string>
 */
export const tsLoadModuleSourceCode = async (
   path: string,
   compilerOptions: ts.CompilerOptions = vsc.TsDefaultCompilerOptions
): Promise<string> => \{
   const scriptFileTs = await vsc.getFileContent(path)
   let sourceJs = vsc.tsTranspile(scriptFileTs, compilerOptions)
   sourceJs = vsc.tsRewriteTranpiledCodeWithVscBaseModules(sourceJs)
   return sourceJs;
}
`}
      />
   )
}

export default TsLoadModuleSourceCodeAnnotatedCode

