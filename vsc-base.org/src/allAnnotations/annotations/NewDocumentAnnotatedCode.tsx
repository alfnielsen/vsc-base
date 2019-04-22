import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const NewDocumentAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'newDocument'}
         title={'newDocument'}
         open={open}
         annotation={
            <>
               <p>
                  
 Open a new document (untitled and not saved).
               </p>
            </>
         }
         
         codeOneLineEx={`const path = vsc.newDocument(content)`}
         codeEx={``}
         code={`/**
 * @dependencyInternal getActiveDocument
 * @vscType Vscode
 * @returns Promise<vscode.TextDocument> 
 */
export const newDocument = async (
   content?: string,
   language: string = 'typescript'
): Promise<vscode.TextDocument> => \{
   const document = await vscode.workspace.openTextDocument(\{ language, content })
   await vscode.window.showTextDocument(document)
   return document
}

`}
      />
   )
}

export default NewDocumentAnnotatedCode

