//vsc-script-name: VSC-Project >  Sorter (And generate tests)
import * as vsc from 'vsc-base'

import { CodePart, createPartMap } from './vcs-base-util/mapping';

export async function run(path: string) {
   const answers = ['All', 'Only Selected']
   const response = await vsc.pick(answers)
   if (!response) { return }
   let vscFiles: string[]
   if (response === answers[0]) {
      vscFiles = await vsc.findFilePaths(
         '**/vsc-base-development/vsc-base-*.ts'
      )
   } else {
      vscFiles = [path]
   }
   // create a part of combined from all files
   const parts = await createPartMap(vscFiles)
   for (const findFilePaths of vscFiles) {
      const rawParts = parts.filter(p => p.file === findFilePaths)
      rawParts.sort((a, b) => a.name.localeCompare(b.name))
      const rawContent = getFileContent(rawParts)
      const fileName = rawParts[0].file.replace(/.ts/, '-SORT.ts')
      await vsc.saveFileContent(fileName, rawContent)
   }

   vsc.showMessage(`Sorting Done`)
}

const getFileContent = (rawParts: CodePart[]) => {
   const rawContentParts = rawParts.map(getContent)
   let importsContent = `import * as vsc from './vsc-base'`
   const imports = [] as string[]
   const useTs = rawContentParts.some(p => /\bts\b/.test(p))
   const useCp = rawContentParts.some(p => /\bcp\b/.test(p))
   const useFs = rawContentParts.some(p => /\bfs\b/.test(p))
   const useVscode = rawContentParts.some(p => /\bvscode\b/.test(p))
   if (useCp) {
      imports.push(`import * as cp from 'child-process-promise'`)
   }
   if (useFs) {
      imports.push(`import * as fs from 'fs-extra'`)
   }
   if (useTs) {
      imports.push(`import * as ts from 'typescript'`)
   }
   if (useVscode) {
      imports.push(`import * as vscode from 'vscode'`)
   }
   if (importsContent.length > 0) {
      importsContent = imports.join('\n') + '\n\n' + importsContent
   }

   return `${importsContent}
${rawContentParts.join('')}`
}

const getContent = (part: CodePart) => {
   const metaMap = { ...part.metaMapRaw }
   const special = ['description', 'see', 'vscType', 'returns']//, 'testPrinterArgument', 'testPrinter']
   const specialMap = {}
   special.forEach(s => {
      if (metaMap[s]) {
         let v = metaMap[s].join(',')
         if (/ \* /.test(v)) {
            v = '\n ' + v.trimLeft()
         }
         specialMap[s] = v
         delete metaMap[s]
      }
   })
   let restOfMap: string[] = []
   for (const [key, val] of Object.entries(metaMap)) {
      val.forEach(v => {
         if (/ \* /.test(v)) {
            v = '\n ' + v.trimLeft()
         }
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
   //    if (specialMap['testPrinterArgument']) {
   //       res += ` * @testPrinterArgument ${specialMap['testPrinterArgument']}
   //  * @testPrinter ${specialMap['testPrinter']}
   // `
   //    }
   res += ` * @returns ${specialMap['returns']}
*/
${part.body}
`
   return res
}

