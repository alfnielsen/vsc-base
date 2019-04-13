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
 * @description 
 * Make a folder
 * @see http://vsc-base.org/#makeDir
 * @param path
 * @param newPathstring
 * @vscType System
 * @dependencyExternal fs
 * @oneLineEx await vsc.makeDir(path)
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

