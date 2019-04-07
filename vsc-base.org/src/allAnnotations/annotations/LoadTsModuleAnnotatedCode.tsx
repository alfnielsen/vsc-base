import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base'



const LoadTsModuleAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'loadTsModule'}
         annotation={
            <>
               <p>
                  Load a ts file. Transpile it to js (run time) add wrap code and execute it (using eval)!
               </p>
               <p>
                Returning an plainObject with the scripts exports.
 export default xxx transpile s to export.default
 IMPORTANT Dont just run code you dont now, this can cause injection!
 IMPORTANT Be carefull when running scripts that also uses loadTsModule, this can break down entire systems!
 (If you start a recursive change that dont stop..)
               </p>
            </>
         }
         
         codeEx={`const module = await vsc.loadTsModule(path)`}
         code={`export const loadTsModule = async (
   path: string,
   compilerOptions: ts.CompilerOptions = {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2015,
      libs: ['es6']
   },
): Promise<{ [key: string]: unknown }> => {
   const sourceJs = await vsc.loadTsModuleSourceCode(path, compilerOptions)
   let _exports: { [key: string]: unknown } = {}
   try {
      _exports = loadTsModule_Eval(sourceJs)
   } catch (e) {
      if (e instanceof LoadTsModuleError) {
         throw e
      } else {
         throw new LoadTsModuleError(e, sourceJs)
      }
   }
   return _exports
}
export class LoadTsModuleError extends Error {
   constructor(
      message: string,
      public transpiledCode: string
   ) {
      super(message)
   }
}

const loadTsModule_Eval = async (
   sourceJs: string
): Promise<{ [key: string]: unknown }> => {
   //Wrap code in enclosed function. Add vsc as only dependency.
   const wrapExports = \`_exports = (function(){var exports = {};\n${sourceJs}\nreturn exports})()\`

   let _exports: { [key: string]: unknown } = {}
   try {
      eval(wrapExports)
   } catch (e) {
      throw new LoadTsModuleError(e, wrapExports)
   }
   return _exports
}

`}
      />
   )
}

export default LoadTsModuleAnnotatedCode

