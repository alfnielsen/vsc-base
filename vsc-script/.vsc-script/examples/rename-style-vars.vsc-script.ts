//vsc-script-name: Style variables > Rename style variable
import * as vsc from 'vsc-base'

export async function run(path: string) {
   let name = '', dir = ''
   if (vsc.isDir(path)) {
      dir = path
      const [, dirName] = vsc.splitPath(path)
      name = dirName
   } else {
      dir = vsc.getDir(path)
      name = path.replace(/^.*\/([^\/\.]*)\..*$/, '$1')
   }
   let stylePaths = await vsc.findFilePathsFromBase(dir, '*.{scss,css}')
   const styleNameReg = new RegExp(`\/${name}\\..*$`) // extension but also .module ect..
   const stylePath = stylePaths.find(p => styleNameReg.test(p))
   let compPaths = await vsc.findFilePathsFromBase(dir, '*.{js,ts,tsx,jsx}')
   const compNameReg = new RegExp(`\/${name}\\.(?:[jt]sx?)$`) // extension but also .module ect..
   const compPath = compPaths.find(p => compNameReg.test(p))
   if (!stylePath || !compPath) {
      vsc.showErrorMessage("Component or Style file not found!")
      return
   }
   let styleContent = await vsc.getFileContent(stylePath);
   let all = styleContent.match(/\.[a-zA-Z_\-]+\b/g)
   if (!all) {
      vsc.showErrorMessage('Did not find any classes in style file!')
      return
   }
   const styles = all.map(p => ({ name: p.replace(/^\./, ''), found: false })) // remove dot
   let compContent = await vsc.getFileContent(compPath);
   styles.forEach(s => {
      const reg = new RegExp(`\\bstyles\\.${s.name}\\b`);
      if (reg.test(compContent)) {
         s.found = true
      }
   })
   const pickList = styles.map(s => `${s.name}${s.found ? '' : '    [Not used!]'}`)
   const pick = await vsc.pick(pickList)
   if (!pick) { return }
   const stylePicked = styles[pickList.findIndex(p => p === pick)];
   const newName = await vsc.ask(`Replace '${stylePicked.name}' with ?`, stylePicked.name)
   //replace in style:
   const regStyle = new RegExp(`(\\.${stylePicked.name})\\b`, 'g');
   styleContent = styleContent.replace(regStyle, `.${newName}`)
   //replace in comp:
   const regComp = new RegExp(`(\\bstyles\\.${stylePicked.name})\\b`, 'g');
   compContent = compContent.replace(regComp, `styles.${newName}`)
   await vsc.saveFileContent(stylePath, styleContent)
   await vsc.saveFileContent(compPath, compContent)
   vsc.showMessage("Renaming done")

} 
