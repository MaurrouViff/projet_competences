
const path = require("path");
let splash;
PORT = 5173;
const { app, BrowserWindow, ipcMain } = require("electron");

const ipc = ipcMain;

app.disableHardwareAcceleration();

app.on("ready", () => {
  // create main browser window
  mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
    width: 1280,
    height: 720,
    icon: path.join(__dirname + "/public/oasis.png",),
    minHeight: 720,
    minWidth: 1280,
    resizable: true,
    maximizable: true,

    frame: true,
    show: false, // don't show the main window
    webPreferences: {
      contextIsolation: false,
      devTools: true,
      nodeIntegration: true,
    },
  });

  // create a new `splash`-Window
  splash = new BrowserWindow({
    width: 810,
    height: 310,
    icon: path.join(__dirname + "/public/oasis.png",),
    transparent: true,
    frame: false,
    resizable: false,
    alwaysOnTop: true,
  });
  splash.loadURL(`file://${__dirname}/splash.html`);
  mainWindow.loadURL("http://localhost:" + PORT);

  ipc.on("maximize-window", (event) => {
    mainWindow.maximize();
  });
  ipc.on("minimize-window", (event) => {
    mainWindow.minimize();
  });
  ipc.on("close-window", (event) => {
    mainWindow.close();
  });

  // if main window is ready to show, then destroy the splash window and show up the main window
  mainWindow.once("ready-to-show", () => {
    setTimeout(() => {
      splash.destroy();
      mainWindow.show();
    }, 900);
  });

  // if the app cannot load the URL, quit the app
  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription, validatedURL, isMainFrame) => {
    console.error(`Failed to load URL: ${validatedURL} with error: ${errorDescription}`);
    app.quit();
  });


});
