import * as vsc from 'vsc-base'

import { message } from './massageNode';

export async function run(path: string, root: string) {

	vsc.showMessage(message + " :: " + path)

}
