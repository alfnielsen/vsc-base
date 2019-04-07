import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const GetConfigAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'getConfig'}
         title={'getConfig'}
         annotation={
            <>
               <p>
                  Get vscode project config
               </p>
            </>
         }
         
         codeOneLineEx={`const myOption = vsc.getConfig(projectName, optionName, defaultValue)`}
         codeEx={`const myOption = vsc.getConfig('myExtension', 'doThisThing', false)`}
         code={`/**
 * Get vscode project config
 * @see http://vsc-base.org/#getConfig
 * @dependencyExternal vscode
 * @oneLineEx const myOption = vsc.getConfig(projectName, optionName, defaultValue)
 * @ex const myOption = vsc.getConfig('myExtension', 'doThisThing', false)
 * @returns T
 */
export const getConfig = <T>(
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

