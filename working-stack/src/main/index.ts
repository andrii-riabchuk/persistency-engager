import { app, shell, BrowserWindow, Tray, Menu, ipcMain, dialog, nativeImage } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'

import { databaseHealthCheck } from './database/check-up'
import registerEventHandlers from './context-bridge/register-event-handlers'
import { TRAY_ICON } from './services/trayicon'

function createWindow(): BrowserWindow {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    title: 'Persistency Engager',
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  return mainWindow
}

function createTray() {
  let tray = new Tray(nativeImage.createFromDataURL(TRAY_ICON))
  tray.on('click', (e) => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  const menu = Menu.buildFromTemplate([
    { type: 'separator' },
    { role: 'quit' } // "Exit" button
  ])

  tray.setToolTip('Persistency Engager')
  tray.setContextMenu(menu)
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  databaseHealthCheck()

  createWindow()
  createTray()

  // ContextBridge events
  registerEventHandlers()
})

// Turned off - decided to put application to tray when window closed

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit()
//   }
// })
