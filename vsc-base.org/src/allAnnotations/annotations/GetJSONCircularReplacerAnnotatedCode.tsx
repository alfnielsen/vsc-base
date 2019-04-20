import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const GetJSONCircularReplacerAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'getJSONCircularReplacer'}
         title={'getJSONCircularReplacer'}
         open={open}
         annotation={
            <>
               <p>
                  
 Provide a circular safe JSON.stringify replacer. 
               </p>
               <p>
                See <a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Cyclic_object_value#Examples'>https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Cyclic_object_value#Examples</a>
               </p>
            </>
         }
         
         codeOneLineEx={`const objString = JSON.stringify(someObject, vsc.getJSONCircularReplacer(), 2);`}
         codeEx={``}
         code={`/**
 * @vscType Raw
 * @debugTool Primary a debugging method.
 * @returns (_key: string, value: unknown) => unknown
 */
export const getJSONCircularReplacer = (): (_key: string, value: unknown) => unknown => \{
   const seen = new WeakSet();
   return (_key: string, value: unknown) => \{
      if (typeof value === "object" && value !== null) \{
         if (seen.has(value)) \{
            return '[vsc: circular reference]'; // Write out that this is a Circular Reference.
         }
         seen.add(value);
      }
      return value;
   }
}
`}
      />
   )
}

export default GetJSONCircularReplacerAnnotatedCode

