# vsc-rename-files

The is an vscode extension.

The the moment Visual Studio Code don't have a Replace (all) file names in a folder.

This extension add this functionality.

## Usage

1. Right-click folder/file
2. A web-view tab will popup in vscode
3. Define settings, write replace text => See preview of replacement
4. Click "Replace selected files (and folders)" when it look correct

## Features

**No file overwrites:**

If a renaming resolves in a name (path) that already exists, this will be shown in the preview.
Be default a settings is on, that will add index on the renamed will, when this happen.
You can turn of the settings, it will then be ignored (That will will not be renamed)

**RegExp:**
You can use RgExp.

The regexp is written without '/' in the start and end but you can add '/gimusy' for using javascript regexp flags.

**Add \$index in name Or in end of new name**

In rare cases, file renaming can resolve in the same name (intended).
You can use \$index (zero based) in the name to a the current number of renamed files.

Ex: Using a RegExp 'log\d+' on a folder with files: 'log345234.txt', 'log53332.txt'
By adding making the name 'newLog\$index' the file will be renamed to: 'log0.txt', 'log1.txt'

## Links and related projects

> vsc-rename-files: [vscode-extension](https://marketplace.visualstudio.com/items?itemName=alfnielsen.vsc-rename-files)

> mono-respo for vsc-base and sub projects created with vsc-base (including vsc-rename-files): [source-code](https://github.com/alfnielsen/vsc-base)

> vsc-base: [npm-module](https://www.npmjs.com/package/vsc-base)

> vsc-base.org: [documentation](http://vsc-base.org)
