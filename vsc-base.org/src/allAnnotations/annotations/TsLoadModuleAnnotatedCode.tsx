import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TsLoadModuleAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'tsLoadModule'}
         title={'tsLoadModule'}
         open={open}
         annotation={
            <>
               <p>
                  
 Load a ts file. 
               </p>
               <p>
                Transpile it to js (run time) add wrap code and execute it (using eval)! 
               </p>
               <p>
                Returning an plainObject with the scripts exports. 
               </p>
               <p>
                export default xxx transpile's to export.default 
               </p>
               <p>
                IMPORTANT Dont just run code you dont now, this can cause injection! 
               </p>
               <p>
                IMPORTANT Be carefull when running scripts that also uses tsLoadModule, this can break down entire systems! 
               </p>
               <p>
                (If you start a recursive change that dont stop..)
               </p>
            </>
         }
         
         codeOneLineEx={`const moduleObj = await vsc.tsLoadModule(path)`}
         codeEx={`let moduleObj
try \{
   moduleObj = await vsc.tsLoadModule(path)
} catch (e)\{
   vsc.showErrorMessage(\`Loadeding module coused an error: \$\{e}\`)
   return
}
const varifiedModule = vsc.varifyModuleMethods(moduleObj, ['run'])
if (!varifiedModule) \{
   vsc.showErrorMessage(\`Module didnt have 'run' :: \$\{JSON.stringify(moduleObj)}\`)
   return
}
try \{
   const result = varifiedModule.run()
   await vsc.awaitResult(result)
   vsc.showMessage(\`Loaded Run resulted with value: \$\{result}\`)
} catch (e) \{
   vsc.showErrorMessage('Error: ' + e)
}`}
         code={`/**
 * @param path
 * @dependencyExternal ts
 * @dependencyInternal getFileContent, showErrorMessage
 * @vscType System
 * @returns Promise<\{ [key: string]: unknown; }>
 */
export const tsLoadModule = async (
   path: string,
   compilerOptions: ts.CompilerOptions = vsc.TsDefaultCompilerOptions
): Promise<\{ [key: string]: unknown }> => \{
   const sourceJs = await vsc.tsLoadModuleSourceCode(path, compilerOptions)
   let _exports: \{ [key: string]: unknown } = \{}
   try \{
      _exports = loadTsModule_Eval(sourceJs)
   } catch (e) \{
      if (e instanceof TSLoadModuleError) \{
         throw e
      } else \{
         throw new TSLoadModuleError(e, sourceJs)
      }
   }
   return _exports
}

export class TSLoadModuleError extends Error \{
   constructor(
      message: string,
      public transpiledCode: string
   ) \{
      super(message)
   }
}

const loadTsModule_Eval = async (
   sourceJs: string
): Promise<\{ [key: string]: unknown }> => \{
   //Wrap code in enclosed function. Add vsc as only dependency.
   const wrapExports = \`_exports = (function()\{var exports = \{};\\n\$\{sourceJs}\\nreturn exports})()\`
   let _exports: \{ [key: string]: unknown } = \{}
   try \{
      eval(wrapExports)
   } catch (e) \{
      throw new TSLoadModuleError(e, wrapExports)
   }
   return _exports
}

`}
      />
   )
}

export default TsLoadModuleAnnotatedCode

