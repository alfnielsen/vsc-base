import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import { getRelativePath, getRelativePath_testPrinter } from '../vsc-base/vsc-base-raw.1'

import MethodTestPrinter from '../components/MethodTestPrinter/MethodTestPrinter';

const RelatrivePathAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title='relatrivePath'
         annotation={<p>Generate relative path between two paths.</p>}
         test={
            <MethodTestPrinter method={getRelativePath_testPrinter} />
         }
         codeEx={`const _relativePath = relatrivePath(fromPath, toPath)`}
         code={getRelativePath.toString()}
      />
   )
}

export default RelatrivePathAnnotatedCode
