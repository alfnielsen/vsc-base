import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TsIsObjectPropertyAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'tsIsObjectProperty'}
         title={'tsIsObjectProperty'}
         open={open}
         annotation={
            <>
               <p>
                  
 Test is a node is a object property (node: ts.PropertyAssignment) 
               </p>
               <p>
                Uses <a href='http://vsc-base.org/#tsMatchObjectProperty'>tsMatchObjectProperty</a>
               </p>
            </>
         }
         
         codeOneLineEx={`const isObjNode = vsc.tsIsObjectProperty(node, options)`}
         codeEx={`
const isObjNode = vsc.tsIsObjectProperty(node, \{ name: /^keyName\$/ })`}
         code={`/**
 * @vscType ts
 * @returns boolean
 */
export const tsIsObjectProperty: (node: ts.Node | undefined, options?: \{
   name?: RegExp | string
   value?: (RegExp | string | number | boolean | null)
   variableName?: RegExp | string
   parentObjectPropertyName?: RegExp | string
   hasAncestor?: (parent: ts.Node, depth: number) => boolean
   hasAncestors?: ((parent: ts.Node, depth: number) => boolean)[]
   hasGrandChild?: (child: ts.Node, depth: number) => boolean
   hasGrandChildren?: ((child: ts.Node, depth: number) => boolean)[]
}) => boolean = (node, options) => \{
   return !!vsc.tsMatchObjectProperty(node, options)
}
`}
      />
   )
}

export default TsIsObjectPropertyAnnotatedCode

