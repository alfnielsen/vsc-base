import * as vscode from "vscode";

//vsc-script-name: WebView Test > WebView test (test 1)
//import * as vsc from "vsc-base";
import * as vsc from "./vsc-base-development/vsc-base";

export async function run(path: string, context: vscode.ExtensionContext) {
   const { sendCommand: post, sendSetHTML, onCommand, dispose } = vsc.startWebview(context, {
      title: "Rename",
      showOptions: 2,
      body: `
      <button onClick="sendCommand('show','1')">Show '1'</button>
      <button onClick="sendCommand('end')">END</button><br/>
      <br><br>
      Search: <input type='text' id='s' onkeyup="postMessage({command:'search',value:this.value})" >
      <br><br>
      <div id='files'></div>
      <br><br>
      <div id='info'>info</div>
    `,
      onCommand: (command: string, value: any) => {
         console.log("HERE!!!", command, value)
         switch (command) {
            case "info":
               document.getElementById("info")!.innerHTML = value;
               break;
            case "files":
               document.getElementById("files")!.innerHTML = value;
               break;
         }
      }
   });
   await onCommand(async (command, value, resolve) => {
      switch (command) {
         case "show":
            vsc.showMessage(value);
            break;
         case "end":
            resolve();
            break;
         case "search":
            const files = await vsc.findFilePaths(value);
            sendSetHTML("#info", 'Found:' + files.length)
            post("files", files.slice(0, 5).map(x => `<a href='#' onClick="postMessage({command:'open',value:'${x}'})">${x}</a>`));
            break;
         case "open":
            sendSetHTML("#info", 'Found:' + `Will open: ${value}`)
            await vsc.open(value, 1);
            break;
      }
   });
   dispose()
   vsc.showMessage("Script Done!");
}
