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
         
         codeOneLineEx={`const success = await vsc.appendLineToDocument(content)`}
         codeEx={``}
         code={`/**
 * @param content, editor
 * @dependencyInternal appendToActiveDocument
 * @vscType Vscode
 * @returns Promise<boolean>
 */
export const appendLineToDocument = async (
   content: string,
   editor?: vscode.TextEditor
): Promise<boolean> => \{
   return await vsc.appendToDocument('\\n' + content, editor)
}


`}
      />
   )
}

export default AppendLineToDocumentAnnotatedCode

