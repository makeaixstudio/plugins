"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const fs = require("fs");
const os = require("os");
const utils_1 = require("./utils");
function runInTerminal(buttonConfig, term, extensionTerminals, index, context, folderPath) {
    let activeTerminals = vscode.window.terminals;
    if (!activeTerminals.includes(term)) {
        term = vscode.window.createTerminal({ name: buttonConfig.name, cwd: folderPath });
        extensionTerminals[index] = term;
        context.update('terminals', extensionTerminals);
    }
    term.sendText(buttonConfig.script);
    term.show();
}
async function localBuild(){
  const rawaisourcepath = (vscode.env.appRoot + "/aisource").replace("\\", "/");
  const isWindows = if(os.platform() == "win32"){return true}else{return false};
  const aisourcepath = rawaisourcepath.replace("/", "\\");
  const buildTerm = vscode.window.createTerminal({name: "Local Build Terminal", cwd: vscode.env.appRoot , shellPath: if(isWindows){return "C:\\Windows\\System32\\cmd.exe"}else{return "/bin/sh"}});
  if(isWindows && !fs.existsSync(rawaisourcepath + "/appinventor/components/extension")){
    term.sendText("((git --version 1>NUL && ant -version 1>NUL) && mkdir aisource && git clone https://github.com/mit-cml/appinventor-sources.git aisource && xcopy " + vscode.workspace.workspaceFolders[0].uri.toString(true).split("file://").join("").replace("/", "\\") + " " + aisourcepath + "\\appinventor\\components\\extension /s /e /y /i && cd " + aisourcepath + "\\appinventor && ant extensions) || echo Either Git, Apache Ant, or both are not available. Please install them to use local builds. && rem AIXSTUDIO_LOCALBUILDSCRIPT");
    term.show();
    if(fs.existsSync(rawaisourcepath + "/appinventor/components/build/extensions")){
      await vscode.commands.executeCommand("vscode.openFolder", vscode.Uri.file(rawaisourcepath + "/appinventor/components/build/extensions", true));
    }
  }else if(isWindows){
    term.sendText("((git --version 1>NUL && ant -version 1>NUL) && rmdir \"" + aisourcepath + "/appinventor/components/extension\" /s /q && xcopy " + vscode.workspace.workspaceFolders[0].uri.toString(true).split("file://").join("").replace("/", "\\") + " " + aisourcepath + "\\appinventor\\components\\extension /s /e /y /i && cd " + aisourcepath + "\\appinventor && ant extensions) || echo Either Git, Apache Ant, or both are not available. Please install them to use local builds. && rem AIXSTUDIO_LOCALBUILDSCRIPT");
    term.show();
    if(fs.existsSync(rawaisourcepath + "/appinventor/components/build/extensions")){
      await vscode.commands.executeCommand("vscode.openFolder", vscode.Uri.file(rawaisourcepath + "/appinventor/components/build/extensions", true));
    }
  }else if(!fs.existsSync(rawaisourcepath + "/appinventor/components/build/extensions")){
    term.sendText("(command -v ant >/dev/null 2>&1 || { echo >&2 \"Apache Ant and Git need to be installed.\"; exit 1; }); (command -v git >/dev/null 2>&1 || { echo >&2 \"Apache Ant and Git need to be installed.\"; exit 1; }); mkdir aisource && git clone https://github.com/mit-cml/appinventor-sources.git aisource && cp -r " + vscode.workspace.workspaceFolders[0].uri.toString(true).split("file://").join("").replace("\\", "/") + "/* " + rawaisourcepath + "/appinventor/components/extension && cd " + rawaisourcepath + "/appinventor && ant extensions");
    term.show();
  }else{
    term.sendText("(command -v ant >/dev/null 2>&1 || { echo >&2 \"Apache Ant and Git need to be installed.\"; exit 1; }); (command -v git > dev/null 2>&1 || { echo >&2 \"Apache Ant and Git need to be installed.\"; exit 1; }); rm -rf \"" + rawaisourcepath + "/appinventor/components/extension\"; cp -r " + vscode.workspace.workspaceFolders[0].uri.toString(true).split("file://").join("").replace("\\", "/") + "/* " + rawaisourcepath + "/appinventor/components/extension && cd " + rawaisourcepath + "/appinventor && ant extensions");
    term.show();
  }
}
async function clearBuildOutputs(){
  const rawaisourcepath = (vscode.env.appRoot + "/aisource").replace("\\", "/");
  const aisourcepath = rawaisourcepath.replace("/", "\\");
  if(fs.existsSync(rawaisourcepath + "/appinventor/components/build/extensions")){
    fs.rmdirSync(rawaisourcepath + "/appinventor/components/build", {recursive: true});
  }
}
function openForum() {
    const panel = vscode.window.createWebviewPanel(
        'forum',
        'Community Forum',
        vscode.ViewColumn.One,
        {enableScripts: true, retainContextWhenHidden: true}
    );
    panel.webview.html = forumContent();
}
function forumContent() {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Community Forum</title>
    </head>
    <body style="width:100vw;height:100vh;padding:0;margin:0;">
        <iframe src="https://aix.flarum.cloud" style="width:100vw;height:100vh;border:none;" sandbox="allow-scripts"/>
    </body>
    </html>`;
}
function openJavadoc() {
    const panel = vscode.window.createWebviewPanel(
        'ai2Javadoc',
        'App Inventor Javadoc',
        vscode.ViewColumn.One,
        {enableScripts: true, retainContextWhenHidden: true}
    );
    panel.webview.html = aijavadocContent();
}
function aijavadocContent() {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>App Inventor Javadoc</title>
    </head>
    <body style="width:100vw;height:100vh;padding:0;margin:0;">
        <iframe src="https://mit-cml.github.io/aijavadoc/" style="width:100vw;height:100vh;border:none;" sandbox="allow-scripts"/>
    </body>
    </html>`;
}
function openBytes() {
    const panel = vscode.window.createWebviewPanel(
        'bytesMenu',
        'Bytes',
        vscode.ViewColumn.One,
        {enableScripts: true, retainContextWhenHidden: true}
    );
    panel.webview.html = bytesContent();
}
function bytesContent() {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bytes</title>
    </head>
    <body style="width:100vw;height:100vh;padding:0;margin:0;">
        <iframe src="https://aixbytes.cedric.kim" style="width:100vw;height:100vh;border:none;" sandbox="allow-scripts"/>
    </body>
    </html>`;
}
function runCommand(buttonConfig, index, context) {
    return eval(buttonConfig.script);
}
exports.runCommand = runCommand;
//# sourceMappingURL=runCommand.js.map