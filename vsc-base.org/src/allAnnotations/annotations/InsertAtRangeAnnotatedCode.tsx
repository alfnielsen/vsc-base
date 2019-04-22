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
         
         codeOneLineEx={`const success = await vsc.insertAtRange(content, range)`}
         codeEx={``}
         code={`/**
 * @param content, range, editor
 * @dependencyExternal vscode
 * @vscType Vscode
 * @returns Promise<boolean>
 */
export const insertAtRange = async (
   content: string,
   range: vscode.Range,
   editor?: vscode.TextEditor,
): Promise<boolean> => \{
   if (editor === undefined) \{
      editor = vsc.getActiveEditor()
   }
   if (editor === undefined) \{
      return Promise.resolve(false)
   }
   const snippetString = new vscode.SnippetString(content)
   await editor.insertSnippet(snippetString, range)
   return true
}
`}
      />
   )
}

export default InsertAtRangeAnnotatedCode

