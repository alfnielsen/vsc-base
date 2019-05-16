import React from 'react'
import AnnotatedCode from '../../components/AnnotatedCode/AnnotatedCode'

const OrganizeImports = ({ open }: { open?: boolean }) => {
   return (
      <AnnotatedCode
         id={'OrganizeImports'}
         title={'Organize Imports'}
         open={open}
         annotation={
            <>
               <p>
                  This is the script that later turned into the vscode extension{' '}
                  <a href='https://marketplace.visualstudio.com/items?itemName=alfnielsen.vsc-organize-imports'>
                     vsc-organize-imports
                  </a>
                  .
               </p>
               <p>
                  vsc method use:
                  <ul>
                     <li>
                        <a href='http://vsc-base.org/#getDocumentContent'>
                           getDocumentContent
                        </a>
                     </li>

                     <li>
                        <a href='http://vsc-base.org/#tsFindNodePositionFromContent'>
                           tsFindNodePositionFromContent
                        </a>
                     </li>
                     <li>
                        <a href='http://vsc-base.org/#tsFindAllNodePositionsFromContent'>
                           tsFindAllNodePositionsFromContent
                        </a>
                     </li>
                     <li>
                        <a href='http://vsc-base.org/#insertAt'>insertAt</a>
                     </li>
                  </ul>
               </p>
            </>
         }
         codeOneLineEx={``}
         codeEx={``}
         code={`
import * as ts from 'typescript'
import * as vsc from 'vsc-base'

type Imports = {
  node: ts.ImportDeclaration
  name?: string
  specifiers: { fullString: string, name: string, node: ts.ImportSpecifier }[]
  pos: vsc.VscodePosition
  path: string
  fullString: string
}[]

export async function run() {
  const content = await vsc.getDocumentContent()
  if(!content){
    return
  }
  // Map all imports statement (in the start of the document) to a Imports object:
  const imports = mapImports(content);
  if (!imports) {
    return Promise.resolve(undefined)
  }
  //find last import
  const firstImport = imports.sort((a, b) => a.pos.end - b.pos.end)[0]
  const lastImport = imports[imports.length - 1]
  //sort by path
  imports.sort((a, b) => a.path.localeCompare(b.path))

  //This has changes to a setting in the real extension: (Sort named imports)
  imports.map(imp => {
    if (imp.specifiers) {
      imp.specifiers.sort((a, b) => a.name.localeCompare(b.name))

      //This has changes to a setting in the real extension: (Sort named imports single line)
      const specifierContent = imp.specifiers.map(s => s.fullString).join(', ')
      imp.fullString = imp.fullString.replace(/\{[^}]+\}/, '{ ' + specifierContent + ' }')

    }
  })
  
  const newImportContent = await organizeImports(imports, true)
  await vsc.insertAt(newImportContent, firstImport.pos.start, lastImport.pos.end)

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
      newImportContent += '\\n'
      if (spaceBetweenImportGroups) {
        newImportContent += '\\n'
      }
    }
  }
  //organize in groups with spaces between
  let newImportContent = ""
  if (globalImports.length > 0) {
    newImportContent += globalImports.map(imp => imp.fullString).join('\\n');
  }
  if (absoluteImports.length > 0) {
    addNewLine()
    newImportContent += absoluteImports.map(imp => imp.fullString).join('\\n')
  }
  if (localImports.length > 0) {
    addNewLine()
    newImportContent += localImports.map(imp => imp.fullString).join('\\n')
  }
  if (directImports.length > 0) {
    addNewLine()
    newImportContent += directImports.map(imp => imp.fullString).join('\\n')
  }

  return newImportContent
}

const mapImports = (content: string) => {
   //Find first node that is not in import
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

         `}
      />
   )
}

export default OrganizeImports
