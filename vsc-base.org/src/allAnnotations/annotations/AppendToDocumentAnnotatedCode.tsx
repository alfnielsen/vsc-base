import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const AppendToDocumentAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'appendToDocument'}
         title={'appendToDocument'}
         annotation={
            <>
               <p>
                  
 Append new content in the end of the open document
               </p>
            </>
         }
         
         codeOneLineEx={`await vsc.appendToDocument(editor, document, content)`}
         codeEx={``}
         code={`/**
 * @description 
 * Append new content in the end of the open document
 * @see http://vsc-base.org/#appendToDocument
 * @param editor
 * @param document
 * @param content
 * @dependencyExternal vscode
 * @vscType Vscode
 * @oneLineEx await vsc.appendToDocument(editor, document, content)
 * @returns Promise<void>
 */
export const appendToDocument = async (
   editor: vscode.TextEditor,
   document: vscode.TextDocument,
   content: string
): Promise<void> => \{
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

