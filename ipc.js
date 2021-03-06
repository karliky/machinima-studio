
function ipcManager(ipcMain, BrowserWindow) {
  /**
   * Taken from https://github.com/konsumer/electron-prompt/blob/master/main.js
   */
  ipcMain.on('terminate', process.exit);

  let promptResponse;

  ipcMain.on('prompt', (eventRet, arg) => {
    promptResponse = null;
    let promptWindow = new BrowserWindow({
      width: 200,
      height: 100,
      show: false,
      resizable: false,
      movable: false,
      alwaysOnTop: true,
      frame: false
    });
    arg.val = arg.val || '';
    const promptHtml = `<label for="val">${arg.title}</label>
    <input id="val" value="${arg.val}" autofocus />
    <button onclick="require('electron').ipcRenderer.send('prompt-response', document.getElementById('val').value);window.close()">Ok</button>
    <button onclick="window.close()">Cancel</button>
    <style>
      body {font-family: sans-serif;}
      button {float:right; margin-left: 10px;}
      label,input {margin-bottom: 10px; width: 100%; display:block;}
    </style>`;
    promptWindow.loadURL(`data:text/html,${promptHtml}`);
    promptWindow.show();
    promptWindow.on('closed', () => {
      eventRet.returnValue = promptResponse;
      promptWindow = null;
    });
  });
  ipcMain.on('prompt-response', (event, arg) => {
    if (arg === '') { arg = null; }
    promptResponse = arg;
  });
}

module.exports = ipcManager;
