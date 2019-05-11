import * as ts from 'typescript'
import * as vsc from 'vsc-base'

type Imports = {
  node: ts.ImportDeclaration
  pos: vsc.VscodePosition
  path: string
  fullString: string
}[]

export async function SortImports(content: string, spaceBetweenImportGroups: boolean) {
  //Find first node that is not in import
  const imports = mapImports(content);
  if (!imports) {
    return
  }
  //find last import
  const lastImport = imports.sort((a, b) => b.pos.end - a.pos.end)[0]
  //sort
  imports.sort((a, b) => a.path.localeCompare(b.path))
  const newImportContent = await organizeImports(imports, spaceBetweenImportGroups)
  await vsc.insertAt(newImportContent, 0, lastImport.pos.end)
}

const organizeImports = async (imports: Imports, spaceBetweenImportGroups: boolean) => {
  // load dependencies to specifi global imports
  const [dependencies, devDependencies] = await vsc.getPackageDependencies()
  const dependencyNames = Object.keys({ ...dependencies, ...devDependencies })
  //split into global / local
  const globalImports: Imports = []
  const absoluteImports: Imports = []
  const localImports: Imports = []
  imports.forEach(_import => {
    const global = !!dependencyNames.find(name => {
      return name.indexOf(_import.path) === 0
    })
    const local = /^\./.test(_import.path)
    if (global) {
      globalImports.push(_import)
    } else if (local) {
      localImports.push(_import)
    } else {
      absoluteImports.push(_import)
    }
  })
  //organize in gruops with spaces between

  const newImportContent =
    globalImports.map(imp => imp.fullString).join('\n') +
      !spaceBetweenImportGroups ? '' : (globalImports.length > 0 && absoluteImports.length > 0 ? '\n\n' : '') +
        absoluteImports.map(imp => imp.fullString).join('\n') +
        !spaceBetweenImportGroups ? '' : ((globalImports.length > 0 || absoluteImports.length > 0) &&
          localImports.length > 0
          ? '\n\n'
          : '') +
        localImports.map(imp => imp.fullString).join('\n')
  return newImportContent
}



const mapImports = (content: string) => {
  const [, firstPos] = vsc.tsFindNodePositionFromContent(
    content,
    node => !ts.isSourceFile(node) && !ts.isImportDeclaration(node)
  )
  // All imports before first statement, mapped with import path
  const importPos = vsc.tsFindAllNodePositionsFromContent(
    content,
    node =>
      ts.isImportDeclaration(node) && (!firstPos || node.end < firstPos.start)
  )
  const imports: Imports = importPos.map(([node, pos], index) => ({
    node: node as ts.ImportDeclaration,
    pos,
    unsed: true,
    path: (node as ts.ImportDeclaration).moduleSpecifier
      .getText()
      .replace(/^['"]|['"]$/g, ''),
    fullString: content
      .substring(
        index === 0 ? pos.start : importPos[index - 1][1].end + 1,
        pos.end
      )
      .trim(),
  }))
  return imports
}
