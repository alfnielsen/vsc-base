import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'

const GetConfigAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'getConfig'}
         annotation={
            <>
               <p>Get vscode project config.</p>
            </>
         }
         codeEx={`const exists = getConfig('you_extension', optionName, devaultValue)`}
         code={`/**
 * Get vscode project config
 */
const getConfig = <T>(projectName: string, property: string, defaultValue: T): T => {
   return vscode.workspace.getConfiguration(projectName).get<T>(property, defaultValue)
}
`}
      />
   )
}

export default GetConfigAnnotatedCode
