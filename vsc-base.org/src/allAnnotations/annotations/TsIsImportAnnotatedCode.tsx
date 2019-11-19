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
               and optional test for its default ímport name ( import x from &#039;&#039; )
hasSpecifiers ( import names in brakes: import &amp;#123; x &amp;#125; from &#039;&#039;).
               </p>
               <p>
               or nameSpace import name: ( import * as namespace from &#039;&#039; ) 
               </p>
               <p>
               or path for matching the source path. 
               </p>
               <p>
               or direct import which has no import names ( import form &#039;&#039; ) 
               </p>
               <p>
               Note: An alias in a specifier is its name: ( import &amp;#123; some as x &amp;#125; from &#039;&#039; ). 
               </p>
               <p>
               See also <a href='http://vsc-base.org/#tsMatchImport'>tsMatchImport</a>
               </p>
            </>
         }
         
         codeOneLineEx={`const isImport = vsc.tsIsImport(node, options)`}
         codeEx={`
const isImport = vsc.tsIsImport(
  node,
  \{
    path: /react/
  }
)`}
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
}`}
      />
   )
}

export default TsIsImportAnnotatedCode

