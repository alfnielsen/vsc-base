import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const GetFullDocumentRangeAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'getFullDocumentRange'}
         title={'getFullDocumentRange'}
         annotation={
            <>
               <p>
                  
 Get a vscodeRange for the entire document
               </p>
            </>
         }
         
         codeOneLineEx={`const fullRange = vsc.getFullDocumentRange(document)`}
         codeEx={``}
         code={`/**
 * @param document
 * @dependencyExternal vscode
 * @vscType Vscode
 * @returns boolean
 */
export const getFullDocumentRange = (
   document: vscode.TextDocument
): vscode.Range => \{
   const startPosition = new vscode.Position(0, 0)
   const endPosition = new vscode.Position(document.lineCount, 0)
   const fullRange = new vscode.Range(startPosition, endPosition)
   return fullRange
}
`}
      />
   )
}

export default GetFullDocumentRangeAnnotatedCode

