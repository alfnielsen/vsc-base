import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base'



const GetVscDefaultModuleMapAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'getVscDefaultModuleMap'}
         annotation={
            <>
               <p>
                  Return the default module map of vsc-base (Used for ts compiling, module load ect)
               </p>
            </>
         }
         
         codeEx={`const moduleMap = getVscDefaultModuleMap`}
         code={`export const getVscDefaultModuleMap = (): { key: string, name: string, module: any }[] => {
   return [
      { key: 'vsc', name: 'vsc-base', module: vsc },
      { key: 'ts', name: 'typescript', module: ts },
      { key: 'fs', name: 'fs-extra', module: fs },
      { key: 'vscode', name: 'vscode', module: vscode }

   ]

}
`}
      />
   )
}

export default GetVscDefaultModuleMapAnnotatedCode

