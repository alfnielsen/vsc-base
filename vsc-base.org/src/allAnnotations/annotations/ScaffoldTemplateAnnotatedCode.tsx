import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const ScaffoldTemplateAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'scaffoldTemplate'}
         title={'scaffoldTemplate'}
         annotation={
            <>
               <p>
                  
 Recurvice function that goes through a template tree
               </p>
            </>
         }
         
         codeOneLineEx={`await vsc.scaffoldTemplate(path, template)`}
         codeEx={``}
         code={`/**
 * @description 
 * Recurvice function that goes through a template tree
 * @see http://vsc-base.org/#scaffoldTemplate
 * @param path Full path to where the TemplateItem (file/folder) should be created
 * @param userInputs An object with user inputs \{[key: string]: string}
 * @param templateItem An TemplateItem (folde/file)
 * @dependencyInternal makeDir, saveFileContent
 * @vscType System
 * @oneLineEx await vsc.scaffoldTemplate(path, template)
 * @returns Promise<void>
 */
export const scaffoldTemplate = async (
   path: string,
   templateItem: vsc.vscTemplateItem,
   userInputs: vsc.vscUserInputs = \{}
): Promise<void> => \{
   switch (templateItem.type) \{
      case 'folder': \{
         let name = templateItem.name
         if (typeof name === 'function') \{
            name = name.call(null, userInputs)
         }
         const folderPath = path + '/' + name
         await vsc.makeDir(folderPath)
         if (!templateItem.children) \{
            break
         }
         templateItem.children.forEach(async (childItem: any) => \{
            vsc.scaffoldTemplate(folderPath, childItem, userInputs)
         })
         break
      }
      case 'file': \{
         let name = templateItem.name
         if (typeof name === 'function') \{
            name = name.call(null, userInputs)
         }
         const filePath = path + '/' + name
         let content = templateItem.content
         if (typeof content === 'function') \{
            content = content.call(null, userInputs)
         }
         await vsc.saveFileContent(filePath, content)
      }
   }
}

export type vscTemplate = \{
   userInputs: vscUserInput[]
   template: vscTemplateItem[]
}

export type vscTemplateItem = vscTemplateFolder | vscTemplateFile

export type vscTemplateFolder = \{
   type: 'folder'
   name: vscStringDelegate
   children?: vscTemplateItem[]
}
export type vscTemplateFile = \{
   type: 'file'
   name: vscStringDelegate
   content: vscStringDelegate
}

export type vscUserInput = \{
   title: string
   argumentName: string
   defaultValue: string
}
export type vscUserInputs = \{ [key: string]: string }
export type vscStringDelegate = string | ((inputs: vscUserInputs) => string)
`}
      />
   )
}

export default ScaffoldTemplateAnnotatedCode

