## Online release note:

See [release notes for details](https://github.com/alfnielsen/vsc-base/wiki/Release-notes)


## 0.9.11

Update dependencies

## 0.9.10

New webview style template [WebviewStyleTemplate](http://vsc-base.org/#WebviewStyleTemplate)

(The style that is used by the default html template, to match users theme in vscode)

[WebviewHTMLTemplate](http://vsc-base.org/#WebviewHTMLTemplate) now has option `includeBaseStyle` (default value true)
which include the new [WebviewStyleTemplate](http://vsc-base.org/#WebviewStyleTemplate)

### Breaking change

The default ts compiler options has been updated [TsDefaultCompilerOptions](http://vsc-base.org/#TsDefaultCompilerOptions)

It now targets ES2016 and option jsx is set the 'react' and 'dom' added.

This is done for future version of webview with jsx.

(The sibling project `vsc-script` that is also now allowing `tsx` files.)

## 0.9.8+0.9.9

StartOption for webview methods primarily used by [startWebview](http://vsc-base.org/#startWebview),
has now new options:

- onCommand (This is done for both the input, that will work in the viewview, and the return that will work in the extension)

onCommand is a wrap on postMessage but enforce and simplify a command model:

```ts
sendCommand(command: string, value:any) => onCommand(command: string, value: any)
postMessage({command: string, value:any}) => onMessage(message: any)
```

- sendSetHtml (Only works form extension to webview, and only works with default html template)

sendSetHtml wrapped a document.querySelector().innerHTML = value command

```ts
sendSetHtml(querySelector: string, html: string)
```

'script' has been added to the startOption and template to enable custom script in webview using default template.

### Breaking changes

StartOption for webview methods: 'onWebviewMessage' has changed to 'onMessage'

Options for webview methods has change into a option object and return value is also now an object.

This is done to make it easy to add new features without breaking old.

Change in all of these methods:

- [startWebview](http://vsc-base.org/#startWebview)

- [setupWebViewConnection](http://vsc-base.org/#setupWebViewConnection)

- [initWebView](http://vsc-base.org/#initWebView)

- [WebViewHTMLTemplate](http://vsc-base.org/#WebViewHTMLTemplate)

Most important breaking change:

```ts
// Old:
const [postMessage, onWevviewMessage, dispose] = vsc.startWebview(context, {});
// New:
const { postMessage, onCommand, onMessage, dispose } = vsc.startWebview(
  context,
  {}
);
```

## 0.9.7

Add new vscode methods:

- [open](http://vsc-base.org/#open)

## 0.9.6

fix dispose

## 0.9.5

change dispose first response so it no longer dispose but only resolve.
(Use dispose after resolve instead, see ex)

## 0.9.4

Add two extra return elements from [dispose](http://vsc-base.org/#startWebview) :

'dispose' (for closing webview) and 'webviewPanel' (The panel that is created)

## 0.9.3

### Added

Add new raw methods:

- [escapeHtml](http://vsc-base.org/#escapeHtml)

Add new ts methods:

- [tsCreateProgram](http://vsc-base.org/#tsCreateProgram)

Add new area: webview

New webview methods added:

- [startWebview](http://vsc-base.org/#startWebview)

- [setupWebViewConnection](http://vsc-base.org/#setupWebViewConnection)

- [initWebView](http://vsc-base.org/#initWebView)

- [WebViewHTMLTemplate](http://vsc-base.org/#WebViewHTMLTemplate)

## 0.9.2

### Added

Add two raw methods:

- [insertAfter](http://vsc-base.org/#insertAfter)
- [insertBefore](http://vsc-base.org/#insertBefore)

## 0.9.1

### Fix

Fix problem with removing new line feed when add importName to existing import in
[tsInsertImport](http://vsc-base.org/#tsInsertImport)

### Changes

[tsInsertVariableObjectProperty](http://vsc-base.org/#tsInsertVariableObjectProperty)'s params are now optional, so that it can add a key without value:

EX:

```ts
//from
const f = {
  f: f
};
//to
const f = {
  f
};
```

## 0.9.0

### Added

**New ts match method:** [tsMatchVariableList](http://vsc-base.org/#tsMatchVariableList)

This match method find an declaration

> ex: const foo = 1

> ex: const foo = 1, foo2 = 2

While [tsMatchVariable](http://vsc-base.org/#tsMatchVariable) only finds 'foo = 1' part

Also added [tsIsVariableList](http://vsc-base.org/#tsIsVariableList)

**New ts top level transform methods added:**

[tsInsertVariableObjectProperty](http://vsc-base.org/#tsInsertVariableObjectProperty)

It will add a key-value pair to a variable thats in ObjectExpression,
if the key don't exist

[tsInsertInterfaceMember](http://vsc-base.org/#tsInsertInterfaceMember)

It will add a member to an interface
if the member don't exist

[tsInsertEnumMember](http://vsc-base.org/#tsInsertEnumMember)

It will add a member to an enum instance
if the member don't exist

### Breaking changes + fix

[tsInsertImport](http://vsc-base.org/#tsInsertImport) has now 'options' params instead of
direct params 'isDefault' and 'useDoubleQuotation' which are now both part of the options params.

**EX**

> Before: vsc.tsInsertImport(source1, 't', './t.ts', true, true)

> Now: vsc.tsInsertImport(source1, 't', './t.ts', { isDefault: true, useDoubleQuotation: true })

[tsInsertImport](http://vsc-base.org/#tsInsertImport) has also been fix so it don't duplicate importNames like
import { t, t } form './x.ts' when you insert 't'

### Internal

New area typescript-top-level-transform has been added.
For now all method here are insert methods, that accept a source and return a transformed source.
Method in this area are:

- [tsInsertImport](http://vsc-base.org/#tsInsertImport)
- [tsInsertVariableObjectProperty](http://vsc-base.org/#tsInsertVariableObjectProperty)
- [tsInsertInterfaceMember](http://vsc-base.org/#tsInsertInterfaceMember)
- [tsInsertEnumMember](http://vsc-base.org/#tsInsertEnumMember)

## 0.8.31

### Fixes

Fix system method 'move'

### Added

getLineStreamReader has now optional params 'excludeNewLine' (default value false).
If set to true it will omit the newline feed from the returned lines.

### Examples

All examples has been updated so they will be show with syntax highlight in vsc autocomplete dropdown.

### Internal: Unit tests

There are now added test for: raw, system and typescript-base
Test for the rest of vcs method will be added in the following updates
(Missing tests: typescript-match, typescript-module-load, typescript-transform, vscode and vscTemplate)

## 0.8.30

### Fix

Fix tsImportModule error on windows.
(Fix incorrect change of import url!)

## 0.8.28 + 0.8.29

### Add

Add [tsInsertImport](http://vsc-base.org/#tsInsertImport)

### Fix (Small breaking change)

Fix path match in [tsMatchImport](http://vsc-base.org/#tsMatchImport).
Typescripts 'moduleSpecifier' (the path), returns the path including th e Quotation marks (' or "),
which meant that the match path needed to include them.

Now they are remove before the match.
(If you script included them, you need to remove them from your match)

### Internal changes

The compiler script for vsc-base is updated,
and it ready to be the base for creating more consisting test for all

## 0.8.27

### Add

Add [tsGetLocalModules](http://vsc-base.org/#tsGetLocalModules)

[tsGetLocalModules](http://vsc-base.org/#tsGetLocalModules) has been added to [tsLoadModule](http://vsc-base.org/#tsLoadModule), and enables it to load imports with in the loaded modules.

In this implementation it don't checks for circular imports, which will create infinity loops,
(So its recommended to only use local imports that you know don't have other imports)

This is the first version of handling imports, and the check for circular imports will most likely,
be implemented in a future version.

[tsGetLocalModules](http://vsc-base.org/#tsGetLocalModules) has been added primarily to make vsc-script's better.

## 0.8.26

### Fix

made 'hasParent' option in [tsIsValue](http://vsc-base.org/#tsIsValue) and [tsMatchValueNode](http://vsc-base.org/#tsMatchValueNode)

## 0.8.25

### Add

Add [tsIsImport](http://vsc-base.org/#tsIsImport) and [tsMatchImport](http://vsc-base.org/#tsMatchImport)

### Change

Fix generic problems with callback (Callback now accept undefined) in [tsFindNodePositionFromContent](http://vsc-base.org/#tsFindNodePositionFromContent) and [tsFindAllNodePositionsFromContent](http://vsc-base.org/#tsFindAllNodePositionsFromContent)

## 0.8.24

### Add

- [getRootPackageJson](http://vsc-base.org/#getRootPackageJson)

## 0.8.23

### Breaking changes

Fix problems with [tsFindNodePositionFromContent](http://vsc-base.org/#tsFindNodePositionFromContent) and [tsFindAllNodePositionsFromContent](http://vsc-base.org/#tsFindAllNodePositionsFromContent)

The callback has change from returning a boolean to now returning a node.

Is this done to enable correct generic for the return node.

Use vsc 'match' function instead of 'is' function in the callback.

### Add

[tsMatchNode](http://vsc-base.org/#tsMatchNode) and [tsMatchValueNode](http://vsc-base.org/#tsMatchValueNode),

They are the same has [tsIsNode](http://vsc-base.org/#tsMatchNode) and [tsIsValue](http://vsc-base.org/#tsMatchValueNode), but they return a ts.Node.

## 0.8.22

### Add

Add generic to [tsFindNodePositionFromContent](http://vsc-base.org/#tsFindNodePositionFromContent) and [tsFindAllNodePositionsFromContent](http://vsc-base.org/#tsFindAllNodePositionsFromContent)

This is to avoid having to cast node after finding it.

(vscode / typescript can't see that you kind of node you found)

## 0.8.21

### fix

Fix [ToTitleCase](http://vsc-base.org/#ToTitleCase)

## 0.8.20

## Add

All 'tsIs' and 'tsMatch' methods that already has the optional options: 'hasAncestor',
now also has the option: 'hasParent'

new method:

- [tsMatchCall](http://vsc-base.org/#tsMatchCall)
- [tsIsCall](http://vsc-base.org/#tsIsCall)

## 0.8.19

### Breaking changes

VscodePosition (result from [createVscodeRangeAndPosition](http://vsc-base.org/#createVscodeRangeAndPosition) and [tsFindPositionFromContent](http://vsc-base.org/#tsFindPositionFromContent) ect.)
now has fullContent, orgStart and orgEnd.

It will now remove comments as well as spaces.
(The orgStart, orgEnd and fullContent has the contains the position and content without removing spaces and comments)

[createVscodeRangeAndPosition](http://vsc-base.org/#createVscodeRangeAndPosition) optional params trimSpaces is now trimSpacesAndComments.

## 0.8.18

### Breaking changes

insertAtRange and all method using it is now NOT async:

- [insertAt](http://vsc-base.org/#insertAt)
- [insertAtRange](http://vsc-base.org/#insertAtRange)
- [setDocumentContent](http://vsc-base.org/#setDocumentContent)
- [prependToDocument](http://vsc-base.org/#prependToDocument)
- [appendLineToDocument](http://vsc-base.org/#appendLineToDocument)
- [prependLineToDocument](http://vsc-base.org/#prependLineToDocument)

The underlying vscode commands has been changed to vscode.TextEdit, insert of snippets.

One major reason for this, is the scrolling behavior of the active document.

With snippets it scrolls to the change, but this is most of the time not what we want.

### Add

VscodePosition (result of createVscodeRangeAndPosition and tsFindPositionFromContent ect),
now has 'content'

## 0.8.13-0.8.17

Upgrade dependencies

Due to problem with upgrading fs-extra
(There has been some small changes to make use it vsc worked as expected)

## 0.8.12

### Breaking changes

Spellcheck has found some typos:

getSubrelativePathFromAbsoluteRootPath is now [getSubRelativePathFromAbsoluteRootPath](http://vsc-base/#getSubRelativePathFromAbsoluteRootPath)
varifyModuleMethods is now [verifyModuleMethods](http://vsc-base/#verifyModuleMethods)

## 0.8.11

### Small breaking changes

[getPackageFilePaths](http://vsc-base.org/#getPackageFilePaths) and [getPackageDependencies](http://vsc-base.org/#getPackageDependencies) now by default exclude package.json under .vscode-test

(The folder vscode create while testing extensions)

To get the original behavior, add optional 'exclude' params: '\*\*/node_modules/\*\*'

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

- [insertAt](http://vsc-base.org/#insertAt)
- [insertAtRange](http://vsc-base.org/#insertAtRange)

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

- [addFileContent](http://vsc-base.ord/#addFileContent)
- [emptyDir](http://vsc-base.ord/#emptyDir)
- [remove](http://vsc-base.ord/#remove)

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

- [tsIsObjectProperty](http://vsc-base.ord/#tsIsObjectProperty)
- [tsIsInterface](http://vsc-base.ord/#tsIsInterface)
- [tsIsTypeRef](http://vsc-base.ord/#tsIsTypeRef)
- [tsIsEnum](http://vsc-base.ord/#tsIsEnum)
- [tsIsEnumMember](http://vsc-base.ord/#tsIsEnumMember)
- [tsIsFunction](http://vsc-base.ord/#tsIsFunction)
- [tsIsVariable](http://vsc-base.ord/#tsIsVariable)
- [tsIsIdentifier](http://vsc-base.ord/#tsIsIdentifier)

new vscode methods:

- [setSelections](http://vsc-base.ord/#setSelections)
- [setSelectionsFromRanges](http://vsc-base.ord/#setSelectionsFromRanges)

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

- [tsMatchIdentifier](http://vsc-base.org/#tsMatchIdentifier)
- [tsMatchInterface](http://vsc-base.org/#tsMatchInterface)
- [tsMatchTypeRef](http://vsc-base.org/#tsMatchTypeRef)
- [tsMatchNode](http://vsc-base.org/#tsMatchNode)

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

- [tsMatchEnum](http://vsc-base.org/#tsMatchEnum)
- [tsMatchEnumMember](http://vsc-base.org/#tsMatchEnumMember)
- [tsMatchValue](http://vsc-base.org/#tsMatchValue)

- [tsFindChild](http://vsc-base.org/#tsFindChild)
- [tsHasChild](http://vsc-base.org/#tsHasChild)
- [tsFindGrandChild](http://vsc-base.org/#tsFindGrandChild)
- [tsHasGrandChild](http://vsc-base.org/#tsHasGrandChild)
- [tsHasGrandChilds](http://vsc-base.org/#tsHasGrandChilds)
- [tsFindParent](http://vsc-base.org/#tsFindParent)
- [tsFindAncestor](http://vsc-base.org/#tsFindAncestor)
- [tsHasAncestor](http://vsc-base.org/#tsHasAncestor)

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
import * as cp from "child-process-promise";
```

**new vscode methods:**

- [insertAt](http://vsc-base.org/#insertAt)
  It take the content and start (and optional end) position and replace/insert the content.
- [insertAtRange](http://vsc-base.org/#insertAtRange)
  It take the content and a vscode.range and replace/insert the content.
- [prependToDocument](http://vsc-base.orb/#prependToDocument)
  Same as appendToDocument but the content is inserted at start of document.
- [prependLineToDocument](http://vsc-base.orb/#prependLineToDocument)
  Same as appendLineToDocument but the content is inserted at start of document.
- [getActiveTerminal](http://vsc-base.orb/#getActiveTerminal)
  It active terminal in vscode
- [writeToTerminal](http://vsc-base.orb/#writeToTerminal)
  Write to the active terminal
- [newDocument](http://vsc-base.orb/#newDocument)
  Create a new document
- [setSelectionFromRange](http://vsc-base.orb/#setSelectionFromRange)
  Set a selection
- [addSelectionFromRange](http://vsc-base.orb/#addSelectionFromRange)
  Add a selection
- [setSelection](http://vsc-base.orb/#setSelection)
  Set a selection
- [addSelection](http://vsc-base.orb/#addSelection)
  Add a selection
- [createSelection](http://vsc-base.orb/#createSelection)
  Add a vscode.Selection
- [getVscodeRangeAndPosition](http://vsc-base.orb/#getVscodeRangeAndPosition)
  Get a vscode.Position's ans vscode.Rage from start end end positions (numbers)

**new system method:**

- [execFromPath](http://vsc-base.orb/#execFromPath)
  Execute a command in the nodejs context (Not vscode!)

**new ts method**

- [tsFindNodePosition](http://vsc-base.orb/#tsFindNodePosition)
- [tsMatchVariable](http://vsc-base.orb/#tsMatchVariable)
- [tsMatchObjectProperty](http://vsc-base.orb/#tsMatchObjectProperty)
- [tsMatchFunction](http://vsc-base.orb/#tsMatchFunction)
- [tsMatchAnsector](http://vsc-base.orb/#tsMatchAnsector)
- [tsFindChildNode](http://vsc-base.orb/#tsFindChildNode)
- [tsFindGrandChildNode](http://vsc-base.orb/#tsFindGrandChildNode)

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

- [getJSONCircularReplacer](http://vsc-base.org/#getJSONCircularReplacer)
- [toString](http://vsc-base.org/#toString)

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

- [pick](http://vsc-base.org/#pick)
  (Let the user pick deom a list)
- [appendLineToActiveDocument](http://vsc-base.org/#appendLineToActiveDocument)
  ect (New methods for editing the open document)
- [relative](http://vsc-base.org/#relative)
  Find path methods.

(Documentation will be added to vsc-base.org, but this will be later..)
Version update will come when it happens.

## 0.0.7

Move vsc-base, vsc-base.org and vsc-script to one common repository.
For testing of vsc-base and because its primary use is vsc-script,
its easier to keep them as one mono-respo.

## 0.0.6

Add makeDir method.
