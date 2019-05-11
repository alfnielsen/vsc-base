# vsc-organize-imports

The is an vscode extension.

The project's organize imports in ts/js files alphabetical.
It dont change format for single/multiline imports.
It dont removes comments.

## Usage

By default it will organize your imports on save.

If "Format on save" is disabled, you can use the keybinding
(Be default ctrl+alt+o)
or run the command manual:

1. Open Visial studio Code's command bar (ctrl+shift+p)
2. Write: 'vsc Organize Imports'
3. Press Enter to execute the organize

## Extension Settings


**Format on save**

|type           | deault | description |
|-|-|-|
|boolean|true|Run vsc-organize-imports on save|

**Space between import groups**

|type           | deault | description |
|-|-|-|
|boolean|true|Add emptyline between import groups: global, local/absolute and relative paths.|

## Links and related projects

This extension is build with [vsc-base](http://vsc-base.org).

The source code is alse find it vsc-base monorespo: [source-code](https://github.com/alfnielsen/vsc-base)

### Links
 
> mono-respo: [source-code](https://github.com/alfnielsen/vsc-base)

> vsc-base: [npm-module](https://www.npmjs.com/package/vsc-base)

> vsc-base.org: [documentation](http://vsc-base.org)

> vsc-script: [vscode-extension](https://marketplace.visualstudio.com/items?itemName=alfnielsen.vsc-script)

> vsc-scaffolding: [vscode-extension](https://marketplace.visualstudio.com/items?itemName=alfnielsen.vsc-scafolding)
