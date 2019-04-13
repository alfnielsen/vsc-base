import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const SetActiveDocumentContentAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'setActiveDocumentContent'}
         title={'setActiveDocumentContent'}
         annotation={
            <>
               <p>
                  
               </p>
               <p>
                Set current open file's content. \
 Return true if success, and false if there was no ActiveTextEditor or OpenDocument.
               </p>
            </>
         }
         
         codeOneLineEx={`const success = await vsc.setActiveDocumentContent(content)`}
         codeEx={``}
         code={`/**
 * @description 
 * Set current open file's content. \\
 * Return true if success, and false if there was no ActiveTextEditor or OpenDocument.
 * @see http://vsc-base.org/#setActiveDocumentContent
 * @param content
 * @dependencyInternal getActiveDocument, getActiveEditor
 * @dependencyExternal vscode
 * @vscType Vscode
 * @oneLineEx const success = await vsc.setActiveDocumentContent(content)
 * @returns Promise<boolean>
 */
export const setActiveDocumentContent = async (
   content: string
): Promise<boolean> => \{
   const document = vsc.getActiveDocument()
   const editor = vsc.getActiveEditor()
   if (editor && document) \{
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

