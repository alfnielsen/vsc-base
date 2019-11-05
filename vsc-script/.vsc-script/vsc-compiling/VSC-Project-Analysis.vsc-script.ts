//vsc-script-name: VSC-Project > Analyse
import * as vsc from 'vsc-base'

import { CodePart, createPartMap } from './vcs-base-util/mapping';

/**
 * This script finds all const names in a file (From start of lines) and append the list to the end of that file.
 */
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
   vsc.showMessage(`found ${parts.length} methods in ${vscFiles.length} files`)
}
