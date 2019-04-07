import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const CamalcaseToKebabcaseAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'camalcaseToKebabcase'}
         title={'camalcaseToKebabcase'}
         annotation={
            <>
               <p>
                  Format a string from camel-case to kebab-case. 
               </p>
               <p>
                Commonly used to define css class names. (SomeName => some-name)
               </p>
            </>
         }
         
         codeOneLineEx={`const cssName = vsc.camalcaseToKebabcase(name)`}
         codeEx={``}
         code={`/**
 * Format a string from camel-case to kebab-case. 
 * Commonly used to define css class names. (SomeName => some-name)
 * @see http://vsc-base.org/#camalcaseToKebabcase
 * @param str
 * @oneLineEx const cssName = vsc.camalcaseToKebabcase(name)
 * @returns string
 */
export const camalcaseToKebabcase = (str: string): string =>
   str[0].toLowerCase() +
   str.substr(1).replace(/([A-Z])/g, ([letter]) => \`-\${letter.toLowerCase()}\`)
`}
      />
   )
}

export default CamalcaseToKebabcaseAnnotatedCode

