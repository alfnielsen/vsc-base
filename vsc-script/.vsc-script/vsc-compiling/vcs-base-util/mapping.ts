import * as vsc from 'vsc-base'

export type CodePart = {
   meta: string
   body: string
   name: string
   annotationName: string
   metaMapRaw: { [key: string]: string[] }
   metaMap: { [key: string]: string[] }
   file: string
}

export const createPartMap = async (vscFiles: string[]) => {
   const parts: CodePart[] = []
   for (const filePath of vscFiles) {
      const rawSource = await vsc.getFileContent(filePath)
      const rawParts = rawSource.split(/\n\/\*\*\s+vsc\-base\s+method/) // split using: \n/** vsc-base method
      rawParts.shift() // <-- This is leading imports (er empty area)
      rawParts.forEach((partString, index) => {
         partString = partString.trim()
         const metaIndex = partString.search(/\n\s*\*\/\n\s*export\s+const\s+/);
         //const metaBody = part.split(/\n\s*\*\/\s*\n/)
         const meta = partString.substr(0, metaIndex)
         const body = partString.substr(metaIndex).replace(/^[\n\s]*\*\/[\n\s]*/, '');
         //name
         const nameMatch = body.match(/^[\s\n]*export\s+const\s+(\w+)/)
         if (!nameMatch) {
            vsc.showErrorMessage('Did not find method name!!: ' + body)
            throw new Error('STOP');
         }
         const name = nameMatch[1]
         //meta map:
         const metaMap: { [key: string]: string[] } = {}
         const metaMapRaw: { [key: string]: string[] } = {} // keep '*' in start of lines
         const mapArgs = meta.split(/\n?\s*\*\s+@/)
         mapArgs.shift() // remove leading empty area
         mapArgs.forEach(arg => {
            const argNameMatch = arg.match(/^\w+/)
            const argName = argNameMatch[0]
            const argContentRaw = arg.replace(/^\w+\s/, '')
            const argContent = argContentRaw.replace(/(^|\n)\s+\*\s/g, '\n')
            if (!metaMap[argName]) {
               metaMap[argName] = []
               metaMapRaw[argName] = []
            }
            metaMap[argName].push(argContent)
            metaMapRaw[argName].push(argContentRaw)

         })
         let annotationName = vsc.toPascalCase(name + 'AnnotatedCode')
         // Overwrite meta:
         metaMap['see'] = [`[${name}](http://vsc-base.org/#${name})`]
         if (!metaMap['example']) {
            vsc.showMessage('mapArgs:' + mapArgs.join('\n'))
            vsc.showErrorMessage('missing example!')
         }
         metaMap['oneLineEx'] = [metaMap['example'][0]]
         metaMap['ex'] = [metaMap['example'][1]]
         const part: CodePart = {
            name,
            meta,
            body,
            metaMap,
            metaMapRaw,
            annotationName,
            file: filePath
         }
         if (!body.match(/^\s*$/)) {
            parts.push(part)
         }
      })
   }
   const requiredMappings = ['description', 'see', 'oneLineEx', 'vscType']

   for (const p of parts) {
      for (const rm of requiredMappings) {
         const has = p.metaMap.hasOwnProperty(rm)
         if (!has) {
            vsc.showErrorMessage(p.name + ' are missing: ' + rm)
            return
         }
      }
   }
   parts.sort((a, b) => a.body.localeCompare(b.body))
   return parts
}