import * as vsc from 'vsc-base'

//vsc-template-name:Script > Ts Script Component

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
//path: ${path}
//templatePath: ${templatePath}
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
