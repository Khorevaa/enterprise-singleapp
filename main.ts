import path = require('path');

import jsonfile = require('jsonfile');

import electron = require("electron");
import installExtension from 'electron-devtools-installer';

let app = electron.app;
let dialog = electron.dialog;
let BrowserWindow = electron.BrowserWindow;
let Menu = electron.Menu;

let mainWindow: Electron.BrowserWindow;

let userDataPath = path.join(__dirname, "userdata");
app.setPath('userData', userDataPath);



let extensionsPath = path.join(userDataPath, "extensions");
let onecExtensionPathManifest = path.join(extensionsPath, "pbhelknnhilelbnhfpcjlcabhmfangik", "manifest.json");

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

  await installExtension('pbhelknnhilelbnhfpcjlcabhmfangik', true);

  let manifest = jsonfile.readFileSync(onecExtensionPathManifest);
  manifest.name = "pbhelknnhilelbnhfpcjlcabhmfangik";
  jsonfile.writeFileSync(onecExtensionPathManifest, manifest);

  console.log("reload 1C extension");

  await installExtension("pbhelknnhilelbnhfpcjlcabhmfangik", false);

  let template = [
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
  let menu: Electron.Menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  mainWindow.loadURL(`http://accounting.demo.1c.ru/accounting/ru_RU/`);

  mainWindow.webContents.openDevTools();

  mainWindow.on("closed", () => {
    mainWindow = null;
  });


  //chrome-extension://pbhelknnhilelbnhfpcjlcabhmfangik/manifest.json
  //is it recomiled

  // let template = [
  //   {
  //     label: "Главная",
  //     submenu: [
  //       {
  //         label: "Выход",
  //         click: () => {
  //           app.quit();
  //         }
  //       }
  //     ]
  //   },
  //   {
  //     label: "Сервис",
  //     submenu: [
  //       {
  //         label: "Настройки",
  //         click: () => {
  //           app.quit();
  //         }
  //       },
  //       {
  //         label: "О программе",
  //         click: () => {
  //           app.quit();
  //         }
  //       }
  //     ]
  //   }
  // ];
  // let menu: Electron.Menu = Menu.buildFromTemplate(template);
  // Menu.setApplicationMenu(menu);

  // mainWindow.loadURL(`http://accounting.demo.1c.ru/accounting/ru_RU/`);

  // mainWindow.webContents.openDevTools();

  // mainWindow.on("closed", () => {
  //   mainWindow = null;
  // });
}

// Call 'createWindow()' on startup.
app.on("ready", () => {
  createWindow();
  if (process.argv[1] != "main.js") {
    mainWindow.webContents.on("did-finish-load", () => {
      mainWindow.webContents.send("load-file", process.argv[1]);
    });
  }

});

// On OS X it is common for applications and their menu bar to stay active until the user quits explicitly
// with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
});

// On OS X it's common to re-create a window in the app when the dock icon is clicked and there are no other
// windows open.
app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

function pauseBrowser(millis) {
  var date = Date.now();
  var curDate = null;
  do {
    curDate = Date.now();
  } while (curDate - date < millis);
}