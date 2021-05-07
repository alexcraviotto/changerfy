const {app, BrowserWindow, Menu, ipcMain} = require('electron');
const url = require('url');
const path = require('path');
const changeUI = require('./changeUI.js')

if(process.env.NODE_ENV !== 'production'){
    require('electron-reload')(__dirname, {

    })
}

let mainWindow; 

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        icon:  __dirname + '/assets/favicon.ico',
        width: 1000, 
        height: 600, 
        resizable:false, 
        title:'changerfy',
        webPreferences: {nodeIntegration: true, contextIsolation: false}
    });
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/index.html'),
        protocol: 'file',
        slashes: true
    }))
    mainWindow.setMenu(null);
    
})

ipcMain.on('old-ui', (e) => {
    changeUI.oldUI();
})

ipcMain.on('new-ui', (e) => {
    changeUI.newUI();
})