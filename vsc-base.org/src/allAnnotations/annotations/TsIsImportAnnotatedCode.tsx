import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TsIsImportAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'tsIsImport'}
         title={'tsIsImport'}
         open={open}
         annotation={
            <>
               <p>
                  
 Test is a node is an import declaration (node: ts.ImportDeclaration) 
               </p>
               <p>
                and optional test for its default ímport name ( import x from '' )
 hasSpecifiers ( import names in brakes: import &#123; x &#125; from '').
               </p>
               <p>
                or nameSpace import name: ( import * as namespace from '' ) 
               </p>
               <p>
                or path for matching the source path. 
               </p>
               <p>
                or direct import which has no import names ( import form '' ) 
               </p>
               <p>
                Note: An alias in a specifier is its name: ( import &#123; some as x &#125; from '' ). 
               </p>
               <p>
                See also <a href='http://vsc-base.org/#tsMatchImport'>tsMatchImport</a>
               </p>
            </>
         }
         
         codeOneLineEx={`const isImport = vsc.tsIsImport(node, options)`}
         codeEx={`
const isImport = vsc.tsIsImport(node, \{ path: /react/ })`}
         code={`/**
 * @vscType ts
 * @returns boolean
 */
export const tsIsImport: (node: ts.Node | undefined, options?: \{
   path?: RegExp | string
   direct: boolean,
   defaultName?: RegExp | string
   nameSpace?: RegExp | string
   hasSpecifiersName?: RegExp | string
}) => boolean = (node, options) => \{
   return !!vsc.tsMatchImport(node, options)
}



`}
      />
   )
}

export default TsIsImportAnnotatedCode

