import * as ts from 'typescript'
import * as vsc from 'vsc-base'

type Imports = {
  node: ts.Node
  pos: vsc.VscodePosition
  path: string
  fullString: string
}[]

export async function run(path: string) {
  const content = vsc.getDocumentContent()
  if (!content) {
    return
  }
  const [dependencies, devDependencies] = await vsc.getPackageDependencies()
  const dependencyNames = Object.keys({ ...dependencies, ...devDependencies })
  //Find first node that is not in import
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
    node,
    pos,
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
  if (!imports) {
    return
  }
  //find last import
  const lastImport = imports.sort((a, b) => b.pos.end - a.pos.end)[0]
  //sort
  imports.sort((a, b) => a.path.localeCompare(b.path))
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
  const newImportContent =
    globalImports.map(imp => imp.fullString).join('\n') +
    (globalImports.length > 0 && absoluteImports.length > 0 ? '\n\n' : '') +
    absoluteImports.map(imp => imp.fullString).join('\n') +
    ((globalImports.length > 0 || absoluteImports.length > 0) &&
      localImports.length > 0
      ? '\n\n'
      : '') +
    localImports.map(imp => imp.fullString).join('\n')
  await vsc.insertAt(newImportContent, 0, lastImport.pos.end)
}
