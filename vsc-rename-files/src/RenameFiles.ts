'use strict'
import * as vsc from 'vsc-base'
import * as vscode from 'vscode'

export default class RenameFiles {
   /**
    * The main method that runs the create template output
    */
   async rename(uri?: vscode.Uri) {
      vsc.showMessage("" + uri)
      if (!uri) {
         vsc.showErrorMessage(
            'vsc rename-files most be run by right-clicking a file or folder!'
         )
         return
      }
      const path = vsc.pathAsUnix(uri.fsPath)
      let dir = vsc.getDir(path)
      // Ask
      const versions = ["Rename with String", "Rename with RegExp"]
      const version = await vsc.pick(versions)
      if (!version) { return }
      const foldersPick = ["Files in selected folder ( Only )", "Files in selected folder ( And files in sub-folders )"]
      const folderPick = await vsc.pick(foldersPick)
      if (!folderPick) { return }
      const thisFolderOnly = foldersPick[0] === folderPick
      const isReg = versions[1] === version
      const [, pathName] = vsc.splitPath(path)
      const fromName = await vsc.ask(
         isReg
            ? "Write RegExp (without \/) (Add \/[gimusy] in end for flags)?"
            : "What name should be replaced?",
         pathName);
      if (!fromName) { return }
      const toName = await vsc.ask(
         isReg
            ? `What should '${fromName}' be replaced with? (You can use $index)`
            : `What should '${fromName}' be replaced with? (You can use $index and captured groups $1,$2...)`
         ,
         fromName
      );
      if (toName === undefined) { return }
      // Regexp
      let reg: RegExp | undefined
      if (isReg) {
         let regString = fromName;
         const matchFlags = regString.match(/\/([gimusy]+)$/)
         let flag = ""
         if (matchFlags) {
            regString = regString.replace(/\/([gimusy]+)$/, '')
            flag = matchFlags[1];
         }
         reg = new RegExp(regString, flag)
         vsc.showMessage("reg:" + reg)
      }
      // Replace file names
      const includePath = thisFolderOnly ? '*' : '**/*'
      const filePaths = await vsc.findFilePathsFromBase(dir, includePath)
      let index = 0
      for (const path of filePaths) {
         let newName = toName.replace("$index", "" + index);
         let newFileName = path.replace(/^.*\/([^\/]+)$/, '$1')
         const folderPath = path.replace(/^(.*\/)[^\/]+$/, '$1')
         let found = false
         if (isReg && reg && reg.test(newFileName)) {
            newFileName = newFileName.replace(reg, newName)
            found = true
         } else if (!isReg) {
            newFileName = newFileName.replace(fromName, newName)
            found = true
         }
         if (found) {
            let newFilePath = `${folderPath}${newFileName}`
            if (path === newFilePath) {
               continue
            }
            if (vsc.doesExists(newFilePath)) {
               //vsc.showErrorMessage(`File already exists! Use $index to add index number for file with the same name. FilePath: ${newFilePath}`)
               const shouldContinueAnswers = [
                  `Stop renaming       (File ${newFileName} already exist in folder)`,
                  `Continue renaming   (Without renaming ${newFileName})`
               ]
               const shouldContinue = await vsc.pick(shouldContinueAnswers);
               if (!shouldContinue || shouldContinue === shouldContinueAnswers[0]) {
                  vsc.showMessage('File renaming has been stopped.')
                  return
               }
            } else {
               await vsc.rename(path, newFilePath)
               index += 1;
            }
         }
      }
      vsc.showMessage('File renaming done')
   }
}