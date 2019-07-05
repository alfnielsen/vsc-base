import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TsGetLocalModulesAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'tsGetLocalModules'}
         title={'tsGetLocalModules'}
         open={open}
         annotation={
            <>
               <p>
                  
 Replace ts transpiled code's require by loading each import with another tsLoadModule execution. 
               </p>
               <p>
                This enables tsLoadModule to load files with imports. 
               </p>
               <p>
                IMPORTANT: It does not check for circular imports, which will create infinity loops!
               </p>
            </>
         }
         
         codeOneLineEx={`const sourceJs = vsc.tsGetLocalModules(baseDir, sourceJs, renameRequireToObject)`}
         codeEx={``}
         code={`/**
 * @internal this method is primary used by vsc.tsLoadModule
 * @notes  * const XX = require("XXX");
 * @vscType System
 * @param sourceJs
 * @returns string
 */
export const tsGetLocalModules = async (
   baseDir: string,
   sourceJs: string,
   renameRequireToObject: string
): Promise<[string, \{ [key: string]: any }]> => \{
   const reg = new RegExp(\`\\\\bconst (\\\\w+) = require\\\\(\\\\"([^\\\\"]+)\\\\"\\\\)\`, 'g')
   let match: RegExpExecArray | null;
   const internalModules: \{ name: string, path: string, exported: any }[] = []
   while ((match = reg.exec(sourceJs)) !== null) \{
      sourceJs = sourceJs.substring(0, match.index) + \`const \$\{match[1]} = \$\{renameRequireToObject}["\$\{match[1]}"]\` + sourceJs.substring(match.index + match[0].length)
      internalModules.push(\{
         name: match[1],
         path: match[2],
         exported: null
      })
   }
   const internalModuleExports: \{ [key: string]: any } = \{}
   for (const m of internalModules) \{
      let path = vsc.joinPaths(baseDir, m.path);
      if (!path.match(/\\.tsx?/)) \{
         path += ".ts"
      }
      m.exported = await vsc.tsLoadModule(path)
      internalModuleExports[m.name] = m.exported;
   }
   return [sourceJs, internalModuleExports]
}




`}
      />
   )
}

export default TsGetLocalModulesAnnotatedCode

