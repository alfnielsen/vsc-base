//vsc-script-name: WebView Test > Replace in file (test 2)
import React from "react";
//import * as vsc from "./vsc-base-development/vsc-base";
import * as vsc from "vsc-base";
import * as vscode from "vscode";

export async function run(path: string, context: vscode.ExtensionContext) {
   await startFindWebview(context);

   vsc.showMessage("Script Done");
}

const startFindWebview = async (context: vscode.ExtensionContext) => {
   const docs = vscode.workspace.textDocuments;
   const [postMessage, onMessage] = vsc.startWebview(context, {
      title: "Rename",
      showOptions: { viewColumn: 2 },
      style: `pre { background: var(--vscode-input-background); padding: 10px; }`,
      body: `
        <div class='container'>
              <h2>Test 1: Search in open file</h2>
           <br><br>
          <div class="row">
              <button onClick="postMessage({command:'show',value:'1'})">Show '1'</button>
              <button onClick="postMessage({command:'end'})">END</button><br/>
           </div>
           <br><br>
           line of text<br>
           line of text<br>
           line of text<br>
           <br><br>
           <div>
           <select onChange="postMessage({command:'select',value:this.value})">
           ${docs
            .map(x => `<option value='${x.fileName}'>${x.fileName}</option>`)
            .join("\n")}

           </select>
           <br><br>
           Text:<br>
           <textarea></textarea>
           <br><br>
           Include: <input type='checkbox'>
           <br><br>
           <div>
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
   let file = "";
   await onMessage(async (message, dispose) => {
      //vsc.showMessage(message.command);
      switch (message.command) {
         case "select":
            file = message.value;
            break;
         case "show":
            vsc.showMessage(message.value);
            break;
         case "end":
            dispose();
            break;
         case "search":
            if (!file) {
               postMessage({ command: "info", content: "Please select file" });
               break;
            }
            postMessage({
               command: "info",
               content: `Begin search...`
            });
            const res = await search(file, message.value);
            postMessage({
               command: "info",
               content: `Found ${res.length} <br><br>${res.join("<br><br>")}`
            });

            break;
      }
   });
};

const search = async (file: string, value: string) => {
   if (value === "") {
      return [];
   }
   const content = await vsc.getFileContent(file);
   const res: string[] = [];
   const r = new RegExp(value, "g");
   var match: RegExpExecArray | null;
   while ((match = r.exec(content)) !== null) {
      const s1 = content.substring(0, match.index).match(/(\n[^\n]*){0,3}$/);
      const s2 = match[0];
      const s3 = content
         .substring(match.index + s2.length)
         .match(/^([^\n]*\n){0,3}/);
      if (s1 && s3) {
         const s =
            escapeHtml(s1[0]) +
            '<span style="color:red">' +
            escapeHtml(s2) +
            "</span>" +
            escapeHtml(s3[0]);
         res.push(`<pre>${s}</pre>`);
      }
   }
   return res;
};

function escapeHtml(unsafe: string) {
   return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
}
