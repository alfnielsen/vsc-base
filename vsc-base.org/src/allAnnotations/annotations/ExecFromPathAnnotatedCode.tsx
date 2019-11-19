import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const ExecFromPathAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'execFromPath'}
         title={'execFromPath'}
         open={open}
         annotation={
            <>
               <p>
                  
Execute a bash command. 
               </p>
               <p>
               (Execute a command using child-process-promise) 
               </p>
               <p>
               <b>NOTE:</b> If you use this method in an extension the end user need to be able to actually 
execute the command! 
               </p>
               <p>
               This method is mostly design for vsc-script&#039;s, where you have control of the environment. 
               </p>
               <p>
               See also <a href='http://vsc-base.org/#writeToTerminal'>vsc.writeToTerminal</a>
               </p>
            </>
         }
         
         codeOneLineEx={`const result = await vsc.execFromPath(command, path)`}
         codeEx={``}
         code={`/**
 * @param path,content
 * @vscType System
 * @dependencyExternal fs
 * @returns Promise<cp.PromiseResult<string>>
 */
export const execFromPath = async (command: string, path: string): Promise<cp.PromiseResult<string>> => \{
   return await cp.exec(\`cd \$\{path} && \$\{command}\`);
}`}
      />
   )
}

export default ExecFromPathAnnotatedCode

