import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const AskAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'ask'}
         title={'ask'}
         open={open}
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
 * @param question string, defaultValue string
 * @dependencyExternal vscode
 * @vscType Vscode
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

