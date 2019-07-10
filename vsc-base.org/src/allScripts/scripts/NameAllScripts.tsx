import React from 'react'

import AnnotatedCode from '../../components/AnnotatedCode/AnnotatedCode'

const NameAllScripts = ({ open }: { open?: boolean }) => {
   return (
      <AnnotatedCode
         id={'NameAllScripts'}
         title={'Name All Scripts'}
         open={open}
         annotation={
            <>
               <p>
                  This is the script finds all scripts and add a
                  vsc-script-name, if it don't have it.
               </p>
               <p>
                  vsc method use:
                  <ul>
                     <li>
                        <a href='http://vsc-base.org/#findFilePaths'>
                           findFilePaths
                        </a>
                     </li>

                     <li>
                        <a href='http://vsc-base.org/#getFileContent'>
                           getFileContent
                        </a>
                     </li>
                     <li>
                        <a href='http://vsc-base.org/#saveFileContent'>
                           saveFileContent
                        </a>
                     </li>
                  </ul>
               </p>
            </>
         }
         codeOneLineEx={``}
         codeEx={``}
         code={`//vsc-script-name: Automation  -  Add Names To Scripts
import * as vsc from 'vsc-base'

export async function run(_path: string) {
   const files = await vsc.findFilePaths('**/*.vsc-script.ts');
   for (const filePath of files) {
      let source = await vsc.getFileContent(filePath)
      if (!source.match(/\\/\\/vsc\\-script\\-name:/)) {
         const name = filePath.replace(/^.*\\/([^\\/]*).ts$/, '$1')
         source = \`//vsc-script-name: $\{name\}\\n$\{source\}\`
         await vsc.saveFileContent(filePath, source)
      }
   }
}
         `}
      />
   )
}

export default NameAllScripts
