import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const AskAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'ask'}
         title={'ask'}
         annotation={
            <>
               <p>
                  
 Prompt user for a question
               </p>
            </>
         }
         
         codeOneLineEx={`const answer = await vsc.ask(question, defaultValue)`}
         codeEx={`const answer = await ask('Where to move file?', currentFilePath)`}
         code={`/**
 * @description 
 * Prompt user for a question
 * @see http://vsc-base.org/#ask
 * @param question string
 * @param defaultValue string
 * @dependencyExternal vscode
 * @vscType Vscode
 * @oneLineEx const answer = await vsc.ask(question, defaultValue)
 * @ex const answer = await ask('Where to move file?', currentFilePath)
 * @returns Promise<string | undefined>
 */
export const ask = async (
   question: string,
   defaultValue: string
): Promise<string | undefined> =>
   await vscode.window.showInputBox(\{
      prompt: question,
      value: defaultValue
   })
`}
      />
   )
}

export default AskAnnotatedCode

