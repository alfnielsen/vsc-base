import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base'



const PickAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'pick'}
         annotation={
            <>
               <p>
                  Prompt user for a question with a list of answers
               </p>
            </>
         }
         
         codeEx={`const answer = await vsc.pick(answers)`}
         code={`export const pick = async (answerList: string[]): Promise<string | undefined> =>
   await vscode.window.showQuickPick(answerList)
`}
      />
   )
}

export default PickAnnotatedCode

