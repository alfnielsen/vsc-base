//vsc-script-name: VSC-Project    -    Sorter (And generate tests)
import * as vsc from 'vsc-base'

import { CodePart, createPartMap } from './vcs-base-util/mapping';

export async function run(path: string) {
   vsc.showMessage('Start vsc Sort...')
   // Find all files under vsc-base-development folder with starting name 'vsc-base-'
   const vscFiles = await vsc.findFilePaths(
      '**/vsc-base-development/vsc-base-*.ts'
   )
   // create a part of combined from all files
   const parts = await createPartMap(vscFiles)
   const part = parts.find(p => p.name === "getSubRelativePathFromAbsoluteRootPath")
   const rawParts = parts.filter(p => p.file.match('vsc-base-raw.ts'))
   rawParts.sort((a, b) => a.name.localeCompare(b.name))
   const rawContentParts = rawParts.map(getContent)

   const rawContent = "import * as vsc from './vsc-base'   \n\n" + rawContentParts.join('\n')

   const fileName = rawParts[0].file.replace(/.ts/, '-SORT.ts')
   await vsc.saveFileContent(fileName, rawContent)

   vsc.showMessage(`Sorting Done`)
}


const getContent = (part: CodePart) => {
   const metaMap = { ...part.metaMapRaw }
   const special = ['description', 'see', 'vscType', 'returns', 'testPrinterArgument', 'testPrinter']
   const specialMap = {}
   special.forEach(s => {
      if (metaMap[s]) {
         specialMap[s] = metaMap[s].join(',')
         delete metaMap[s]
      }
   })
   let restOfMap: string[] = []
   for (const [key, val] of Object.entries(metaMap)) {
      val.forEach(v => {
         restOfMap.push(` * @${key} ${v}`)
      })
   }
   let res = `
/** vsc-base method (${part.name})
 * @description ${specialMap['description']}
 * @see ${specialMap['see']}
 * @vscType ${specialMap['vscType']}
${restOfMap.join('\n')}
`
   if (specialMap['testPrinterArgument']) {
      res += ` * @testPrinterArgument ${specialMap['testPrinterArgument']}
 * @testPrinter ${specialMap['testPrinter']}
`
   }
   res += ` * @return ${specialMap['returns']}
*/
${part.body}
`
   return res
}

