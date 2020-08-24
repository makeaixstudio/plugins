const vscode = require("vscode");
function openWelcomeScreen() {
    const panel = vscode.window.createWebviewPanel(
        'welcome',
        'Welcome',
        vscode.ViewColumn.One,
        {enableScripts: true, retainContextWhenHidden: true}
    );
    panel.webview.html = welcomeContent();
}
function welcomeContent() {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome</title>
    </head>
    <body>
        <div style="width:150px;height:150px;"><svg style="width:150px;height:150px;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="isolation:isolate" viewBox="0 0 3200 3200" width="3200pt" height="3200pt"><defs><clipPath id="_clipPath_vQ7hDlJZ70KpAVkohIFnhYHFRoboEV8Z"><rect width="3200" height="3200"/></clipPath></defs><g clip-path="url(#_clipPath_vQ7hDlJZ70KpAVkohIFnhYHFRoboEV8Z)"><path d="M 176 0 L 3024 0 C 3121.137 0 3200 78.863 3200 176 L 3200 3024 C 3200 3121.137 3121.137 3200 3024 3200 L 176 3200 C 78.863 3200 0 3121.137 0 3024 L 0 176 C 0 78.863 78.863 0 176 0 Z" style="stroke:none;fill:#000000;stroke-miterlimit:10;"/><path d=" M 1356.857 489.5 L 474.469 2710.5 L 1356.857 2710.5 L 2248.971 489.5 L 1356.857 489.5 Z " fill="none" vector-effect="non-scaling-stroke" stroke-width="89" stroke="rgb(0,255,255)" stroke-linejoin="miter" stroke-linecap="square" stroke-miterlimit="3"/><path d=" M 1843.143 489.5 L 2725.531 2710.5 L 1843.143 2710.5 L 951.029 489.5 L 1843.143 489.5 Z " fill="none" vector-effect="non-scaling-stroke" stroke-width="89" stroke="rgb(0,255,255)" stroke-linejoin="miter" stroke-linecap="square" stroke-miterlimit="3"/></g></svg></div>
        <br/><h1>Welcome to AIX Studio 2</h1>
        <p>You're using the most advanced IDE for App Inventor extension development. Have a look at the sidebar menu for things to do.</p>
    </body>
    </html>`;
}
function activate(context) {
    openWelcomeScreen();
}
function deactivate(){}