import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const SetSelectionsAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'setSelections'}
         title={'setSelections'}
         open={open}
         annotation={
            <>
               <p>
                  
 Set Selections for an TextEditor (Current document) 
               </p>
               <p>
                Takes a ranges array postions with start and end.
 Clear other selections. 
               </p>
               <p>
                returns true on success
               </p>
            </>
         }
         
         codeOneLineEx={`const success = vsc.setSelections(ranges)`}
         codeEx={``}
         code={`/**
 * @param range, editor
 * @vscType Vscode
 * @returns boolean
 */
export const setSelections = (
   ranges: \{ start: number, end: number }[],
   editor?: vscode.TextEditor,
): boolean => \{
   if (!editor) \{
      editor = vsc.getActiveEditor()
   }
   if (!editor) \{
      return false;
   }
   const source = editor.document.getText()
   editor.selections = ranges.map((range) => vsc.createSelection(source, range.start, range.end))
   return true
}

`}
      />
   )
}

export default SetSelectionsAnnotatedCode

