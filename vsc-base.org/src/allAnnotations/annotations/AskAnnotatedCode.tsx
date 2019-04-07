import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base'



const AskAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'ask'}
         annotation={
            <>
               <p>
                  Prompt user for a question
               </p>
            </>
         }
         
         codeEx={`const answer = await vsc.ask(question, defaultValue)`}
         code={`export const ask = async (
   question: string,
   defaultValue: string
): Promise<string | undefined> =>
   await vscode.window.showInputBox({
      prompt: question,
      value: defaultValue
   })
`}
      />
   )
}

export default AskAnnotatedCode

