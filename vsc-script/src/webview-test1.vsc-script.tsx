//vsc-script-name: Test > WebView test
import React from 'react'
import * as vsc from 'vsc-base'

import { TStartWebview } from './Script'

export async function run(path: string, script: { webview: TStartWebview }) {
   const [sendMessage, onMessage] = script.webview({
      //reactApp: WebViewApp.toString(),
      body: `
      <div class='container'>
         <div class="row">
            <button onClick="postMessage({command:'show',value:'1'})">Show '1'</button>
            <button onClick="postMessage({command:'end'})">END</button><br/>
         </div>
         Search: <input type='text' id='s' onkeyup="postMessage({command:'search',value:this.value})" >
         <div id='info'>info</div>
      </div>
   `,
      onMessageCode: (event: any) => {
         const message = event.data
         if (message.command === 'info') {
            document.getElementById('info')!.innerHTML = message.content
         }
         if (message.command === 'find') {
            document.getElementById('info')!.innerHTML = message.content
         }
      }
   })
   await onMessage(async (message, stopWebView) => {
      //sendMessage: (message: any) => void,
      if (message.command === 'show') {
         vsc.showMessage(message.value)
      }
      if (message.command === 'end') {
         stopWebView()
      }
      if (message.command === 'search') {
         const files = await vsc.findFilePaths(message.value)
         sendMessage({ command: 'find', content: files.length })
      }
   })
   vsc.showMessage('Script Done')
}

// export async function WebViewApp() {
//    return (
//       <div className='App'>
//          <button
//             onClick={() => {
//                postMessage({ command: 'show', value: '1' })
//             }}
//          >
//             Show '1'
//          </button>
//          <button
//             onClick={() => {
//                postMessage({ command: 'end', value: '1' })
//             }}
//          >
//             END
//          </button>
//       </div>
//    )
// }
