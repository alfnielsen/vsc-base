'use strict'
import * as vsc from 'vsc-base'
import * as vscode from 'vscode'

export default class Scaffolding {
   /**
    * The main method that runs the create template output
    */
   async createTemplate(uri?: vscode.Uri) {
      if (!uri) {
         vsc.showErrorMessage(
            'vsc Scaffolding most be run by right-clicking a file or folder!'
         )
         return
      }
      const path = vsc.pathAsUnix(uri.fsPath)
      let dir = vsc.getDir(path)
      /**
       * Collect all project templates:
       * This scans all files for .vsc-template.js to make a list of templates
       * @todo Maybe move this code, so it do not scan all file every times it run
       */
      const templatefiles = await vsc.findFilePaths('**/*.vsc-template.{js,ts}')
      const templates: { name: string; name_lower: string; type: string, path: string }[] = []
      templatefiles.forEach(filePath => {
         const match = filePath.match(/([\w\-]+)\.vsc\-template\.([jt]s)$/)
         if (match) {
            const name = match[1]
            const type = match[2]
            templates.push({
               name,
               type,
               name_lower: name.toLocaleLowerCase(),
               path: filePath
            })
         }
      })
      if (templates.length === 0) {
         vsc.showErrorMessage(
            `NOTE: vsc-scaffolding didn't find any template files. A template file name can be place anywhere in the project, but it must end with '.vsc-template.js'`
         )
         return
      }

      const templateName = await vsc.pick(templates.map(t => t.name))

      if (!templateName) {
         return
      }
      const templateName_lower = templateName.toLocaleLowerCase()
      const selectedTemplate = templates.find(
         t => t.name_lower === templateName_lower
      )
      if (!selectedTemplate) {
         vsc.showErrorMessage(
            `NOTE: vsc-scaffolding didn't find your template '${templateName}'. The template must be in a file called '${templateName}.vsc-template.js'`
         )
         return
      }
      //
      //template: Template,
      let template: vsc.vscTemplate
      if (selectedTemplate.type === 'js') {
         template = await getJsTemplate(selectedTemplate.path)
      } else if (selectedTemplate.type === 'ts') {
         template = await getTsTemplate(selectedTemplate.path, path)
         if (!template) {
            return
         }
         template = await vsc.awaitResult(template) as vsc.vscTemplate;
      } else {
         return;
      }

      const userInputs: { [key: string]: string } = {}

      // Get User Inputs (For some unknown reason .foreach dont work... So we use normal for loop)
      for (let i = 0; i < template.userInputs.length; i++) {
         const item = template.userInputs[i]
         const userResponse = await vsc.ask(item.title, item.defaultValue)
         if (!userResponse) {
            return
         }
         userInputs[item.argumentName] = userResponse
      }
      // await template.userInputs.forEach(async (item: UserInput) => { })

      // Recursive create files and folder
      await template.template.forEach(async item => {
         await vsc.scaffoldTemplate(dir, item, userInputs)
      })

      vscode.window.showInformationMessage('Template output was created.')
   }
}


const getJsTemplate = async (path: string) => {
   const templateFile = await vsc.getFileContent(path)
   const templateCompiledFunction = eval(templateFile)
   const template: vsc.vscTemplate = templateCompiledFunction()
   return template;
}
const getTsTemplate = async (templatePath: string, path: string) => {
   // load script and tranpile it
   try {
      let scriptFileExport
      scriptFileExport = await vsc.tsLoadModule(templatePath)
      const varifiedModule = vsc.varifyModuleMethods(scriptFileExport, ['Template'])
      if (!varifiedModule) {
         return undefined
      }
      const template = varifiedModule.Template(path, templatePath)
      return template
   } catch (e) {
      vsc.showErrorMessage(e);
   }
   return undefined
}