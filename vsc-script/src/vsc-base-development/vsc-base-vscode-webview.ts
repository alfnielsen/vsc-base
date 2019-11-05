import * as vscode from 'vscode'

import * as vsc from './vsc-base'

/** vsc-base method
* @description 
* vsc-base's internal default htmlTemplate for webviews.
* It provides an html template with:
* An addEventListener for 'postMessage' that sets the body on message: 
* { command: 'setBody', content: 'myBodyHTML' }
* And a 'postMessage' that will send messages back to the extension that created the web view.
* @see [WebViewHTMLTemplate](http://vsc-base.org/#WebViewHTMLTemplate)
* @internal
* @vscType ts
* @returns (body: string, script?: string) => string
* @example
* const WebViewHTMLTemplate = vsc.WebViewHTMLTemplate()
*/
export const WebViewHTMLTemplate: (body: string, script?: string) => string = (body: string, script?: string) => (`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
    <script>
    (function() {
      const vscode = acquireVsCodeApi();
      window.postMessage = vscode.postMessage;
      window.addEventListener('message', ${script});
    }())
    </script>
</head>
<body>${body}</body>
</html>`)