import * as showMessage from './showMessage'

export const scriptNames = [
	"showMessage"
]
export const scripts = {
	"showMessage": async (path: string, root: string) => {
		await showMessage.run(path, root)
	}
}
