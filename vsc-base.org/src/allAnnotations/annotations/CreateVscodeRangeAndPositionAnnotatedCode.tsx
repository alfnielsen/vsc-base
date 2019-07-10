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
               <p>
               Also returns the content and fullContent properties and orgStart and Org End. 
               </p>
               <p>
               (The normal ts ast compiler has spaces and comment included in the node pos and node end)
               </p>
            </>
         }
         
         codeOneLineEx={`const success = vsc.createVscodeRangeAndPosition(source, start, end)`}
         codeEx={``}
         code={`/**
 * @vscType Vscode
 * @returns boolean
 */
export const createVscodeRangeAndPosition = (source: string, start: number, end: number = start, trimSpacesAndComments = true): vsc.VscodePosition => \{
   const fullContent = source.substring(start, end)
   const orgStart = start;
   const orgEnd = end;
   if (trimSpacesAndComments) \{
      const matcher = /^((\\/\\*[\\s\\S]*?\\*\\/)|(\\/\\/[^\\n]*\\n)|([\\s\\n]+))*/
      const found = source.substring(start, end)
      const startSpaces = found.match(matcher)
      if (startSpaces) \{
         start += startSpaces[0].length;
      }
      const endSpaces = found.match(/\\s+\$/)
      if (endSpaces) \{
         end -= endSpaces[0].length;
      }
   }
   const content = source.substring(start, end)
   const startLines = source.substr(0, start).split("\\n");
   const endLines = source.substr(0, end).split("\\n");
   const startLineNumber = startLines.length - 1
   const endLineNumber = endLines.length - 1
   const startPosition = new vscode.Position(startLineNumber, startLines[startLines.length - 1].length);
   const endPosition = new vscode.Position(endLineNumber, endLines[endLines.length - 1].length);
   const range = new vscode.Range(startPosition, endPosition);
   return \{
      content,
      start,
      end,
      startLineNumber,
      endLineNumber,
      startPosition,
      endPosition,
      range,
      fullContent,
      orgStart,
      orgEnd
   }
}
export type VscodePosition = \{
   content: string,
   start: number,
   end: number,
   startLineNumber: number,
   endLineNumber: number,
   startPosition: vscode.Position,
   endPosition: vscode.Position,
   range: vscode.Range
   fullContent: string,
   orgStart: number,
   orgEnd: number
}`}
      />
   )
}

export default CreateVscodeRangeAndPositionAnnotatedCode

