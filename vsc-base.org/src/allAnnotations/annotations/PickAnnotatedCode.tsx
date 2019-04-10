import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const PickAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'pick'}
         title={'pick'}
         annotation={
            <>
               <p>
                  Prompt user for a question with a list of answers
               </p>
            </>
         }
         
         codeOneLineEx={`const answer = await vsc.pick(answers)`}
         codeEx={`
 const list = \\['yes', 'no']
 const answer = await vsc.pick(list)`}
         code={`/**
 * Prompt user for a question with a list of answers
 * @see http://vsc-base.org/#pick
 * @param path string[]
 * @dependencyExternal vscode
 * @vscType Vscode
 * @oneLineEx const answer = await vsc.pick(answers)
 * @ex 
 const list = \\['yes', 'no']
 const answer = await vsc.pick(list)
 * @returns Promise<string | undefined>
 */
export const pick = async (answerList: string[]): Promise<string | undefined> =>
   await vscode.window.showQuickPick(answerList)
`}
      />
   )
}

export default PickAnnotatedCode

