//vsc-script-name: VSC-Project > Full Compiler
import * as vsc from 'vsc-base'

import { CodePart, createPartMap } from './vcs-base-util/mapping';

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
   vsc.showMessage(`found ${parts.length} methods in ${vscFiles.length} files`)

   // get the dir (vsc-script/src/vsc-base-development), the script don't care where you click to start it!
   let [dir] = vsc.splitPath(vscFiles[0])
   dir = '/' + vsc.trimDashes(dir)
   // Now create all element/files used by the the vsc-base.org project
   await CreateTests(parts)
   await CompileToVscBaseOrg(dir, parts)
   vsc.showMessage('Cloning to vsc-base..')
   await CloneAndBuildVscBase(dir, vscFiles)
   vsc.showMessage(`Compiling Done`)
}



const CreateTests = async (parts: CodePart[]) => {
   for (const part of parts) {
      let testFile = part.file.replace('vsc-script/src/vsc-base-development/vsc-base-', 'vsc-script/src/test/compiled-tests/vsc-base-');
      testFile = testFile.replace('.ts', '.test.ts');
      let content = '';
      if (vsc.doesExists(testFile)) {
         content = await vsc.getFileContent(testFile);
      } else {
         content = `
import * as assert from 'assert'
import * as vsc from '../../vsc-base-development/vsc-base'

`
      }
      if (content.indexOf(`suite('${part.metaMap['vscType']}_${part.name}'`) < 0) {
         content += CreateTest(part)
      }
      await vsc.saveFileContent(testFile, content);
   }
}
const CreateTest = (part: CodePart) => {
   return `
suite('${part.metaMap['vscType']}_${part.name}', () => {
   test(' 1', () => {
      const r1 = vsc.${part.name}()
      assert.equal(r1, '')
   })
})
`
}

const CloneAndBuildVscBase = async (dir: string, vscFiles: string[]) => {
   const basePath = dir + '/vsc-base.ts';
   const vscBaseDir = dir.replace('vsc-script/src/vsc-base-development', 'vsc-base');
   const newPath = basePath.replace('vsc-script/src/vsc-base-development', 'vsc-base/src');
   // delete ori files:
   await vsc.remove(vscBaseDir + '/src')
   await vsc.remove(vscBaseDir + '/out')
   // Now Copy the source files the vsc-base project
   for (const filePath of vscFiles) {
      const newPath = filePath.replace('vsc-script/src/vsc-base-development', 'vsc-base/src');
      await vsc.copy(filePath, newPath)
   }
   await vsc.copy(basePath, newPath)
   vsc.showMessage("Building vsc-base ..")
   //run build:
   await vsc.execFromPath("yarn build", vscBaseDir)
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
   const ggg = parts.map(part => `import ${part.annotationName} from './annotations/${part.annotationName}'`).join('\n')

   const allAnnotationsContent = `import React from 'react'

${parts.map(part => `import ${part.annotationName} from './annotations/${part.annotationName}'`).join('\n')}

const annotations = [
${parts.map(part => `  { vscType: '${((part.metaMap['vscType'] || ['']).join(',')).toLowerCase()}', name: '${part.name.toLowerCase()}', component: (open: boolean) => <${part.annotationName} key={'${part.name}'} open={open} /> }`).join(',\n')}
]

interface AllAnnotationsProps {
   activeMethod: string
   name?: string
   vscType?: string[]
}

const AllAnnotations = ({ activeMethod, name, vscType }: AllAnnotationsProps) => {
   let anns = annotations
   if(name)anns = anns.filter(a=>a.name.match(name))
   if(vscType && vscType.length>0)anns = anns.filter(a=>vscType.some(t=>a.vscType.match(t)))
   return (
      <>
         {anns.map(a=>
            a.component(activeMethod === a.name)
         )}
      </>
   )
}

export default AllAnnotations
`

   // Save the AllAnnotations component in the vsc-base.org project (/vsc-base.org/src/allAnnotations)
   await vsc.saveFileContent(`${dir}/AllAnnotations.tsx`, allAnnotationsContent)
}

const writeAnnotationComponent = (
   componentName: string,
   name: string,
   code: string,
   metaMap: { [key: string]: string[] },
   metaMapRaw: { [key: string]: string[] }
) => {
   // meta
   const writeMetaMap: string[] = []
   const excludeList = ['description', 'see', 'example', 'oneLineEx', 'ex', 'testPrinterArgument', 'testPrinter']
   for (const [key, content] of Object.entries(metaMapRaw)) {
      if (!excludeList.includes(key)) {
         const escapedContent = content.join(',').replace(/([\\`\$\{])/g, '\\$1')
         let m = ` * @${key} ${escapedContent}`
         writeMetaMap.push(m)
      }
   }
   const meta = writeMetaMap.join('\n');
   //description
   let descr = metaMap.description.join(',');
   const newLineReg = /\\\n/g
   //markdown:
   descr = descr.replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
   descr = descr.replace(/{/g, "&#123;")
   descr = descr.replace(/}/g, "&#125;")
   descr = descr.replace(/\[([^\n\]]+)\]\((https?:\/\/[^\s]+)\)/g, `<a href='$2'>$1</a>`)
   descr = descr.replace(/\*\*([^\n\*]+)\*\*/, '<b>$1</b>')
   descr = `<p>
                  ${descr.replace(newLineReg, '\n               </p>\n               <p>\n               ')}
               </p>`
   // online ex
   const oneLineEx = metaMap.oneLineEx.join(',').replace(/([\\`\$\{])/g, '\\$1').replace('\n', '');//.replace(/`/g, '\\`').replace(/\$\{/g, '\\${')
   // ex
   const codeEx = (metaMap.ex || ['']).join(',').replace(/([\\`\$\{])/g, '\\$1')
   code = code.replace(/([\\`\$\{])/g, '\\$1')
   let test = ''

   if (metaMap.testPrinterArgument && metaMap.testPrinter) {
      const testPrinterArgument = metaMap.testPrinterArgument.join(',').replace(/([\\])/g, '\\$1')
      const testPrinter = metaMap.testPrinter.join(',')//.replace(/([\\])/g, '\\$1')
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
