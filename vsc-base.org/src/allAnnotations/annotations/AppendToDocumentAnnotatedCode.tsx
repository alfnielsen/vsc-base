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
                  
 Append new content in the end of the (open) document. 
               </p>
               <p>
                Return true on success
               </p>
            </>
         }
         
         codeOneLineEx={`await vsc.appendToDocument(editor, document, content)`}
         codeEx={``}
         code={`/**
 * @param content, document, editor
 * @dependencyExternal vscode
 * @vscType Vscode
 * @returns Promise<boolean>
 */
export const appendToDocument = async (
   content: string,
   editor?: vscode.TextEditor
): Promise<boolean> => \{
   if (!editor) \{
      editor = vsc.getActiveEditor()
   }
   if (!editor) \{
      return Promise.resolve(false)
   }
   const startPosition = new vscode.Position(editor.document.lineCount, 0)
   const endPosition = new vscode.Position(editor.document.lineCount, 0)
   const fullRange = new vscode.Range(startPosition, endPosition)
   return await insertAtRange(content, fullRange, editor);
}

`}
      />
   )
}

export default AppendToDocumentAnnotatedCode

