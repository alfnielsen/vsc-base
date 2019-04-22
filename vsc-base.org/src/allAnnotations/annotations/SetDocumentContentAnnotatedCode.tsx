import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const SetDocumentContentAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'setDocumentContent'}
         title={'setDocumentContent'}
         open={open}
         annotation={
            <>
               <p>
                  
 Set current open file's content. 
               </p>
               <p>
                Return true if success, and false if there was no active TextEditor or open Document.
               </p>
            </>
         }
         
         codeOneLineEx={`const success = await vsc.setDocumentContent(content)`}
         codeEx={``}
         code={`/**
 * @param content, editor
 * @dependencyInternal insertAtRange
 * @dependencyExternal vscode
 * @vscType Vscode
 * @returns Promise<boolean>
 */
export const setDocumentContent = async (
   content: string,
   editor?: vscode.TextEditor,
): Promise<boolean> => \{
   if (editor === undefined) \{
      editor = vsc.getActiveEditor()
   }
   if (editor === undefined) \{
      return Promise.resolve(false)
   }
   const fullRange = vsc.getFullDocumentRange(editor.document)
   return await insertAtRange(content, fullRange, editor);
}
`}
      />
   )
}

export default SetDocumentContentAnnotatedCode

