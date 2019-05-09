import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const InsertAtAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'insertAt'}
         title={'insertAt'}
         open={open}
         annotation={
            <>
               <p>
                  
 Insert content at position (start and optional end postion)
 Return true on success, false if the document or textEditor was not open/correct
               </p>
            </>
         }
         
         codeOneLineEx={`const success = await vsc.insertAt(content, start, end)`}
         codeEx={``}
         code={`/**
 * @param content, range, editor
 * @dependencyExternal vscode
 * @vscType Vscode
 * @returns Promise<boolean>
 */
export const insertAt = async (
   content: string,
   start: number,
   end: number = start,
   editor?: vscode.TextEditor,
   trimSpaces = false
): Promise<boolean> => \{
   if (editor === undefined) \{
      editor = vsc.getActiveEditor()
   }
   if (editor === undefined) \{
      return Promise.resolve(false)
   }
   const source = editor.document.getText();
   const pos = vsc.createVscodeRangeAndPosition(source, start, end, trimSpaces)
   const snippetString = new vscode.SnippetString(content)
   await editor.insertSnippet(snippetString, pos.range)
   return true
}
`}
      />
   )
}

export default InsertAtAnnotatedCode

