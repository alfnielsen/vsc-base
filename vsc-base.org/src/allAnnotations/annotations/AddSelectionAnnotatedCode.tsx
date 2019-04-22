import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const AddSelectionAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'addSelection'}
         title={'addSelection'}
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
         
         codeOneLineEx={`const success = vsc.addSelection(range)`}
         codeEx={``}
         code={`/**
 * @vscType Vscode
 * @returns boolean
 */
export const addSelection = (
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
   editor.selections.push(selection)
   return true
}


`}
      />
   )
}

export default AddSelectionAnnotatedCode

