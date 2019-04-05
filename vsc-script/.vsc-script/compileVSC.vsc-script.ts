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
   const parts: {
      meta: string
      body: string
      name: string
      metaMap: { [key: string]: string | string[] }
   }[] = []
   for (const filePath of vscFiles) {
      const rawSource = await vsc.getFileContent(filePath)
      const rawParts = rawSource.split(/\n\/\*\*\s*\n/)
      rawParts.forEach(part => {
         const metaBody = part.split(/\n\s*\*\/\s*\n/)
         const meta = metaBody[0]
         const body = metaBody[1] || ''
         //name
         const nameMatch = body.match(/^[\s\n]*(?export\s+)const\s+(\w+)/)
         if (!nameMatch) {
            vsc.showErrorMessage('Did not find method name!!: ' + body)
            return
         }
         const name = nameMatch[0]
         //meta map:
         const metaMap: { [key: string]: string | string[] } = {}
         const mapArgs = meta.split(/\n\s+\*\s+@/)
         metaMap.description = mapArgs.pop().replace(/\n\s\*/, '\n')
         mapArgs.forEach(arg => {
            const argNameMatch = arg.match(/^\w+/)
            const argName = argNameMatch[0]
            const argContent = arg.replace(/^\w+/, '')
            if (metaMap[argName]) {
               if (!(metaMap[argName] instanceof Array)) {
                  const cont = metaMap[argName] as string
                  metaMap[argName] = [cont]
               } else if (Array.isArray(metaMap[argName])) {
                  ;(<string[]>metaMap[argName]).push(argContent)
               }
            } else {
               metaMap[argName] = argContent
            }
         })

         //"meta": " * Add './' to start of path
         //\n *
         //@param path
         //\n *
         //@see http://vsc-base.org/#addLeadingLocalDash\n * @returns string",

         if (!body.match(/^\s*$/)) {
            parts.push({ meta, body, name, metaMap })
         }
      })
   }
   parts.sort((a, b) => a.body.localeCompare(b.body))
   dir += '/vscCompiled'
   const anoDir = dir + '/annotations'
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

   for (const part of parts) {
      const componentName = vsc.toCamelcase(name + 'AnnotatedCode')
      const ano = writeAnnotationComponent(
         componentName,
         part.name,
         part.body,
         part.metaMap
      )
      await vsc.saveFileContent(anoDir + '/' + componentName, ano)
   }
}

const getSingle = (value: string | string[]): string => {
   if (Array.isArray(value)) {
      return value[0]
   } else {
      return value
   }
}

const writeAnnotationComponent = (
   componentName: string,
   name: string,
   code: string,
   metaMap: { [key: string]: string | string[] }
) => {
   let descr = getSingle(metaMap.description || '')
   descr = '<p>\n' + descr.replace(/\n/, '\n</p>\n<p>\n') + '</p>'
   const oneLineEx = getSingle(metaMap.oneLineEx || '')
   let test = ''
   if (metaMap.testPrinterArgument && metaMap.testPrinter) {
      test = `
      test={
         <MethodTest
            initialArgs={${metaMap.testPrinterArgument}}
            onClickCall={${metaMap.testPrinter}}
         />
      }
      `
   }

   return `

import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base/vsc-base-raw'

import MethodTest from 'components/MethodTest/MethodTest'

const ${componentName} = () => {
   return (
      <AnnotatedCode
         title={'${name}'}
         annotation={
            <>
               ${descr}
            </>
         }
         ${test}
         codeEx={\`${oneLineEx}\`}
         code={\`${code}\`}
      />
   )
}

export default ${componentName}

`
}
