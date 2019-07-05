import * as vsc from "vsc-base"

import { test, test2, test3 } from "./util/with__import"

//vsc-script-name:Script with import statements
export async function run(path: string) {
   vsc.showMessage(test() + test3)
   vsc.showMessage(test2() + test3)
}