import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base'



const SetActiveDocumentContentAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'setActiveDocumentContent'}
         annotation={
            <>
               <p>
                  Set current open file's content.
               </p>
               <p>
                Return true if success, and false if there was no ActiveTextEditor or OpenDocument.
               </p>
            </>
         }
         
         codeEx={`const success = await vsc.setActiveDocumentContent(content)`}
         code={`export const setActiveDocumentContent = async (
   content: string
): Promise<boolean> => {
   const document = vsc.getActiveDocument()
   const editor = vsc.getActiveEditor()
   if (editor && document) {
      const fullRange = vsc.getFullDocumentRange(document)
      const snippetString = new vscode.SnippetString(content)
      await editor.insertSnippet(snippetString, fullRange)
      return true
   }
   return false
}
`}
      />
   )
}

export default SetActiveDocumentContentAnnotatedCode

