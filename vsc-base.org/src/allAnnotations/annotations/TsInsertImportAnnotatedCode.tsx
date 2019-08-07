import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TsInsertImportAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'tsInsertImport'}
         title={'tsInsertImport'}
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
         
         codeOneLineEx={`source = vsc.tsInsertImport(source, 'useCallback', 'react')`}
         codeEx={``}
         code={`/**
 * @vscType ts
 * @returns string
 */
export const tsInsertImport: (
   source: string,
   importName: string,
   importPath: string,
   options?: \{
      isDefault?: boolean,
      useDoubleQuotation?: boolean,
      addSemicolon?: boolean
   }
) => string = (source, importName, importPath, options) => \{
   const \{
      isDefault = false,
      useDoubleQuotation = false,
      addSemicolon = false
   } = options || \{}
   const [matchImport] = vsc.tsFindNodePositionFromContent(source, node =>
      vsc.tsMatchImport(node, \{
         nameSpace: importName
      })
      ||
      vsc.tsMatchImport(node, \{
         defaultName: importName
      })
      ||
      vsc.tsMatchImport(node, \{
         hasSpecifiersName: importName
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
   if (importPos === 0) \{
      const useStrictMatch = source.match(/^[\\n\\s]*['"']use strict['"'];?[^\\S\\r\\n]*\\n/)
      if (useStrictMatch) \{
         importPos = useStrictMatch[0].length
      }
   }
   const quotation = useDoubleQuotation ? '"' : "'";
   const semiColon = addSemicolon ? ';' : '';
   const importContent = isDefault
      ? \`import \$\{importName} from \$\{quotation}\$\{importPath}\$\{quotation}\$\{semiColon}\\n\`
      : \`import \{ \$\{importName} } from \$\{quotation}\$\{importPath}\$\{quotation}\$\{semiColon}\\n\`
   source = source.substring(0, importPos) + importContent + source.substring(importPos);

   return source
}`}
      />
   )
}

export default TsInsertImportAnnotatedCode

