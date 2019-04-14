import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const MaxDepthReplacerAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'maxDepthReplacer'}
         title={'maxDepthReplacer'}
         annotation={
            <>
               <p>
                  
 Clone an JSON Object (any type) with max depth. 
               </p>
               <p>
                This method goes through the object structure and replace children that goes deeper then the max Depth
               </p>
            </>
         }
         
         codeOneLineEx={`const newObj = vsc.maxDepthReplacer(obj, 3);`}
         codeEx={``}
         code={`/**
 * @param obj, maxDepth, currentLevel
 * @debugTool Primary a debugging method.
 * @vscType Raw
 * @returns string
 */
export const maxDepthReplacer = (obj: unknown, maxDepth: number, currentLevel: number = 0): any => \{
   if (Array.isArray(obj)) \{
      if (currentLevel > maxDepth) \{
         return \`[vsc: maxDepth \$\{maxDepth} reached - Array]\`
      }
      return obj.map(child => maxDepthReplacer(child, maxDepth, currentLevel + 1))
   }
   if (typeof obj === "object" && obj !== null) \{
      if (currentLevel > maxDepth) \{
         return \`[vsc: maxDepth \$\{maxDepth} reached - Object]\`
      }
      const children: any = \{}
      for (const [key, value] of Object.entries(obj)) \{
         children[key] = maxDepthReplacer(value, maxDepth, currentLevel + 1)
      }
      return children;
   }
   return obj
}`}
      />
   )
}

export default MaxDepthReplacerAnnotatedCode

