//vsc-script-name: VSC-Project    -    Script with import statements
import * as vsc from 'vsc-base'

/**
 * This script finds all const names in a file (From start of lines) and append the list to the end of that file.
 */
export async function run(path: string) {
   vsc.showMessage('Start update...')
   // Find all files under vsc-base-development folder with starting name 'vsc-base-'
   const vscFiles = await vsc.findFilePaths(
      '**/vsc-base-development/vsc-base-*.ts'
   )
   let dir = vsc.getDir(vscFiles[0])
   const scriptDir = dir.replace('vsc-script/src/vsc-base-development', 'vsc-script');
   const scaffDir = dir.replace('vsc-script/src/vsc-base-development', 'vsc-scaffolding');

   vsc.showMessage(`Update vsc-base in Script: ${scriptDir}`)
   await vsc.execFromPath("ncu -u vsc-base", scriptDir)
   vsc.showMessage(`Install update in Script`)
   await vsc.execFromPath("npm i", scriptDir)
   vsc.showMessage(`Update vsc-base in Scaff`)
   await vsc.execFromPath("ncu -u vsc-base", scaffDir)
   vsc.showMessage(`Install update in Scaff`)
   await vsc.execFromPath("npm i", scaffDir)

   vsc.showMessage(`Update Done`)
}

