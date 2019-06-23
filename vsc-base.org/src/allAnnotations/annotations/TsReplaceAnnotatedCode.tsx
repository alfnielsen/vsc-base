import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TsReplaceAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'tsReplace'}
         title={'tsReplace'}
         open={open}
         annotation={
            <>
               <p>
                  
 tsReplace is a smart search and replace that take the source, a replaceString and a callback for finding the node to replace. 
               </p>
               <p>
                It uses <a href='http://vsc-base.org/#tsFindNodePositionFromContent'>tsFindNodePositionFromContent</a> to find the node. 
 See also <a href='http://vsc-base.org/#tsReplaceAll'>tsReplaceAll</a>
               </p>
            </>
         }
         
         codeOneLineEx={`source = vsc.tsReplace(source, replaceString, findNodePositionCallback)`}
         codeEx={`
let source = \`
   const method2 = () => \{
      const moduleNumber1Path = '/module/area/file1' // <-- replace this
      return moduleNumber1Path
   }
\`
// Find a constant with name starting with 'module' within a function but not in an if statement
source = vsc.tsReplace(source, '/module/area/file2', node => vsc.tsMatchValue(node, /\\/area\\/file1/, \{
   hasAncestors: [
      ancestor => vsc.tsIsFunction(ancestor, \{ name: /^method/ }),
      ancestor => vsc.tsIsVariable(ancestor, \{ name: /^module.*Path/ })
   ]
}))
`}
         code={`/**
 * @vscType ts
 * @returns string
 */
export const tsReplace = (source: string, replaceString: string, callback: (node: ts.Node, typeChecker?: ts.TypeChecker, program?: ts.Program) => ts.Node, program?: ts.Program, fromPosition = 0, trimSpaces = true): string => \{
   const [node, position] = vsc.tsFindNodePositionFromContent(source, callback, program, fromPosition, trimSpaces);
   if (position) \{
      //replace
      source = source.substring(0, position.start) + replaceString + source.substring(position.end);
   }
   return source
}
`}
      />
   )
}

export default TsReplaceAnnotatedCode

