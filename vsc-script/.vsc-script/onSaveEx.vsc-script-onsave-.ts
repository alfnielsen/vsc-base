import * as vsc from 'vsc-base';

const lastSaveTime = '2019-06-23T20:57:53.490Z'; // <-- updae on save
export async function runOnSave() {
   const content = vsc.getDocumentContent()
   const [, pos] = vsc.tsFindNodePositionFromContent(content,
      node => vsc.tsMatchValueNode(node, /.*/, {
         hasAncestor: ancestor => vsc.tsIsVariable(ancestor, { name: 'lastSaveTime' })
      })
   )
   vsc.insertAtRange(`'${(new Date()).toISOString()}'`, pos.range)
}
