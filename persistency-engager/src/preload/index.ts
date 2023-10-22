import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  openDialog: (method, config) => ipcRenderer.invoke('dialog', method, config),
  getActivityName: () => ipcRenderer.invoke('getActivityName'),
  setActivityName: (newName: string) => ipcRenderer.invoke('setActivityName', newName),
  getData: () => ipcRenderer.invoke('getData'),
  updateLogEntry: (input) => ipcRenderer.invoke('setData', input)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
