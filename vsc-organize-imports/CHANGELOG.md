# Change Log

## 0.1.10

Added `none` as option for sort (If set the lines will not be sorted)

## 0.1.8+0.1.9

removeUnusedImports has been remove. It underlying API is not stable and did not always work as expected.
And there was performance problems with it.

## 0.1.6+0.1.7

Add new option (Not set be fefault)

`removeUnusedImports?: boolean`

`removeUnusedImportsExcludeList?: string[]`

EX:

```json
"removeUnusedImports": true
"removeUnusedImportsExcludeList": ["React"]
```

## 0.1.5

Fix incorrect file path on windows.
(It was usin vscode.uri.path, and now it uses the correct vscode.uri.fsPath)

## 0.1.4

Fix duplication of comment before first import.

## 0.1.3

Fix windows path (it had problems with absolute paths on windows)

Fix empty-line true for groups that have no members.

(Now it will ensure that a space will come between to groups if one of the groups between them have empty-line)

Before it could miss an empty-line if no imports of a group has found.

Update sort by name. (See readme)

## 0.1.2

Add default settings:

```json
"orderSpecifiers": true,
"orderSpecifiersAsSingleLine": true,
"baseUrl": "src",
"basePath": "",
"emptyLinesAfterImports": 1,
"emptyLinesBetweenFilledGroups": 1,
"groups": [
  {
    "groups": [
      "global"
    ],
    "sortBy": "path",
    "emptyLines": true
  },
  {
    "groups": [
      "absolute"
    ],
    "sortBy": "path",
    "emptyLines": true
  },
  {
    "groups": [
      "relative"
    ],
    "sortBy": "path",
    "emptyLines": true
  },
  {
    "groups": [
      "globalDirect",
      "absoluteDirect",
      "relativeDirect"
    ],
    "sortBy": "path",
    "emptyLines": true
  }
]
```

## 0.1.1

Fix bug for global namespace imports

## 0.1.0

### Breaking changes

The option model has been moved to the package.json file.

Now groups can be defined (from the base-groups) and how many empty lines after each defined group and sort method:

Only option left is 'Format On Save' all other is now defined in package.json:

## 0.0.4

### Fix

Now the extension work with 'use strict' before the imports.

## 0.0.3

### General

Rewrite the base of how the extension defines import groups.

It old version looked at package.json to find global imports,
but that don't work together with absolute imports and general node modules
(not defined in the package.json).

Not modules has 'module' but absolute path can also point to a local folder called
modules.

Under the hook vscode/typescript looks at the actual files, and now this extension does to.
It will on save time look at all import, test if they point to a file that actually exist,
and set them to "local/absolute/direct" group.

All non existing import paths are now considered global.

### Breaking changes

New way the import is grouped, and new extension options.

## 0.0.2

Updates how it insert new import code, without scrolling the active window.

## 0.0.1

Add organize-imports the vsc-base mono-respo
