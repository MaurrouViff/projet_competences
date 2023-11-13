let splash;
PORT = 5173;
const { app, BrowserWindow } = require("electron");
app.on("ready", () => {
  // create main browser window
  mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
    width: 1280,
    height: 720,
    show: false, // don't show the main window
  });
  // create a new `splash`-Window
  splash = new BrowserWindow({
    width: 810,
    height: 310,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
  });
  splash.loadURL(`file://${__dirname}/splash.html`);
  mainWindow.loadURL("http://localhost:" + PORT);

  // if main window is ready to show, then destroy the splash window and show up the main window
  mainWindow.once("ready-to-show", () => {
    setTimeout(() => {
      splash.destroy();
      mainWindow.show();
    }, 1500);
  });
});
