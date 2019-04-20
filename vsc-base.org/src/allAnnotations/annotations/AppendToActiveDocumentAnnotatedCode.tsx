import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const AppendToActiveDocumentAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'appendToActiveDocument'}
         title={'appendToActiveDocument'}
         open={open}
         annotation={
            <>
               <p>
                  
 Append new content in the end of the open document. 
               </p>
               <p>
                Return true for succes, and false if there was no active editor or open document
               </p>
            </>
         }
         
         codeOneLineEx={`const success = await vsc.appendToActiveDocument(content)`}
         codeEx={``}
         code={`/**
 * @param content
 * @dependencyInternal getActiveDocument, getActiveEditor
 * @dependencyExternal vscode
 * @vscType Vscode
 * @returns Promise<boolean>
 */
export const appendToActiveDocument = async (
   content: string
): Promise<boolean> => \{
   const document = vsc.getActiveDocument()
   const editor = vsc.getActiveEditor()
   if (document && editor) \{
      await vsc.appendToDocument(editor, document, content)
      return true
   }
   return false
}`}
      />
   )
}

export default AppendToActiveDocumentAnnotatedCode

