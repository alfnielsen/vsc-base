import vsc from 'vsc-base'
/**
 * This script finds all const names in a file (From start of lines) and append the list to the end of that file.
 */
export async function run(path: string) {
   vsc.showMessage('Start compiling vsc...')
   const vscFiles = await vsc.findFilePaths(
      '**/vsc-base-development/vsc-base-*.ts'
   )
   let [dir] = vsc.splitPath(vscFiles[0])
   dir = vsc.trimDashes(dir)
   const parts: {
      meta: string
      body: string
      name: string
      annotationName: string
      metaMap: { [key: string]: string }
   }[] = []
   for (const filePath of vscFiles) {
      const rawSource = await vsc.getFileContent(filePath)
      const rawParts = rawSource.split(/\n\/\*\*\s*\n/)
      rawParts.shift() // <-- This is imports
      rawParts.forEach(part => {
         const metaBody = part.split(/\n\s*\*\/\s*\n/)
         const meta = metaBody[0]
         const body = metaBody[1]
         //name
         const nameMatch = body.match(/^[\s\n]*(?:export\s+)const\s+(\w+)/)
         if (!nameMatch) {
            vsc.showErrorMessage('Did not find method name!!: ' + body)
            return
         }
         const name = nameMatch[1]
         //meta map:
         const metaMap: { [key: string]: string } = {}
         const mapArgs = meta.split(/\n\s+\*\s+@/)
         metaMap.description = mapArgs.shift().replace(/(^|\n)\s+\*/g, '\n')
         mapArgs.forEach(arg => {
            const argNameMatch = arg.match(/^\w+/)
            const argName = argNameMatch[0]
            const argContent = arg.replace(/^\w+\s/, '').replace(/(^|\n)\s+\*/g, '\n')
            if (metaMap[argName]) {
               metaMap[argName] += ', ' + argContent
            } else {
               metaMap[argName] = argContent
            }
         })

         //"meta": " * Add './' to start of path
         //\n *
         //@param path
         //\n *
         //@see http://vsc-base.org/#addLeadingLocalDash\n * @returns string",
         let annotationName = vsc.toCamelcase(name + 'AnnotatedCode')
         annotationName = annotationName[0].toUpperCase() + annotationName.substr(1)
         if (!body.match(/^\s*$/)) {
            parts.push({ meta, body, name, metaMap, annotationName })
         }
      })
   }
   parts.sort((a, b) => a.body.localeCompare(b.body))
   dir += '/vscCompiled'
   let anoDir = dir + '/annotations'
   //Set endpoint in vsc-base.org project:
   anoDir = anoDir.replace('vsc-base/src/vsc-base-development/', 'vsc-base/src/vsc-base-development/');

   // const vscMap = dir + '/vsc.map.json'
   // await vsc.saveFileContent(vscMap, JSON.stringify(parts, null, 3))
   // vsc.showMessage('saved json map')


   // --- vsc-base file --- //
   // let vscContent = parts
   // .map(p => '\n/**\n' + p.meta + '\n */\n' + p.body + '\n')
   // .join('')

   //const vscPath = dir + '/vsc.ts'
   //    let vscDeclaration = `
   // const vsc = {
   //    ${parts.map(p => p.name).join(',\n   ')}
   // }
   // export default vsc
   // `

   //    vscContent = `import * as fs from 'fs-extra'
   // import * as vscode from 'vscode'
   // import * as ts from 'typescript'

   // ${vscContent}

   // ${vscDeclaration}

   // `

   //   await vsc.saveFileContent(vscPath, vscContent)


   for (const part of parts) {
      const ano = writeAnnotationComponent(
         part.annotationName,
         part.name,
         part.body,
         part.metaMap
      )
      await vsc.saveFileContent(`${anoDir}/${part.annotationName}.tsx`, ano)
   }
   const allAnnotationsContent = `import React from 'react'

${parts.map(part => `import ${part.annotationName} from './annotations/${part.annotationName}'`).join('\n')}

const AllAnnotations = () => {
${parts.map(part => `   <${part.annotationName} />`).join('\n')}
}
export default AllAnnotations
   `
   await vsc.saveFileContent(`${dir}/AllAnnotations.tsx`, allAnnotationsContent)

}

const writeAnnotationComponent = (
   componentName: string,
   name: string,
   code: string,
   metaMap: { [key: string]: string }
) => {
   let descr = metaMap.description.trim();
   descr = `<p>
                  ${descr.replace(/\n/, '\n               </p>\n               <p>\n               ')}
               </p>`
   const oneLineEx = metaMap.oneLineEx
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

   return `import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'
import vsc from 'vsc-base'

${test === '' ? '' : `import MethodTest from 'components/MethodTest/MethodTest'`}

const ${componentName} = () => {
   return (
      <AnnotatedCode
         title={'${name}'}
         annotation={
            <>
               ${descr}
            </>
         }
         
         codeEx={\`${oneLineEx}\`}
         code={\`${code}\`}
      />
   )
}

export default ${componentName}

`
}
