//vsc-script-name: Automation  -  Add Names To All Scripts
import * as vsc from 'vsc-base'

export async function run(_path: string) {
   const files = await vsc.findFilePaths('**/*.vsc-script.ts');
   vsc.showMessage("files found:" + files.length)
   for (const filePath of files) {
      let source = await vsc.getFileContent(filePath)
      if (!source.match(/\/\/vsc\-script\-name:/)) {
         const name = filePath.replace(/^.*\/([^\/]*).ts$/, '$1')
         source = `//vsc-script-name: ${name}\n${source}`
         await vsc.saveFileContent(filePath, source)
      }
   }
}
