import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const SetSelectionAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'setSelection'}
         title={'setSelection'}
         open={open}
         annotation={
            <>
               <p>
                  
 Set Selection for an TextEditor (Current document) 
               </p>
               <p>
                Clear other selections. 
               </p>
               <p>
                returns true on success
               </p>
            </>
         }
         
         codeOneLineEx={`const success = vsc.setSelection(start, end)`}
         codeEx={``}
         code={`/**
 * @param range, editor
 * @vscType Vscode
 * @returns boolean
 */
export const setSelection = (
   start: number,
   end: number = start,
   editor?: vscode.TextEditor,
): boolean => \{
   if (!editor) \{
      editor = vsc.getActiveEditor()
   }
   if (!editor) \{
      return false;
   }
   const source = editor.document.getText()
   const selection = vsc.createSelection(source, start, end)
   editor.selections = [] // clear selections
   editor.selection = selection
   return true
}
`}
      />
   )
}

export default SetSelectionAnnotatedCode

