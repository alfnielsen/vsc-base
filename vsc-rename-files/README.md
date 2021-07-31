# vsc-rename-files

This is a VS Code extension that adds support for mass find & replace file and directory names.

## Usage

1. Right-click folder/file.
2. Click 'Rename Files' on the Context Menu that appears.
3. Choose your settings and enter the text you wish to replace. A preview will appear showing all files and directories affected.
4. Click 'Replace Selected Files (and folders)' if everything looks correct.

## Features

**No File Overwrites**

If a renaming results in a name (path) that already exists it will be shown in the preview. 

By default, this extension will append an incrementing index to the file. You can turn this off in the settings to ignore these situations, in which case the file will not be renamed.

**RegExp**

This extension supports Regular Expressions.

All regular expressions are written without a '/' at the start or end, but you can add '/gimusy' for using Javascript RegExp flags.

**Add \$index in name or in end of new name**

In rare cases, file renaming can result in the file having the same name *(this is intended)*.
You can use \$index in the name to add an incrementing index value to the file.

For example, let's say we are using the follow RegExp -- `log\d+` -- on a directory with the files: `['log345234.txt', 'log53332.txt']`

By using the following in our new name: `log$index`, the files will be renamed like so: `['log1.txt', 'log2.txt']`

**Add [\u\U\l\L] in the new name to change casing in captured groups**

`\u \l`: One letter; upper or lower

`\U \L`: the rest of the captured group

These can be combined: `\u\l\U` => first upper, second lower, rest upper

For example: 
 - Pattern to match: `^([^\-]+)-(.*)$`
 - Replacement: `$1\u\L$2`
 - Result: some-filePath.TS => someFilepath.ts

## Links and Related Projects

> vsc-rename-files: [vscode-extension](https://marketplace.visualstudio.com/items?itemName=alfnielsen.vsc-rename-files)

> mono-respo for vsc-base and sub projects created with vsc-base (including vsc-rename-files): [source-code](https://github.com/alfnielsen/vsc-base)

> vsc-base: [npm-module](https://www.npmjs.com/package/vsc-base)

> vsc-base.org: [documentation](http://vsc-base.org)
