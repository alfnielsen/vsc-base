import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const PickAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'pick'}
         title={'pick'}
         open={open}
         annotation={
            <>
               <p>
                  
Prompt user for a question with a list of answers
               </p>
            </>
         }
         
         codeOneLineEx={`const answer = await vsc.pick(answers)`}
         codeEx={`
const list = ['yes', 'no']
const answer = await vsc.pick(list)`}
         code={`/**
 * @param path string[]
 * @dependencyExternal vscode
 * @vscType Vscode
 * @returns Promise<string | undefined>
 */
export const pick = async (answerList: string[]): Promise<string | undefined> =>
   await vscode.window.showQuickPick(answerList)`}
      />
   )
}

export default PickAnnotatedCode

