import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const SetSelectionsFromRangesAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'setSelectionsFromRanges'}
         title={'setSelectionsFromRanges'}
         open={open}
         annotation={
            <>
               <p>
                  
Set Selections for an TextEditor (Current document) 
               </p>
               <p>
               Clear other selections 
               </p>
               <p>
               returns true on success
               </p>
            </>
         }
         
         codeOneLineEx={`const success = vsc.setSelectionsFromRanges(ranges)`}
         codeEx={``}
         code={`/**
 * @param range,editor
 * @vscType Vscode
 * @returns boolean
 */
export const setSelectionsFromRanges = (
   range: vscode.Range[],
   editor?: vscode.TextEditor,
): boolean => \{
   if (!editor) \{
      editor = vsc.getActiveEditor()
   }
   if (!editor) \{
      return false;
   }
   editor.selections = range.map(range => new vscode.Selection(range.start, range.end))
   return true
}`}
      />
   )
}

export default SetSelectionsFromRangesAnnotatedCode

