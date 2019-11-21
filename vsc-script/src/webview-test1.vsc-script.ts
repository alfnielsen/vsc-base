//vsc-script-name: WebView Test > WebView test (test 1)
import * as vsc from "vsc-base";
import * as vscode from "vscode";

export async function run(path: string, context: vscode.ExtensionContext) {
   const [postMessage, onMessage, dispose] = vsc.startWebview(context, {
      title: "Rename",
      showOptions: 2,
      body: `
      <button onClick="postMessage({command:'show',value:'1'})">Show '1'</button>
      <button onClick="postMessage({command:'end'})">END</button><br/>
      <br><br>
      Search: <input type='text' id='s' onkeyup="postMessage({command:'search',value:this.value})" >
      <br><br>
      <div id='files'></div>
      <br><br>
      <div id='info'>info</div>
    `,
      onWebviewMessage: (message: any) => {
         switch (message.command) {
            case "info":
               document.getElementById("info")!.innerHTML = message.content;
               break;
            case "files":
               document.getElementById("files")!.innerHTML = message.content;
               break;
         }
      }
   });
   await onMessage(async (message, resolve) => {
      switch (message.command) {
         case "show":
            vsc.showMessage(message.value);
            break;
         case "end":
            resolve();
            break;
         case "search":
            const files = await vsc.findFilePaths(message.value);
            postMessage({ command: "info", content: 'Found:' + files.length });
            postMessage({ command: "files", content: files.slice(0, 5).map(x => `<a href='#' onClick="postMessage({command:'open',value:'${x}'})">${x}</a>`) });
            break;
         case "open":
            postMessage({ command: "info", content: `Will open: ${message.value}` });
            await vsc.open(message.value, 1);
            break;
      }
   });
   dispose()
   vsc.showMessage("Script Done!");
}
