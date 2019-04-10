import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const LoadTsModuleSourceCodeAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'loadTsModuleSourceCode'}
         title={'loadTsModuleSourceCode'}
         annotation={
            <>
               <p>
                  Pre method for loadTsModule. (This methods load the ts source, transpile it to js and replace all 'require' instance)
               </p>
            </>
         }
         
         codeOneLineEx={`const sourceJs = await vsc.loadTsModuleSourceCode(path)`}
         codeEx={``}
         code={`/**
 * Pre method for loadTsModule. (This methods load the ts source, transpile it to js and replace all 'require' instance)
 * @see http://vsc-base.org/#loadTsModuleSourceCode
 * @param path
 * @param compilerOptions 
 * @param moduleMap default = vsc.getVscDefaultModuleMap()
 * @vscType System
 * @oneLineEx const sourceJs = await vsc.loadTsModuleSourceCode(path)
 * @returns Promise<string>
 */
export const loadTsModuleSourceCode = async (
   path: string,
   compilerOptions: ts.CompilerOptions = \{
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2015,
      libs: ['es6']
   }
): Promise<string> => \{
   const scriptFileTs = await vsc.getFileContent(path)
   let sourceJs = vsc.transpileTs(scriptFileTs, compilerOptions)
   sourceJs = vsc.rewriteTstranpiledCodeWithVscBaseModules(sourceJs)
   return sourceJs;
}
`}
      />
   )
}

export default LoadTsModuleSourceCodeAnnotatedCode

