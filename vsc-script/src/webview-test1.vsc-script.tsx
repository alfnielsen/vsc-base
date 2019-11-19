//vsc-script-name: WebView Test > WebView test (test 1)
import React from "react";
//import * as vsc from "vsc-base";
import * as vscode from "vscode";

import * as vsc from "./vsc-base-development/vsc-base";

export async function run(path: string, context: vscode.ExtensionContext) {
  await startFindWebview(context);

  vsc.showMessage("Script Done");
}

const startFindWebview = async (context: vscode.ExtensionContext) => {
  const [postMessage, onMessage] = vsc.startWebview(context, {
    title: "Rename",
    body: `
        <div class='container'>
            <h2>Test 1: Search for file path with glob</h2>
           <div class="row">
              <button onClick="postMessage({command:'show',value:'1'})">Show '1'</button>
              <button onClick="postMessage({command:'end'})">END</button><br/>
           </div>
           <br><br>
           Search: <input type='text' id='s' onkeyup="postMessage({command:'search',value:this.value})" >
           <br><br>
           <div id='info'>info</div>
        </div>
     `,
    onWebviewMessage: (message: any) => {
      switch (message.command) {
        case "info":
        case "find":
          document.getElementById("info")!.innerHTML = message.content;
          break;
      }
    }
  });
  await onMessage(async (message, dispose) => {
    //sendMessage: (message: any) => void,
    switch (message.command) {
      case "show":
        vsc.showMessage(message.value);
        break;
      case "end":
        dispose();
        break;
      case "search":
        const files = await vsc.findFilePaths(message.value);
        postMessage({ command: "find", content: files.length });
        break;
    }
  });
};
