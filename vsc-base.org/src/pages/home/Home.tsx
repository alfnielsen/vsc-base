import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import useRouter from 'use-react-router';

import AllAnnotations from '../../allAnnotations/AllAnnotations'
import HighlightedCode from '../../components/HighlightedCode/HighlightedCode';
import styles from './Home.module.scss'

const Home = () => {
   const { history, location, match } = useRouter();
   const [activeMethod, setActiveMethod] = useState('')
   const [typesArray, setTypesArray] = useState([] as string[])
   const [types, setTypes] = useState({
      raw: false,
      system: false,
      vscode: false,
      ts: false
   })
   const [name, setName] = useState('')
   useEffect(()=> {
      const newArray = [] as string[]
      for (const [key, value] of Object.entries(types)){
         if(value){
            newArray.push(key)
         }
      }
      setTypesArray(newArray)
   },[types])
   useEffect(()=> {
      const id = location.hash.replace('#', '')
      const element = document.getElementById(id)
      if (element) element.scrollIntoView()
      setActiveMethod(id.toLowerCase());
      console.log(id)
   },[location])
   return (
      <div className={styles.root}>
      <div className={styles.description}>
         <h2 className={styles.logo}>
            <span className={styles.logoImg}></span>
            <span>vsc-base</span>
            <span className={styles.logoNote}>
               {' '}
               - Visual Studio Code Script and Extension Base
            </span>
         </h2>
         <p>vsc-base is a npm module that aims to make vsc-script's easy and fun to create.</p>
         <p>It also make extension building for vscode easier.</p>

         <div className={styles.warning}>
            Warning: vsc-base and vsc-script is still only in version 0.x.x and there will come changes to them and method described below before the final version 1.0.0!
         </div>
         <h3>vsc-script</h3>
         <p>   
            Explorer scripts on the <NavLink to='/scripts'>script pages</NavLink>
         </p>
         <p>
            vsc-script is a vscode extension that enable project-based script's that acts as small project-specific extensions.
         </p>
         <p>
            A vsc-script is a typescript file named {'{script-name}'}.vsc-script.ts, 
            which is executed by right-clicking on a file in vscode and selecting 'vsc Script'.<br/>
            <i>(The vsc-script extension most be installed!)</i>
         </p>
         <p>
            The vsc-script must contains an export that is an async function named run. <br/>
            The parameters for the run is a string, that is the file-path for the file that was clicked when running the vsc-script.
         </p>
         <Example1 />
         <p>
            vsc-script is great for project-scripts and smaller personal scripts. <br/>
            It can be used to create regexp's replace for a file, where you need a more logic then vscode own replace provide, 
            and all kinds of file cleaning and automation.
         </p>
         <h3>vsc-script and import</h3>
         <p>
            The internal code of vsc-script extension compiles your script using typescript and run it in its own scope. (Inside the extension sandbox)<br/>
            All imports are compiled by the vsc-script extension (using the vsc-base method <a href='http://vsc-bsc.org/#tsLoadModule'>tsLoadModule</a>)<br/>
            In the current version it only accepts ts modules imports and it no no checks for circular important (which create infinity loops),<br/>
            so its only recommended to import your own local ts modules.
         </p>
         <h3>vsc-script name your scripts</h3>
         <p>
            A script will have the name of the files, or you can name it by adding //vsc-script-name:{'<NAME>'}
         </p>
         <ExampleName />
         <h3>vsc-script vs vscode extension</h3>
         <p>
            Script's are easy to customize, copy and share and provide an easy way of doing custom automation.<br/>
            Extension are for general common automation/easening/linting ect. for vscode that is specified to a point where it can be used for any project.
         </p>
         <h3>vsc-script - onSave (Preview)</h3>
         <p>
            vsc-script supports onSave actions, with files named {'{script-name}'}.vsc-script-onsave.ts, 
            which is executed when an open document is saved. (Use with caution!)<br/>
            <i>(The vsc-script extension most be installed!)</i><br/>
            All onsave script will be executed iIn alphabetical order.<br/>
            (Don't have to many onsave script - it will slow down your vscode on save!)
         </p>
         <p>
            The vsc-script must contains an export that is an async function named runOnSave. <br/>
            The parameters for the run is a string, that is the file-path for the open document being saved.<br/>
            The script run at 'onWillSaveTextDocument' time, which means that any changes done to the document by the script will be saved.
         </p>
         <Example2 />
         <h3>vsc-scaffolding</h3>
         <p>
            vsc-scaffolding is a scaffolding extension, that is based on vsc-base. (vsc.Template)<br/>
            It uses vsc-template files (like script's vsc-script files) and if you use ts files (js is allowed),<br/>
            you can use vsc-base in the exact same way as vsc-script. 
         </p>
         <p>
            A vsc-scaffolding is a typescript file named {'{script-name}'}.vsc-template.ts, 
            which is executed by right-clicking on a file in vscode and selecting 'vsc Scaffolding'.<br/>
            <i>(The vsc-scaffolding extension most be installed!)</i>
         </p>
         <p>
            The vsc-script must contains a single export that is an (*async) function named Template that returns a vsc.Template. <br/>
            <i>*It can be async or not! (async methods returns a {'Promise<vsc.Template>'})</i><br/>
            It uses <a href='http://vsc-base.org/#scaffoldTemplate'>vsc.scaffoldTemplate </a>
         </p>
         <b>async template</b>
         <Example3 />
         <b>not template</b>
         <Example4 />
         <h4>Open-source GPL-3</h4>
         <p>
         vsc-base, vsc-script ( and related extension project: vsc-scaffolding and vsc-move) are all open-source project
         license's under GNU General Public License v3, as well as the source code for this website (vsc-base.org).
         </p>
         <p>
            It is encouraged to use any code you find to make your project easier in any way that fits you. (commercial, community or private).<br/>
            The GPL-3 license is only there to project the source-code for copyright theft.
         </p>
         <p>
            <i>At some point in the future sharing vsc-script will most likely be enabled directly here on vsc-base.org)</i>
         </p>
         <p>
            Fill free to forge <a href='https://github.com/alfnielsen/vsc-base.org' className={styles.github}>vsc-base.org</a> for any annotated code with example you have.
            <br />
            (It's a <a href='https://github.com/facebook/create-react-app'>create-react-app</a> made 
            with <a href='https://www.typescriptlang.org/'>typescript</a> and <a href='https://github.com/css-modules/css-modules'>css modules</a> (sass format) and it uses{' '}
            <a href='https://prismjs.com/'>prism</a> for syntax highlighting of the code)
         </p>
         <h4>Links</h4>
         <ul>
         <li>
            mono-respo: <a href='https://github.com/alfnielsen/vsc-base'>source-code</a>
            </li>
            <li>
            vsc-base release notes: <a href='https://github.com/alfnielsen/vsc-base/wiki/Release-notes'>release-notes</a>
            </li>
            <li>
            vsc-base: <a href='https://www.npmjs.com/package/vsc-base'>npm-module</a> 
            </li>
            <li>
            vsc-script: <a href='https://marketplace.visualstudio.com/items?itemName=alfnielsen.vsc-script'>vscode-extension</a>
            </li>
            <li>
            vsc-scaffolding: <a href='https://marketplace.visualstudio.com/items?itemName=alfnielsen.vsc-scaffolding'>vscode-extension</a>
            </li>
         </ul>
      </div>
      <div className={styles.annotatedCode}>
         <h2>Documentation</h2>
      </div>
      <div className={styles.description}>
         <p>
         The vsc-base documentation are created with a vsc-script (super meta!), 
         that runs through the development code and generate both the vsc-base code and the documentation. (You can find the vsc-script in the source-code for vsc-script. Its called compileVsc.vsc-script.ts)
         </p>
         <p>
         This guarantees that the source code you see in the documentation is one-to-one with the actual vsc-base source code.
         </p>
         <p>
         The examples and all other code in this documentation is created from the JSDocs for each method.
         </p>
         <p>
            Vsc-base's source code are split into 4 areas: raw, system, vscode And ts (typescript)
         </p>
         <h4>raw, system, vscode an ts</h4>
         <p>
            'raw' is standalone methods that only depends on other raw methods. (Mostly string manipulation)<br/>
            (You can test all raw method directly here on vsc-base.org)<br/>
            Raw methods can be tested directly here in the documentation.
         </p>
         <p>
            Ex: <a href='/#isSubPath'>isSubPath</a>, <a href='/#toCamelCase'>toCamelCase</a>, <a href='/#getRelativePath'>getRelativePath</a> and <a href='/#subtractPath'>subtractPath</a><br/>
         </p>
         <p>
            'system' is methods that uses fs (fs-extra) or relates to file system.<br></br>
         </p>
         <p>
            Ex: <a href='/#getFileContent'>getFileContent</a>, <a href='/#saveFileContent'>saveFileContent</a>, <a href='/#isDir'>isDir</a>, <a href='/#move'>move</a>, <a href='/#copy'>copy</a> and <a href='/#execFromPath'>execFromPath</a> 
         </p>
         <p>
            'vscode' is methods that uses vscode or relates to doing things in vscode.<br/>
         </p>
         <p>
            Ex: <a href='/#showMessage'>showMessage</a>, <a href='/#ask'>ask</a>, <a href='/#pick'>pick</a>, <a href='/#findFilePaths'>findFilePaths</a>, <a href='/#getDocumentContent'>getDocumentContent</a>, <a href='/#appendLineToDocument'>appendLineToDocument</a>, <a href='/#setSelection'>setSelection</a>, <a href='/#insertAt'>insertAt</a> and <a href='/#writeToTerminal'>writeToTerminal</a>
         </p>
         <p>
            'ts' is methods that uses ts (typescript) or relates to doing things in with the typescript api.<br/>
         </p>
         <p>
            Ex: <a href='/#tsLoadModule'>tsLoadModule</a>, <a href='/#tsTranspile'>tsTranspile</a>, <a href='/#tsTransform'>tsTransform</a>, <a href='/#tsCreateTransformer'>tsCreateTransformer</a>, <a href='/#tsFindNodeFromContent'>tsFindNodeFromContent</a>, <a href='/#tsReplace'>tsReplace</a> and <a href='/#tsIsEnum'>tsIsEnum</a>
         </p>
      </div>
      <div className={styles.annotatedCode}>
         <h3>Methods<span className={styles.titleNote}> + tests that you can experiment with</span></h3>
         Search: <input type='text' value={name} placeholder='search name' onChange={(e)=>setName(e.target.value)} />
         <label>
            <input type='checkbox' checked={types.raw} onChange={(e)=>setTypes({...types, raw: !types.raw})} />
            Raw 
         </label>
         <label>
            <input type='checkbox' checked={types.system} onChange={(e)=>setTypes({...types, system: !types.system})} />
            System 
         </label>
         <label>
            <input type='checkbox' checked={types.vscode} onChange={(e)=>setTypes({...types, vscode: !types.vscode})} />
            Vscode 
         </label>
         <label>
            <input type='checkbox' checked={types.ts} onChange={(e)=>setTypes({...types, ts: !types.ts})} />
            Typescript 
         </label>
      </div>
      <div className={styles.annotationArea}>
         <AllAnnotations activeMethod={activeMethod} name={name} vscType={typesArray} />
      </div>
   </div>
)
}
export default Home


const Example4 = () => (
<HighlightedCode code={`// replaceTest.vsc-script.ts
import * as vsc from 'vsc-base'

export function Template(path: string): vsc.vscTemplate {
   // (...)
   return {} // <-- Template
}
`} />
)
const Example3 = () => (
<HighlightedCode code={`// replaceTest.vsc-script.ts
import * as vsc from 'vsc-base'

export async function Template(path: string): Promise<vsc.vscTemplate> {
   // (...)
   return {} // <-- Template
}
`} />
)
const Example2 = () => (
<HighlightedCode code={`// orderImports.vsc-script-onsave.ts
import * as vsc from 'vsc-base';

const lastSaveTime = '2019-05-10T04:55:17.360Z'; // <-- updae on save
export async function runOnSave() {
   const content = vsc.getDocumentContent()
   const [, pos] = vsc.tsFindNodePositionFromContent(content,
   node => vsc.tsIsValue(node, /.*/, {
        hasAncestor: ancestor => vsc.tsIsVariable(ancestor, { name: 'lastSaveTime' })
     })
   )
   vsc.insertAtRange(\`'\${(new Date()).toISOString()}'\`, pos.range)
}
`} />
)
const Example1 = () => (
<HighlightedCode code={`//vsc-script-name: Automation  -  Replace 'test' with 'Test'
import * as vsc from 'vsc-base'

export async function run(path: string) {
   if (vsc.isDir(path)) {
      vsc.showErrorMessage('Only works on files!')
   }
   let source = await vsc.getFileContent(path)
   source = source.replace('test', 'Test')
   await vsc.saveFileContent(path, source)
   vsc.showMessage('Update file!')
}
`} />
)
const ExampleName = () => (
<HighlightedCode code={`//vsc-script-name: My cool script
import * as vsc from 'vsc-base'

export async function run(path: string) {
`} />
)