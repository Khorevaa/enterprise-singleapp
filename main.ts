import path = require("path");

import jsonfile = require("jsonfile");

import electron = require("electron");
import installExtension from "electron-devtools-installer";

const app = electron.app;
const tray = electron.Tray;
const dialog = electron.dialog;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;

let mainWindow: Electron.BrowserWindow;

//const userDataPath = path.join(__dirname, "userdata");
const userDataPath = app.getPath("userData");
//app.setPath("userData", userDataPath);

const onecExtensionID = "pbhelknnhilelbnhfpcjlcabhmfangik";
const extensionsPath = path.join(userDataPath, "extensions");
const onecExtensionPathManifest = path.join(extensionsPath, onecExtensionID, "manifest.json");

async function createWindow() {

  const browserWindowOptions: Electron.BrowserWindowOptions = {
    width: 800,
    height: 600,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      allowDisplayingInsecureContent: true,
      allowRunningInsecureContent: true,
    }
  };
  mainWindow = new BrowserWindow(browserWindowOptions);

  let result = await installExtension(onecExtensionID, true);
  await electron.BrowserWindow.removeDevToolsExtension(result);

  const manifest = jsonfile.readFileSync(onecExtensionPathManifest);
  manifest.name = onecExtensionID;
  jsonfile.writeFileSync(onecExtensionPathManifest, manifest);

  console.log("reload 1C extension");

  await installExtension(onecExtensionID, false);

  const template = [
    {
      label: "Главная",
      submenu: [
        {
          label: "Выход",
          click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: "Сервис",
      submenu: [
        {
          label: "Настройки",
          click: () => {
            app.quit();
          }
        },
        {
          label: "О программе",
          click: () => {
            app.quit();
          }
        }
      ]
    }
  ];
  const menu: Electron.Menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  //mainWindow.loadURL(`http://accounting.demo.1c.ru/accounting/ru_RU/`);
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  //mainWindow.webContents.openDevTools();

  app.setAsDefaultProtocolClient("callto")

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

}

// Call "createWindow()" on startup.
app.on("ready", () => {
  createWindow();
  if (process.argv[1] !== "main.js") {
    mainWindow.webContents.on("did-finish-load", () => {
      mainWindow.webContents.send("load-file", process.argv[1]);
    });
  }

   let ourtray = new tray('icon.png');
   ourtray.setToolTip('Единое окно предприятия.')

});

// On OS X it is common for applications and their menu bar to stay active until the user quits explicitly
// with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// On OS X it"s common to re-create a window in the app when the dock icon is clicked and there are no other
// windows open.
app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

function pauseBrowser(millis) {
  const date = Date.now();
  let curDate = null;
  do {
    curDate = Date.now();
  } while (curDate - date < millis);
}
