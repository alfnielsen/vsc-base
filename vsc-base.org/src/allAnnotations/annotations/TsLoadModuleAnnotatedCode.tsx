import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TsLoadModuleAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'tsLoadModule'}
         title={'tsLoadModule'}
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
         
         codeOneLineEx={`const module = await vsc.tsLoadModule(path)`}
         codeEx={`let _module
try \{
   _module = await vsc.tsLoadModule(path)
} catch (e)\{
   vsc.showErrorMessage(\`Loadeding module coused an error: \$\{e}\`)
   return
}
const varifiedModule = vsc.varifyModuleMethods(_module, ['run'])
if (!varifiedModule) \{
   vsc.showErrorMessage(\`Module didnt have 'run' :: \$\{JSON.stringify(_module)}\`)
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
 * @description 
 * Load a ts file. \\
 * Transpile it to js (run time) add wrap code and execute it (using eval)! \\
 * Returning an plainObject with the scripts exports. \\
 * export default xxx transpile's to export.default \\
 * IMPORTANT Dont just run code you dont now, this can cause injection! \\
 * IMPORTANT Be carefull when running scripts that also uses tsLoadModule, this can break down entire systems! \\
 * (If you start a recursive change that dont stop..)
 * @see http://vsc-base.org/#tsLoadModule
 * @param path
 * @dependencyExternal ts
 * @dependencyInternal getFileContent, showErrorMessage
 * @vscType System
 * @oneLineEx const module = await vsc.tsLoadModule(path)
 * @ex
let _module
try \{
   _module = await vsc.tsLoadModule(path)
} catch (e)\{
   vsc.showErrorMessage(\`Loadeding module coused an error: \$\{e}\`)
   return
}
const varifiedModule = vsc.varifyModuleMethods(_module, ['run'])
if (!varifiedModule) \{
   vsc.showErrorMessage(\`Module didnt have 'run' :: \$\{JSON.stringify(_module)}\`)
   return
}
try \{
   const result = varifiedModule.run()
   await vsc.awaitResult(result)
   vsc.showMessage(\`Loaded Run resulted with value: \$\{result}\`)
} catch (e) \{
   vsc.showErrorMessage('Error: ' + e)
}
 * @returns Promise<\{ [key: string]: unknown; }>
 */
export const tsLoadModule = async (
   path: string,
   compilerOptions: ts.CompilerOptions = \{
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2015,
      libs: ['es6']
   },
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
