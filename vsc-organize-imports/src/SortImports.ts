import * as ts from 'typescript'
import * as vsc from 'vsc-base'
import * as vscode from 'vscode'


type ImportSpecifier = { fullString: string, name: string, node: ts.ImportSpecifier }

type Import = {
  node: ts.ImportDeclaration
  pos: vsc.VscodePosition
  name?: string
  sortName: string
  specifiers: ImportSpecifier[]
  path: string
  fullString: string
}

type Imports = Import[]

type groupType =
  //local (absolute)
  "absoluteDirect" |
  "absolute" |
  //local (relative)
  "relativeDirect" |
  "relative" |
  //globals
  "globalDirect" |
  "global"

export type SortImportsOptions = {
  baseUrl: string,
  basePath: string,
  orderSpecifiers: boolean,
  orderSpecifiersAsSingleLine: boolean
  emptyLinesAfterImports: number
  emptyLinesBetweenFilledGroups: number
  groups: { groups: groupType[], emptyLines: true, sortBy: string }[]
}

export async function SortImports(
  path: string,
  content: string,
  options: SortImportsOptions
): Promise<vscode.TextEdit[] | undefined> {

  // Find first non imports: (exclude 'use strict' and sourceFile')
  const sourceFile = vsc.tsCreateSourceFile(content)
  const children = vsc.tsGetParsedChildren(sourceFile)

  const firstNode = children.find(node => {
    if (ts.isExpressionStatement(node)) {
      const text = node.expression.getText()
      return (text !== "'use strict'" && text !== '"use strict"')
    }
    return !ts.isImportDeclaration(node)
  })

  const _imports = children.filter(node =>
    ts.isImportDeclaration(node) && (!firstNode || node.pos < firstNode.pos)) as ts.ImportDeclaration[]

  //Find first node that is not in import
  const imports = mapImports(content, _imports, options);
  if (!imports) {
    return Promise.resolve(undefined)
  }
  //find last import
  const firstImport = imports[0]
  const lastImport = imports[imports.length - 1]

  const fillDir = vsc.getDir(path)

  const newImportContent = await organizeImports(
    fillDir,
    imports,
    options
  )

  let end = lastImport.node.end
  end += content.substr(end).match(/[\n\s]*/)![0].length

  vsc.insertAt(newImportContent, firstImport.pos.start, end)

}

const sortNamedImports = (specifiers: ImportSpecifier[], fullString: string, orderSpecifiersAsSingleLine: boolean) => {
  specifiers.sort((a, b) => a.name.localeCompare(b.name))
  if (orderSpecifiersAsSingleLine) {
    const specifierContent = specifiers.map(s => s.fullString).join(', ')
    fullString = fullString.replace(/\{[^}]+\}/, '{ ' + specifierContent + ' }')
  } else {
    const specifierContent = specifiers.map(s => s.fullString).join(',\n  ')
    fullString = fullString.replace(/\{[^}]+\}/, '{\n  ' + specifierContent + '\n}')
  }
  return fullString;
}

const organizeImports = async (
  fillDir: string,
  imports: Imports,
  options: SortImportsOptions
) => {
  const relativeRegExp = /^\./;
  const groups = {
    //locals (absolute)
    absoluteDirect: [] as Imports,
    absolute: [] as Imports,
    //local (relative)
    relativeDirect: [] as Imports,
    relative: [] as Imports,
    //globals
    globalDirect: [] as Imports,
    global: [] as Imports,
  }
  //split into global / local
  imports.forEach(_import => {
    let fullPath = '';
    const relative = relativeRegExp.test(_import.path)
    if (relative) {
      fullPath = vsc.joinPaths(fillDir, _import.path)
    } else {
      fullPath = vsc.joinPaths(options.basePath, _import.path)
    }

    //base groups settings:
    let local = vsc.doesExists(fullPath)
    if (
      !local &&
      vsc.doesExists(fullPath + '.ts') ||
      vsc.doesExists(fullPath + '.tsx') ||
      vsc.doesExists(fullPath + '.js') ||
      vsc.doesExists(fullPath + '.jsx')
    ) {
      local = true
    }
    const direct = !_import.node.importClause
    const hasDefault = !!_import.name
    const hasNamed = _import.specifiers.length > 0

    if (local && relative) {
      if (direct) {
        groups.relativeDirect.push(_import)
      } else {
        groups.relative.push(_import)
      }
    } else if (local) {
      if (direct) {
        groups.absoluteDirect.push(_import)
      } else {
        groups.absolute.push(_import)
      }
    } else {
      if (direct) {
        groups.globalDirect.push(_import)
      } else if (hasDefault && hasNamed) {
        groups.global.push(_import)
      }
    }
  })
  const defaultMapping: { groups: (keyof typeof groups)[], emptyLines: boolean, sortBy: string }[] = options.groups
  let newImportContent = ""
  defaultMapping.forEach((groupOptions, index) => {
    let group = [] as Imports
    groupOptions.groups.forEach(groupName => {
      group = [...group, ...groups[groupName]]
    })
    if (group.length === 0) {
      return
    }
    // sort
    if (groupOptions.sortBy === 'path') {
      group.sort((a, b) => a.path.localeCompare(b.path))
    } else if (groupOptions.sortBy === 'name') {
      group.sort((a, b) => a.sortName.localeCompare(b.sortName))
    } else {
      group.sort((a, b) => a.node.getText().localeCompare(b.node.getText()))
    }

    // join and add
    newImportContent += group.map(imp => imp.fullString).join('\n') + '\n'
    if (!newImportContent.match(/\n\n$/) && groupOptions.emptyLines) {
      // add spaces
      for (let space = 0; space < options.emptyLinesBetweenFilledGroups; space++) {
        newImportContent = '\n' + newImportContent;
      }
    }
  })
  newImportContent = newImportContent.trim() + '\n'
  for (let lines = 0; lines < options.emptyLinesAfterImports; lines++) {
    newImportContent += '\n';
  }
  return newImportContent
}

const mapImports = (content: string, _imports: ts.ImportDeclaration[], options: SortImportsOptions) => {
  // All imports before first statement, mapped with import path
  // Map with name?, fullString, and named imports info
  const imports: Imports = _imports.map((node, index) => {
    let name = '', sortName = ''
    let importFullString = content
      .substring(
        index === 0 ? node.pos : _imports[index - 1].end + 1,
        node.end
      )
      .trim();
    let specifiers: ImportSpecifier[] = []
    const importClause = node.importClause
    //named imports (specifiers)
    if (importClause) {
      if (importClause.name) {
        name = importClause.name.getText()
        sortName = name
      }
      if (importClause.namedBindings && ts.isNamedImports(importClause.namedBindings)) {
        specifiers = importClause.namedBindings.elements.map(e => ({
          fullString: e.getText().trim(),
          node: e,
          name: e.name.getText()
        }))
        if (options.orderSpecifiers) {
          importFullString = sortNamedImports(specifiers, importFullString, options.orderSpecifiersAsSingleLine)
        }
        sortName = sortName + specifiers.map(s => s.name).join()
      }
    }
    const pos = vsc.createVscodeRangeAndPosition(content, node.pos, node.end);
    return ({
      name,
      sortName,
      pos,
      specifiers,
      fullString: importFullString,
      node: node,
      path: node.moduleSpecifier
        .getText()
        .replace(/^['"]|['"]$/g, ''),
    })
  })
  return imports
}
