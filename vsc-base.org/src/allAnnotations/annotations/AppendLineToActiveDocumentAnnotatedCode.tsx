import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const AppendLineToActiveDocumentAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'appendLineToActiveDocument'}
         title={'appendLineToActiveDocument'}
         open={open}
         annotation={
            <>
               <p>
                  
 Append new line content in the end of the open document
               </p>
            </>
         }
         
         codeOneLineEx={`const success = await vsc.appendLineToActiveDocument(content)`}
         codeEx={``}
         code={`/**
 * @param content
 * @dependencyInternal appendToActiveDocument
 * @vscType Vscode
 * @returns Promise<boolean>
 */
export const appendLineToActiveDocument = async (
   content: string
): Promise<boolean> => \{
   return await vsc.appendToActiveDocument('\\n' + content)
}
`}
      />
   )
}

export default AppendLineToActiveDocumentAnnotatedCode

