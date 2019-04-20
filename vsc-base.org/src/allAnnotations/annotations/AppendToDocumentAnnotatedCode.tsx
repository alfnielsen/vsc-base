import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const AppendToDocumentAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'appendToDocument'}
         title={'appendToDocument'}
         open={open}
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
 * @param editor, document, content
 * @dependencyExternal vscode
 * @vscType Vscode
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

