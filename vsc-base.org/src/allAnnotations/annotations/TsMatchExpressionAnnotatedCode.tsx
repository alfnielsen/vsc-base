import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const TsMatchExpressionAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'tsMatchExpression'}
         title={'tsMatchExpression'}
         open={open}
         annotation={
            <>
               <p>
                  
 Test if ndoe is an expression  (node: ts.EnumMember) 
               </p>
               <p>
                and optional test for its name, 
               </p>
               <p>
                and test for the enum's name (it parant) 
               </p>
               <p>
                and a test for it value. 
               </p>
               <p>
                Value can be tested against a string, a number (with a string or number or regexp), 
               </p>
               <p>
                or a match callback. Return true from the callback to accept the enum member node.
               </p>
            </>
         }
         
         codeOneLineEx={`const found = vsc.tsMatchEnumMember(node, options)`}
         codeEx={`
const found = vsc.tsMatchFunction(node, \{ matchName: /^myCaller\$/ })`}
         code={`/**
 * @vscType ts
 * @returns boolean
 */
export const tsMatchExpression: (
   expression: ts.Node | undefined,
   matchValue: (RegExp | string | number | boolean | ((initializer: ts.Expression) => boolean))
) => boolean = (expression, matchValue) => \{
   if (expression === undefined) \{
      return false
   }
   if (!ts.isLiteralExpression(expression)) \{ return false }
   if (
      typeof matchValue === 'string'
      &&
      (!ts.isStringLiteral(expression) || matchValue !== expression.text)
   ) \{
      return false
   }
   //ts's NumericLiteral has prop text that is s string, so we cast the matchValue.
   if (
      typeof matchValue === 'number'
      &&
      (!ts.isNumericLiteral(expression) || '' + matchValue !== expression.text)
   ) \{
      return false
   }
   if (matchValue === true && expression.kind !== ts.SyntaxKind.TrueKeyword) \{
      return false
   }
   if (matchValue === false && expression.kind !== ts.SyntaxKind.FalseKeyword) \{
      return false
   }
   if (
      matchValue instanceof RegExp
      &&
      (
         !ts.isNumericLiteral(expression)
         || !ts.isStringLiteral(expression)
         || matchValue.test(expression.text)
      )
   ) \{
      return false
   }
   if (
      matchValue instanceof Function
      && matchValue(expression) !== true
   ) \{
      return false
   }
   return true
}
`}
      />
   )
}

export default TsMatchExpressionAnnotatedCode

