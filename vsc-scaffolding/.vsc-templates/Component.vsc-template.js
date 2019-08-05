//vsc-template-name: Script >Js Script Component
(function Template() {
   const camelize = str =>
      str.replace(/\W+(.)/g, (_match, chr) => chr.toUpperCase())
   const dash = str =>
      str[0].toLowerCase() +
      str
         .substr(1)
         .replace(/([A-Z])/g, ([letter]) => `-${letter.toLowerCase()}`)
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

const ${camelize(inputs.name)} = ({ value }) => (
	<div class='${dash(inputs.name)}'>{value}</div>
)

export default ${camelize(inputs.name)}
`
               },
               {
                  type: 'file',
                  name: inputs => `${camelize(inputs.name)}.css`,
                  content: inputs => `
.${dash(inputs.name)} {
	display: block;
}
`
               }
            ]
         }
      ]
   }
})
