//vsc-script-name: WebView Test > WebView test (test 1)
import * as vsc from "vsc-base";
import * as vscode from "vscode";

export async function run(path: string, context: vscode.ExtensionContext) {
   const [postMessage, onMessage] = vsc.startWebview(context, {
      title: "Rename",
      body: `
      <button onClick="postMessage({command:'show',value:'1'})">Show '1'</button>
      <button onClick="postMessage({command:'end'})">END</button><br/>
      <br><br>
      Search: <input type='text' id='s' onkeyup="postMessage({command:'search',value:this.value})" >
      <br><br>
      <div id='info'>info</div>
    `,
      onWebviewMessage: (message: any) => {
         switch (message.command) {
            case "info":
               document.getElementById("info")!.innerHTML = message.content;
               break;
         }
      }
   });
   await onMessage(async (message, dispose) => {
      switch (message.command) {
         case "show": vsc.showMessage(message.value); break;
         case "end": dispose(); break;
         case "search":
            const files = await vsc.findFilePaths(message.value);
            postMessage({ command: "info", content: files.length });
            break;
      }
   });
   vsc.showMessage("Script Done!");
}
