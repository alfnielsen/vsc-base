import * as app from 'express'
import * as http from 'http'
import * as socketIo from 'socket.io';
import * as vsc from 'vsc-base'
import * as vscode from 'vscode'

var server = http.createServer(app);
var io = socketIo(server);

import ScriptConnect from './ScriptConnect'

//let io: socketIo.Server
// The module 'vscode' contains the VS Code extensibility API



// Import the module and reference it with the alias vscode in your code below
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vsc-script-connect" is now active!')

	// Listen on port 3636
	io = socketIo.listen(3636);
	io.sockets.on('connection', function (socket) {
		// Broadcast a user's message to everyone else in the room
		socket.on('send', function (data) {
			io.sockets.emit('message', data);
		});

		socket.on('message', function (data: { type: string, message: string }) {
			if (data.type === 'show') {
				vsc.showMessage(data.message)
			}
		});
		setTimeout(() => {
			socket.emit('send', { type: 'show', message: "Hi hi!" });
		}, 8000)

	});


	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json

	const script = new ScriptConnect()

	let disposableScriptCommand = vscode.commands.registerCommand('extension.vscScriptConnect', (uri?: vscode.Uri, uris?: vscode.Uri[]) => {
		if (uri === undefined || !vscode.window.activeTextEditor) {
			vscode.window.showErrorMessage("vsc-script can only be run from vscode explore context menu or an open document");
			return;
		} else if (uri === undefined) {
			uri = vscode.window.activeTextEditor.document.uri
		}
		script.run(uri)
	})



	context.subscriptions.push(disposableScriptCommand)
}

// this method is called when your extension is deactivated
export function deactivate() {
	io.close()
}


