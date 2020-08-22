"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const buttons_1 = require("./buttons");
const runCommand_1 = require("./runCommand");
const utils_1 = require("./utils");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    const folderPath = utils_1.getWorkspaceFolder().uri.fsPath;
    context.workspaceState.update('terminals', {});
    const buttonsProvider = new buttons_1.ButtonsProvider(folderPath, context.workspaceState);
    let watcher = vscode.workspace.createFileSystemWatcher(`${folderPath}/buttons.jsonc`, false, false, false);
    watcher.onDidChange(() => { buttonsProvider.refresh(); });
    watcher.onDidDelete(() => { buttonsProvider.refresh(); });
    watcher.onDidCreate(() => { buttonsProvider.refresh(); });
    context.subscriptions.push(watcher);
    context.subscriptions.push(vscode.window.registerTreeDataProvider('buttons', buttonsProvider));
    context.subscriptions.push(vscode.commands.registerCommand('vscode-buttons.runCommand', runCommand_1.runCommand));
    context.workspaceState.update('terminals', {});
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map