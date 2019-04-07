import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base'



const ScaffoldTemplateAnnotatedCode = () => {
   return (
      <AnnotatedCode
         title={'scaffoldTemplate'}
         annotation={
            <>
               <p>
                  Recurvice function that goes through a template tree
               </p>
            </>
         }
         
         codeEx={`await scaffoldTemplate(path, template)`}
         code={`export const scaffoldTemplate = async (
   path: string,
   templateItem: vsc.vscTemplateItem,
   userInputs: vsc.vscUserInputs = {}
): Promise<void> => {
   switch (templateItem.type) {
      case 'folder': {
         let name = templateItem.name
         if (typeof name === 'function') {
            name = name.call(null, userInputs)
         }
         const folderPath = path + '/' + name
         await vsc.makeDir(folderPath)
         if (!templateItem.children) {
            break
         }
         templateItem.children.forEach(async (childItem: any) => {
            vsc.scaffoldTemplate(folderPath, childItem, userInputs)
         })
         break
      }
      case 'file': {
         let name = templateItem.name
         if (typeof name === 'function') {
            name = name.call(null, userInputs)
         }
         const filePath = path + '/' + name
         let content = templateItem.content
         if (typeof content === 'function') {
            content = content.call(null, userInputs)
         }
         await vsc.saveFileContent(filePath, content)
      }
   }
}
`}
      />
   )
}

export default ScaffoldTemplateAnnotatedCode

