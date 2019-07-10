import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const InsertAtRangeAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'insertAtRange'}
         title={'insertAtRange'}
         open={open}
         annotation={
            <>
               <p>
                  
Insert content at vscode.Range
Return true on success, false if the document or textEditor was not open/correct
               </p>
            </>
         }
         
         codeOneLineEx={`const success = vsc.insertAtRange(content, range)`}
         codeEx={``}
         code={`/**
 * @param content,range,editor
 * @dependencyExternal vscode
 * @vscType Vscode
 * @returns boolean
 */
export const insertAtRange = (
   content: string,
   range: vscode.Range,
   editor?: vscode.TextEditor,
): boolean => \{
   if (editor === undefined) \{
      editor = vsc.getActiveEditor()
   }
   if (editor === undefined) \{
      return false
   }
   // Use TextEdit to avoid scrolling the document
   const edits: vscode.TextEdit[] = []
   edits.push(vscode.TextEdit.replace(range, content))
   const workspaceEdit = new vscode.WorkspaceEdit();
   workspaceEdit.set(editor.document.uri, edits);
   vscode.workspace.applyEdit(workspaceEdit);
   return true
}`}
      />
   )
}

export default InsertAtRangeAnnotatedCode

