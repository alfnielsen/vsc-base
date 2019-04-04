import vsc from 'vsc-base'
/**
 * This script finds all const names in a file (From start of lines) and append the list to the end of that file.
 */
export async function run(path: string) {
   await vsc.showMessage('Start compiling vsc...')
   const vscFiles = await vsc.findFilePaths('**/vsc-base/vsc-base-*.ts')
   await vsc.showMessage('found files...')
   let [dir] = vsc.splitPath(vscFiles[0])
   dir = vsc.trimDashes(dir)
   const parts: { meta: string; body: string }[] = []
   for (const filePath of vscFiles) {
      const rawSource = await vsc.getFileContent(filePath)
      const rawParts = rawSource.split(/\n\/\*\*\s*\n/)
      rawParts.forEach(part => {
         const metaBody = part.split(/\n\s*\*\/\s*\n/)
         const meta = metaBody[0]
         const body = metaBody[1] || ''
         // const nameMatch = body.match(/^[\s\n]*(?export\s+)const\s+(\w+)/)
         // if (!nameMatch) {
         //    vsc.showErrorMessage('Did not find method name!!: ' + body)
         //    return
         // }
         // const name = nameMatch[0]

         if (!body.match(/^\s*$/)) {
            parts.push({ meta, body })
         }
      })
   }
   parts.sort((a, b) => a.body.localeCompare(b.body))
   dir += '/vscCompiled'
   const vscMap = dir + '/vsc.map.json'
   await vsc.saveFileContent(vscMap, JSON.stringify(parts, null, 3))
   await vsc.showMessage('saved json map')
   const vscPath = dir + '/vsc.ts'
   let vscContent = parts
      .map(p => '\n/**\n' + p.meta + '\n */\n' + p.body + '\n')
      .join('')

   vscContent = `import * as fs from 'fs-extra'
import * as vscode from 'vscode'
import * as ts from 'typescript'

${vscContent}
`

   await vsc.saveFileContent(vscPath, vscContent)
}
