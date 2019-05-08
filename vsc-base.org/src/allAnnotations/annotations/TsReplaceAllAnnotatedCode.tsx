import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TsReplaceAllAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'tsReplaceAll'}
         title={'tsReplaceAll'}
         open={open}
         annotation={
            <>
               <p>
                  
 tsReplace is a smart search and replace that take the source, a replaceString and a callback for finding the node to replace. 
               </p>
               <p>
                It uses <a href='http://vsc-base.org/#tsFindNodePositionFromContent'>tsFindNodePositionFromContent</a> to find the node.
               </p>
            </>
         }
         
         codeOneLineEx={`source = vsc.tsReplace(source, replaceString, findNodePositionCallback)`}
         codeEx={`
let source = \`
   const method2 = () => \{
      const moduleNumber1Path = '/module/area/file1' // <-- replace moduleNumber1Path
      return moduleNumber1Path // <-- replace moduleNumber1Path
   }
\`
// Find a constant with name starting with 'module' witin a function but not in an if statement
source = vsc.tsReplaceAll(source, 'moduleNumber2', node => vsc.tsIsIdentifier(node, \{
   name: 'moduleNumber1Path'
}))
`}
         code={`/**
 * @vscType ts
 * @returns string
 */
export const tsReplaceAll = (source: string, replaceString: string, callback: (node: ts.Node, typeChecker?: ts.TypeChecker, program?: ts.Program) => boolean, program?: ts.Program, fromPosition = 0, trimSpaces = true): string => \{
   const positions = vsc.tsFindAllNodePositionsFromContent(source, callback, program, fromPosition, trimSpaces);
   positions.sort(([, positionA], [, positionB]) => positionA.start - positionB.start)
   let diff = 0
   positions.forEach(([, position]) => \{
      const start = position.start - diff;
      const end = position.end - diff;
      const length = end - start;
      diff -= replaceString.length - length
      source = source.substring(0, start) + replaceString + source.substring(end);
   })
   return source
}
`}
      />
   )
}

export default TsReplaceAllAnnotatedCode

