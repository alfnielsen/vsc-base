import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const CreateTsSourceFileAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'createTsSourceFile'}
         title={'createTsSourceFile'}
         annotation={
            <>
               <p>
                  
               </p>
               <p>
                Create a ts.SourceFile
               </p>
            </>
         }
         
         codeOneLineEx={`const sourceFile = vsc.createTsSourceFile(code)`}
         codeEx={``}
         code={`/**
 * @description 
 * Create a ts.SourceFile
 * @see http://vsc-base.org/#createTsSourceFile
 * @param content 
 * @param sourceFileName 
 * @experimental This method can easily change, because ts api is in experimental state.
 * @vscType ts
 * @oneLineEx const sourceFile = vsc.createTsSourceFile(code)
 */
export const createTsSourceFile = (
   content: string,
   sourceFileName = \`sourcefile_\$\{(new Date().getTime())}\`
): ts.SourceFile => \{
   let sourceFile = ts.createSourceFile(
      sourceFileName,
      content,
      ts.ScriptTarget.ES2015,
		/*setParentNodes */ true
   );
   return sourceFile;
}
`}
      />
   )
}

export default CreateTsSourceFileAnnotatedCode

