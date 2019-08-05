# vsc-scaffolding

The is an vscode extension.

The project's main goal is to create an easy way the create scaffolding templates.

## Usage

First add or create your templates, then:

1. Right-click folder/file
2. Select 'vsc Scaffolding'
3. Write the template name.
4. Optional: if the template has UserInputs, then fill them out.

![Use Extension](images/vsc-scaffolding.gif)

## Features

Create folders and files described in a single js template file.

(The js/ts file has a single function that returns a json template structure)

> You can create as many templates as you like! One file per template.

## Create Template

Create a file that ends with .vsc-template.js or .vsc-template.ts

> {NAME}.vsc-template.js (javascript)

> {NAME}.vsc-template.ts (typescript)

A js template file must contain a single parentheses wrapped method,
and it cannot use any external js ref like import and require.

A ts template file must contain a export function named Template.
You can use [vsc-base](http://vsc-base.org) in your ts template file.
(And no other library! )

You don't need to use vsc-base (and if you use it you need to install it as dev dependency)

> I personally think is a good idea to create a .vsc-template folder in the root of your project and place all templates there.

**EX: Component.vsc-template.js**

```js
;(function Template() {
   const camelize = str =>
      str.replace(/\W+(.)/g, (_match, chr) => chr.toUpperCase())
   return {
      userInputs: [
         {
            title: 'What is the Component Name',
            argumentName: 'name', // will become input in template
            defaultValue: 'test'
         }
      ],
      template: [
         {
            type: 'folder',
            name: inputs => `${camelize(inputs.name)}Component`,
            children: [
               {
                  type: 'file',
                  name: inputs => `${camelize(inputs.name)}.js`,
                  content: inputs => `import React from 'react'

const ${camelize(inputs.name)} = ({ value }}) => (
  <div>{value}</div>
)

export default ${camelize(inputs.name)}
`
               }
            ]
         }
      ]
   }
})
```

**EX: Component.vsc-template.ts**

```ts
import * as vsc from 'vsc-base'‚

export function Template(path: string, templatePath: string): vsc.vscTemplate {
   return {
      userInputs: [
         {
            title: 'What is the Component Name',
            argumentName: 'name', // will become input in template
            defaultValue: 'test'
         }
      ],
      template: [
         {
            type: 'folder',
            name: inputs => `${vsc.toPascalCase(inputs.name)}Component`,
            children: [
               {
                  type: 'file',
                  name: inputs => `${vsc.toPascalCase(inputs.name)}.js`,
                  content: inputs => `import React from 'react'

const ${vsc.toPascalCase(inputs.name)} = ({ value }) => (
	<div class='${vsc.toKebabCase(inputs.name)}'>{value}</div>
)

export default ${vsc.toPascalCase(inputs.name)}
`
               },
               {
                  type: 'file',
                  name: inputs => `${vsc.toPascalCase(inputs.name)}.css`,
                  content: inputs => `
.${vsc.toKebabCase(inputs.name)} {
	display: block;
}
`
               }
            ]
         }
      ]
   }
}
```

# The template structure:

This is the actual typescript defined structure

```typescript
export type Template = {
   userInputs: UserInput[]
   template: TemplateItem[]
}

export type TemplateItem = TemplateFolder | TemplateFile

export type TemplateFolder = {
   type: 'folder'
   name: StringDelegate
   children?: TemplateItem[]
}
export type TemplateFile = {
   type: 'file'
   name: StringDelegate
   content: StringDelegate
}

export type UserInput = {
   title: string
   argumentName: string
   defaultValue: string
}

export type UserInputs = { [key: string]: string }
export type StringDelegate = string | ((inputs: UserInputs) => void)
```

## vsc-base and vsc-script

This extension is build with [vsc-base](http://vsc-base.org)

This means that it will run the same way as a vsc-script, and you can use all vsc-base methods in your ts version of a template.

```ts
import * as vsc from 'vsc-base'‚

export function Template(path: string, templatePath: string): vsc.vscTemplate {
   const name = vsc.ask("Name component")
   if(!name)return
   const subName = vsc.ask(`Name sub-component for ${name}`,`Sub-${name}`)
   if(!subName)return
   const list = ['area1', 'area2','area3']
   const area = vsc.pick(list)
   if(!area)return
   return {
      userInputs: [],
      template: [
         {
            type: 'folder',
            name: inputs => `${area}`,
            children: [
               {
                  type: 'file',
                  name: inputs => `${vsc.toPascalCase(subName)}.ts`,
                  content: inputs => `// Im ${subName} in ${name}`
               }
            ]
         }
      ]
   }
}
```

### Template names and grouping

A template can be named by adding a comment in it with //vcc-template-name: {NAME}

> You can name both ts and js files

```ts
import * as vsc from 'vsc-base'‚
//vcc-template-name: My template
export function Template(path: string, templatePath: string): vsc.vscTemplate {
```

Template's can be grouped by adding '>' in the name

```ts
import * as vsc from 'vsc-base'
//vcc-template-name: Components > Folder with markup and style
export function Template(path: string, templatePath: string): vsc.vscTemplate {
```

## Links and related projects

> vsc-scaffolding: [vscode-extension](https://marketplace.visualstudio.com/items?itemName=alfnielsen.vsc-scafolding)

> mono-respo for vsc-base, vsc-base.org, vsc-script and vsc-scaffolding: [source-code](https://github.com/alfnielsen/vsc-base)

> vsc-base: [npm-module](https://www.npmjs.com/package/vsc-base)

> vsc-base.org: [documentation](http://vsc-base.org)

> vsc-script: [vscode-extension](https://marketplace.visualstudio.com/items?itemName=alfnielsen.vsc-script)
