import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'

const AskAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'ask'}
         annotation={
            <>
               <p>Prompt user with a quition.</p>
            </>
         }
         codeEx={`const answer = await ask(question, defaultValue)`}
         code={`/**
 * Prompt user with a question   
 * @param path
 */
const ask = async (question: string, defaultValue: string): Promise<string | undefined> =>
	await vscode.window.showInputBox({
		prompt: question,
		value: defaultValue
	})
`}
      />
   )
}

export default AskAnnotatedCode
