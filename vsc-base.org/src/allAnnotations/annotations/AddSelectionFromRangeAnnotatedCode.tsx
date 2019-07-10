import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const AddSelectionFromRangeAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'addSelectionFromRange'}
         title={'addSelectionFromRange'}
         open={open}
         annotation={
            <>
               <p>
                  
Add a Selection for an TextEditor (Current document) 
               </p>
               <p>
               returns true on success
               </p>
            </>
         }
         
         codeOneLineEx={`const success = vsc.addSelectionFromRange(range)`}
         codeEx={``}
         code={`/**
 * @param range,editor
 * @vscType Vscode
 * @returns boolean
 */
export const addSelectionFromRange = (
   range: vscode.Range,
   editor?: vscode.TextEditor,
): boolean => \{
   if (!editor) \{
      editor = vsc.getActiveEditor()
   }
   if (!editor) \{
      return false;
   }
   editor.selections = [new vscode.Selection(range.start, range.end), ...editor.selections]
   return true
}`}
      />
   )
}

export default AddSelectionFromRangeAnnotatedCode

