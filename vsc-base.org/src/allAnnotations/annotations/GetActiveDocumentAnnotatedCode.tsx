import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const GetActiveDocumentAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'getActiveDocument'}
         title={'getActiveDocument'}
         open={open}
         annotation={
            <>
               <p>
                  
 Get open vscode.TextDocument
               </p>
            </>
         }
         
         codeOneLineEx={`const document = vsc.getActiveDocument()`}
         codeEx={``}
         code={`/**
 * @dependencyExternal vscode
 * @vscType Vscode
 * @returns vscode.TextDocument | undefined
 */
export const getActiveDocument = (): vscode.TextDocument | undefined => \{
   const activeEditor = vsc.getActiveEditor()
   const document = activeEditor && activeEditor.document
   return document
}
`}
      />
   )
}

export default GetActiveDocumentAnnotatedCode

