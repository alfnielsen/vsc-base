import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TsMatchImportAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'tsMatchImport'}
         title={'tsMatchImport'}
         open={open}
         annotation={
            <>
               <p>
                  
Test is a node is an import declaration (node: ts.ImportDeclaration) 
               </p>
               <p>
               and optional test for its default ímport name ( import x from '' )
hasSpecifiers ( import names in brakes: import &#123; x &#125; from '').
               </p>
               <p>
               or nameSpace import name: ( import * as namespace from '' ) 
               </p>
               <p>
               or path for matching the source path. 
               </p>
               <p>
               or direct import which has no import names ( import form '' ) 
               </p>
               <p>
               Note: An alias in a specifier is its name: ( import &#123; some as x &#125; from '' ).
               </p>
            </>
         }
         
         codeOneLineEx={`const _import = vsc.tsMatchCall(node, options)`}
         codeEx={`
const aReactImport = vsc.tsMatchImport(
  node,
  \{
    path: /react/
  }
)`}
         code={`/**
 * @vscType ts
 * @returns ts.ImportDeclaration | undefined
 */
export const tsMatchImport: (node: ts.Node | undefined, options?: \{
   path?: RegExp | string
   direct?: boolean,
   defaultName?: RegExp | string
   nameSpace?: RegExp | string
   hasSpecifiersName?: RegExp | string
   hasSpecifiers?: (elements: ts.NodeArray<ts.ImportSpecifier>) => boolean
}) => ts.ImportDeclaration | undefined = (node, options) => \{
   if (!node || !ts.isImportDeclaration(node)) \{
      return
   }
   if (!options) \{
      return node
   }
   const \{ direct, defaultName, path, nameSpace, hasSpecifiersName, hasSpecifiers } = options

   if (direct !== undefined) \{
      if (node.importClause && direct === false) \{ return }
      if (!node.importClause && direct === true) \{ return }
   }

   if (path !== undefined) \{
      if (!node.moduleSpecifier) \{ return }
      const text = node.moduleSpecifier.getText().replace(/^['"']|['"']\$/g, '');
      if (path instanceof RegExp && !path.test(text)) \{ return }
      if (typeof path === 'string' && path !== text) \{ return }
   }

   if (defaultName !== undefined) \{
      if (!node.importClause || !node.importClause.name) \{ return }
      const name = node.importClause.name.getText()
      if (defaultName instanceof RegExp && !defaultName.test(name)) \{ return }
      if (typeof defaultName === 'string' && defaultName !== name) \{ return }
   }

   if (nameSpace !== undefined) \{
      if (
         !node.importClause ||
         !node.importClause.namedBindings ||
         !ts.isNamespaceImport(node.importClause.namedBindings)
      ) \{ return }
      const name = node.importClause.namedBindings.name.getText()
      if (nameSpace instanceof RegExp && !nameSpace.test(name)) \{ return }
      if (typeof nameSpace === 'string' && nameSpace !== name) \{ return }
   }

   if (hasSpecifiersName !== undefined) \{
      if (
         !node.importClause ||
         !node.importClause.namedBindings ||
         !ts.isNamedImports(node.importClause.namedBindings)
      ) \{ return }
      const found = node.importClause.namedBindings.elements.some(el => \{
         const name = el.name.getText()
         if (hasSpecifiersName instanceof RegExp && hasSpecifiersName.test(name)) \{ return true }
         if (typeof hasSpecifiersName === 'string' && hasSpecifiersName === name) \{ return true }
         return false
      })
      if (!found) \{
         return
      }
   }

   if (hasSpecifiers !== undefined) \{
      if (
         !node.importClause ||
         !node.importClause.namedBindings ||
         !ts.isNamedImports(node.importClause.namedBindings) ||
         !hasSpecifiers(node.importClause.namedBindings.elements)
      ) \{ return }
   }

   return node
}`}
      />
   )
}

export default TsMatchImportAnnotatedCode

