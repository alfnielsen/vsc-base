import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TsGetParsedChildrenAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'tsGetParsedChildren'}
         title={'tsGetParsedChildren'}
         open={open}
         annotation={
            <>
               <p>
                  
ts.Node's getChildren and getChildrenCount uses tokens not parsed nodes. 
               </p>
               <p>
               So to this method uses ts' forEachChild to collect the parsed nodes. 
               </p>
               <p>
               Normally used in custom transformer methods (vsc.tsCreateTransformer)
               </p>
            </>
         }
         
         codeOneLineEx={`const children = vsc.tsGetParsedChildren(node)`}
         codeEx={``}
         code={`/**
 * @params node
 * @experimental This method can easily change, because ts api is in experimental state.
 * @vscType ts
 */
export const tsGetParsedChildren = (node: ts.Node): ts.Node[] => \{
   let children: ts.Node[] = []
   node.forEachChild(c => \{ children.push(c) });
   return children
}`}
      />
   )
}

export default TsGetParsedChildrenAnnotatedCode

