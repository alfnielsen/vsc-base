import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const CreateSelectionAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'createSelection'}
         title={'createSelection'}
         open={open}
         annotation={
            <>
               <p>
                  
 Create a vscode.Selection \
               </p>
            </>
         }
         
         codeOneLineEx={`const selection = vsc.createSelection(start, end)`}
         codeEx={``}
         code={`/**
 * @param range, editor
 * @vscType Vscode
 * @returns vscode.Selection
 */
export const createSelection = (
   source: string,
   start: number,
   end: number = start,
): vscode.Selection => \{
   const complexRangeObject = vsc.getComplexRangeObject(source, start, end)
   const selection = new vscode.Selection(complexRangeObject.startPosition, complexRangeObject.endPosition)
   return selection
}

`}
      />
   )
}

export default CreateSelectionAnnotatedCode

