import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const PrependLineToDocumentAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'prependLineToDocument'}
         title={'prependLineToDocument'}
         open={open}
         annotation={
            <>
               <p>
                  
 Prepend new line content in the start of the (open) document
               </p>
            </>
         }
         
         codeOneLineEx={`const success = await vsc.appendLineToActiveDocument(content)`}
         codeEx={``}
         code={`/**
 * @param content, document, editor
 * @dependencyInternal appendToActiveDocument
 * @vscType Vscode
 * @returns Promise<boolean>
 */
export const prependLineToDocument = async (
   content: string,
   editor?: vscode.TextEditor
): Promise<boolean> => \{
   return await vsc.prependToDocument(content + '\\n', editor)
}
`}
      />
   )
}

export default PrependLineToDocumentAnnotatedCode

