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
         
         codeOneLineEx={`const success = vsc.prependLineToDocument(content)`}
         codeEx={``}
         code={`/**
 * @param content,document,editor
 * @vscType Vscode
 * @returns boolean
 */
export const prependLineToDocument = (
   content: string,
   editor?: vscode.TextEditor
): boolean => \{
   return vsc.prependToDocument(content + '\\n', editor)
}`}
      />
   )
}

export default PrependLineToDocumentAnnotatedCode

