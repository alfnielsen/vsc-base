# Change Log

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
