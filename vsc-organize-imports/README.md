# vsc-organize-imports

The is an vscode extension.

The project's organize imports in ts/js files alphabetical.
It don't change format for single/multi-line imports.
It don't removes comments. (except inner comment, when order named are activated)

## Usage

By default it will organize your imports on save.

If "Format on save" is disabled, you can use the keybinding
(Be default ctrl+alt+o)
or run the command manual:

1. Open Visual Studio Code's command bar (ctrl+shift+p)
2. Write: 'vsc Organize Imports'
3. Press Enter to execute the organize

## Extension Settings

**Format On Save**

Run vsc-organize-imports on save

**Order Specifiers**

Sort each imports named specifiers. ex: import { a, b, c }

**Order Specifiers As Single Line**

This is only applied if 'Sort named imports' is true. If this is false the output will be multi-line

**Base Url**

The base url, from root path, for matching absolute paths

**Empty Lines After Global Imports**

Number of empty lines after global imports

**empty Lines AfterAbsolute Imports**

Number of empty lines after absolute imports

**empty Lines Local Imports**

Number of empty lines after local imports

**empty Lines After Imports**

Number of empty lines after all imports

## Links and related projects

This extension is build with [vsc-base](http://vsc-base.org).

The source code is alse find it vsc-base monorespo: [source-code](https://github.com/alfnielsen/vsc-base)

### Known issues

imports from node_modules sub folder like 'react-spring/renderprops' (devdependensy: react-spring),
is noot match as globals. (This will be fix soon)

### Links

> mono-respo: [source-code](https://github.com/alfnielsen/vsc-base)

> vsc-base: [npm-module](https://www.npmjs.com/package/vsc-base)

> vsc-base.org: [documentation](http://vsc-base.org)

> vsc-script: [vscode-extension](https://marketplace.visualstudio.com/items?itemName=alfnielsen.vsc-script)

> vsc-scaffolding: [vscode-extension](https://marketplace.visualstudio.com/items?itemName=alfnielsen.vsc-scafolding)
