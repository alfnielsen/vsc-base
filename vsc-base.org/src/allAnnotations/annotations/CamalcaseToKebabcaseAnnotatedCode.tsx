import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base'



const CamalcaseToKebabcaseAnnotatedCode = () => {
   return (
      <AnnotatedCode
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
         
         codeEx={`const cssName = vsc.camalcaseToKebabcase(name)`}
         code={`export const camalcaseToKebabcase = (str: string): string =>
   str[0].toLowerCase() +
   str.substr(1).replace(/([A-Z])/g, ([letter]) => \`-${letter.toLowerCase()}\`)
`}
      />
   )
}

export default CamalcaseToKebabcaseAnnotatedCode

