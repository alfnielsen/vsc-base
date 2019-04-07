import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base'



const GetConfigAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'getConfig'}
         annotation={
            <>
               <p>
                  Get vscode project config
               </p>
            </>
         }
         
         codeEx={`const myOption = vsc.getConfig(projectName, optionName, defaultValue)`}
         code={`export const getConfig = <T>(
   projectName: string,
   property: string,
   defaultValue: T
): T => {
   return vscode.workspace
      .getConfiguration(projectName)
      .get<T>(property, defaultValue)
}
`}
      />
   )
}

export default GetConfigAnnotatedCode

