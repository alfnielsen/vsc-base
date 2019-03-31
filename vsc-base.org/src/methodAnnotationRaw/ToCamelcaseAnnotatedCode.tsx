import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base/vsc-base-raw'

import MethodTest from 'components/MethodTest/MethodTest'

const ToCamelcaseAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'toCamelcase'}
         annotation={
            <>
               <p>Format a string to camal-case</p>
               <p>Commonly used to variable names.</p>
               <p>
                  <b>Ex</b>
                  <ul>
                     <li>Some-Name => someName</li>
                     <li>some_name => someName</li>
                     <li>some.name => someName</li>
                     <li>SomeName => someName</li>
                  </ul>
               </p>
            </>
         }
         test={
            <MethodTest
               initialArgs={{
                  str: 'some-pretty_wired.name'
               }}
               onClickCall={(args, setResult) => {
                  const res = vsc.toCamelcase(args.str)
                  setResult(res)
               }}
            />
         }
         codeEx={`cont name = toCamelcase(kebabName)`}
         code={`/**
 * Format a string to camal-case. 
 * Commonly used to define js/ts variable names.
 * @param str
 */
const toCamelcase = (str: string): string =>
   str[0].toLowerCase() + str.substr(1).replace(/[^a-zA-Z]+(.)/g, (_match, chr) => chr.toUpperCase())

`}
      />
   )
}

export default ToCamelcaseAnnotatedCode
