import * as vsc from 'vsc-base'
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
   // ------ compile vsc-base definition (typings d.ts) and vsc-base.org documentation ------- //

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
         const mapArgs = meta.split(/\n?\s+\*\s+@/)
         // metaMap.description = mapArgs.shift().replace(/(^|\n)\s+\*/g, '\n')
         mapArgs.shift() // remove leading empty area
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
         let annotationName = vsc.toPascalCase(name + 'AnnotatedCode')
         if (!body.match(/^\s*$/)) {
            parts.push({ meta, body, name, metaMap, annotationName })
         }
      })
   }
   parts.sort((a, b) => a.body.localeCompare(b.body))

   // ----------------- definition file ------------------

   //    const defFileContent = `
   // // Type definitions for vsc-base
   // // Project: vsc-base
   // // Definitions by: alf nielsen <alfnielsen@gmail.com>

   // declare namespace vsc {

   // ${parts.map(part => `
   //  /**
   // ${part.meta}
   //  */
   //    export ${part.metaMap.definition}
   // `)}

   // }

   // `
   //    const defPath = dir + '/vsc-base.d.ts';
   //    const newDefPath = defPath.replace('vsc-script/src/vsc-base-development', 'vsc-base/src');
   //    await vsc.saveFileContent(newDefPath, defFileContent)

   // --------------------- vsc-base.org annoations ---------------------

   const orgDir = dir.replace('/vsc-script/src/vsc-base-development', '/vsc-base.org/src/allAnnotations');
   const anoDir = orgDir + '/annotations'
   //Set endpoint in vsc-base.org project:

   for (const part of parts) {
      const ano = writeAnnotationComponent(
         part.annotationName,
         part.name,
         part.body,
         part.meta,
         part.metaMap
      )
      await vsc.saveFileContent(`${anoDir}/${part.annotationName}.tsx`, ano)
   }
   const allAnnotationsContent = `import React from 'react'

${parts.map(part => `import ${part.annotationName} from './annotations/${part.annotationName}'`).join('\n')}

const AllAnnotations = () =>
   <>
${parts.map(part => `      <${part.annotationName} />`).join('\n')}
   </>

export default AllAnnotations
   `
   await vsc.saveFileContent(`${orgDir}/AllAnnotations.tsx`, allAnnotationsContent)
   // move raw to vsc-base.org (For testing. We connet use vsc-base becasue it need vscode!)
   const rawPath = dir + '/vsc-base-raw.ts';
   const newRawPath = rawPath.replace('/vsc-script/src/vsc-base-development', '/vsc-base.org/src/allAnnotations');
   let rawPathContent = await vsc.getFileContent(rawPath);
   // reaplce import vsc-base to point to itself instead!
   rawPathContent = rawPathContent.replace("import * as vsc from './vsc-base'", "import * as vsc from './vsc-base-raw'")
   await vsc.saveFileContent(newRawPath, rawPathContent)


   // ----------------- copy to vsc-base project -------------------- //

   for (const filePath of vscFiles) {
      const newPath = filePath.replace('vsc-script/src/vsc-base-development', 'vsc-base/src');

      await vsc.copy(filePath, newPath)
   }
   const basePath = dir + '/vsc-base.ts';
   const newPath = basePath.replace('vsc-script/src/vsc-base-development', 'vsc-base/src');
   await vsc.copy(basePath, newPath)

}

const writeAnnotationComponent = (
   componentName: string,
   name: string,
   code: string,
   meta: string,
   metaMap: { [key: string]: string }
) => {
   let descr = metaMap.description;
   const newLineREg = /\\\n/g
   descr = `<p>
                  ${descr.replace(newLineREg, '\n               </p>\n               <p>\n               ')}
               </p>`
   const oneLineEx = metaMap.oneLineEx.replace(/([\\`\$\{])/g, '\\$1');//.replace(/`/g, '\\`').replace(/\$\{/g, '\\${')
   const codeEx = (metaMap.ex || '').replace(/([\\`\$\{])/g, '\\$1')
   code = code.replace(/([\\`\$\{])/g, '\\$1')
   meta = meta.replace(/([\\`\$\{])/g, '\\$1')
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

${test === '' ? '' : `
import * as vsc from '../vsc-base-raw'

import MethodTest from 'components/MethodTest/MethodTest'
`}

const ${componentName} = () => {
   return (
      <AnnotatedCode
         id={'${name}'}
         title={'${name}'}
         annotation={
            <>
               ${descr}
            </>
         }
         ${test}
         codeOneLineEx={\`${oneLineEx}\`}
         codeEx={\`${codeEx}\`}
         code={\`/**
${meta}
 */
${code}\`}
      />
   )
}

export default ${componentName}

`
}
