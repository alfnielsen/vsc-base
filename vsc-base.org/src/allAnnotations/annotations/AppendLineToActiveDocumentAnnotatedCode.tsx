import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const AppendLineToActiveDocumentAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'appendLineToActiveDocument'}
         title={'appendLineToActiveDocument'}
         annotation={
            <>
               <p>
                  
               </p>
               <p>
                Append new line content in the end of the open document
               </p>
            </>
         }
         
         codeOneLineEx={`const success = await vsc.appendLineToActiveDocument(content)`}
         codeEx={``}
         code={`/**
 * @description 
 * Append new line content in the end of the open document
 * @see http://vsc-base.org/#appendLineToActiveDocument
 * @param content
 * @dependencyInternal appendToActiveDocument
 * @vscType Vscode
 * @oneLineEx const success = await vsc.appendLineToActiveDocument(content)
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

