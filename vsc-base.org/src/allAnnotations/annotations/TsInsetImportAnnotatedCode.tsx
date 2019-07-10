import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TsInsetImportAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'tsInsetImport'}
         title={'tsInsetImport'}
         open={open}
         annotation={
            <>
               <p>
                  
Insert an import if its not already imported. 
               </p>
               <p>
               It will add it to an existing import that has the same path or add a new import after the last import.
               </p>
            </>
         }
         
         codeOneLineEx={`source = vsc.tsInsetImport(source, 'useCallback', 'react')`}
         codeEx={``}
         code={`/**
 * @vscType ts
 * @returns string
 */
export const tsInsetImport = (source: string, importName: string, importPath: string, isDefault = false): string => \{
   const [matchImport] = vsc.tsFindNodePositionFromContent(source, node =>
      vsc.tsMatchImport(node, \{
         nameSpace: importName
      })
      ||
      vsc.tsMatchImport(node, \{
         defaultName: importName
      })
   )
   if (matchImport) \{
      return source
   }
   const [matchImportPath] = vsc.tsFindNodePositionFromContent(source, node =>
      vsc.tsMatchImport(node, \{
         path: importPath
      })
   )
   if (matchImportPath) \{
      let importContent = matchImportPath.getText()
      importContent = isDefault
         ? importContent.replace('import ', \`import \$\{importName}, \`)
         : importContent.replace('import \{', \`import \{ \$\{importName},\`)
      source = source.substring(0, matchImportPath.pos) + importContent + source.substring(matchImportPath.end);
      return source
   }

   const allImports = vsc.tsFindAllNodePositionsFromContent(source, node =>
      vsc.tsMatchImport(node)
   ).map(([imp, pos]) => imp)
   let importPos = 0
   if (allImports.length > 0) \{
      allImports.sort((a, b) => a.end - b.end);
      const lastImport = allImports[allImports.length - 1]
      importPos = lastImport.end + 1;
   }
   const importContent = isDefault
      ? \`import \$\{importName} from '\$\{importPath}'\\n\`
      : \`import \{ \$\{importName} } from '\$\{importPath}'\\n\`
   source = source.substring(0, importPos) + importContent + source.substring(importPos);

   return source
}`}
      />
   )
}

export default TsInsetImportAnnotatedCode

