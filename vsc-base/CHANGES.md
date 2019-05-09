## Online release note:

See [release notes for details](https://github.com/alfnielsen/vsc-base/wiki/Release-notes)

## 0.8.11

### Small breaking changes

getPackageFilePaths and getPackageDependencies now by default exlude package.json under .vscode-test

(The folder vscode create while tesing extensions)

To get the original behavioer add optional exclude params: '\*\*/node_modules/\*\*'

### Add

[getPackageFilePaths](http://vsc-base.org/#getPackageFilePaths) and [getPackageDependencies](http://vsc-base.org/#getPackageDependencies)
now take an optional 'exclude' which is an exclude pattern for the underlying [findFilePaths](http://vsc-base.org/#findFilePaths).
It can be used to control which package.json files should be included.

## 0.8.10

Update docs (typings)

## 0.8.9

### Changes

[copy](http://vsc-base.org/#copy) param 'options' is now optional (It was never meant to be required!)

### Add methods

-  [insertAt](http://vsc-base.org/#insertAt)
-  [insertAtRange](http://vsc-base.org/#insertAtRange)

**Internal:**
vsc-base now use direct export of sub files.
(Default import of vsc should be possible, and will maybe be added in future versions)

Earlier version of vsc-base made imports of sub files manual,
this was never meant to be a final solution and is now changes.

(The insert methods did exist but they was not exported before)

## 0.8.8

Add generic to awaitResult (default any)

## 0.8.7

### Add

new system methods:

-  [addFileContent](http://vsc-base.ord/#addFileContent)
-  [emptyDir](http://vsc-base.ord/#emptyDir)
-  [remove](http://vsc-base.ord/#remove)

### Changes

saveFileContent, copy, move and getReadStream now takes an optional options object.

(The options is the fs and fs-extra options for the underlaying methods)

vsc-base script docs contains the links the the doc for all underlaying method.

getFileContent now takes an optional encoding (default is utf8)

## 0.8.6

### Breaking changes

tsMatchValue is now [tsIsValue](http://vsc-base.ord/#tsIsValue)

tsMatchNode is now [tsIsNode](http://vsc-base.ord/#tsIsNode)

This is to follow a common pattern where 'is' returns a boolean,
and 'match' returns a node.

### Small Breaking changes

createVscodeRangeAndPosition has now optional trimSpaces (default true).
When ts returns pos and end from a node it includes leading and trailing space.
For most transpiling we need to not have the spaces included.
To enable previous behavior set trimSpaces to false.

### Add

new ts methods:

-  [tsIsObjectProperty](http://vsc-base.ord/#tsIsObjectProperty)
-  [tsIsInterface](http://vsc-base.ord/#tsIsInterface)
-  [tsIsTypeRef](http://vsc-base.ord/#tsIsTypeRef)
-  [tsIsEnum](http://vsc-base.ord/#tsIsEnum)
-  [tsIsEnumMember](http://vsc-base.ord/#tsIsEnumMember)
-  [tsIsFunction](http://vsc-base.ord/#tsIsFunction)
-  [tsIsVariable](http://vsc-base.ord/#tsIsVariable)
-  [tsIsIdentifier](http://vsc-base.ord/#tsIsIdentifier)

new vscode methods:

-  [setSelections](http://vsc-base.ord/#setSelections)
-  [setSelectionsFromRanges](http://vsc-base.ord/#setSelectionsFromRanges)

### Changes

tsFindNodePositionFromContent now takes an optional fromPosition (number).
This is used to only match nodes from a specific point an a source.

### Fixes:

tsIsValue regexp match for strings and numbers is fixed.

addSelection is now working correct

addSelectionFromRange is now working correct

## 0.8.5

Move @types/fs-extra from devDependencies to dependencies.
Other extension using vsc-base that dont use fs-extra needs the typings.
(for ts building process)

## 0.8.4

Add ts methods

-  [tsMatchIdentifier](http://vsc-base.org/#tsMatchIdentifier)
-  [tsMatchInterface](http://vsc-base.org/#tsMatchInterface)
-  [tsMatchTypeRef](http://vsc-base.org/#tsMatchTypeRef)
-  [tsMatchNode](http://vsc-base.org/#tsMatchNode)

The new tsMacthIdentifier is really good for smart search and replace for type/interface/variable name.

The new tsMatchNode is a genelized method taking hasAncestor and grandchild methods.
and it test is the name has an initializer used for value test,
aswell as test if it has an name (identifier) used for name test.

**Internal updates:**
All tsMatch methods now use tsMatchNode

## 0.8.2+0.8.3

###Breaking changes

All tsMatch (except tsMatchValue),
now return the node casted as the node type.

This is because typscript/vscode did not understand the node type,
so you would need to do another ts.isType for casting.

## 0.8.1

Fix incorrect ts interface ror tsHasChildren a tsHasGrandChildren and tsHasAncestors.

## 0.8.0

###Breaking changes

tsFindNodePosition is now tsFindNodePositionFromContent

Remove TsNodeVisitorCallback type to make vscode autocomplete more readable.
(When it was a ts type, the autocomplete did not show the callback interface, just the type name)

Remove TsFindNodePositionCallback type.
Remove TsTransformerCallback type.
Remove TsMatchVariable type.
Remove TsMatchFunction type.
Remove TsMatchObjectProperty type.

node params now accept undefined to make it easy to use. (avoid undefined check)
(If it undefined it simply return false)

Optional 'matchName' for all the above match function now accepts a string.
(On string it matches the entire name)

### Added

new method ts methods:

-  [tsMatchEnum](http://vsc-base.org/#tsMatchEnum)
-  [tsMatchEnumMember](http://vsc-base.org/#tsMatchEnumMember)
-  [tsMatchValue](http://vsc-base.org/#tsMatchValue)

-  [tsFindChild](http://vsc-base.org/#tsFindChild)
-  [tsHasChild](http://vsc-base.org/#tsHasChild)
-  [tsFindGrandChild](http://vsc-base.org/#tsFindGrandChild)
-  [tsHasGrandChild](http://vsc-base.org/#tsHasGrandChild)
-  [tsHasGrandChilds](http://vsc-base.org/#tsHasGrandChilds)
-  [tsFindParent](http://vsc-base.org/#tsFindParent)
-  [tsFindAncestor](http://vsc-base.org/#tsFindAncestor)
-  [tsHasAncestor](http://vsc-base.org/#tsHasAncestor)

Add optional matches for all 'Match' method has new optional match options.

## 0.7.0

### General

This update has a lot of small changes.

It is primary done, to make the tsTranspiling work naturally with vscode.

There is now the new [tsFindNodePosition](http://vsc-base.org/#tsFindNodePosition).
This is internally an transformer with a visitor callback like the tsCreatorTranformer,
but it accepts only a returned boolean.

When the callback returns true, it returns the node, and a vscode range, for where the node is in the document.

This can then be use with the new [insertAtRange](http://vsc-base.org/#insertAtRange), to replace elements in a opne document, or simply to select the found not the the new [setSelectionFromRange](http://vsc-base.org/#setSelection)

The new [tsVisitWithTransformers](http://vsc-base.org/#tsVisitWithTransformers) is the same as [tsTransform](http://vsc-base.org/#tsTransform),
but its used for visitor patterns (Where there is no actual transforming)

All the methods for document with the name 'active' from vscode has remove the 'active' part,
and takes document and editors instead, but they all use the default
active TextDocument and active TextEditor.

There is also some new methods for executing bash command,
see [writeToTerminal](http://vsc-base.org/#writeToTerminal)
and [execFromPath](http://vsc-base.org/#execFromPath)

**Internal changes**

The document script (The scripts that generates the vsc-base.org documentation),
has been updated to use more of the standard 'markdown'.
(It now accepts \*\* for bold text and link with labels: \[label\]\(url\))

### Breaking changes

Interface for **appendToDocument** has changed from:

```
appendToDocument = async (
   editor: vscode.TextEditor,
   document: vscode.TextDocument
   content: string,
): Promise<void>
```

to

```
appendToDocument = async (
   content: string,
   editor?: vscode.TextEditor
): Promise<boolean>
```

(editor will use vsc.getActiveEditor and document vsc.getActiveDocument if undefined)

It now returns true on success ot false if there was no open document or textEditor.

**appendToActiveDocument** is has been remove.
Use **appendToDocument** now (It does the same)

**setActiveDocumentContent** is now: **setDocumentContent**.
It can now take a textEditor is input, or it will use vsc.getActiveEditor.

```
  content: string,
  editor?: vscode.TextEditor,
```

**appendLineToActiveDocument** is now **appendLineToDocument**
It can now take a textEditor is input, or it will use vsc.getActiveEditor.

```
  content: string,
  editor?: vscode.TextEditor,
```

**getActiveDocumentContent** is now **getDocumentContent**
It can now take a textDocument is input, or it will use vsc.getActiveDocument.

**getActiveDocumentPath** is now **getDocumentPath**
It can now take a textDocument is input, or it will use vsc.getActiveDocument.

**saveActiveDocument** is now **saveDocument**
It can now take a textDocument is input, or it will use vsc.getActiveDocument.

### Added

New dependency has been added to vsc: **child-process-promise**
It can be used in vsc-script like this:

```ts
import * as cp from 'child-process-promise'
```

**new vscode methods:**

-  [insertAt](http://vsc-base.org/#insertAt)
   It take the content and start (and optional end) position and replace/insert the content.
-  [insertAtRange](http://vsc-base.org/#insertAtRange)
   It take the content and a vscode.range and replace/insert the content.
-  [prependToDocument](http://vsc-base.orb/#prependToDocument)
   Same as appendToDocument but the content is inserted at start of document.
-  [prependLineToDocument](http://vsc-base.orb/#prependLineToDocument)
   Same as appendLineToDocument but the content is inserted at start of document.
-  [getActiveTerminal](http://vsc-base.orb/#getActiveTerminal)
   It active terminal in vscode
-  [writeToTerminal](http://vsc-base.orb/#writeToTerminal)
   Write to the active terminal
-  [newDocument](http://vsc-base.orb/#newDocument)
   Create a new document
-  [setSelectionFromRange](http://vsc-base.orb/#setSelectionFromRange)
   Set a selection
-  [addSelectionFromRange](http://vsc-base.orb/#addSelectionFromRange)
   Add a selection
-  [setSelection](http://vsc-base.orb/#setSelection)
   Set a selection
-  [addSelection](http://vsc-base.orb/#addSelection)
   Add a selection
-  [createSelection](http://vsc-base.orb/#createSelection)
   Add a vscode.Selection
-  [getVscodeRangeAndPosition](http://vsc-base.orb/#getVscodeRangeAndPosition)
   Get a vscode.Position's ans vscode.Rage from start end end positions (numbers)

**new system method:**

-  [execFromPath](http://vsc-base.orb/#execFromPath)
   Execute a command in the nodejs context (Not vscode!)

**new ts method**

-  [tsFindNodePosition](http://vsc-base.orb/#tsFindNodePosition)
-  [tsMatchVariable](http://vsc-base.orb/#tsMatchVariable)
-  [tsMatchObjectProperty](http://vsc-base.orb/#tsMatchObjectProperty)
-  [tsMatchFunction](http://vsc-base.orb/#tsMatchFunction)
-  [tsMatchAnsector](http://vsc-base.orb/#tsMatchAnsector)
-  [tsFindChildNode](http://vsc-base.orb/#tsFindChildNode)
-  [tsFindGrandChildNode](http://vsc-base.orb/#tsFindGrandChildNode)

### Changes

**getActiveDocument** now takes an optional 'editor'
If not it uses vsc.getActiveEditor.

## 0.6.1

Fix findPath bug from realese 0.6.0

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

-  [getJSONCircularReplacer](http://vsc-base.org/#getJSONCircularReplacer)
-  [toString](http://vsc-base.org/#toString)

## 0.4.1

Add method tsGetParsedChildren

## 0.4.0

Release note has been added to github wiki:
https://github.com/alfnielsen/vsc-base/wiki/Release-notes

BREAKING CHANGES:
Ts methods has been rename. Most important is loadTsModule which is now tsLoadModule.

## 0.3.0

BREAKING CHANGES: camcalCaseToKebeb is now toKebabCase
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

-  [pick](http://vsc-base.org/#pick)
   (Let the user pick deom a list)
-  [appendLineToActiveDocument](http://vsc-base.org/#appendLineToActiveDocument)
   ect (New methods for editing the open document)
-  [relative](http://vsc-base.org/#relative)
   Find path methods.

(Documentation will be added to vsc-base.org, but this will be later..)
Version update will come when it happens.

## 0.0.7

Move vsc-base, vsc-base.org and vsc-script to one common repository.
For testing of vsc-base and because its primary use is vsc-script,
its easier to keep them as one mono-respo.

## 0.0.6

Add makeDir method.
