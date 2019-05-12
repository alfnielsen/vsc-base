import * as vsc from 'vsc-base';

const lastSaveTime = '2019-05-10T04:58:24.084Z'; // <-- updae on save
export async function runOnSave() {
	const content = vsc.getDocumentContent()
	const [, pos] = vsc.tsFindNodePositionFromContent(content,
		node => vsc.tsIsValue(node, /.*/, {
			hasAncestor: ancestor => vsc.tsIsVariable(ancestor, { name: 'lastSaveTime' })
		})
	)
	vsc.insertAtRange(`'${(new Date()).toISOString()}'`, pos.range)
}
