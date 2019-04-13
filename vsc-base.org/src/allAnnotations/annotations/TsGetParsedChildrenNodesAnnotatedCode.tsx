import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TsGetParsedChildrenNodesAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'tsGetParsedChildrenNodes'}
         title={'tsGetParsedChildrenNodes'}
         annotation={
            <>
               <p>
                  
               </p>
               <p>
                ts.Node's getChildren and getChildrenCount uses tokens not parsed nodes. \
 So to this method uses ts's forEachChild to colloct the parsed nodes. \
 Mostly used in custom transformer method
               </p>
            </>
         }
         
         codeOneLineEx={`const children = vsc.tsGetParsedChildrenNodes(node)`}
         codeEx={``}
         code={`/**
 * @description 
 * ts.Node's getChildren and getChildrenCount uses tokens not parsed nodes. \\
 * So to this method uses ts's forEachChild to colloct the parsed nodes. \\
 * Mostly used in custom transformer method
 * @see http://vsc-base.org/#tsParsedNodeChildrenCount
 * @params node
 * @experimental This method can easily change, because ts api is in experimental state.
 * @vscType ts
 * @oneLineEx const children = vsc.tsGetParsedChildrenNodes(node)
 */
export const tsGetParsedChildrenNodes = (node: ts.Node): ts.Node[] => \{
   let chrindren: ts.Node[] = []
   node.forEachChild(c => \{ chrindren.push(c) });
   return chrindren
}

`}
      />
   )
}

export default TsGetParsedChildrenNodesAnnotatedCode

