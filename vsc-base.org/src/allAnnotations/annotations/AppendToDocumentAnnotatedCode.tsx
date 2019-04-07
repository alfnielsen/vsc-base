import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base'



const AppendToDocumentAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'appendToDocument'}
         annotation={
            <>
               <p>
                  Append new content in the end of the open document
               </p>
            </>
         }
         
         codeEx={`await vsc.appendToDocument(editor, document, content)`}
         code={`export const appendToDocument = async (
   editor: vscode.TextEditor,
   document: vscode.TextDocument,
   content: string
): Promise<void> => {
   const startPosition = new vscode.Position(document.lineCount, 0)
   const endPosition = new vscode.Position(document.lineCount, 0)
   const fullRange = new vscode.Range(startPosition, endPosition)
   const snippetString = new vscode.SnippetString(content)
   await editor.insertSnippet(snippetString, fullRange)
}
`}
      />
   )
}

export default AppendToDocumentAnnotatedCode

