# vsc-script

(vscode Extension)

Run your own scripts with vsc-base (includes methods for vscode, fs.extra, ts).

See .vsc-script folder in source for examples.

Full documentation for vsc-base can be found on http://vsc-base.org

## Install

The extensions can be [installed from vscode marketplace](https://marketplace.visualstudio.com/items?itemName=alfnielsen.vsc-script).

## Usage

1. Right a folder or file
2. Click 'vsc Script'
3. Select the script you want to run

## Why vsc Script?

You could always just run js/ts runs in your system with nodejs,
but this extension gives you the context of vscode.

> All script are run by clicking a file or folder and your script is given the uri that was clicked.

Common methods that make custom scripting easy can be found in the examples in .vsc-script folder in this source code.

## Dev (Create vsc-script)

```
>> npm i -D vsc-base @types/vscode
```

or

```
>> yarn add -D vsc-base @types/vscode
```

A script file is written in typescript.

**Ex:** replace.vsc-script.ts

```ts
//documentation on http://vsc-base.org
//vcc-script-name: Example > Replace 'something'
import * as vsc from "vsc-base";

export async function run(path: string) {
  let source = await vsc.getFileContent(path);
  source = source.replace(/something/, "SomeTing");
  await vsc.saveFileContent(path, source);
  vsc.showMessage("File Updated.");
  // happy hacking!
}
```

You can use these modules in your script: vsc-base, fs-extra, vscode and typescript:

```ts
// documentation on http://vsc-base.org
//vcc-script-name: Example > modules you can use
import * as vsc from "vsc-base";
import * as vscode from "vscode";
import * as ts from "typescript";
import * as fs from "fs-extra";

export async function run(path: string) {}
```

> You cannot use any other libs (modules)!

> You can import other local ts files (They can't you any other modules either)

> When this extension runs your scripts it actually doing it in its own context's which is the reason it only has these 4 libs.

The script must export one async function named 'run' that takes an Uri (vscode.Uri).

The uri is the path to the file/folder right-clicked in vscode when the user runs the script.

### Script names and grouping

A script can be named by adding a comment in it with //vcc-script-name: {NAME}

```ts
// documentation on http://vsc-base.org
//vcc-script-name: My Script
import * as vsc from "vsc-base";
export async function run(path: string) {}
```

Script's can be grouped by adding '>' in the name

```ts
// documentation on http://vsc-base.org
//vcc-script-name: Components > Rename
import * as vsc from "vsc-base";
export async function run(path: string) {}
```

### Webview

From version 0.6.0 (vsc-base 0.9.3) webview has been added:

The run method now as a second argument with 'context'

See [Webview-with-vsc-base](https://github.com/alfnielsen/vsc-base/wiki/Webview-with-vsc-base) for more examples.

```ts
//vsc-script-name: WebView Test > Search files in project
import * as vsc from "vsc-base";
import * as vscode from "vscode";

export async function run(path: string, context: vscode.ExtensionContext) {
  const { onCommand, sendSetHTML: set, dispose } = vsc.startWebview(context, {
    title: "Search",
    body: `
      <button onClick="sendCommand('show','1')">Show '1'</button>
      <button onClick="sendCommand('end')">END</button><br/>
      <br><br>
      Search: <input type='text' id='s' onkeyup="sendCommand('search',this.value)" >
      <br><br>
      <div id='info'>info</div>
    `
  });
  await onCommand(async (command, value, resolve) => {
    switch (message) {
      case "show":
        vsc.showMessage(value);
        break;
      case "end":
        resolve();
        break;
      case "search":
        const files = await vsc.findFilePaths(value);
        set("#info", files.length);
        break;
    }
  });
  dispose();
  vsc.showMessage("Script Done!");
}
```

### onSave script's (Preview)

vsc-script also accepts name.vsc-script-onsave.ts files.

They wil be executed on save (in alphabetical order).

Dont have to many (They will slow down vscode save)

```ts
// documentation on http://vsc-base.org
import * as vsc from "vsc-base";

export async function runOnSave(path: string) {
  //Use vsc.getDocumentContent() and vsc.insertAt() and other method to change document before its saved
}
```

## vsc-base

vsc-script is based on vsc-base. (And vsc-base, vsc-base.org, vsc-script and vsc-scaffolding shares one mono-respo)

vsc-base will get more convenient method over time for working with folder/files,
paths, strings and other elements that make it easier to create vscode extension and writen vsc-scripts.

## Links

> vsc-base: [npm-module](https://www.npmjs.com/package/vsc-base) | [source-code](https://github.com/alfnielsen/vsc-base)

> vsc-base.org: [documentation](http://vsc-base.org)

> [vsc-base release-notes](https://github.com/alfnielsen/vsc-base/wiki/Release-notes)

### Related extensions

> vsc-scaffolding: [vscode-extension](https://marketplace.visualstudio.com/items?itemName=alfnielsen.vsc-scafolding)
