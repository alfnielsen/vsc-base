## Online release note:

See [release notes for details](https://github.com/alfnielsen/vsc-base/wiki/Release-notes)

## 0.6.0

**Breaking changes:**
maxDepthReplacer has lost Optional paremt: 'currentLevel: number = 0'
This is becasue it now uses the new objectWalker internally.

**New method:**
objectWalker

## 0.5.0

**Added:**
tsCreateNodeVisitor (and TsCreateNodeVisitorCallback)

## 0.4.5

Rename toString to toJSONString.
This is to avoid problems with native toString.

## 0.4.4

Add maxDepthReplacer
Add maxDepth option to toString
(And new JsDoc property: Debugtool, for declaring that a method is primary for debugging)

## 0.4.2 + 0.4.3

Add Raw methods:

-  getJSONCircularReplacer
-  toString

## 0.4.1

Add method tsGetParsedChildren

## 0.4.0

Release note has been added to github wiki:
https://github.com/alfnielsen/vsc-base/wiki/Release-notes

BREAKING CAHNGES:
Ts methods has been rename. Most important is loadTsModule which is now tsLoadModule.

## 0.3.0

BREAKING CAHNGES: camcalCaseToKebeb is now toKebabCase
Added toSnakeCase, toPascalCase.

## 0.2.0

Change the base of vsc-base.
It now compiled from a developer model in vsc-script (vsc-base, vsc-base.org and vsc-script are one mono-respo)

The change is made to ensure correct type definition for better autocomplete and document ation in vscode.
It also fix the way modules is loaded and evaluated in script.
(Any extension can use vsc-base's loadTsModule method)

## 0.1.2

Fix loadTsModule ref to vsc symbol

## 0.1.1

Fix incorrect name of typings in package.json

## 0.1.0

BREAKING CHANGES!

But this is still not version 1.0.0 so other change can still come.
(Rename one or two methods...)

Now base on monorope: vsc-base
with vsc-base, vsc-base.org and vsc-script on one mono-respo.

Lots of new methods.
Important one:

-  pick (Let the user pick deom a list)
-  appendLineToActiveDocument ect (New methods for editing the open document)
-  relative Find path methods.

(Documentation will be added to vsc-base.org, but this will be later..)
Version update will come when it happens.

## 0.0.7

Move vsc-base, vsc-base.org and vsc-script to one common repository.
For testing of vsc-base and because its primary use is vsc-script,
its easier to keep them as one mono-respo.

## 0.0.6

Add makeDir method.
