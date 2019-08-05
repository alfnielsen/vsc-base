import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const GetConfigAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'getConfig'}
         title={'getConfig'}
         open={open}
         annotation={
            <>
               <p>
                  
Get vscode project config
               </p>
            </>
         }
         
         codeOneLineEx={`const myOption = vsc.getConfig(projectName, optionName, defaultValue)`}
         codeEx={`
const myOption = vsc.getConfig('myExtension', 'doThisThing', false)`}
         code={`/**
 * @dependencyExternal vscode
 * @vscType System
 * @returns T
 */
export const getConfig = <T>(
   projectName: string,
   property: string,
   defaultValue: T
): T => \{
   return vscode.workspace
      .getConfiguration(projectName)
      .get<T>(property, defaultValue)
}`}
      />
   )
}

export default GetConfigAnnotatedCode

