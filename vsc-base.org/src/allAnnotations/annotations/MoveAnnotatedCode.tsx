import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const MoveAnnotatedCode = ({ open = false }: {open?: boolean}) => {
   return (
      <AnnotatedCode
         id={'move'}
         title={'move'}
         open={open}
         annotation={
            <>
               <p>
                  
 Move a file or folder 
               </p>
               <p>
                See <a href='https://github.com/jprichardson/node-fs-extra/blob/master/docs/move.md'>fs-extra docs for move</a>
               </p>
            </>
         }
         
         codeOneLineEx={`await vsc.move(oldPath, newPath)`}
         codeEx={``}
         code={`/**
 * @vscType System
 * @dependencyExternal fs
 * @returns Promise<void>
 */
export const move = async (
   path: string,
   newPath: string,
   options?: fs.MoveOptions
): Promise<void> => \{
   await fs.move(path, newPath, options)
}
`}
      />
   )
}

export default MoveAnnotatedCode

