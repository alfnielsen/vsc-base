import * as vsc from "vsc-base";
//vsc-script-name: WebView Test > React version (test 3)
import * as vscode from "vscode";

//import * as vsc from "./vsc-base-development/vsc-base";

export async function run(path: string, context: vscode.ExtensionContext) {
  await startFindWebview(context);

  vsc.showMessage("Script Done");
}

const startFindWebview = async (context: vscode.ExtensionContext) => {
  const { onCommand, sendSetHTML: set } = vsc.startWebview(context, {
    title: "Rename",
    body: `
    <div class='container'>
       <h2>Test 3</h2>
       <button onClick="sendCommand('ping')">ping</button>
       <pre id='info'>info</pre>
    </div>
 `,
    showOptions: { viewColumn: 2 },
    onCommand: (command: string, value: any) => {
      //console.log("HERE!!!", message);
    }
  });
  let count = 1;
  onCommand(async (command, value, resolve) => {
    switch (command) {
      case "ping":
        set("#info", "Ping!" + count++);
        break;
    }
  });
};
