import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const EmptyDirAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'emptyDir'}
         title={'emptyDir'}
         open={open}
         annotation={
            <>
               <p>
                  
 emptyDir folder 
               </p>
               <p>
                See <a href='https://github.com/jprichardson/node-fs-extra/blob/master/docs/emptyDir.md'>fs-extra docs for emptyDir</a>
               </p>
            </>
         }
         
         codeOneLineEx={`await vsc.remove(path)`}
         codeEx={``}
         code={`/**
 * @param path, newPathstring
 * @vscType System
 * @dependencyExternal fs
 * @returns Promise<void>
 */
export const emptyDir = async (path: string): Promise<void> => \{
   await fs.emptyDir(path)
}
`}
      />
   )
}

export default EmptyDirAnnotatedCode

