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

### All options is defined in the package.json

The option model is defined in the package.json file.

####Base options:

**orderSpecifiers**: true | false

(Sort named imports aka: import {a, b, c} from '')

**orderSpecifiersAsSingleLine**: true | false

**baseUrl**: string (normally: "src")

**emptyLinesAfterImports**: number (normally 1 or 2)

**emptyLinesBetweenFilledGroups**: number (normally 1 or 2)

**Groups** can be defined (from the base-groups)

Groups has 3 options: (The extension find the defined base-groups, but they are joined into the group the defined in package.json)

**sortBy**: "path" | "name"

**emptyLines**: true | false

**groups**: list of bae-group names

The base-group are: "globalDirect", "global", "absoluteDirect", "absolute", "relativeDirect" nad "relative"

```ts
//globalDirect:
import '@storybook/theme'
//globalWithNamed:
import React from 'react'
import { ReactNode } from 'react'
import React, { ReactNode } from 'react'
import * as ts from 'typescript'

//absoluteDirect
import 'module/style.css'
//absoluteWithNamed
import module from 'module/myModule'
import module from 'module/myModule.ts'
import { module } from 'module/myModule'
import module, { moduleProp } from 'module/myModule'

//relativeDirect
import '../../module/style.css'
import './module/style.css'
//relativeWithNamed
import module from '../module/myModule'
import module from './module/myModule.ts'
import { module } from '../module/myModule'
import { module } from './module/myModule'
import module, { moduleProp } from './module/myModule'
import module, { moduleProp } from '../module/myModule'
```

Only option left is 'Format On Save' all other is now defined in package.json:

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
               "globalDirect"
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
