//vsc-script-name: TEST   >   Script with import statements
import * as vsc from "vsc-base"

import { test, test2, test3 } from "./test-util/with__import"

export async function run(path: string) {
   vsc.showMessage(test() + test3)
   vsc.showMessage(test2() + test3)
}