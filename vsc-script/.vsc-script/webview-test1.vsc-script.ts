//vsc-script-name: webview test
import * as vsc from 'vsc-base'

export async function run(path: string, { webview }) {
   const onMessage = webview({
      onMessageCode: webViewOnMessage.toString(),
      body: `
      <button onClick="postMessage({command:'show',value:'1'})">Show '1'</button>
      <button onClick="postMessage({command:'end'})">END</button>
   `})
   await onMessage((message: any, stopWebView: () => void) => {//sendMessage: (message: any) => void, 
      if (message.command === 'show') {
         vsc.showMessage(message.value)
      }
      if (message.command === 'end') {
         stopWebView()
      }
   })
   vsc.showMessage("Script Done")
}

const webViewOnMessage = (event: any) => {
   const message = event.data;
   if (message.command === 'setBody') {
      document.getElementsByTagName('body')[0].innerHTML = message.content
   }
}