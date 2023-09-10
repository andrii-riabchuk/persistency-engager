import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import fs from 'fs';
import { Database as SQliteDatabase } from 'sqlite3'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
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
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  ipcMain.handle('dialog', (event, method, params) => {
    dialog[method](params);
  });
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

const sqlite3 = require('sqlite3');

let initDb = function(dbPath: string){
  console.log('Creating new db', dbPath);

  let db = new SQliteDatabase(dbPath, sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE);
  fs.readFile(join(__dirname, '..', '..', 'db', 'schema.sql'), 'utf-8', (err, sql_create_schema)=>{
    if (err) console.log('Failed to read schema.sql');
    else 
      db.exec(sql_create_schema, (err)=>{if (err) console.log('Failed to execute schema.sql')});
  });
  
  // db.each('SELECT * FROM sqlite_master', (err, row)=>{
  //   console.log('row', row);
  // });
}

let userDataDbPath = join(app.getPath("userData"), "userdata.db");
let db = new SQliteDatabase(userDataDbPath, sqlite3.OPEN_READWRITE, (err) => {
  if (err)
    initDb(userDataDbPath);
  else {
    console.log('DB already exists');
    db.close();
  }
});

// const db = new sqlite3.Database(join(app.getPath("userData"), "userdata.db"));

// db.serialize(() => {
//     db.run("CREATE TABLE lorem (info TEXT)");

//     const stmt = db.prepare("INSERT INTO lorem VALUES (?)");
//     for (let i = 0; i < 10; i++) {
//         stmt.run("Ipsum " + i);
//     }
//     stmt.finalize();

//     db.each("SELECT rowid AS id, info FROM lorem", (err, row) => {
//         console.log(row.id + ": " + row.info);
//     });
// });

// db.close();