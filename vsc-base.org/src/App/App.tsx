import React, { useEffect, useState } from 'react'
import styles from './App.module.scss'
import useReactRouter from 'use-react-router';
import Header from 'components/Header/Header'
import HighlightedCode from 'components/HighlightedCode/HighlightedCode';
import AllAnnotations from 'allAnnotations/AllAnnotations'

const App = () => {
   const { history, location, match } = useReactRouter();
   const [activeMethod, setActiveMethod] = useState('')
   useEffect(()=> {
      const id = location.hash.replace('#', '')
      const element = document.getElementById(id)
      if (element) element.scrollIntoView()
      setActiveMethod(id);
   },[location])
   return (
   <div className={styles.App}>
      <Header />
      <div className={styles.decsription}>
         <div className={styles.warning}>
            Warning: vsc-base and vsc-script is still only in version 0.x.x and there will come changes to them and method described below before the final version 1.0.0!
         </div>
         <h2>vsc-base</h2>
         <p>vsc-base is a npm module that aims to make vsc-script's easy and fun to create.</p>
         <p>It also make extension building for vscode easier.</p>

         <h3>vsc-script</h3>
         <p>
            vsc-script is a vscode extension that enable project-based script's that acts as small project-specific extensions.
         </p>
         <p>
            A vsc-script is a typescript file named {'{script-name}'}.vsc-script.ts, 
            which is executed by right-clicking on a file in vscode and selecting 'vsc Script'.<br/>
            <i>(The vsc-script extension most be installed!)</i>
         </p>
         <p>
            The vsc-script must contains a single export that is an async function named run. <br/>
            The parameters for the run is a string, that is the file-path for the file that was clicked when runnning the vsc-script.
         </p>
            <HighlightedCode code={`// replaceTest.vsc-script.ts
import * as vsc from 'vsc-base'

export async function run(path: string) {
   if (vsc.isDir(path)) {
      vsc.showErrorMessage('Only works on files!')
   }
   let source = await vsc.getFileContent(path)
   source = source.replace('test', 'Test')
   await vsc.saveFileContent(path, source)
   vsc.showErrorMessage('Update file!')
}
`} />
         <p>
            vsc-script is great for project-scripts and smaller personal scripts. <br/>
            It can be used to create regexp's replace for a file, where you need a little more logic then vscode own replace provide, 
            and all kinds of file cleaning and automation.
         </p>
         <p>
            vsc-script's only limit is vsc-base.
         </p>
         <p>
            The internal code of vsc-script extension compiles your script using typescript and run it in its own scope.<br/>
            This means that the only import you can use in a vsc-script is vsc-base.
         </p>
         <h3>vsc-script vs vscode extension</h3>
         <p>
            Script's are easy to customize, copy and share and provide an easy way of doing custom automation.<br/>
            Extension are for generel common automation/easening/linting ect. for vscode that is specified to a point where it can be used for any project.
         </p>
         <p>
            vsc-base is at the moment used as the base for two other extension, vsc-move and vsc-scaffolding, and will most likely provide the base for other extensions in the future.
         </p>
         <h4>Open-source GPL-3</h4>
         <p>
         vsc-base, vsc-script ( and related extension project: vsc-scaffolding and vsc-move) are all open-source project
         lincensens under GNU General Public License v3, aswell as the source code for this website (vsc-base.org).
         </p>
         <p>
            It is encouraged to use any code you find to make your project easier in any way that fits you. (commercial, community or private).<br/>
            The GPL-3 license is only there to project the source from (bad) people that will try to make copyright protection on this open free and shared community code. 
         </p>
         <p>
            Share your favorite vsc-script by sending it to me alfnielsen(at)gmail.com, then all add it the the examples.<br/>
            You can also make a pull request on the source code for vsc-script.<br/>
            (Just add them to vsc-script's folder called '.vsc-script')<br/>
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
            vsc-base, vsc-base.org and vsc-script: <a href='https://github.com/alfnielsen/vsc-base'>source-code</a>
            </li>
            <li>
            vsc-base: <a href='https://www.npmjs.com/package/vsc-base'>npm-module</a> 
            </li>
            <li>
            vsc-script: <a href='https://marketplace.visualstudio.com/items?itemName=alfnielsen.vsc-script'>vscode-extension</a>
            </li>
            <li>
            vsc-scaffolding: <a href='https://marketplace.visualstudio.com/items?itemName=alfnielsen.vsc-scaffolding'>vscode-extension</a> | <a href='https://github.com/alfnielsen/vsc-scaffolding'>source-code</a>
            </li>
         </ul>
      </div>
      <div className={styles.annotatedCode}>
         <h2>Documentation</h2>
      </div>
      <div className={styles.decsription}>
         <p>
         The vsc-base documentation are created with a vsc-script (super meta!), 
         that runs through the development code and generate both the vsc-base code and the documentation. (You can find the vsc-script in the source-code for vsc-script. Its called compileVsc.vsc-script.ts)
         </p>
         <p>
         This guarantees that the source code you see in the documentation is one-to-one with the actual vsc-base source code.
         </p>
         <p>
         The examples and all other code in this documententation is created from the JSDocs for each method.
         </p>
         <p>
            Vsc-base's source code are split into 3 areas: Raw, System and Vscode
         </p>
         <h4>Raw, System ans Vscode</h4>
         <p>
            Raw is standalone methods that only depends on other raw methods. (Mostly string manipulation)<br/>
            (You can test all raw method directly here on vsc-base.org)<br/>
            Raw methods can be tested directly here in the documentation.
         </p>
         <p>
            Ex: <a href='/#isSubPath'>isSubPath</a> <a href='/#toCamelCase'>toCamelCase</a>, <a href='/#getRelativePath'>getRelativePath</a> and <a href='/#subtractPath'>subtractPath</a><br/>
         </p>
         <p>
            System is methods that uses fs-extra or relates to file system (Can use Raw methods).<br></br>
         </p>
         <p>
            Ex: <a href='/#getFileContent'>getFileContent</a>, <a href='/#saveFileContent'>saveFileContent</a>, <a href='/#isDir'>isDir</a>, <a href='/#move'>move</a> and <a href='/#copy'>copy</a>
         </p>
         <p>
            Vscode is methods that uses vscode or relates to doing things in vscode (Can use both Raw and System methods).<br/>
         </p>
         <p>
            Ex: <a href='/#showMessage'>showMessage</a>, <a href='/#ask'>ask</a>, <a href='/#pick'>pick</a>, <a href='/#findFilePaths'>findFilePaths</a>, <a href='/#getActiveDocumentContent'>getActiveDocumentContent</a> and <a href='/#appendLineToActiveDocument'>appendLineToActiveDocument</a>
         </p>
      </div>
      <div className={styles.annotatedCode}>
         <h3>Methods<span className={styles.titleNote}> + tests that you can experiment with</span></h3>
      </div>
      <div>
         <AllAnnotations />
      </div>
   </div>
)
}
export default App
