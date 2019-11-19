# vsc-organize-imports

The is an vscode extension.

- Organize imports in ts/js files alphabetical. (There are different options for how to order)

- Don't change format for single/multi-line imports. (Options for forcing preferred style)

- It don't removes comments. (Except inner comment, when option: order named, are activated)

- Option for automatically removing of unused import

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

### All options is defined in the package.json

Only option in vscode settings is 'Format On Save', all other is now defined in package.json:

The option model is defined in the package.json file.

### Base options:

| name                          | optional |  type   | note                                                 |
| :---------------------------- | :------: | :-----: | :--------------------------------------------------- |
| orderSpecifiers               | required | boolean | Sort named imports: `import {a, b, c} from 'module'` |
| orderSpecifiersAsSingleLine   | required | boolean |                                                      |
| baseUrl                       | required | string  | (normally: "src")                                    |
| emptyLinesAfterImports        | required | number  | (normally 1 or 2)                                    |
| emptyLinesBetweenFilledGroups | required | number  | (normally 1 or 2)                                    |
| groups                        | required | group[] | (See group description below)                        |

The feature _removeUnusedImports_ has been remove, there was errors and performance problems with it.
It will will hopefully come back in later versions.

### Group options:

Groups can be defined (from the base-groups)

Groups has 3 options: (This extension finds base-groups, but they are joined into the groups the defined in package.json)

| name       | optional |       type       | note                     |
| :--------- | :------: | :--------------: | :----------------------- |
| sortBy     | required | "path" or "name" |                          |
| emptyLines | required |     boolean      |                          |
| groups     | required |     string[]     | list of base-group names |

The base-group are: "globalDirect", "global", "absoluteDirect", "absolute", "relativeDirect" and "relative"

```ts
//globalDirect:
import "@storybook/theme";
//globalWithNamed:
import React from "react";
import { ReactNode } from "react";
import React, { ReactNode } from "react";
import * as ts from "typescript";

//absoluteDirect
import "module/style.css";
//absoluteWithNamed
import module from "module/myModule";
import module from "module/myModule.ts";
import { module } from "module/myModule";
import module, { moduleProp } from "module/myModule";

//relativeDirect
import "../../module/style.css";
import "./module/style.css";
//relativeWithNamed
import module from "../module/myModule";
import module from "./module/myModule.ts";
import { module } from "../module/myModule";
import { module } from "./module/myModule";
import module, { moduleProp } from "./module/myModule";
import module, { moduleProp } from "../module/myModule";
```

Sort by name:

**Example of one defined group containing all base-groups and sorted by name**

```ts
// direct import comes first, and are sorted by path
import "./../Home/Home.module.scss";
import "./Home.module.scss";
// sort by names/alias used in the file, meaning alias names are use here (in this case _A)
import { Action as _A, Dispatch as I2 } from "redux";
// Default name are used if the import has it (in this case a)
import a from "./../Home/Home.module.scss";
// namespace imports uses the alias name (In this case AAA)
import * as Aaa from "vsc-base";
// Default name are used, ignoring the named imports (In this case B)
import B, { FC as A } from "react";
// The first named import (or its alias) are used if no default name (in this case connect)
import { connect, Action as DAction } from "react-redux";
import { HomeActionType } from "modules/home/Home.redux";
import styles from "./Home.module.scss";
```

**package.json:**

```json
   "vsc-organize-imports": {
      "orderSpecifiers": true,
      "orderSpecifiersAsSingleLine": true,
      "baseUrl": "src",
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
   }
```

## Links and related projects

This extension is build with [vsc-base](http://vsc-base.org).

The source code is find in vsc-base mono-respo: [source-code](https://github.com/alfnielsen/vsc-base)

### Links

> mono-respo: [source-code](https://github.com/alfnielsen/vsc-base)

> vsc-base: [npm-module](https://www.npmjs.com/package/vsc-base)

> vsc-base.org: [documentation](http://vsc-base.org)

> vsc-script: [vscode-extension](https://marketplace.visualstudio.com/items?itemName=alfnielsen.vsc-script)

> vsc-scaffolding: [vscode-extension](https://marketplace.visualstudio.com/items?itemName=alfnielsen.vsc-scafolding)
