import * as ts from 'typescript'
import * as vsc from 'vsc-base'
import * as vscode from 'vscode'

type Imports = {
  node: ts.ImportDeclaration
  name?: string
  specifiers: { fullString: string, name: string, node: ts.ImportSpecifier }[]
  pos: vsc.VscodePosition
  path: string
  fullString: string
}[]

export async function SortImports(
  content: string,
  spaceBetweenImportGroups: boolean,
  orderSpecifiers: boolean,
  orderSpecifiersAsSingleLine: boolean
): Promise<vscode.TextEdit[] | undefined> {
  //Find first node that is not in import
  const imports = mapImports(content);
  if (!imports) {
    return Promise.resolve(undefined)
  }
  //find last import
  const firstImport = imports.sort((a, b) => a.pos.end - b.pos.end)[0]
  const lastImport = imports[imports.length - 1]
  //sort
  imports.sort((a, b) => a.path.localeCompare(b.path))

  //TODO: sort specifiers (maybe)
  if (orderSpecifiers) {
    imports.map(imp => {
      if (imp.specifiers) {
        imp.specifiers.sort((a, b) => a.name.localeCompare(b.name))
        if (orderSpecifiersAsSingleLine) {
          const specifierContent = imp.specifiers.map(s => s.fullString).join(', ')
          imp.fullString = imp.fullString.replace(/\{[^}]+\}/, '{ ' + specifierContent + ' }')
        } else {
          const specifierContent = imp.specifiers.map(s => s.fullString).join(',\n  ')
          imp.fullString = imp.fullString.replace(/\{[^}]+\}/, '{\n  ' + specifierContent + '\n}')
        }
      }
    })
  }
  const newImportContent = await organizeImports(imports, spaceBetweenImportGroups)
  //await vsc.insertAt(newImportContent, firstImport.pos.start, lastImport.pos.end)

  //todo redo this and use insertAt (when vsc-base use the same reaplce)
  const range = new vscode.Range(firstImport.pos.startPosition, lastImport.pos.endPosition)
  const edits: vscode.TextEdit[] = []
  edits.push(vscode.TextEdit.replace(range, newImportContent))
  const workspaceEdit = new vscode.WorkspaceEdit();
  workspaceEdit.set(vscode.window.activeTextEditor!.document.uri, edits);
  vscode.workspace.applyEdit(workspaceEdit);

}

const organizeImports = async (imports: Imports, spaceBetweenImportGroups: boolean) => {
  // load dependencies to specify global imports
  const [dependencies, devDependencies] = await vsc.getPackageDependencies()
  const dependencyNames = Object.keys({ ...dependencies, ...devDependencies })
  //split into global / local
  const globalImports: Imports = []
  const absoluteImports: Imports = []
  const localImports: Imports = []
  const directImports: Imports = []
  imports.forEach(_import => {
    const global = !!dependencyNames.find(name => {
      return name.indexOf(_import.path) === 0
    })
    const local = /^\./.test(_import.path)
    if (!_import.node.importClause) {
      directImports.push(_import)
    } else if (global) {
      globalImports.push(_import)
    } else if (local) {
      localImports.push(_import)
    } else {
      absoluteImports.push(_import)
    }
  })
  const addNewLine = () => {
    if (newImportContent.length > 0) {
      newImportContent += '\n'
      if (spaceBetweenImportGroups) {
        newImportContent += '\n'
      }
    }
  }
  //organize in groups with spaces between
  let newImportContent = ""
  if (globalImports.length > 0) {
    newImportContent += globalImports.map(imp => imp.fullString).join('\n');
  }
  if (absoluteImports.length > 0) {
    addNewLine()
    newImportContent += absoluteImports.map(imp => imp.fullString).join('\n')
  }
  if (localImports.length > 0) {
    addNewLine()
    newImportContent += localImports.map(imp => imp.fullString).join('\n')
  }
  if (directImports.length > 0) {
    addNewLine()
    newImportContent += directImports.map(imp => imp.fullString).join('\n')
  }

  return newImportContent
}



const mapImports = (content: string) => {
  const [, firstPos] = vsc.tsFindNodePositionFromContent(
    content,
    node => !ts.isSourceFile(node)
      && !ts.isImportDeclaration(node)
      && !(ts.isExpressionStatement(node) && node.expression.getText() === 'use strict')
  )
  // All imports before first statement, mapped with import path
  const importPos = vsc.tsFindAllNodePositionsFromContent(
    content,
    node =>
      ts.isImportDeclaration(node) && (!firstPos || node.end < firstPos.start)
  )
  const imports: Imports = importPos.map(([node, pos], index) => {
    const importNode = node as ts.ImportDeclaration
    let name = ''
    const fullString = content
      .substring(
        index === 0 ? pos.start : importPos[index - 1][1].end + 1,
        pos.end
      )
      .trim();
    let specifiers: { fullString: string, name: string, node: ts.ImportSpecifier }[] = []
    const importClause = importNode.importClause
    if (importClause) {
      if (importClause.name) {
        name = importClause.name.getText()
      }
      if (importClause.namedBindings && ts.isNamedImports(importClause.namedBindings)) {
        specifiers = importClause.namedBindings.elements.map(e => ({
          fullString: e.getText().trim(),
          node: e,
          name: e.name.getText()
        }))
      }
    }
    return ({
      pos,
      name,
      specifiers,
      fullString,
      node: importNode as ts.ImportDeclaration,
      path: importNode.moduleSpecifier
        .getText()
        .replace(/^['"]|['"]$/g, ''),
    })
  })
  return imports
}
