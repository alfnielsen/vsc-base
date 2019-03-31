import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base/vsc-base-raw'

import MethodTest from 'components/MethodTest/MethodTest'

const CamalcaseToKebabcaseAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'camalcaseToKebabcase'}
         annotation={
            <>
               <p>This method transform a str from camel-case to kebbeb-case.</p>
               <p>Commonly used to define css class names</p>
            </>
         }
         test={
            <MethodTest
               initialArgs={{
                  str: 'SomeName'
               }}
               onClickCall={(args, setResult) => {
                  const res = vsc.camalcaseToKebabcase(args.str)
                  setResult(res)
               }}
            />
         }
         codeEx={`const cssName = camalcaseToKebabcase(name)`}
         code={`/**
 * Format a string from camel-case to kebab-case. 
 * Commonly used to define css class names.
 * @param str
 */
const camalcaseToKebabcase = (str: string): string =>
   str[0].toLowerCase() + str.substr(1).replace(/([A-Z])/g, ([letter]) => \`-\${letter.toLowerCase()}\`)
`}
      />
   )
}

export default CamalcaseToKebabcaseAnnotatedCode
