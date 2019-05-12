import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const RemoveAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'remove'}
         title={'remove'}
         open={open}
         annotation={
            <>
               <p>
                  
 Remove file/folder 
               </p>
               <p>
                See <a href='https://github.com/jprichardson/node-fs-extra/blob/master/docs/remove.md'>fs-extra docs for remove</a>
               </p>
            </>
         }
         
         codeOneLineEx={`await vsc.remove(path)`}
         codeEx={``}
         code={`/**
 * @vscType System
 * @dependencyExternal fs
 * @returns Promise<void>
 */
export const remove = async (path: string): Promise<void> => \{
   await fs.remove(path)
}
`}
      />
   )
}

export default RemoveAnnotatedCode

