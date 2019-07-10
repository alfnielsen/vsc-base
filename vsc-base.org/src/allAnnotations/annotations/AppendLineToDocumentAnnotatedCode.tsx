import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const AppendLineToDocumentAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'appendLineToDocument'}
         title={'appendLineToDocument'}
         open={open}
         annotation={
            <>
               <p>
                  
Append new line content in the end of the (open) document
               </p>
            </>
         }
         
         codeOneLineEx={`const success = vsc.appendLineToDocument(content)`}
         codeEx={``}
         code={`/**
 * @param content,editor
 * @dependencyInternal appendToActiveDocument
 * @vscType Vscode
 * @returns boolean
 */
export const appendLineToDocument = (
   content: string,
   editor?: vscode.TextEditor
): boolean => \{
   return vsc.appendToDocument('\\n' + content, editor)
}`}
      />
   )
}

export default AppendLineToDocumentAnnotatedCode

