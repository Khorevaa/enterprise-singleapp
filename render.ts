const TabGroup = require("electron-tabs");

import installExtension from "electron-devtools-installer";

let tabGroup = new TabGroup();
let onec = tabGroup.addTab({
    title: "Наша 1С",
    src: "http://accounting.demo.1c.ru/accounting/ru_RU/",
    visible: true,
    active: true,
    webviewAttributes: {
        nodeintegration: "on",
        disablewebsecurity: "on",
        plugins: true,
        webpreferences: {
            //TODO добавить еще настроек
        }
    }
});

onec.setTitle("1С");

let pmo = tabGroup.addTab({
    title: "Управление проектами",
    src: "https://github.com/silverbulleters-research",
    visible: true,
    active: false,
});


let crm = tabGroup.addTab({
    title: "Чат",
    src: "https://gitter.im/silverbulleters/home",
    visible: true,
    active: false,
    nodeintegration: "on",
    disablewebsecurity: "on",
    plugins: true,
    webpreferences: {
        //TODO добавить еще настроек
    }
});