import * as vsc from 'vsc-base'
/**
 * This script finds all const names in a file (From start of lines) and append the list to the end of that file.
 */
export async function run(path: string) {
   if (vsc.isDir(path)) {
      vsc.showErrorMessage('Only works on files!')
      return
   }
   const parts: {
      meta: string
      body: string
      name: string
      metaMap: { [key: string]: string | string[] }
   }[] = []
   const rawSource = await vsc.getActiveDocumentContent()

   const rawParts = rawSource.split(/\n\/\*\*\s*\n/)
   rawParts.shift() // <-- This is imports
   rawParts.forEach(part => {
      const metaBody = part.split(/\n\s*\*\/\s*\n/)
      const meta = metaBody[0]
      const body = metaBody[1]
      //name
      const nameMatch = body.match(/^\s*(?:export\s+)?const\s+(\w+)/)
      //export const getLineStreamReader
      if (nameMatch === null) {
         vsc.showErrorMessage('Did not find method name!!: ' + body)
         vsc.showErrorMessage('Meta ' + meta)
         return
      }
      const name = nameMatch[1]
      //meta map:
      const metaMap: { [key: string]: string } = {}
      const mapArgs = meta.split(/\n\s+\*\s+@/)
      metaMap.description = mapArgs.shift().replace(/\n\s\*/, '\n')
      mapArgs.forEach(arg => {
         const argNameMatch = arg.match(/^\w+/)
         const argName = argNameMatch[0]
         const argContent = arg.replace(/^\w+/, '')
         if (metaMap[argName]) {
            metaMap[argName] += ', ' + argContent
         } else {
            metaMap[argName] = argContent
         }
      })
      if (!body.match(/^\s*$/)) {
         parts.push({ meta, body, name, metaMap })
      }
   })
   const names = parts.map(p => p.name)
   const added =
      '\n\nconst vsc = {\n  ' +
      names.join(',\n  ') +
      '\n}\nexport default vsc\n'
   vsc.appendLineToActiveDocument(added);
}
