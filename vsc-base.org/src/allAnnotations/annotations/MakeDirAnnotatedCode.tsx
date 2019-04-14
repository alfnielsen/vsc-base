import React from 'react'
import AnnotatedCode from 'components/AnnotatedCode/AnnotatedCode'



const MakeDirAnnotatedCode = () => {
   return (
      <AnnotatedCode
         id={'makeDir'}
         title={'makeDir'}
         annotation={
            <>
               <p>
                  
 Make a folder
               </p>
            </>
         }
         
         codeOneLineEx={`await vsc.makeDir(path)`}
         codeEx={``}
         code={`/**
 * @param path, newPathstring
 * @vscType System
 * @dependencyExternal fs
 * @returns Promise<void>
 */
export const makeDir = async (folderPath: string): Promise<void> => \{
   try \{
      await fs.mkdir(folderPath)
   } catch (e) \{
      throw e
   }
}
`}
      />
   )
}

export default MakeDirAnnotatedCode

