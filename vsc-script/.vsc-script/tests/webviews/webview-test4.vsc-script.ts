//vsc-script-name: WebView Test > Custom html file test (test 4)
import React from "react";
//import * as vsc from "./vsc-base-development/vsc-base";
import * as vsc from "vsc-base";
import * as vscode from "vscode";

export async function run(path: string, context: vscode.ExtensionContext) {
   await startFindWebview(context);

}

const startFindWebview = async (context: vscode.ExtensionContext) => {
   const pathToExtensionHtmlFile = vsc.joinPaths(context.extensionPath, '.vsc-script/tests/webviews/test-webview.html');
   const html = await vsc.getFileContent(pathToExtensionHtmlFile)
   const { sendSetHTML: set, onCommand, dispose } = vsc.startWebview(context, {
      title: "Search in file",
      showOptions: 2, // this will open the webview in column 2
      html
   });
   await onCommand(async (command, value, resolve) => {
      switch (command) {
         case "info":
            vsc.showMessage(value);
            resolve()
            break;
      }
   });
   dispose()
   vsc.showMessage('Script done');

};
