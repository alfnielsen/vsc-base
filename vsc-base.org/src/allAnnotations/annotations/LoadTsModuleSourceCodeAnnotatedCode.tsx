import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base'



const LoadTsModuleSourceCodeAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'loadTsModuleSourceCode'}
         annotation={
            <>
               <p>
                  Pre method for loadTsModule. (This methods load the ts source, transpile it to js and replace all 'require' instance)
               </p>
            </>
         }
         
         codeEx={`const sourceJs = await vsc.loadTsModuleSourceCode(path)`}
         code={`export const loadTsModuleSourceCode = async (
   path: string,
   compilerOptions: ts.CompilerOptions = {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2015,
      libs: ['es6']
   }
): Promise<string> => {
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

