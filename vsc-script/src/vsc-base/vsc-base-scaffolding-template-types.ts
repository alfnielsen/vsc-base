/**
 * VscTemplate types
 */
const AAAAA = 'first order for compiling!' // This is only used cfor compile script!
export type vscTemplate = {
   userInputs: vscUserInput[]
   template: vscTemplateItem[]
}

export type vscTemplateItem = vscTemplateFolder | vscTemplateFile

export type vscTemplateFolder = {
   type: 'folder'
   name: vscStringDelegate
   children?: vscTemplateItem[]
}
export type vscTemplateFile = {
   type: 'file'
   name: vscStringDelegate
   content: vscStringDelegate
}

export type vscUserInput = {
   title: string
   argumentName: string
   defaultValue: string
}
export type vscUserInputs = { [key: string]: string }
export type vscStringDelegate = string | ((inputs: vscUserInputs) => string)
