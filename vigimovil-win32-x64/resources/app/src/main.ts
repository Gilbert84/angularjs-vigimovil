import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import 'hammerjs';

const { app, BrowserWindow } = require('electron');

let win;

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));


function createWindow () {
  win = new BrowserWindow({
    width: 600,
    height: 800,
    backgroundColor: '#ffffff',
    icon: `file://${__dirname}/dist/asstes/logo.png`
  });

  win.loadURL(`file://${__dirname}/dist/index.html`);
  //herramienta para desarrolladores
  win.webContents.openDevTools();
  win.on('closed', function () {
    win = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if ( process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('active', function () {
  if (win === null) {
    createWindow();
  }
});
