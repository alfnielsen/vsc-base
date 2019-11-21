import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const OpenAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'open'}
         title={'open'}
         open={open}
         annotation={
            <>
               <p>
                  
Open a file in vscode.
               </p>
            </>
         }
         
         codeOneLineEx={`const editor = await vc.open(path)`}
         codeEx={``}
         code={`/**
 * @dependencyExternal vscode
 * @vscType Vscode
 * @returns Promise<vscode.TextEditor | undefined>
 */
export const open = async (
   path: string,
   column?: vscode.ViewColumn | undefined,
   preserveFocus?: boolean | undefined
): Promise<vscode.TextEditor | undefined> => \{
   const uri = vscode.Uri.parse('file:' + path);
   try \{
      const doc = await vscode.workspace.openTextDocument(uri);
      const editor = await vscode.window.showTextDocument(doc, column, preserveFocus)
      return editor
   } catch (e) \{
      return undefined
   }
}`}
      />
   )
}

export default OpenAnnotatedCode

