
// ------------------ Error log from script -------------- //
// type: 105: Running compiled 'run' method. The error is in the 'run' method.
// time: 2019-04-07T14:56:00.560Z
// selectedScript.path: /Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/.vsc-script/compileVSC.vsc-script.ts
// path: [object Object]
// error 
var info = {
   "isError": true,
   "type": "ReferenceError",
   "stack": "ReferenceError: vsc_base_1 is not defined\n\tat Object.eval (eval at <anonymous> (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:131708:9), <anonymous>:18:9)\n\tat Generator.next (<anonymous>)\n\tat __awaiter (eval at <anonymous> (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:131708:9), <anonymous>:8:71)\n\tat new Promise (<anonymous>)\n\tat __awaiter (eval at <anonymous> (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:131708:9), <anonymous>:4:12)\n\tat Object.run (eval at <anonymous> (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:131708:9), <anonymous>:17:12)\n\tat Script.<anonymous> (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:221:47)\n\tat Generator.next (<anonymous>)\n\tat fulfilled (/Users/alfnielsen/Dropbox/Coding/vsc-base/vsc-script/dist/extension.js:138:58)",
   "message": "vsc_base_1 is not defined"
}
// ts transpiled js code:
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/* const vsc_base_1 = require("vsc-base") // vsc-base has change the ts transpiled code here. */;
/**
 * This script finds all const names in a file (From start of lines) and append the list to the end of that file.
 */
function run(path) {
    return __awaiter(this, void 0, void 0, function* () {
        vsc_base_1.default.showMessage('Start compiling vsc...');
        const vscFiles = yield vsc_base_1.default.findFilePaths('**/vsc-base-development/vsc-base-*.ts');
        let [dir] = vsc_base_1.default.splitPath(vscFiles[0]);
        dir = vsc_base_1.default.trimDashes(dir);
        // ------ compile vsc-base definition (typings d.ts) and vsc-base.org documentation ------- //
        const parts = [];
        for (const filePath of vscFiles) {
            const rawSource = yield vsc_base_1.default.getFileContent(filePath);
            const rawParts = rawSource.split(/\n\/\*\*\s*\n/);
            rawParts.shift(); // <-- This is imports
            rawParts.forEach(part => {
                const metaBody = part.split(/\n\s*\*\/\s*\n/);
                const meta = metaBody[0];
                const body = metaBody[1];
                //name
                const nameMatch = body.match(/^[\s\n]*(?:export\s+)const\s+(\w+)/);
                if (!nameMatch) {
                    vsc_base_1.default.showErrorMessage('Did not find method name!!: ' + body);
                    return;
                }
                const name = nameMatch[1];
                //meta map:
                const metaMap = {};
                const mapArgs = meta.split(/\n\s+\*\s+@/);
                metaMap.description = mapArgs.shift().replace(/(^|\n)\s+\*/g, '\n');
                mapArgs.forEach(arg => {
                    const argNameMatch = arg.match(/^\w+/);
                    const argName = argNameMatch[0];
                    const argContent = arg.replace(/^\w+\s/, '').replace(/(^|\n)\s+\*/g, '\n');
                    if (metaMap[argName]) {
                        metaMap[argName] += ', ' + argContent;
                    }
                    else {
                        metaMap[argName] = argContent;
                    }
                });
                let annotationName = vsc_base_1.default.toCamelcase(name + 'AnnotatedCode');
                annotationName = annotationName[0].toUpperCase() + annotationName.substr(1);
                if (!body.match(/^\s*$/)) {
                    parts.push({ meta, body, name, metaMap, annotationName });
                }
            });
        }
        parts.sort((a, b) => a.body.localeCompare(b.body));
        // --- definition file:
        parts.map(p => {
        });
        const defFileContent = `
// Type definitions for vsc-base
// Project: vsc-base
// Definitions by: alf nielsen <alfnielsen@gmail.com>

declare namespace vsc {

${parts.map(part => `
 /**
${part.meta}
 */
   export ${part.metaMap.definition}
`)}
   
}

`;
        const defPath = dir + '/vsc-base.d.ts';
        const newDefPath = defPath.replace('vsc-script/src/vsc-base-development', 'vsc-base/src');
        yield vsc_base_1.default.saveFileContent(newDefPath, defFileContent);
        // --- vsc-base.org annoations:
        const orgDir = dir.replace('/vsc-script/src/vsc-base-development', '/vsc-base.org/src/allAnnotations');
        const anoDir = orgDir + '/annotations';
        //Set endpoint in vsc-base.org project:
        for (const part of parts) {
            const ano = writeAnnotationComponent(part.annotationName, part.name, part.body, part.metaMap);
            yield vsc_base_1.default.saveFileContent(`${anoDir}/${part.annotationName}.tsx`, ano);
        }
        const allAnnotationsContent = `import React from 'react'

${parts.map(part => `import ${part.annotationName} from './annotations/${part.annotationName}'`).join('\n')}

const AllAnnotations = () => {
   <>
${parts.map(part => `      <${part.annotationName} />`).join('\n')}
   </>
}
export default AllAnnotations
   `;
        yield vsc_base_1.default.saveFileContent(`${orgDir}/AllAnnotations.tsx`, allAnnotationsContent);
        // ----------------- copy to vsc-base project -------------------- //
        for (const filePath of vscFiles) {
            const newPath = filePath.replace('vsc-script/src/vsc-base-development', 'vsc-base/src');
            yield vsc_base_1.default.copy(filePath, newPath);
        }
        const basePath = dir + '/vsc-base.ts';
        const newPath = basePath.replace('vsc-script/src/vsc-base-development', 'vsc-base/src');
        yield vsc_base_1.default.copy(basePath, newPath);
    });
}
exports.run = run;
const writeAnnotationComponent = (componentName, name, code, metaMap) => {
    let descr = metaMap.description.trim();
    descr = `<p>
                  ${descr.replace(/\n/, '\n               </p>\n               <p>\n               ')}
               </p>`;
    const oneLineEx = metaMap.oneLineEx.replace(/`/g, '\\`');
    code = code.replace(/`/g, '\\`');
    let test = '';
    if (metaMap.testPrinterArgument && metaMap.testPrinter) {
        test = `
      test={
         <MethodTest
            initialArgs={${metaMap.testPrinterArgument}}
            onClickCall={${metaMap.testPrinter}}
         />
      }
      `;
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

`;
};


