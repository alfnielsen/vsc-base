//vsc-script-name: TEST               -     tsInsertImport
import * as vsc from 'vsc-base'

const source1 = `const foo = () => {}
`
const source2 = `import fii from 'test/test'

const foo = () => {}
`
const source3 = `import { fii2 } from 'test/test'

const foo = () => {}
`

export async function run(path: string) {

   vsc.showMessage('STARTTTT')
   const t11 = vsc.tsInsetImport(source1, 'fii', 'test/test')
   const t12 = vsc.tsInsetImport(source1, 'fii', 'test/test', true)
   const t21 = vsc.tsInsetImport(source2, 'fii', 'test/test')
   const t22 = vsc.tsInsetImport(source2, 'fii', 'test/test', true)
   const t31 = vsc.tsInsetImport(source3, 'fii', 'test/test')
   const t32 = vsc.tsInsetImport(source3, 'fii', 'test/test', true)

   vsc.appendToDocument('\nconst foo = `\n' + t11 + '\n' + t12 + '\n' + t21 + '\n' + t22 + '\n' + t31 + '\n' + t32 + '\n`')
}