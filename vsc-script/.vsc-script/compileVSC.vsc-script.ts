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




   vsc.showMessage('Cloning to vsc-base..')
   // Now Copy the source files the vsc-base project
   for (const filePath of vscFiles) {
      const newPath = filePath.replace('vsc-script/src/vsc-base-development', 'vsc-base/src');
      await vsc.copy(filePath, newPath)
   }
   const basePath = dir + '/vsc-base.ts';
   const newPath = basePath.replace('vsc-script/src/vsc-base-development', 'vsc-base/src');
   //copy files to base
   await vsc.copy(basePath, newPath)
   //delete old out
   const vscBaseDir = dir.replace('vsc-script/src/vsc-base-development', 'vsc-base');
   await vsc.remove(vscBaseDir + '/out')
   //run build:
   vsc.showMessage("Building vsc-base ..")

   await vsc.execFromPath("yarn build", vscBaseDir)

   vsc.showMessage(`Compiling Done`)
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
      const rawParts = rawSource.split(/\n\/\*\*\s+vsc\-base\s+method\s*\n/) // split using: \n/** vsc-base method
      rawParts.shift() // <-- This is leading imports (er empty area)
      rawParts.forEach(part => {
         const metaIndex = part.search(/\n\s*\*\/\n\s*export\s+const\s+/);
         //const metaBody = part.split(/\n\s*\*\/\s*\n/)
         const meta = part.substr(0, metaIndex)
         const body = part.substr(metaIndex).replace(/^[\n\s]*\*\/[\n\s]*/, '');
         //name
         const nameMatch = body.match(/^[\s\n]*export\s+const\s+(\w+)/)
         if (!nameMatch) {
            vsc.showErrorMessage('Did not find method name!!: ' + body)
            throw new Error('STOP');
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
   // For vsc-base.org we change the path to point into that project (in this mono-respo)
   const orgDir = dir.replace('/vsc-script/src/vsc-base-development', '/vsc-base.org/src/allAnnotations');
   const orgRootDir = dir.replace('/vsc-script/src/vsc-base-development', '/vsc-base.org');
   const anoDir = orgDir + '/annotations'
   // Create all code Annotation Components
   await writeAllAnnotationComponent(anoDir, parts)
   // Create main Component for the annotations:
   await writeMainAnnotationComponent(orgDir, parts);
   // To enable live testing on vsc-base we copy the 'vsc-base-raw.ts' vsc-base.org as well.
   const rawPath = dir + '/vsc-base-raw.ts';
   const newRawPath = rawPath.replace('/vsc-script/src/vsc-base-development', '/vsc-base.org/src/allAnnotations');
   let rawPathContent = await vsc.getFileContent(rawPath);
   // replace import vsc-base to point to itself instead!
   // In vsc-base.org we connect use vscode or system,
   // so we need to change the vsc-base-raw file just a little, so it don't point at the general vsc-base,
   // but instead point at itself!
   rawPathContent = rawPathContent.replace("import * as vsc from './vsc-base'", "import * as vsc from './vsc-base-raw'")
   // Save the modified vsc-base-raw to vsc-base-org project:
   await vsc.saveFileContent(newRawPath, rawPathContent)

   vsc.showMessage("Building vsc-base.org ...")
   //build
   await vsc.execFromPath('yarn build', orgRootDir)

}

const writeAllAnnotationComponent = async (anoDir: string, parts: CodePart[]) => {
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
interface AllAnnotationsProps {
   activeMethod: string
}

const AllAnnotations = ({ activeMethod }: AllAnnotationsProps) => 
  <>
${parts.map(part => `      <${part.annotationName} open={activeMethod === '${part.name}'} />`).join('\n')}
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
   const excludeList = ['description', 'see', 'oneLineEx', 'ex', 'testPrinterArgument', 'testPrinter']
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
   const newLineReg = /\\\n/g
   //markdown:
   descr = descr.replace(/\[([^\n\]]+)\]\((https?:\/\/[^\s]+)\)/g, `<a href='$2'>$1</a>`)
   descr = descr.replace(/\*\*([^\n\*]+)\*\*/, '<b>$1</b>')
   descr = `<p>
                  ${descr.replace(newLineReg, '\n               </p>\n               <p>\n               ')}
               </p>`
   // online ex
   const oneLineEx = metaMap.oneLineEx.replace(/([\\`\$\{])/g, '\\$1');//.replace(/`/g, '\\`').replace(/\$\{/g, '\\${')
   // ex
   const codeEx = (metaMap.ex || '').replace(/([\\`\$\{])/g, '\\$1')
   code = code.replace(/([\\`\$\{])/g, '\\$1')
   let test = ''

   if (metaMap.testPrinterArgument && metaMap.testPrinter) {
      const testPrinterArgument = metaMap.testPrinterArgument.replace(/([\\])/g, '\\$1')
      const testPrinter = metaMap.testPrinter.replace(/([\\])/g, '\\$1')
      test = `
      test={
         <MethodTest
            initialArgs={${testPrinterArgument}}
            onClickCall={${testPrinter}}
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

const ${componentName} = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'${name}'}
         title={'${name}'}
         open={open}
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
