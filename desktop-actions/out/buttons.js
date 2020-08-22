"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const vscode = require("vscode");
class ButtonsProvider {
    constructor(folderPath, workspaceState) {
        this.folderPath = folderPath;
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
        this._folderPath = folderPath;
        this._workspaceState = workspaceState;
    }
    refresh() {
        this._onDidChangeTreeData.fire();
    }
    getTreeItem(element) {
        return element;
    }
    getChildren() {
        let config = {buttons: [
            {
                name: "Open project",
                script: "vscode.commands.executeCommand(\"vscode.openFolder\");"
            },
            {
                name: "Build",
                script: "localBuild();"
            },
            {
                name: "Templates & snippets",
                script: "openBytes();",
                description: "☁"
            },
            {
                name: "AI2 Javadoc",
                script: "openJavadoc();",
                description: "☁"
            },
            {
                name: "Community forum",
                script: "openForum();",
                description: "☁"
            },
            {
                name: "Clear build outputs",
                script: "clearBuildOutputs();"
            },
        ]};
        return Promise.resolve(config.buttons.map((buttonConfig, index) => {
            return this.createButton(buttonConfig, index);
        }));
    }
    createButton(buttonConfig, index) {
        return new Button(buttonConfig.name, vscode.TreeItemCollapsibleState.None, {
            command: 'vscode-buttons.runCommand',
            title: buttonConfig.description === undefined ? '' : buttonConfig.description,
            arguments: [buttonConfig, index, this._workspaceState]
        });
    }
}
exports.ButtonsProvider = ButtonsProvider;
class Button extends vscode.TreeItem {
    constructor(label, collapsibleState, command) {
        super(label, collapsibleState);
        this.label = label;
        this.collapsibleState = collapsibleState;
        this.command = command;
        this.contextValue = 'button';
        this._script = command.arguments === undefined ? '' : `${command.arguments[0]}`;
    }
    get tooltip() {
        return ``;
    }
    get description() {
        return `${this.command.title}`;
    }
}
exports.Button = Button;
//# sourceMappingURL=buttons.js.map