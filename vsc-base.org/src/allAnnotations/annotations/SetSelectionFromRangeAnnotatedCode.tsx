import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const SetSelectionFromRangeAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'setSelectionFromRange'}
         title={'setSelectionFromRange'}
         open={open}
         annotation={
            <>
               <p>
                  
Set Selection for an TextEditor (Current document) 
               </p>
               <p>
               Clear other selections 
               </p>
               <p>
               returns true on success
               </p>
            </>
         }
         
         codeOneLineEx={`const success = vsc.setSelectionFromRange(range)`}
         codeEx={``}
         code={`/**
 * @param range,editor
 * @vscType Vscode
 * @returns boolean
 */
export const setSelectionFromRange = (
   range: vscode.Range,
   editor?: vscode.TextEditor,
): boolean => \{
   if (!editor) \{
      editor = vsc.getActiveEditor()
   }
   if (!editor) \{
      return false;
   }
   editor.selections = [] // clear selections
   editor.selection = new vscode.Selection(range.start, range.end)
   return true
}`}
      />
   )
}

export default SetSelectionFromRangeAnnotatedCode

