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
                  
Set current open file&#039;s content. 
               </p>
               <p>
               Return true if success, and false if there was no active TextEditor or open Document.
               </p>
            </>
         }
         
         codeOneLineEx={`const success = vsc.setDocumentContent(content)`}
         codeEx={``}
         code={`/**
 * @param content,editor
 * @dependencyInternal insertAtRange
 * @dependencyExternal vscode
 * @vscType Vscode
 * @returns boolean
 */
export const setDocumentContent = (
   content: string,
   editor?: vscode.TextEditor,
): boolean => \{
   if (editor === undefined) \{
      editor = vsc.getActiveEditor()
   }
   if (editor === undefined) \{
      return false
   }
   const fullRange = vsc.getFullDocumentRange(editor.document)
   return insertAtRange(content, fullRange, editor);
}`}
      />
   )
}

export default SetDocumentContentAnnotatedCode

