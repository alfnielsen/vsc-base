import vsc from '../src/vsc-base/vsc-next'

export async function run(path: string) {
   const scriptFiles = await vsc.findFilePaths('**/*.vsc-script.ts')
   const scripts: { name: string; name_lower: string; path: string }[] = []
   scriptFiles.forEach(filePath => {
      const match = filePath.match(/([\w\-]+)\.vsc\-script\.ts$/)
      if (match) {
         const name = match[1]
         scripts.push({
            name,
            name_lower: name.toLocaleLowerCase(),
            path: filePath
         })
      }
   })
   if (scripts.length === 0) {
      vsc.showErrorMessage(
         `NOTE: vsc-script didn't find any script files. A script file name can be place anywhere in the project, but it must end with '.vsc-script.js'`
      )
      return
   }
   const scriptName = await vsc.ask(
      'What Script will you run? (Name of script)',
      scripts[0].name
   )
   if (!scriptName) {
      return
   }
   const scriptName_lower = scriptName.toLocaleLowerCase()
   const selectedScript = scripts.find(t => t.name_lower === scriptName_lower)
   if (!selectedScript) {
      vsc.showErrorMessage(
         `NOTE: vsc-script didn't find your script '${scriptName}'. The script must be in a file called '${scriptName}.vsc-script.js'`
      )
      return
   }
   //

   // const scriptFileTs = await vsc.getFileContent(selectedScript.path)
   // const scriptFileJs = ts.transpile(scriptFileTs)
   // const scriptFileExport = eval(scriptFileJs)

   let scriptFileExport: { [key: string]: unknown }
   try {
      scriptFileExport = await vsc.loadTsModule(selectedScript.path)
   } catch (e) {
      vsc.showErrorMessage('Error: ' + e)
      return
   }
   if (
      scriptFileExport.hasOwnProperty('run') &&
      scriptFileExport.run instanceof Function
   ) {
      try {
         const r = scriptFileExport.run(path)
         if (r instanceof Promise) {
            r.then(() => {
               vsc.showMessage('Script done.')
            })
         } else {
            vsc.showMessage('Script done.')
         }
      } catch (e) {
         vsc.showErrorMessage('Error: ' + e)
      }
   } else {
      vsc.showErrorMessage(
         `Script did not contain method called 'run' :: ${JSON.stringify(
            scriptFileExport
         )}`
      )
   }
}
