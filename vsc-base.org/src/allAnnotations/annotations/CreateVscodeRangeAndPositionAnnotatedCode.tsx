import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const CreateVscodeRangeAndPositionAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'createVscodeRangeAndPosition'}
         title={'createVscodeRangeAndPosition'}
         open={open}
         annotation={
            <>
               <p>
                  
 Takes a start and end and return vscode positions and range objects.
               </p>
            </>
         }
         
         codeOneLineEx={`const success = vsc.createVscodeRangeAndPosition(source, start, end)`}
         codeEx={``}
         code={`/**
 * @param range, editor
 * @vscType Vscode
 * @returns boolean
 */
export const createVscodeRangeAndPosition = (source: string, start: number, end: number = start, trimSpaces = true): vsc.VscodePosition => \{
   if (trimSpaces) \{
      const found = source.substring(start, end)
      const startSpaces = found.match(/^\\s+/)
      if (startSpaces) \{
         start += startSpaces[0].length;
      }
      const endSpaces = found.match(/\\s+\$/)
      if (endSpaces) \{
         end -= endSpaces[0].length;
      }
   }
   const startLines = source.substr(0, start).split("\\n");
   const endLines = source.substr(0, end).split("\\n");
   const startLineNumber = startLines.length - 1
   const endLineNumber = endLines.length - 1
   const startPosition = new vscode.Position(startLineNumber, startLines[startLines.length - 1].length);
   const endPosition = new vscode.Position(endLineNumber, endLines[endLines.length - 1].length);
   const range = new vscode.Range(startPosition, endPosition);
   return \{
      start,
      end,
      startLineNumber,
      endLineNumber,
      startPosition,
      endPosition,
      range,
   }
}
export type VscodePosition = \{ start: number, end: number, startLineNumber: number, endLineNumber: number, startPosition: vscode.Position, endPosition: vscode.Position, range: vscode.Range }


`}
      />
   )
}

export default CreateVscodeRangeAndPositionAnnotatedCode

