import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base'



const GetFullDocumentRangeAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'getFullDocumentRange'}
         annotation={
            <>
               <p>
                  Get a vscodeRange for the entire document
               </p>
            </>
         }
         
         codeEx={`const fullRange = vsc.getFullDocumentRange(document)`}
         code={`export const getFullDocumentRange = (
   document: vscode.TextDocument
): vscode.Range => {
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

