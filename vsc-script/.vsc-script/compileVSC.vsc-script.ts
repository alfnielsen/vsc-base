import * as vsc from 'vsc-base'
/**
 * This script finds all const names in a file (From start of lines) and append the list to the end of that file.
 */
export async function run(path: string) {
   vsc.showMessage('Start compiling vsc...')
   // Find all files under vsc-base-development folder with starting name 'vsc-base-'
   const vscFiles = await vsc.findFilePaths(
      '**/vsc-base-development/vsc-base-*.ts'
   )
   // create a part of combined from all files
   const parts = await createPartMap(vscFiles)
   // get the dir (vsc-script/src/vsc-base-development), the script don't care where you click to start it!
   let [dir] = vsc.splitPath(vscFiles[0])
   dir = vsc.trimDashes(dir)
   // Now create all element/files used by the the vsc-base.org project
   await CompileToVscBaseOrg(dir, parts)

   // Now Copy the source files the vsc-base project
   for (const filePath of vscFiles) {
      const newPath = filePath.replace('vsc-script/src/vsc-base-development', 'vsc-base/src');
      await vsc.copy(filePath, newPath)
   }
   const basePath = dir + '/vsc-base.ts';
   const newPath = basePath.replace('vsc-script/src/vsc-base-development', 'vsc-base/src');
   await vsc.copy(basePath, newPath)

}
type CodePart = {
   meta: string
   body: string
   name: string
   annotationName: string
   metaMapRaw: { [key: string]: string }
   metaMap: { [key: string]: string }
}
const createPartMap = async (vscFiles: string[]) => {
   const parts: CodePart[] = []
   for (const filePath of vscFiles) {
      const rawSource = await vsc.getFileContent(filePath)
      const rawParts = rawSource.split(/\n\/\*\*\s*\n/) // split usin \n/**
      rawParts.shift() // <-- This is leading imports (er empty area)
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
         const metaMapRaw: { [key: string]: string } = {} // keep '*' instart of lines
         const mapArgs = meta.split(/\n?\s+\*\s+@/)
         mapArgs.shift() // remove leading empty area
         mapArgs.forEach(arg => {
            const argNameMatch = arg.match(/^\w+/)
            const argName = argNameMatch[0]
            const argContentRaw = arg.replace(/^\w+\s/, '')
            const argContent = argContentRaw.replace(/(^|\n)\s+\*/g, '\n')
            if (metaMap[argName]) {
               metaMap[argName] += ', ' + argContent
               metaMapRaw[argName] += ', ' + argContentRaw
            } else {
               metaMap[argName] = argContent
               metaMapRaw[argName] = argContentRaw
            }
         })
         let annotationName = vsc.toPascalCase(name + 'AnnotatedCode')
         if (!body.match(/^\s*$/)) {
            parts.push({ meta, body, name, metaMap, metaMapRaw, annotationName })
         }
      })
   }
   parts.sort((a, b) => a.body.localeCompare(b.body))
   return parts
}

const CompileToVscBaseOrg = async (dir: string, parts: CodePart[]) => {
   // For vsc-base.org we change the path to point into that project (in this mono-respose)
   const orgDir = dir.replace('/vsc-script/src/vsc-base-development', '/vsc-base.org/src/allAnnotations');
   const anoDir = orgDir + '/annotations'
   // Create all code Annotation Components
   await writeAllAnotationComponent(anoDir, parts)
   // Create main Coponent for the annotations:
   await writeMainAnnotationComponent(orgDir, parts);
   // To enable live testing on vsc-base we copy the 'vsc-base-raw.ts' vsc-base.org aswell.
   const rawPath = dir + '/vsc-base-raw.ts';
   const newRawPath = rawPath.replace('/vsc-script/src/vsc-base-development', '/vsc-base.org/src/allAnnotations');
   let rawPathContent = await vsc.getFileContent(rawPath);
   // reaplce import vsc-base to point to itself instead!
   // In vsc-base.org we connect use vscode or system,
   // so we need to chenge the vsc-base-raw file just a little, so it dont point at the general vsc-base,
   // but instead point at itself!
   rawPathContent = rawPathContent.replace("import * as vsc from './vsc-base'", "import * as vsc from './vsc-base-raw'")
   // Save the modified vsc-base-raw to vsc-base-org project:
   await vsc.saveFileContent(newRawPath, rawPathContent)

}

const writeAllAnotationComponent = async (anoDir: string, parts: CodePart[]) => {
   // vsc-base.org has a React called Annotation (which is the one this script maps to)
   for (const part of parts) {
      // Create a Annotation React component
      const ano = writeAnnotationComponent(
         part.annotationName,
         part.name,
         part.body,
         part.metaMap,
         part.metaMapRaw
      )
      // and save it in the vsc-base.org folder for annotations (/vsc-base.org/src/allAnnotations/annotations)
      await vsc.saveFileContent(`${anoDir}/${part.annotationName}.tsx`, ano)
   }
}
const writeMainAnnotationComponent = async (dir: string, parts: CodePart[]) => {
   // Create main React component with all the annotations. (Called: AllAnnotations)
   // The parts.map creates a list of imports, and a list of written components.
   const allAnnotationsContent = `import React from 'react'

${parts.map(part => `import ${part.annotationName} from './annotations/${part.annotationName}'`).join('\n')}

const AllAnnotations = () =>
<>
${parts.map(part => `      <${part.annotationName} />`).join('\n')}
</>

export default AllAnnotations
`
   // Save the AllAnnotations component in the vsc-base.org project (/vsc-base.org/src/allAnnotations)
   await vsc.saveFileContent(`${dir}/AllAnnotations.tsx`, allAnnotationsContent)
}

const writeAnnotationComponent = (
   componentName: string,
   name: string,
   code: string,
   metaMap: { [key: string]: string },
   metaMapRaw: { [key: string]: string }
) => {
   // meta
   const writeMetaMap = []
   const excludeList = ['description', 'see', 'oneLineEx', 'ex']
   for (const [key, content] of Object.entries(metaMapRaw)) {
      if (!excludeList.includes(key)) {
         const escapedContent = content.replace(/([\\`\$\{])/g, '\\$1')
         let m = ` * @${key} ${escapedContent}`
         writeMetaMap.push(m)
      }
   }
   const meta = writeMetaMap.join('\n');
   //desription
   let descr = metaMap.description;
   const newLineREg = /\\\n/g
   descr = descr.replace(/(https?:\/\/[^\s]+)/g, `<a href='$1'>$1</a>`)
   descr = `<p>
                  ${descr.replace(newLineREg, '\n               </p>\n               <p>\n               ')}
               </p>`
   // online ex
   const oneLineEx = metaMap.oneLineEx.replace(/([\\`\$\{])/g, '\\$1');//.replace(/`/g, '\\`').replace(/\$\{/g, '\\${')
   // ex
   const codeEx = (metaMap.ex || '').replace(/([\\`\$\{])/g, '\\$1')
   code = code.replace(/([\\`\$\{])/g, '\\$1')

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
