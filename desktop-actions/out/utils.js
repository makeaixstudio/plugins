"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
function getWorkspaceFolder() {
    if (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length >= 1) {
        return vscode.workspace.workspaceFolders[0];
    }
    else {
        throw new Error('No workspace selected.');
    }
}
exports.getWorkspaceFolder = getWorkspaceFolder;
//# sourceMappingURL=utils.js.map